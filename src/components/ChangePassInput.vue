<template>
    <v-form
        ref="form"
        lazy-validation>
        <v-text-field
            ref="username"
            label="Username"
            v-model="forminput.username"
            class="mx-3"
            disabled>
        </v-text-field>
        <v-text-field
            ref="password"
            label="Password"
            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpass ? 'text' : 'password'"
            v-model="forminput.password"
            @click:append="showpass = !showpass"
            autocomplete="new-password"
            class="mx-3">
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
            showpass: false
        }
    },
    methods: {
        isValid() {
            return this.$refs.form.validate()
        }
    }
}
</script>