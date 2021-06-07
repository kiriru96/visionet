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
                {text: 'Username', value: 'username', sortable: false},
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
                {id: 0, name: 'DCP', username: 'Samsung'},
                {id: 1, name: 'DCP', username: 'Samsung'},
                {id: 2, name: 'DCP', username: 'Samsung'},
                {id: 3, name: 'DCP', username: 'Samsung'},
                {id: 4, name: 'DCP', username: 'Samsung'},
                {id: 5, name: 'DCP', username: 'Samsung'},
                {id: 6, name: 'DCP', username: 'Samsung'},
                {id: 7, name: 'DCP', username: 'Samsung'},
                {id: 8, name: 'DCP', username: 'Samsung'},
                {id: 9, name: 'DCP', username: 'Samsung'},
                {id: 10, name: 'DCP', username: 'Samsung'},
                {id: 11, name: 'DCP', username: 'Samsung'},
                {id: 12, name: 'DCP', username: 'Samsung'},
                {id: 13, name: 'DCP', username: 'Samsung'},
                {id: 14, name: 'DCP', username: 'Samsung'},
                {id: 15, name: 'DCP', username: 'Samsung'},
                {id: 16, name: 'DCP', username: 'Samsung'},
                {id: 17, name: 'DCP', username: 'Samsung'}
            ]
        }
    }
}
</script>