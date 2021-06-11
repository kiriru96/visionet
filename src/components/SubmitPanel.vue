<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field
            ref="name"
            v-model="forminput.name"
            :counter="50"
            :rules="inputRules"
            label="Nama"
            required>
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
            inputRules: [
                v => !!v || 'Tidak boleh kosong',
                v => v && v.length >= 1 || "Input harus diisi",
                v => v && v.length <= 50 || "Tidak boleh lebih dari 50 karakter"
            ]
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
        isLoading() {
            return false;
        }
    }
}
</script>