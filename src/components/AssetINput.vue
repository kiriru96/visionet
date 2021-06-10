<template>
    <v-form
        v-model="valid"
        ref="form">
        <v-autocomplete></v-autocomplete>
        <v-autocomplete></v-autocomplete>
        <v-text-field></v-text-field>
        <v-text-field></v-text-field>
        <v-combobox></v-combobox>
        <v-textarea></v-textarea>
        <v-autocomplete></v-autocomplete>
    </v-form>
</template>

<script>
export default {
    props: {
        forminput: Object
    },
    data() {
        return {
            valid: false
        }
    }
}
</script>