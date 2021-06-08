<template>
    <v-container fluid fill-width>
        <v-dialog persistent v-model="dialogStatus" max-width="500px">
            <v-card>
                <v-alert
                    :value="errorMsg"
                    dismissible
                    color="error">
                    {{errorMsg}}
                </v-alert>
                <v-card-title>
                    <span class="headline">{{formTitle}}</span>
                </v-card-title>

                <v-card-text>
                    
                </v-card-text>
            </v-card>
        </v-dialog>
        <Dialog :dialog="alert" :title="Delete" :text="`Are you sure delete this?`" v-on:ok="OkButton" v-on:no="NoButton"/>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editAction(item)">
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    class="mr-2"
                    @click="deleteAction(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
export default {
    components: {
        AssetInput: () => import('@components/AssetInput'),
        Dialog: () => import('@components/Dialog')
    },
    data() {
        return {
            alert: false,
            idselected: -1,
            search: '',
            headers: [
                {text: 'ID', value: 'id', sortable: false},
                {text: 'Name', value: 'name', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            items: [],
            sortbylast: null,
            sorting: "ASC",
            editedIndex: -1,
            formInput: {
                id: -1,
                name: ''
            },
            formTitle: 'Brand'
        }
    },
    created () {
        this.initialize()
    },
    methods: {
        editAction(item) {
            const {id, name} = item
            this.editedIndex = -1
            this.formInput = {
                id : id,
                name: name
            }

            this.formTitle = 'Edit Brand'
            const {dispatch} = this.$store
            dispatch('brand/openDialog')
        },
        deleteAction(item) {
            const index = this.table.indexOf(item)
            this.alert = true
            this.idselected = index
        },
        closeDialog() {
            const {dispatch} = this.$store
            dispatch('brand/closeDialog')
        },
        OkButton(){
            const {dispatch} = this.$store

            this.alert = false
            this.idselected = -1
        },
        NoButton() {
            this.alert = false
        },
        close() {
            this.dialog = false
        },
        getDataFromAPI() {
            const {dispatch} = this.$store
            let {sortBy, sortDesc, page, itemsPerPage} = this.options
            
            if(sortBy.length > 0) {
                this.sortbylast = sortBy
            }

            if(sortDesc.length === 1) {
                this.sorting = !sortDesc[0] ? "ASC" : "DESC"
            }

            dispatch('brand/reqList', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sortingDesc})
        }
    },
    computed: {
        table() {
            return this.$store.getters['brand/getAllItems']
        },
        isLoading() {
            return this.$store.getters['brand/getLoading']
        },
        lentable() {
            return this.$store.getters['brand/getLenItems']
        },
        errorMsg() {
            return this.$store.getters['brand/getError']
        },
        dialogStatus() {
            return this.$store.getters['brand/getDialog']
        },
        params() {
            return {
                ...this.options,
                query: this.search
            }
        }
    },
    watch: {
        dialogStatus: {
            handler(val) {
                if(!val) {
                    this.close()
                }
            },
            deep: true
        },
        options: {
            handler(val) {
                this.getDataFromAPI()
            },
            deep: true
        },
        params: {
            handler(val) {
                this.getDataFromAPI()
            },
            deep: true
        }
    }
}
</script>