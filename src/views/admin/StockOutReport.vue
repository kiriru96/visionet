<template>
    <v-main>
        <v-container fill-width>
            <v-date-picker
                full-width
                v-model="dates"
                range>
            </v-date-picker>
            <div class="text-center">
            <v-chip
                class="ma-2">
                From : {{dates[0]}}
            </v-chip>
            <v-chip
                class="ma-2">
                To : {{dates[1] ? dates[1] : "????-??-??"}}
            </v-chip>
            </div>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
        }
    }
}
</script>