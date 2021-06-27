<template>
    <v-form
        ref="form"
        lazy-validation>
        <v-text-field
            v-model="forminput.fullname"
            label="Name"
            required>
        </v-text-field>
        <v-text-field
            v-if="!edit"
            v-model="forminput.username"
            label="Username"
            required>
        </v-text-field>
        <v-text-field
            v-if="!edit"
            v-model="forminput.password"
            :rules="rulesPassword"
            label="Password"
            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpass ? 'text' : 'password'"
            @click:append="showpass = !showpass"
            autocomplete="new-password"
            required>
        </v-text-field>
    </v-form>
</template>

<script>
export default {
    props: {
        forminput: Object,
        edit: Boolean
    },
    data() {
        return {
            showpass: false,
            rulesInput: [
                (v) => !!v || "Tidak boleh kosong",
                (v) => v && v.length >= 6 || "Harus lebih 6 karakter"
            ],
            rulesPassword: [
                (v) => !!v || "Tidak boleh kosong",
                (v) => v && v.length >= 6 || "Harus lebih dari 8 karakter"
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
    }
}
</script>