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
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  type="month"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
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
                    <v-list-item
                        three-line
                        style="margin: 5px"
                        v-model="listProgress"
                        v-for="item in listProgress"
                        :key="item.id"
                        @click="$router.push({path: '/engineer/revisiwo', query: {id: item.id}})">
                        <v-list-item-avatar>
                            <v-icon class="grey lighten-1" dark>
                                mdi-folder
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.customername"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.devicename"></v-list-item-subtitle>
                            <v-list-item-subtitle>Model : {{ item.assetmodel }} | Serial Number : {{ item.assetserialnumber }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-btn
                        v-show="listProgress.length > 0"
                        block
                        color="primary"
                        @click="nextClose">
                        Load more
                    </v-btn>
                </v-tab-item>
                <v-tab-item>
                    <v-list-item
                        three-line
                        style="margin: 5px"
                        v-model="listClose"
                        v-for="item in listClose"
                        :key="item.id"
                        @click="$router.push({path: '/wosubmitdetail', query: {id: item.id}})">
                        <v-list-item-avatar>
                            <v-icon class="grey lighten-1" dark>
                                mdi-folder
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.customername"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.devicename"></v-list-item-subtitle>
                            <v-list-item-subtitle>Model : {{ item.assetmodel }} | Serial Number : {{ item.assetserialnumber }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-btn
                        v-show="listClose.length > 0"
                        block
                        color="primary"
                        @click="nextClose">
                        Load more
                    </v-btn>
                </v-tab-item>
            </v-tabs-items>
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
                    @click="removeError()"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </v-container>
    </v-main>
</template>

<script>
export default {
    mounted() {
        this.page_progress = 1
        this.page_close = 1

        this.getListAPI(1)
    },
    data() {
        return {
            tabselected: 'progress',
            centered: true,
            grow: true,
            vertical: false,
            right: false,
            tab: null,
            page_progress: 1,
            page_close: 1,
            menu: false,
            last_date: '',
            timeout: 6000,
            color: '',
            mode: '',
        }
    },
    methods: {
        dateChange(date) {
            this.$refs.menu.save(date)
            this.menu = false
            const {dispatch} = this.$store
            if(this.tabselected === 'progress') {
                this.getListAPI(1)
                dispatch('engineerpage/removeListClose')
            } else {
                this.getListAPI(2)
                dispatch('engineerpage/removeListProgress')
            }
        },
        removeError() {
            const {dispatch} = this.$store

            dispatch('engineerpage/removeError')
        },
        onProgress() {
            if(this.tabselected === 'progress' || this.listProgress.length > 0) return
            this.tabselected = 'progress'
            
            this.getListAPI(1)
        },
        onDone() {
            if(this.tabselected === 'done' || this.listClose.length > 0) return
            this.tabselected = 'done'

            this.getListAPI(2)
        },
        nextProgress() {
            this.page_progress += 1

            const {dispatch} = this.$store

            dispatch('engineerpage/nextListProgress', {date: this.date, page: this.page_progress})
        },
        nextClose() {
            this.page_close += 1

            const {dispatch} = this.$store

            dispatch('engineerpage/nextListClose', {date: this.date, page: this.page_close})
        },
        getListAPI(type) {
            if(type === 1) {
                this.page_progress = 1
                
                const {dispatch} = this.$store

                dispatch('engineerpage/reqListProgress', {date: this.date, page: this.page_progress})
            } else {
                this.page_close = 1
                
                const {dispatch} = this.$store

                dispatch('engineerpage/reqListClose', {date: this.date, page: this.page_close})
            }
        }
    },
    computed: {
        listProgress() {
            return this.$store.getters['engineerpage/getListProgress']
        },
        listClose() {
            return this.$store.getters['engineerpage/getListClose']
        },
        loadingListProgress() {
            return this.$store.getters['engineerpage/getLoadingListProgress']
        },
        loadingListClose() {
            return this.$store.getters['engineerpage/getLoadingListClose']
        },
        errorMsg() {
            return this.$store.getters['engineerpage/getError']
        },
        date: {
            get() {
                return this.$store.getters['engineerpage/getDateHistory']
            },
            set(val) {
                const {dispatch} = this.$store
                dispatch('engineerpage/updateDateHistory', val)
            }
        }
    }
}
</script>