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
            :rules="autocompleteRules"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            hide-details
            return-object
            label="Device Name"
            hint="Type more than 3 character"
            required>
        </v-autocomplete>
        <v-autocomplete
            v-model="forminput.device_brand"
            :loading="loadingbrand"
            :items="listDeviceBrand"
            :search-input.sync="search_brand"
            :rules="autocompleteRules"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            return-object
            hide-details=""
            label="Device Brand"
            hint="Type more than 3 character"
            required>
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
        <v-textarea
            v-model="forminput.description"
            :counter="300"
            :rules="inputRules"
            label="Description"
            class="mx-3"
            required>
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
            selectRules: [
                v => !!v || 'You must select an item'
            ],
            autocompleteRules: [
                v => !!v || 'You must select an item'
            ],
            valid: false,
            inputRules: [
                v => !!v || 'Tidak boleh kosong',
                v => v && v.length >= 1 || "Input harus diisi"
            ],
            search_device: "",
            search_brand: ""
        }
    },
    mounted() {
        const {dispatch} = this.$store

        dispatch('asset/searchCondition')
        
        if(this.forminput.device_name) {
            this.search_device = this.forminput.device_name.name
        }

        if(this.forminput.device_brand) {
            this.search_brand  = this.forminput.device_brand.name
        }
    },
    methods: {
        resetForm() {
            this.$refs.form.reset()
        },
        isValid() {
            return this.$refs.form.validate()
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
        loadingbrand() {
            return this.$store.getters['asset/getLoadingBrand']
        },
        loadingdevice() {
            return this.$store.getters['asset/getLoadingDevice']
        },
        loadingwarehouse() {
            return this.$store.getters['asset/getLoadingWarehouse']
        }
    },
    watch: {
        search_device(val) {
            if(val?.trim().length >= 2) {
                const {dispatch} = this.$store
                dispatch('asset/searchDevice', val)
            }
        },
        search_brand(val) {
            if(val?.trim().length >= 2) {
                const {dispatch} = this.$store
                dispatch('asset/searchBrand', val)
            }
        }
    }
}
</script>
