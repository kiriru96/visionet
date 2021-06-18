<template>
    <v-form
        ref="form"
        lazy-validation>
        <v-text-field
            v-model="forminput.name"
            label="Name"
            :rules="rulesInput"
            required>
        </v-text-field>
        <v-text-field
            v-model="forminput.username"
            label="Username"
            :rules="rulesInput"
            required>
        </v-text-field>
        <v-text-field
            v-if="edit"
            v-model="forminput.password"
            label="Password"
            :rules="rulesPassword"
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
            rulesInput: [
                (v) => !!v || "Tidak boleh kosong",
                (v) => v && v.length <= 6 || "Harus lebih 6 karakter"
            ],
            rulesPassword: [
                (v) => !!v || "Tidak boleh kosong",
                (v) => v && v.length <= 8 || "Harus lebih dari 8 karakter"
            ]
        }
    }
}
</script>