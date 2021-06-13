<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-autocomplete
            v-model="forminput.device_name"
            :loading="loadingdevice"
            :items="listDeviceName"
            :search-input.sync="search_device"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            hide-details
            return-object
            label="Device Name"
            hint="Type more than 3 character">
        </v-autocomplete>
        <v-autocomplete
            v-model="forminput.device_brand"
            :loading="loadingbrand"
            :items="listDeviceBrand"
            :search-input.sync="search_brand"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            return-object
            hide-details=""
            label="Device Brand"
            hint="Type more than 3 character">
        </v-autocomplete>
        <v-text-field
            v-model="forminput.model"
            :counter="50"
            :rules="inputRules"
            label="Model"
            class="mx-3"
            required>
        </v-text-field>
        <v-text-field
            v-model="forminput.serial_number"
            :counter="50"
            :rules="inputRules"
            label="Serial Number"
            class="mx-3"
            required>
        </v-text-field>
        <v-select
            v-model="forminput.status"
            :items="statusList"
            item-text="name"
            item-value="id"
            label="Status"
            class="mx-3"
            return-object
            single-line>
        </v-select>
        <v-textarea
            v-model="forminput.description"
            :counter="300"
            :rules="inputRules"
            label="Description"
            class="mx-3"
            required>
        </v-textarea>
        <v-autocomplete
            v-model="forminput.warehouse"
            :loading="loadingwarehouse"
            :items="listWarehouse"
            :search-input.sync="search_warehouse"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            hide-details=""
            return-object
            label="Warehouse">
        </v-autocomplete>
    </v-form>
</template>

<script>
export default {
    props: {
        forminput: Object
    },
    data() {
        return {
            valid: false,
            inputRules: [
                v => !!v || 'Tidak boleh kosong',
                v => v && v.length >= 1 || "Input harus diisi"
            ],
            search_device: "",
            search_brand: "",
            search_warehouse: "",
        }
    },
    mounted() {
        const {dispatch} = this.$store

        dispatch('asset/searchCondition')
        
        this.search_device = this.forminput.device_name.name
        this.search_brand  = this.forminput.device_brand.name
        this.search_warehouse = this.forminput.warehouse.name
    },
    methods: {
        resetForm() {
            this.$refs.form.reset()
        }
    },
    computed: {
        listDeviceName() {
            let fakelist = []

            if(this.forminput.device_name) {
                fakelist.push(this.forminput.device_name)
            }

            let list = this.$store.getters['asset/getListLightDevice']
            return list.length === 0 ? fakelist : list
        },
        listDeviceBrand() {
            let fakelist = []

            if(this.forminput.device_brand) {
                fakelist.push(this.forminput.device_brand)
            }

            let list = this.$store.getters['asset/getListLightBrand']
            return list.length === 0 ? fakelist : list
        },
        listWarehouse() {
            let fakelist = []

            if(this.forminput.warehouse) {
                fakelist.push(this.forminput.warehouse)
            }

            let list = this.$store.getters['asset/getListLightWarehouse']
            return list.length === 0 ? fakelist : list
        },
        loadingbrand() {
            return this.$store.getters['asset/getLoadingBrand']
        },
        loadingdevice() {
            return this.$store.getters['asset/getLoadingDevice']
        },
        loadingwarehouse() {
            return this.$store.getters['asset/getLoadingWarehouse']
        },
        statusList() {
            return this.$store.getters['asset/getConditions']
        }
    },
    watch: {
        search_device(val) {
            if(val?.trim().length >= 3) {
                const {dispatch} = this.$store
                dispatch('asset/searchDevice', val)
            }
        },
        search_brand(val) {
            if(val?.trim().length >= 3) {
                const {dispatch} = this.$store
                dispatch('asset/searchBrand', val)
            }
        },
        search_warehouse(val) {
            if(val?.trim().length >= 3) {
                const {dispatch} = this.$store
                dispatch('asset/searchWarehouse', val)
            }
        }
    }
}
</script>
