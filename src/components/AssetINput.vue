<template>
    <v-form
        v-model="valid"
        ref="form">
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