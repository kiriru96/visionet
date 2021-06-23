<template>
    <v-form
        ref="form"
        lazy-validation
        v-model="valid">
        <v-autocomplete
            v-model="stockopnameinput.asset"
            :loading="isLoading"
            :items="assetList"
            :search-input.sync="search_asset"
            item-text="serial_number"
            item-value="assetid"
            cache-items
            return-object
            class="mx-3"
            label="Inventory Code">
            <template v-slot:item="data">
                <v-list-item-content>
                    <v-list-item-title>{{data.item.devicename}}</v-list-item-title>
                    <v-list-item-subtitle>{{data.item.serial_number}} {{data.item.brandname}}</v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </v-autocomplete>
        <v-text-field
            v-model="stockopnameinput.asset.devicename"
            label="Device name"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="stockopnameinput.asset.stock_available"
            label="Stock Available"
            class="mx-3"
            disabled
            single-line
            type="number">
        </v-text-field>
        <v-text-field
            v-model="stockopnameinput.asset.warehousestock"
            label="Stock in warehouse"
            class="mx-3"
            single-line
            type="number"
            required>
        </v-text-field>
        <v-text-field
            v-model="stockopnameinput.asset.diffstock"
            label="Stock Difference"
            class="mx-3"
            disabled
            single-line
            type="number">
        </v-text-field>
        <v-textarea
            v-model="stockopnameinput.asset.description"
            label="Description"
            class="mx-3">
        </v-textarea>
    </v-form>  
</template>

<script>
export default {
    props: {
        forminput: Object
    },
    data() {
        return {
            warehousestock: 0,
            valid: true,
            stockopnameinput: this.forminput,
            search_asset: '',
            serial_number: ''
        }
    },
    methods: {
        resetForm() {
            const {dispatch} = this.$store
            dispatch('stockopname/submitIdSelected', 0)

            this.stockopnameinput = {
                asset: {
                    assetid: 0,
                    stock_available: 0,
                    devicename: '',
                    brandname: '',
                    serial_number: '',
                    warehousestock: 0,
                    diffstock: 0,
                    description: ''
                }
            }
        }
    },
    computed: {
        assetList() {
            return this.$store.getters['stockopname/getListAsset']
        },
        isLoading() {
            return this.$store.getters['stockopname/getLoadingAsset']
        }
    },
    watch: {
        search_asset(val) {
            if(val?.trim().length >= 2) {
                const {dispatch} = this.$store
                dispatch('stockopname/searchAsset', val)
            }
        },
        assetList: {
            handler(newdata, olddata) {
            },
            deep: true
        },
        stockopnameinput: {
            handler(newdata, olddata) {
                if(newdata.asset.assetid) {
                    const {dispatch} = this.$store
                    dispatch('stockopname/submitIdSelected', newdata.asset.assetid)
                }
                let diffdata = parseInt(newdata.asset.warehousestock) - parseInt(newdata.asset.stock_available)
                this.stockopnameinput.asset.diffstock = diffdata
            },
            deep: true
        },
        stockinput:  {
            handler(newdata, olddata) {
                if(newdata.asset === null) {
                    this.stockopnameinput = {
                        asset: {
                            assetid: 0,
                            stock_available: 0,
                            devicename: '',
                            brandname: '',
                            serial_number: '',
                            warehousestock: 0,
                            diffstock: 0,
                            description: ''
                        }
                    }
                }
            },
            deep: true
        }
    }
}
</script>