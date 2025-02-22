<template>
    <v-main>
        <v-container fill-width>
            <v-dialog persistent v-model="dialogStatus" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{formTitle}}</span>
                    </v-card-title>

                    <v-card-text v-if="!pass">
                        <WorkerInput ref="submitpanel" :edit="edit" :forminput="forminput" :type="`leader`"/>
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
                            class="mx-12"
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
                            <span>Create New Asset</span>
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
                    <v-icon
                        small
                        class="mr-2"
                        @click="changePass(item)">
                        mdi-key
                    </v-icon>
                </template>
            </v-data-table>
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
                    @click="removeError()">
                    Close
                </v-btn>
            </v-snackbar>
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
            id_server_account: -1
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
            dispatch('engineer/removeError')
        },
        removeMsg() {
            const {dispatch} = this.$store;
            dispatch('engineer/removeMsg')
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

            this.formTitle = 'Add Engineer'

            dispatch('engineer/removeError')
            dispatch('engineer/openDialog')
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

            this.formTitle = 'Edit Engineer'

            const {dispatch} = this.$store

            dispatch('engineer/openDialog')
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

            dispatch('engineer/openDialog')
        },
        deleteAction(item) {
            const index = this.table.indexOf(item)
            this.alert = true
            this.id_server_account = item.id
            this.idselected = index
        },
        closeDialog() {
            const {dispatch} = this.$store
            dispatch('engineer/closeDialog')

            if(this.$refs.submitpanel) {
                this.$refs.submitpanel.resetForm()
            }
        },
        save() {
            if(this.pass) {
                this.changePassAPI()
            } else {
                if(this.idselected === -1) {
                    this.submitAPI()
                } else {
                    this.editAPI()
                }
            }
        },
        OkButton(){
            if(this.isLoading) return

            const {dispatch} = this.$store
            dispatch('engineer/deleteList', this.id_server_account)

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

            dispatch('engineer/reqList', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sorting})
        },        
        submitAPI() {
            if(this.isLoading) return

            if(this.$refs.submitpanel.isValid()) {
                const {dispatch} = this.$store

                let data = {
                    firstname:      this.forminput.firstname,
                    lastname:       this.forminput.lastname,
                    username:       this.forminput.username,
                    password:       this.forminput.password,
                    location:       this.forminput.location.id
                }
                dispatch('engineer/insertList', data)
            }

            dispatch('engineer/closeDialog')
        },
        editAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store
            if(this.$refs.submitpanel.isValid()) {

                let data = {
                    id:             this.forminput.id,
                    firstname:      this.forminput.firstname,
                    lastname:       this.forminput.lastname,
                    location:       this.forminput.location.id
                }
                dispatch('engineer/updateList', data)
            }

            dispatch('engineer/closeDialog')

            this.idselected = -1
        },
        changePassAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            if(this.$refs.changepass.isValid()) {
                let data = {id: this.forminput.id, password: this.forminput.password}
                dispatch('engineer/updatePassword', data)
            }

            dispatch('engineer/closeDialog')
        },
        deleteAPI() {
            if(this.isLoading) return
        }
    },
    computed: {
        updateStat() {
            return this.$store.getters['engineer/getUpdate']
        },
        table() {
            return this.$store.getters['engineer/getAllItems']
        },
        isLoading() {
            return this.$store.getters['engineer/getLoading']
        },
        lentable() {
            return this.$store.getters['engineer/getLenItems']
        },
        errorMsg() {
            return this.$store.getters['engineer/getError']
        },
        dialogStatus() {
            return this.$store.getters['engineer/getDialog']
        },
        responseMsg() {
            return this.$store.getters['engineer/getMessage']
        },
        params() {
            return {
                ...this.options,
                query: this.search
            }
        }
    },
    watch: {
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
        },
        updateStat: {
            handler(val) {
                if(val) {
                    this.getDataFromAPI()
                }
            },
            deep: true
        },
        dialogStatus: {
            handler(val) {
                if(!val) {
                    if(this.$refs.submitpanel) {
                        this.$refs.submitpanel.resetForm()
                    }

                    if(this.$refs.workorderinput) {
                        this.$refs.workorderinput.resetForm()
                    }
                }
            },
            deep: true
        }
    }
}
</script>