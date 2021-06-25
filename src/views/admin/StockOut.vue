<template>
    <v-main>
        <v-container fill-width>
            <v-card style="margin:10px" max-width="300">
                <v-card-title>
                    <span class="headline">Input Stock Out</span>
                </v-card-title>
                <v-card-text>
                    <StockInput ref="stockinput" :forminput="forminput"/>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- <v-btn color="blue darken-1" text @click="close">Cancel</v-btn> -->
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
            <v-card style="margin:10px">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    No
                                </th>
                                <th class="text-left">
                                    Device Name
                                </th>
                                <th class="text-left">
                                    Quantity
                                </th>
                                <th class="text-left">
                                    Opsi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, i) in listStock"
                                :key="i">
                                <td>{{i+1}}</td>
                                <td>{{item.devicename}}</td>
                                <td>{{item.quantity}}</td>
                                <td><v-icon @click="remove(item)">mdi-delete</v-icon></td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-btn
                :disabled="listStock.length <= 0"
                block
                color="primary"
                @click="submitList">
                Submit All
            </v-btn>
            <Dialog :dialog="alert" :title="`Delete`" :text="`Delete this item?`" v-on:ok="OkButton" v-on:no="NoButton"/>
        </v-container>
    </v-main>
</template>

<script>
export default {
    components: {
        StockInput: () => import('../../components/StockInput.vue'),
        Dialog: () => import('../../components/Dialog.vue')
    },
    created() {
        this.getListAPI()
    },
    data() {
        return {
            forminput: {
                asset: {
                    assetid: 0,
                    stock_available: 0,
                    devicename: '',
                    brandname: '',
                    serial_number: '',
                    quantity: 0
                }
            },
            items:[],
            dialogStatus: false,
            edit: false,
            item_selected: null,
            alert: false
        }
    },
    methods: {
        OkButton() {
            this.deleteStockHistory(this.item_selected)
            this.alert = false
        },
        remove(item) {
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

            dispatch('stockin/reqHistoryStockOut')
        },
        inputStockHistory() {
            if(this.isLoading) return

            const {dispatch} = this.$store
            const {
                assetid,
                quantity} = this.$refs.stockinput.stockinput.asset
            const data = {assetid: assetid, quantity: quantity}
            dispatch('stockin/inputStockOut', data)
        },
        submitList() {
            if(this.isLoading) return
            const {dispatch} = this.$store
            dispatch('stockin/submitListStockOut')
        },
        deleteStockHistory(item) {
            if(this.isLoading) return

            const {dispatch} = this.$store
            const {
                assetid} = item
            const data = {assetid: assetid}
            dispatch('stockin/deleteStockOut', data)
        },
        save() {
            this.inputStockHistory()

            this.$refs.stockinput.resetForm()
        }
    },
    computed: {
        getUpdate() {
            return this.$store.getters['stockin/getUpdate']
        },
        isLoading() {
            return this.$store.getters['stockin/getLoading']
        },
        listStock() {
            return this.$store.getters['stockin/getListStock']
        }
    },
    watch: {
        getUpdate: {
            handler(valnew, valold) {
                if(valnew) {
                    this.getListAPI()
                }
            },
            deep: true
        }
    }
}
</script>