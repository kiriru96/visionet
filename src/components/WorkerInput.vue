<template>
    <v-form
        ref="form"
        lazy-validation>
        <v-text-field
            label="`First Name`"
            v-model="forminput.firstname">
        </v-text-field>
        <v-text-field
            label="`Last Name`"
            v-model="forminput.lastname">
        </v-text-field>
        <v-autocomplete
            v-model="forminput.location">
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

        }
    }
}
</script>