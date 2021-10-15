<template>
    <v-main>
        <v-container fill-width>
                <v-data-table
                :headers="headers"
                :items="listHistory"
                :options.sync="options"
                :server-items-length="lentable"
                :loading="isLoading"
                class="elevation-1">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    small
                                    class="mr-3"
                                    v-on="on"
                                    @click="printStockOpname(item.id, item.date)">
                                    mdi-printer
                                </v-icon>
                            </template>
                            <span>Print Stock Opname</span>
                        </v-tooltip>
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
                {text: 'Date', value: 'date', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            options: {}
        }
    },
    methods: {
        getListAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store
            let {sortBy, sortDesc, page, itemsPerPage} = this.options

            if(sortBy.length > 0) {
                this.sortbylast = sortBy
            }

            if(sortDesc.length === 1) {
                this.sorting = !sortDesc[0] ? "ASC" : "DESC"
            }

            dispatch('stockopname/reqListHistory', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sorting})
        },
        printStockOpname(id, date) {
            window.open(`https://visionet.xyzcube.xyz/report/stockopname?id=${id}&date=${date}`)
        }
    },
    computed: {
        lentable() {
            return this.$store.getters['stockopname/getLenHistory']
        },
        isLoading() {
            return this.$store.getters['stockopname/getLoadingHistory']
        },
        listHistory() {
            return this.$store.getters['stockopname/getListHistory']
        },
        params() {
            return {
                ...this.options,
                query: this.search
            }
        },
    },
    watch: {
        params: {
            handler(val) {
                this.getListAPI()
            },
            deep: true
        },
        options: {
            handler(val) {
                this.getListAPI()
            },
            deep: true
        },
    }
}
</script>