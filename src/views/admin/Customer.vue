<template>
    <v-main>
        <v-container fill-width>
            <v-dialog persistent v-model="dialogStatus" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{formTitle}}</span>
                    </v-card-title>

                    <v-card-text>
                        <SubmitPanel ref="submitpanel" :forminput="forminput"/>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <Dialog :dialog="alert" :title="`Delete`" :text="`Are you sure delete this?`" v-on:ok="OkButton" v-on:no="NoButton"/>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="table"
                :options.sync="options"
                :server-items-length="lentable"
                :loading="isLoading"
                class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            @keyup="searchAction">
                        </v-text-field>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    color="primary"
                                    class="mx-2"
                                    v-on="on"
                                    dark
                                    @click="addAction">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Create New Customer</span>
                        </v-tooltip>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editAction(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        class="mr-2"
                        @click="deleteAction(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
            <v-snackbar
            :value="responseMsg"
            :color="color"
            :multi-line="mode === 'multi-line'"
            :timeout="timeout"
            :vertical="mode === 'vertical'"
            >
                {{ responseMsg }}
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-btn
                    dark
                    text
                    @click="removeError()"
                >
                    Close
                </v-btn>
            </v-snackbar>
            <v-snackbar
            :value="errorMsg"
            :color="color"
            :multi-line="mode === 'multi-line'"
            :timeout="timeout"
            :vertical="mode === 'vertical'"
            >
                {{ errorMsg }}
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-btn
                    dark
                    text
                    @click="removeError()"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </v-container>
    </v-main>
</template>

<script>
export default {
    components: {
        SubmitPanel: () => import('../../components/SubmitPanel.vue'),
        Dialog: () => import('../../components/Dialog.vue')
    },
    data() {
        return {
            forminput: {
                id: -1,
                name: '',
                submit: 'brand',
                type: 1
            },
            selected: [],
            alert: false,
            idselected: -1,
            search: '',
            headers: [
                {text: 'Name', value: 'name', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            sortbylast: null,
            sorting: "ASC",
            editedIndex: -1,
            formInput: {
                id: -1,
                name: ''
            },
            formTitle: 'Customer',
            hidden: false,
            options: {},
            timeout: 6000,
            color: '',
            mode: '',
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        searchAction() {
            
        },
        removeError(){
            const {dispatch} = this.$store;
            dispatch('customer/removeError')
        },
        removeMsg() {
            const {dispatch} = this.$store;
            dispatch('customer/removeMsg')
        },
        handleScroll () {
            this.currentY = window.top.scrollY
            if(this.currentY > this.lastY){
                this.hidden = true
            }else{
                this.hidden = false
            }
            this.lastY = this.currentY
        },
        addAction() {
             
            
            const {dispatch} = this.$store

            this.idselected = -1

            this.formTitle = 'Add Customer'

            dispatch('customer/removeError')
            dispatch('customer/openDialog')
        },
        editAction(item) {
            const {id, name} = item
            this.editedIndex = -1

            this.idselected = this.table.indexOf(item)

            this.forminput = {
                id : id,
                name: name
            }

            this.formTitle = 'Edit Customer'

            const {dispatch} = this.$store

            dispatch('customer/openDialog')
        },
        deleteAction(item) {
            const index = this.table.indexOf(item)
            this.alert = true
            this.idselected = index
        },
        closeDialog() {
            const {dispatch} = this.$store
            dispatch('customer/closeDialog')

            this.$refs.submitpanel.resetForm()
        },
        save() {
            if(this.idselected === -1) {
                this.submitAPI()
            } else {
                this.editAPI()
            }

            this.$refs.submitpanel.resetForm()
        },
        OkButton(){
            const {dispatch} = this.$store
            dispatch('customer/deleteList', this.table[this.idselected].id)

            this.alert = false
            this.idselected = -1
        },
        NoButton() {
            this.alert = false
        },
        close() {
            this.dialog = false
        },
        getDataFromAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store
            let {sortBy, sortDesc, page, itemsPerPage} = this.options
            
            if(sortBy.length > 0) {
                this.sortbylast = sortBy
            }

            if(sortDesc.length === 1) {
                this.sorting = !sortDesc[0] ? "ASC" : "DESC"
            }

            dispatch('customer/reqList', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sorting})
        },
        submitAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            if(this.$refs.submitpanel.isValid()) {
                let data = {name: this.forminput.name}
                dispatch('customer/insertList', data)
            }

            dispatch('customer/closeDialog')

            setTimeout(()=> {
                this.getDataFromAPI()
            }, 1000)
        },
        editAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            if(this.$refs.submitpanel.isValid()) {
                let data = {id: this.forminput.id, name: this.forminput.name}
                dispatch('customer/updateList', data)
            }

            dispatch('customer/closeDialog')

            this.idselected = -1

            setTimeout(()=> {
                this.getDataFromAPI()
            }, 1000)
        }
    },
    computed: {
        updateStat() {
            return this.$store.getters['customer/getUpdate']
        },
        table() {
            return this.$store.getters['customer/getAllItems']
        },
        isLoading() {
            return this.$store.getters['customer/getLoading']
        },
        lentable() {
            return this.$store.getters['customer/getLenItems']
        },
        errorMsg() {
            return this.$store.getters['customer/getError']
        },
        dialogStatus() {
            return this.$store.getters['customer/getDialog']
        },
        responseMsg() {
            return this.$store.getters['customer/getMessage']
        },
        params() {
            return {
                ...this.options,
                query: this.search
            }
        }
    },
    watch: {
        dialogStatus: {
            handler(val) {
                if(!val) {
                    this.close()
                }
            },
            deep: true
        },
        options: {
            handler(val) {
                this.getDataFromAPI()
            },
            deep: true
        },
        updateStat: {
            handler(val) {
                if(val) {
                    this.getDataFromAPI()
                }
            },
            deep: true
        },
        params: {
            handler(val) {
                this.getDataFromAPI()
            },
            deep: true
        }
    }
}
</script>