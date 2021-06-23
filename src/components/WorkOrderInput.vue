<template>
    <v-form
        ref="form">
        <v-text-field
            v-if="edit"
            v-model="forminputWO.wo_id"
            label="ID Work Order"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="forminputWO.asset_id"
            label="ID Asset"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="forminputWO.device_name"
            label="Device name"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="forminputWO.brand_name"
            label="Brand name"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="forminputWO.model"
            label="Model"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            v-model="forminputWO.serial_number"
            label="Serial Number"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-autocomplete
            v-model="forminputWO.customer"
            :loading="loadingCustomer"
            :items="listCustomer"
            :search-input.sync="search_customer"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            return-object
            label="Customer">
        </v-autocomplete>
        <v-autocomplete
            v-model="forminputWO.location"
            :loading="loadingLocation"
            :items="listLocation"
            :search-input.sync="search_location"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            return-object
            label="Location">
        </v-autocomplete>
    </v-form>
</template>
<script>
export default {
    props: {
        forminputWO: Object,
        edit: Boolean
    },
    data() {
        return {
            search_customer: '',
            search_location: ''
        }
    },
    methods: {
        resetForm() {
            this.$refs.form.reset()
        }
    },
    mounted() {
        this.search_customer = this.forminputWO.customer.name
        this.search_location = this.forminputWO.location.name
    },
    computed: {
        listLocation() {
            return this.$store.getters['workorder/getListLightLocation']
        },
        listCustomer() {
            return this.$store.getters['workorder/getListLightCustomer']
        },
        loadingLocation() {
            return this.$store.getters['workorder/getLoadingLocation']
        },
        loadingCustomer() {
            return this.$store.getters['workorder/getLoadingCustomer']
        }
    },
    watch: {
        search_customer(val) {
            if(val?.trim().length >= 2) {
                const {dispatch} = this.$store
                dispatch('workorder/searchCustomer', val)
            }
        },
        search_location(val) {
            if(val?.trim().length >= 2) {
                const {dispatch} = this.$store
                dispatch('workorder/searchLocation', val)
            }
        }
    }
}
</script>