<template>
    <v-content>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <v-text-field
                v-model="inputName"
                :counter="10"
                :rules="inputRules"
                label="`${content}`"
                required>
            </v-text-field>
            <v-btn color="primary" @click="submitContent" :loading="isLoading" :disabled="isLoading">Submit</v-btn>
        </v-form>
    </v-content>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            inputName: '',
            valid: true,
            inputRules: [
                v => !!v || 'Tidak boleh kosong',
                v => v && v.length >= 1 || "Input harus diisi"
            ]
        }
    },
    methods: {
        submitContent() {
            const {inputName} = this

            if(this.$ref.form.validate()) {
                
            }
        }
    },
    computed: {
        isLoading() {
            return false;
        }
    }
}
</script>