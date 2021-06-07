<template>
    <v-main>
        <v-container fluid fill-width>
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
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {text: 'ID', value: 'id', sortable: false},
                {text: 'Name', value: 'name', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            items: []
        }
    },
    created () {
        this.initialize()
    },
    methods: {
        editAction(item) {
            console.log('edit')
            console.log(item)
        },
        deleteAction(item) {
            console.log('delete')
            console.log(item)
        },
        initialize() {
            this.items = [
                {id: 0, name: 'DCP'},
                {id: 1, name: 'DCP'},
                {id: 2, name: 'DCP'},
                {id: 3, name: 'DCP'},
                {id: 4, name: 'DCP'},
                {id: 5, name: 'DCP'},
                {id: 6, name: 'DCP'},
                {id: 7, name: 'DCP'},
                {id: 8, name: 'DCP'},
                {id: 9, name: 'DCP'},
                {id: 10, name: 'DCP'},
                {id: 11, name: 'DCP'},
                {id: 12, name: 'DCP'},
                {id: 13, name: 'DCP'},
                {id: 14, name: 'DCP'},
                {id: 15, name: 'DCP'},
                {id: 16, name: 'DCP'},
                {id: 17, name: 'DCP'}
            ]
        }
    }
}
</script>