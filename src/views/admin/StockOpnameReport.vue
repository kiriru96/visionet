<template>
    <v-main>
        <v-container fill-width>
            <v-date-picker
                full-width
                v-model="dates">
            </v-date-picker>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            dates: new Date().toISOString().substr(0, 10),
            items: []
        }
    },
}
</script>