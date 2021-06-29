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
                        label="List from date"
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
            <v-list-item
                v-model="lists"
                v-for="item in lists"
                :key="item.id"
                @click="$router.push({path: '/woconfirm', query: {id: item.id}})">
                <v-list-item-avatar>
                    <v-icon class="grey lighten-1" dark>
                        mdi-briefcase
                    </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-text="item.devicename"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.customername"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-btn
                style="margin-top: 30px"
                block
                @click="nextList">
                Next
            </v-btn>
        </v-container>
    </v-main>
</template>

<script>
export default {
    mounted() {
        this.page = 1
        this.date = new Date().toISOString().substr(0, 10)

        this.requestListAPI()
    },
    data() {
        return {
            page: 1,
            menu: false,
            date: '',
        }
    },
    methods: {
        dateChange(date) {
            this.$refs.menu.save(date)
            this.page = 1
            this.menu = false
            this.requestListAPI(false)
        },
        nextList() {
            this.page += 1
            
            const {dispatch} = this.$store

            dispatch('wo/nextListHistory', {date: this.date, page: this.page})
        },
        requestListAPI(next) {
            if(this.isLoading) return

            const {dispatch} = this.$store

            dispatch('wo/reqListHistory', {date: this.date, page: this.page, next})
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters['wo/getLoading']
        },
        lists() {
            return this.$store.getters['wo/getList']
        },
        errorMsg() {
            return this.$store.getters['wo/getError']
        }
    }
}
</script>