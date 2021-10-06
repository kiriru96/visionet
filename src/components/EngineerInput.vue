<template>
    <v-form
        ref="form"
        v-model="valid">
        <v-autocomplete
            v-model="forminput.engineer"
            :loading="isLoading"
            :items="listEngineer"
            :search-input.sync="search_engineer"
            item-text="username"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            return-object
            label="Engineer">
            <template v-slot:item="data">
                <v-list-item-content>
                    <v-list-item-title>{{data.item.username}}</v-list-item-title>
                    <v-list-item-subtitle>{{data.item.first_name}} {{data.item.last_name}}</v-list-item-subtitle>
                </v-list-item-content>
            </template>
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
            valid: true,
            inputRules: [
                v => !!v || 'Tidak boleh kosong',
                v => v && v.length >= 1 || "Input harus diisi",
                v => v && v.length <= 50 || "Tidak boleh lebih dari 50 karakter"
            ],
            search_engineer: ''
        }
    },
    methods: {
    },
    computed: {
        isLoading() {
            return this.$store.getters['wo/getLoading'];
        },
        listEngineer() {
            return this.$store.getters['wo/getLightSearchEngineer']
        }
    },
    watch: {
        search_engineer(val) {
            if(val?.trim().length >= 2) {
                const {dispatch} = this.$store
                dispatch('wo/searchEngineer', val)
            }
        }
    }
}
</script>