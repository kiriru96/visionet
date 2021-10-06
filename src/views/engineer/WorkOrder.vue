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
            <v-list-item
                style="margin: 5px"
                v-model="lists"
                v-for="item in lists"
                :key="item.id"
                @click="$router.push({path: '/engineer/submitwo', query: {id: item.id}})">
                <v-list-item-avatar>
                    <v-icon class="grey lighten-1" dark>
                        mdi-folder
                    </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-text="item.devicename"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.customername"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-spacer></v-spacer>
            <v-btn
                v-show="lists.length > 0"
                color="primary"
                style="margin-top: 30px"
                block
                @click="nextList">
                Load More
            </v-btn>
            <v-snackbar
            :value="errorMsg"
            :color="color"
            :multi-line="mode === 'multi-line'"
            :timeout="timeout"
            :vertical="mode === 'vertical'"
            >
                {{ errorMsg }}
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-btn
                    dark
                    text
                    @click="removeError()">
                    Close
                </v-btn>
            </v-snackbar>
        </v-container>
    </v-main>
</template>

<script>
export default {
    mounted() {
        this.page = 1

        this.requestListAPI()
    },
    data() {
        return {
            page: 1,
            menu: false,
            timeout: 6000,
            color: '',
            mode: '',
        }
    },
    methods: {
        dateChange(date) {
            this.$refs.menu.save(date)

            this.menu = false
            this.requestListAPI()
        },
        nextList() {
            if(this.isLoading) return

            this.page += 1
            this.nextListAPI()
        },
        requestListAPI() {
            this.page = 1
            if(this.isLoading) return

            const {dispatch} = this.$store

            dispatch('engineerpage/reqList', {date: this.date, page: this.page})
        },
        nextListAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            dispatch('engineerpage/nextList', {date: this.date, page: this.page})
        },
        removeError() {
            const {dispatch} = this.$store

            dispatch('engineerpage/removeError')
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters['engineerpage/getLoading']
        },
        lists() {
            return this.$store.getters['engineerpage/getList']
        },
        errorMsg() {
            return this.$store.getters['engineerpage/getError']
        },
        date: {
            get() {
                return this.$store.getters['engineerpage/getDateWO']
            },
            set(val) {
                const {dispatch} = this.$store
                dispatch('engineerpage/updateDateWO', val)
            }
        }
    },
    watch: {
    }
}
</script>