<template>
    <v-form
        ref="form">
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
            label="Location">
        </v-autocomplete>
    </v-form>
</template>
<script>
export default {
    props: {
        forminputWO: Object
    },
    data() {
        return {
            search_customer: '',
            search_location: ''
        }
    },
    watch: {
        search_customer(val) {
            if(val?.trim().length >= 3) {
                const {dispatch} = this.$store
                dispatch('asset/searchCustomer', val)
            }
        },
        search_location(val) {
            if(val?.trim().length >= 3) {
                const {dispatch} = this.$store
                dispatch('asset/searchLocation', val)
            }
        }
    }
}
</script>