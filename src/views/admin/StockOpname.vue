<template>
    <v-main>
        <v-container fill-width>
            <v-card>
                <v-card-actions>
                    <v-btn
                        v-if="idStockHistory == 0"
                        @click="createStockOpname()">
                        Create Stock Opname 
                    </v-btn>
                    <div v-else>
                        {{dateStockHistory}}
                    </div>
                </v-card-actions>
            </v-card>
            <div
                v-if="idStockHistory != 0">
                <v-card style="margin:10px" max-width="300">
                    <v-card-title>
                        <span class="headline">Input Stock Opname</span>
                    </v-card-title>
                    <v-card-text>
                        <StockOpnameInput ref="stockinput" :forminput="forminput"/>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <v-btn color="blue darken-1" text @click="close">Cancel</v-btn> -->
                        <v-btn :disabled="selectedId == 0" color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card style="margin:10px">
                    <v-data-table
                    :headers="headers"
                    :items="listStock"
                    :options.sync="options"
                    :server-items-length="lentable"
                    :loading="isLoading"
                    class="elevation-1">
                        <template v-slot:[`item.actions`]="{ item }">
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
                        </template>
                    </v-data-table>
                </v-card>
                <v-btn
                    :disabled="lentable <= 0"
                    block
                    color="primary"
                    @click="submitList">
                    Submit All
                </v-btn>
            </div>
            <Dialog :dialog="alert" :title="`Delete`" :text="`Delete this item?`" v-on:ok="OkButton" v-on:no="NoButton"/>
        </v-container>
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
    </v-main>
</template>

<script>
export default {
    components: {
        StockOpnameInput: () => import('../../components/StockOpnameInput.vue'),
        Dialog: () => import('../../components/Dialog.vue')
    },
    data() {
        return {
            saveAvailable: true,
            headers: [
                {text: 'Device', value: 'devicename', sortable: false},
                {text: 'Brand', value: 'brandname', sortable: false},
                {text: 'Model', value: 'model', sortable: false},
                {text: 'Inventory Code', value: 'serial_number', sortable: false},
                {text: 'Stock Available', value: 'current_stock_available', sortable: false},
                {text: 'Stock in Warehouse', value: 'actual_stock_available', sortable: false},
                {text: 'Stock Difference', value: 'stock_difference', sortable: false},
                {text: 'Description', value: 'description', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            forminput: {
                asset: {
                    assetid: 0,
                    stock_available: 0,
                    devicename: '',
                    brandname: '',
                    serial_number: '',
                    quantity: 0,
                    warehousestock: 0,
                    diffstock: 0,
                    description: ''
                }
            },
            items:[],
            dialogStatus: false,
            edit: false,
            item_selected: null,
            alert: false,
            options: {},
            timeout: 6000,
            color: '',
            mode: '',
        }
    },
    created() {
        this.checkStockOpname()
    },
    methods: {
        removeError() {
            const {dispatch} = this.$store
            dispatch('stockopname/removeError')
        },
        createStockOpname() {
            const {dispatch} = this.$store
            dispatch('stockopname/createStockOpname')
        },
        checkStockOpname() {
            const {dispatch} = this.$store
            dispatch('stockopname/checkStockOpnameHistory')
        },
        OkButton() {
            this.deleteStockHistory(this.item_selected)
            this.alert = false
        },
        deleteAction(item) {
            this.item_selected = item
            this.alert = true
        },
        NoButton() {
            this.alert = false
        },
        close() {
            this.dialogStatus = !this.dialogStatus
        },
        getListAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store
            let {sortBy, sortDesc, page, itemsPerPage} = this.options

            if(sortBy.length > 0) {
                this.sortbylast = sortBy
            }

            if(sortDesc.length === 1) {
                this.sorting = !sortDesc[0] ? "ASC" : "DESC"
            }

            dispatch('stockopname/reqList', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sorting})
        },
        inputStockHistory() {
            if(this.isLoading) return

            const {dispatch} = this.$store
            const {
                assetid,
                stock_available,
                warehousestock,
                diffstock,
                description} = this.$refs.stockinput.stockopnameinput.asset
            const data = {idasset: assetid, stock_available: stock_available, stock_actual: warehousestock, diffstock: diffstock, description: description || ''}
            dispatch('stockopname/inputStock', data)
        },
        submitList() {
            if(this.isLoading) return
            const {dispatch} = this.$store
            dispatch('stockopname/submitListStock')
        },
        deleteStockHistory(item) {
            if(this.isLoading) return

            const {dispatch} = this.$store
            const {
                id_history,
                id_asset} = this.item_selected
            const data = {idhistory: id_history, idasset: id_asset}
            dispatch('stockopname/deleteStock', data)
            this.$refs.stockinput.resetForm()
        },
        save() {
            this.inputStockHistory()

            this.$refs.stockinput.resetForm()
        }
    },
    computed: {
        idStockHistory() {
            return this.$store.getters['stockopname/getIdStockHistory']
        },
        dateStockHistory() {
            return this.$store.getters['stockopname/getDateStockHistory']
        },
        lentable() {
            return this.$store.getters['stockopname/getTotalItems']
        },
        getUpdate() {
            return this.$store.getters['stockopname/getUpdate']
        },
        isLoading() {
            return this.$store.getters['stockopname/getLoading']
        },
        listStock() {
            return this.$store.getters['stockopname/getListStock']
        },
        params() {
            return {
                ...this.options,
                query: this.search
            }
        },
        selectedId() {
            return this.$store.getters['stockopname/getSelectedID']
        },
        errorMsg() {
            return this.$store.getters['stockopname/getError']
        }
    },
    watch: {
        params: {
            handler(val) {
                this.getListAPI()
            },
            deep: true
        },
        options: {
            handler(val) {
                this.getListAPI()
            },
            deep: true
        },
        getUpdate: {
            handler(valnew, valold) {
                if(valnew) {
                    this.getListAPI()
                }
            },
            deep: true
        },
        idStockHistory: {
            handler(valnew, valold) {
            }
        }
    }
}
</script>