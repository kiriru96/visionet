<template>
    <v-form
        ref="form"
        v-model="valid">
        <v-autocomplete
            v-model="forminput.engginer"
            :loading="isLoading"
            :items="listEngginer"
            :search-input.sync="search_engginer"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            return-object
            label="Engginer">
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