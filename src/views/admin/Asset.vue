<template>
    <v-main>
        <v-container fill-width>
            <v-dialog v-model="dialogStat" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{formTitle}}</span>
                    </v-card-title>

                    <v-card-text v-if="!wo">
                        <AssetInput ref="submitpanel" :forminput="forminput"/>
                    </v-card-text>
                    <v-card-text v-else>
                        <WorkOrderInput :edit="false" ref="workorderinput" :forminputWO="forminputWO"/>
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
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
                            class="mx-12"
                            @keyup="searchAction">
                        </v-text-field>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    color="primary"
                                    class="mx-2"
                                    v-on="on"
                                    dark>
                                    <v-icon>mdi-printer</v-icon>
                                </v-btn>
                            </template>
                            <span>Print Asset</span>
                        </v-tooltip>
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
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                small
                                class="mr-3"
                                v-on="on"
                                @click="editAction(item)">
                                mdi-pencil
                            </v-icon>
                        </template>
                        <span>Edit Asset</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                small
                                class="mr-3"
                                v-on="on"
                                @click="deleteAction(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <span>Delete Asset</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                v-if="item.workorder_id === null"
                                small
                                class="mr-3"
                                v-on="on"
                                @click="woAction(item)">
                                mdi-briefcase-upload
                            </v-icon>
                        </template>
                        <span>Create Work Order</span>
                    </v-tooltip>
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
        AssetInput: () => import('../../components/AssetInput.vue'),
        WorkOrderInput: () => import('../../components/WorkOrderInput.vue')
    },
    data() {
        return {
            asset_id_server: -1,
            wo: false,
            formTitle: '',
            forminput: {
                device_name: null,
                device_brand: null,
                model: '',
                serial_number: '',
                description: '',
                warehouse: null,
                id: 0
            },
            forminputWO: {
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
                {text: 'Description', value: 'description', sortable: false},
                {text: 'Warehouse', value: 'warehousename', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            idselected: -1,
            items: [],
            currentY: 0,
            lastY:0,
            hidden: false,
            timeout: 6000,
            color: '',
            mode: '',
            loading: false
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
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
            this.edit = true
            this.wo = false

            this.formTitle = "Edit Asset"

            this.forminput = {
                id: item.id,
                device_name: {id: item.device_id, name: item.devicename},
                device_brand: {id: item.brand_id, name: item.brandname},
                model: item.model,
                serial_number: item.serial_number,
                description: item.description,
                warehouse: {id: item.warehouse_id, name: item.warehousename}
            }

            this.idselected = this.table.indexOf(item)

            const {dispatch} = this.$store

            dispatch('asset/openDialog')
        },
        woAction(item) {
            this.wo = true

            this.formTitle = "Add Work Order"

            this.forminputWO.asset_id       = item.id
            this.forminputWO.device_name    = item.devicename
            this.forminputWO.brand_name     = item.brandname
            this.forminputWO.model          = item.model
            this.forminputWO.serial_number  = item.serial_number

            const {dispatch} = this.$store

            dispatch('asset/openDialog')
        },
        deleteAction(item) {
            const index = this.items.indexOf(item)
            this.alert = true

            this.asset_id_server = item.id
        },
        closeDialog() {
            const {dispatch} = this.$store
            
            dispatch('asset/closeDialog', false)
        },
        save() {
            if(this.wo) {
                this.submitWorkOrderAPI()
            } else {
                if(this.edit) {
                    this.updateAPI()
                } else {
                    this.submitAPI()
                }
            }
        },
        removeError() {
            const {dispatch} = this.$store
            dispatch('asset/removeError')
        },
        OkButton(){

            const {dispatch} = this.$store

            dispatch('asset/deleteAsset', this.asset_id_server)

            this.alert = false
            this.asset_id_server = -1
            this.idselected = -1
        },
        NoButton() {
            this.idselected = -1
            this.asset_id_server = -1
            this.alert = false
        },
        addAction() {
            this.wo = false
            this.edit = false
            this.formTitle = "Add Asset"
            
            const {dispatch} = this.$store
            dispatch('asset/openDialog')
        },
        getDataFromAPI() {

            const {dispatch} = this.$store
            let {sortBy, sortDesc, page, itemsPerPage} = this.options
            
            if(sortBy.length > 0) {
                this.sortbylast = sortBy
            }

            if(sortDesc.length === 1) {
                this.sorting = !sortDesc[0] ? "ASC" : "DESC"
            }

            dispatch('asset/reqList', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sorting})
        },
        submitWorkOrderAPI() {

            let data = {
                asset: this.forminputWO.asset_id,
                customer: this.forminputWO.customer.id,
                location: this.forminputWO.location.id
            }

            const {dispatch} = this.$store

            dispatch('asset/insertWorkOrder', data)
            
            if(this.$refs.workorderinput) {
                this.$refs.workorderinput.resetForm()
            }
        },
        submitAPI() {

            if(this.$refs.submitpanel) {
                if(!this.$refs.submitpanel.isValid()) return
            }

            let data = {
                device_id:      this.forminput.device_name.id, 
                brand_id:       this.forminput.device_brand.id,
                model:          this.forminput.model,
                serial_number:  this.forminput.serial_number,
                condition_id:   this.forminput.status.id,
                condition_name: this.forminput.status.name,
                description:    this.forminput.description,
                warehouse_id:   this.forminput.warehouse.id,
            }

            const {dispatch} = this.$store

            dispatch('asset/insertAsset', data)

            
            if(this.$refs.submitpanel) {
                this.$refs.submitpanel.resetForm()
            }
        },
        updateAPI() {

            let data = {
                id:             this.forminput.id,
                device_id:      this.forminput.device_name.id,
                brand_id:       this.forminput.device_brand.id,
                model:          this.forminput.model,
                serial_number:  this.forminput.serial_number,
                condition_id:   this.forminput.status.id,
                condition_name: this.forminput.status.name,
                description:    this.forminput.description,
                warehouse_id:   this.forminput.warehouse.id,
            }

            const {dispatch} = this.$store

            dispatch('asset/updateAsset', data)
            
            
            if(this.$refs.submitpanel) {
                this.$refs.submitpanel.resetForm()
            }
        },
        deleteAPI() {
        }
    },
    computed: {
        updateStat() {
            return this.$store.getters['asset/getUpdate']
        },
        table() {
            return this.$store.getters['asset/getList']
        },
        lentable() {
            return this.$store.getters['asset/getTotalItems']
        },
        dialogStat() {
            return this.$store.getters['asset/getDialog']
        },
        isLoading() {
            return this.$store.getters['customer/getLoading']
        },
        errorMsg() {
            return this.$store.getters['customer/getError']
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
        dialogStat: {
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