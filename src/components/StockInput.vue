<template>
    <v-form
        ref="form">
        <v-autocomplete
            >
        </v-autocomplete>
        <v-text-field
            label="Device name">
        </v-text-field>
        <v-text-field
            label="Stock Available">
        <v-text-field
            :label="stockType">
        </v-text-field>
    </v-form>  
</template>

<script>
export default {
    props: {
        stockType: String
    }
}
</script>