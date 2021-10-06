<template>
    <v-form
        ref="form"
        lazy-validation
        v-model="valid">
        <v-autocomplete
            v-model="stockinput.asset"
            :loading="isLoading"
            :items="assetList"
            :search-input.sync="search_asset"
            item-text="devicename"
            item-value="assetid"
            return-object
            class="mx-3"
            label="Inventory Code">
            <template v-slot:selection="data">
                <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected">
                   {{data.item.serial_number}} | {{data.item.devicename}}
                </v-chip>
            </template>
            <template v-slot:item="data">
                <v-list-item-content>
                    <v-list-item-title>{{data.item.devicename}}</v-list-item-title>
                    <v-list-item-subtitle>Code : {{data.item.serial_number}}</v-list-item-subtitle>
                    <v-list-item-subtitle>Brand : {{data.item.brandname}}</v-list-item-subtitle>
                    <v-list-item-subtitle>Model : {{data.item.model}}</v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </v-autocomplete>
        <v-text-field
            v-model="stockinput.asset.devicename"
            label="Device name"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="stockinput.asset.stock_available"
            label="Stock Available"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="stockinput.asset.model"
            label="Model"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="stockinput.asset.quantity"
            label="Quantity"
            class="mx-3">
        </v-text-field>
    </v-form>  
</template>

<script>
export default {
    props: {
        forminput: Object
    },
    data() {
        return {
            valid: true,
            stockinput: this.forminput,
            search_asset: '',
            serial_number: ''
        }
    },
    methods: {
        resetForm() {
            this.stockinput = {
                asset: {
                    assetid: 0,
                    stock_available: 0,
                    devicename: '',
                    brandname: '',
                    serial_number: '',
                    quantity: 0
                }
            }
        }
    },
    computed: {
        assetList() {
            return this.$store.getters['stockin/getListAsset']
        },
        isLoading() {
            return this.$store.getters['stockin/getLoadingAsset']
        }
    },
    watch: {
        search_asset(val) {
            if(val?.trim().length >= 2) {
                const {dispatch} = this.$store
                dispatch('stockin/searchAsset', val)
            }
        },
        assetList: {
            handler(newdata, olddata) {
                
            },
            deep: true
        },
        stockinput:  {
            handler(newdata, olddata) {
                if(newdata.asset === null) {
                    this.stockinput = {
                        asset: {
                            assetid: 0,
                            stock_available: 0,
                            devicename: '',
                            brandname: '',
                            serial_number: '',
                            quantity: 0
                        }
                    }
                }
            },
            deep: true
        }
    }
}
</script>