<template>
    <v-main>
        <v-container fill-width>
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="mdi-calender"
                        readonly
                        v-bind="attrs"
                        v-on="on">
                    </v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    no-title
                    scrollable>
                    <v-spacer></v-spacer>
                    <v-btn 
                        text
                        color="primary"
                        @click="menu = false">
                        Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="dateChange(date)">
                        Ok
                    </v-btn>
                </v-date-picker>
            </v-menu>
            <v-tabs
                background-color="primary"
                v-model="tab"
                class="elevation-2"
                dark
                :centered="centered"
                :grow="grow"
                :vertical="vertical"
                :right="right">
                <v-tabs-slider></v-tabs-slider>
                <v-tab
                    @click="onProgress">
                    Progress
                </v-tab>
                <v-tab
                    @click="onDone">
                    Done
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card
                    flat
                    tile
                    >
                    <v-card-text>Progress</v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card
                    flat
                    tile
                    >
                    <v-card-text>Done</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </v-main>
</template>

<script>
export default {
    mounted() {
        this.page = 1
        this.date = new Date().toISOString().substr(0, 10)
    },
    data() {
        return {
            tabselected: 'progress',
            centered: true,
            grow: true,
            vertical: false,
            right: false,
            tab: null,
            page: 1,
            menu: false,
            date: '',
        }
    },
    methods: {
        onProgress() {
            if(this.tabselected === 'progress') return
            this.tabselected = 'progress'
            console.log('Progress Bar')
        },
        onDone() {
            if(this.tabselected === 'done') return
            this.tabselected = 'done'
            console.log('Done Bar')
        }
    }
}
</script>