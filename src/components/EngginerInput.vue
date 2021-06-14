<template>
    <v-form
        ref="form"
        v-model="valid">
        <v-autocomplete
            v-model="forminput.engginer"
            :loading="isLoading"
            :items="listEngginer"
            :search-input.sync="search_engginer"
            item-text="username"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            return-object
            label="Engginer">
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
            search_engginer: ''
        }
    },
    methods: {
    },
    computed: {
        isLoading() {
            return this.$store.getters['wo/getLoading'];
        },
        listEngginer() {
            return this.$store.getters['wo/getLightSearchEngginer']
        }
    },
    watch: {
        search_engginer(val) {
            if(val?.trim().length >= 3) {
                const {dispatch} = this.$store
                dispatch('wo/searchEngginer', val)
            }
        }
    }
}
</script>