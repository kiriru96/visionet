<template>
    <v-main>
        <v-container fluid fill-height>
            <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Work Order</v-toolbar-title>
                        <v-divider inset vertical></v-divider>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </template>
            </v-data-table>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {text: '', value: ''},
                {text: '', value: ''}
            ],
            items: []
        }
    }
}
</script>