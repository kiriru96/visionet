<template>
    <v-main>
        <v-container fill-width>
            <v-card>
                <v-row
                    no-gutters
                    style="height: 150px">
                    <v-col>
                        <v-card
                            style="margin: 5px"  
                            class="pa-2"
                            color="#26c6da"
                            dark
                            outlined>
                            <v-card-title class="text-h5">
                            All Stock
                            </v-card-title>
                            <v-card-subtitle>
                                {{getDetailStock.quantity_all}}
                            </v-card-subtitle>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card
                            style="margin: 5px"  
                            class="pa-2"
                            color="#26c6da"
                            dark
                            outlined>
                            <v-card-title class="text-h5">
                            Stock In
                            </v-card-title>
                            <v-card-subtitle>
                                {{getDetailStock.quantity_in}}
                            </v-card-subtitle>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card
                            style="margin: 5px"  
                            class="pa-2"
                            color="#26c6da"
                            dark
                            outlined>
                            <v-card-title class="text-h5">
                            Stock Out
                            </v-card-title>
                            <v-card-subtitle>
                                {{getDetailStock.quantity_out}}
                            </v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
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
                            class="mx-12">
                        </v-text-field>
                    </v-toolbar>
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
                
                {text: 'Device', value: 'devicename', sortable: false},
                {text: 'Brand', value: 'brandname', sortable: false},
                {text: 'Model', value: 'model', sortable: false},
                {text: 'Serial Number', value: 'serial_number', sortable: false},
                {text: 'Description', value: 'description', sortable: false},
                {text: 'Stock In', value: 'stock_in', sortable: false},
                {text: 'Stock Out', value: 'stock_out', sortable: false},
                {text: 'Available Stock', value: 'stock_available', sortable: false}
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
        this.detailStockAPI()
    },
    destroyed () {
        
    },
    methods: {
        removeError() {
            const {dispatch} = this.$store
            dispatch('asset/removeError')
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
        detailStockAPI() {
            const {dispatch} = this.$store

            dispatch('asset/getDetailStock')
        }
    },
    computed: {
        getDetailStock() {
            return this.$store.getters['asset/getDetailStock'] || {
                quantity_all: 0,
                quantity_in: 0,
                quantity_out: 0
            }
        },
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