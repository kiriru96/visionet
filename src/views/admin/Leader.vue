<template>
    <v-main>
        <v-container fill-width>
            <v-dialog persistent v-model="dialogStatus" max-width="500px">
                <v-card>
                    <v-alert
                        v-model="errorMsg"
                        dismissible
                        color="error">
                        {{errorMsg}}
                    </v-alert>
                    <v-card-title>
                        <span class="headline">{{formTitle}}</span>
                    </v-card-title>

                    <v-card-text v-if="!pass">
                        <WorkerInput ref="submitpanel" :edit="edit" :forminput="forminput"/>
                    </v-card-text>
                    <v-card-text v-else>
                        <ChangePassInput ref="changepass" :forminput="forminput"/>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                @keyup="searchAction">
            </v-text-field>
            <v-spacer></v-spacer>
            <v-fab-transition>
                <v-btn
                    v-show="!hidden"
                    color="primary"
                    class="mb-2"
                    fab
                    dark
                    small
                    fixed
                    bottom
                    right
                    @click="addAction">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-fab-transition>
            <Dialog :dialog="alert" :title="`Delete`" :text="`Are you sure delete this?`" v-on:ok="OkButton" v-on:no="NoButton"/>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="table"
                :options.sync="options"
                :server-items-length="lentable"
                :loading="isLoading"
                class="elevation-1">
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
                    <v-icon
                        small
                        class="mr-2"
                        @click="changePass(item)">
                        mdi-key
                    </v-icon>
                </template>
            </v-data-table>
        </v-container>
    </v-main>
</template>

<script>
export default {
    components: {
        WorkerInput: () => import('../../components/WorkerInput.vue'),
        Dialog: () => import('../../components/Dialog.vue'),
        ChangePassInput: () => import('../../components/ChangePassInput.vue')
    },
    data() {
        return {
            forminput: {
                id: -1,
                firstname: '',
                lastname: '',
                username: '',
                password: '',
                location: {id: 0, name: ''}
            },
            pass: false,
            edit: false,
            selected: [],
            alert: false,
            idselected: -1,
            search: '',
            headers: [
                {text: 'ID', value: 'id', sortable: false},
                {text: 'First Name', value: 'first_name', sortable: false},
                {text: 'Last Name', value: 'last_name', sortable: false},
                {text: 'Username', value: 'username', sortable: false},
                {text: 'Location', value: 'locationname', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            sortbylast: null,
            sorting: "ASC",
            editedIndex: -1,
            formInput: {
                id: -1,
                name: ''
            },
            formTitle: 'Device',
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
            dispatch('leader/removeError')
        },
        removeMsg() {
            const {dispatch} = this.$store;
            dispatch('leader/removeMsg')
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
            this.pass = false
            this.edit = false
            const {dispatch} = this.$store

            this.idselected = -1

            this.formTitle = 'Add Leader'

            dispatch('leader/removeError')
            dispatch('leader/openDialog')
        },
        editAction(item) {
            this.pass = false
            this.edit = true

            const {id, first_name, last_name, username, location, locationname} = item

            this.editedIndex = -1

            this.idselected = this.table.indexOf(item)

            this.forminput = {
                id : id,
                firstname: first_name,
                lastname: last_name,
                username: username,
                password: '',
                location: {id: location, name: locationname}
            }

            this.formTitle = 'Edit Leader'

            const {dispatch} = this.$store

            dispatch('leader/openDialog')
        },
        changePass(item) {
            this.pass = true

            const {id, first_name, last_name, username, location, locationname} = item

            this.forminput = {
                id: id,
                firstname: first_name,
                lastname: last_name,
                username: username,
                password: '',
                location: {id: location, name: locationname}
            }

            this.formTitle = "Change Password"
            
            const {dispatch} = this.$store

            dispatch('leader/openDialog')
        },
        deleteAction(item) {
            const index = this.table.indexOf(item)
            this.alert = true
            this.idselected = index
        },
        closeDialog() {
            const {dispatch} = this.$store
            dispatch('leader/closeDialog')

            if(this.$refs.submitpanel) {
                this.$refs.submitpanel.resetForm()
            }
        },
        save() {
            if(this.idselected === -1) {
                this.submitAPI()
            } else {
                this.editAPI()
            }
        },
        OkButton(){
            const {dispatch} = this.$store
            dispatch('leader/deleteList', this.table[this.idselected].id)

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

            dispatch('leader/reqList', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sorting})
        },
        submitAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            if(this.$refs.submitpanel.isValid()) {
                let data = {name: this.forminput.name}
                dispatch('leader/insertList', data)
            }

            dispatch('leader/closeDialog')

            setTimeout(()=> {
                this.getDataFromAPI()
            }, 1000)
        },
        editAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            if(this.$refs.submitpanel.isValid()) {
                let data = {id: this.forminput.id, name: this.forminput.name}
                dispatch('leader/updateList', data)
            }

            dispatch('leader/closeDialog')

            this.idselected = -1

            setTimeout(()=> {
                this.getDataFromAPI()
            }, 1000)
        }
    },
    computed: {
        table() {
            return this.$store.getters['leader/getAllItems']
        },
        isLoading() {
            return this.$store.getters['leader/getLoading']
        },
        lentable() {
            return this.$store.getters['leader/getLenItems']
        },
        errorMsg() {
            return this.$store.getters['leader/getError']
        },
        dialogStatus() {
            return this.$store.getters['leader/getDialog']
        },
        responseMsg() {
            return this.$store.getters['leader/getMessage']
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
        params: {
            handler(val) {
                this.getDataFromAPI()
            },
            deep: true
        }
    }
}
</script>