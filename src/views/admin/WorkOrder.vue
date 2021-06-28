<template>
    <v-main>
        <v-container fill-width>
            <v-dialog v-model="dialogStat" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{formTitle}}</span>
                    </v-card-title>

                    <v-card-text>
                        <WorkOrderInput :edit="true" ref="workorderinput" :forminputWO="forminputWO"/>
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
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        small
                        class="mr-3"
                        @click="editAction(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        class="mr-3"
                        @click="deleteAction(item)">
                        mdi-delete
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
        Dialog: () => import('../../components/Dialog.vue'),
        WorkOrderInput: () => import('../../components/WorkOrderInput.vue')
    },
    data() {
        return {
            wo: false,
            formTitle: '',
            forminputWO: {
                wo_id: -1,
                asset_id: -1,
                customer: {id: -1, name: ''},
                location: {id: -1, name: ''},
                device_name: '',
                brand_name: '',
                model: '',
                serial_number: ''
            },
            edit: false,
            options: {},
            selected: [],
            alert: false,
            search: '',
            headers: [
                {text: 'ID', value: 'id', sortable: false},
                {text: 'Device', value: 'devicename', sortable: false},
                {text: 'Brand', value: 'brandname', sortable: false},
                {text: 'Model', value: 'model', sortable: false},
                {text: 'Serial Number', value: 'serial_number', sortable: false},
                {text: 'Customer', value: 'customername', sortable: false},
                {text: 'Location', value: 'worklocation', sortable: false},
                {text: 'Status', value: 'statustitle', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            idselected: -1,
            items: [],
            currentY: 0,
            lastY:0,
            timeout: 6000,
            color: '',
            mode: '',
            id_server: 0
        }
    },
    methods: {
        handleScroll () {
            this.currentY = window.top.scrollY
            if(this.currentY > this.lastY){
                this.hidden = true
            }else{
                this.hidden = false
            }
            this.lastY = this.currentY
        },
        searchAction() {
        },
        editAction(item) {
            this.formTitle = "Edit Work Order"

            this.forminputWO.wo_id          = item.id
            this.forminputWO.asset_id       = item.asset_id
            this.forminputWO.device_name    = item.devicename
            this.forminputWO.brand_name     = item.brandname
            this.forminputWO.model          = item.model
            this.forminputWO.serial_number  = item.serial_number
            this.forminputWO.customer       = {id: item.customer, name: item.customername}
            this.forminputWO.location       = {id: item.location, name: item.worklocation}

            const {dispatch} = this.$store

            dispatch('workorder/openDialog')
        },
        deleteAction(item) {
            const index = this.items.indexOf(item)
            this.id_server = item.id

            this.alert = true
        },
        closeDialog() {
            const {dispatch} = this.$store
            dispatch('workorder/closeDialog')
            
            if(this.$refs.submitpanel) {
                this.$refs.submitpanel.resetForm()
            }

            if(this.$refs.workorderinput) {
                this.$refs.workorderinput.resetForm()
            }
        },
        save() {
            this.updateAPI()
        },
        removeError() {
            const {dispatch} = this.$store
            dispatch('workorder/removeError')
        },
        OkButton(){
            const {dispatch} = this.$store

            const data = {id: this.id_server}

            dispatch('workorder/deleteWorkOrder', data)

            this.alert = false
            this.idselected = -1
        },
        NoButton() {
            this.alert = false
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

            dispatch('workorder/reqList', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sorting})
        },
        updateAPI() {
            if(this.isLoading) return

            let data = {
                id: this.forminputWO.wo_id,
                customer: this.forminputWO.customer.id,
                location: this.forminputWO.location.id
            }

            const {dispatch} = this.$store

            dispatch('workorder/updateWorkOrder', data)

            dispatch('workorder/closeDialog')
            
            if(this.$refs.workorderinput) {
                this.$refs.workorderinput.resetForm()
            }
        },
        deleteAPI() {
            if(this.isLoading) return
        }
    },
    computed: {
        updateStat() {
            return this.$store.getters['workorder/getUpdate']
        },
        table() {
            return this.$store.getters['workorder/getList']
        },
        lentable() {
            return this.$store.getters['workorder/getTotalItems']
        },
        dialogStat() {
            return this.$store.getters['workorder/getDialog']
        },
        isLoading() {
            return this.$store.getters['workorder/getLoading']
        },
        errorMsg() {
            return this.$store.getters['workorder/getError']
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