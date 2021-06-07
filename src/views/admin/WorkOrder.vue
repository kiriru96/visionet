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
                {text: 'Device', value: 'device', sortable: false},
                {text: 'Brand', value: 'brand', sortable: false},
                {text: 'Customer', value: 'customer', sortable: false},
                {text: 'Location', value: 'location', sortable: false},
                {text: 'Status', value: 'status', sortable: false},
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
                {id: 0, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 1, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 2, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 3, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 4, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 5, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 6, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 7, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 8, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 9, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 10, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 11, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 12, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 13, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 14, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 15, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 16, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'},
                {id: 17, device: 'DCP', brand: 'Samsung', serial_number: '09202920',condition: 'good', description: 'Alat membuat senang', warehouse: 'Tangerang', datein: '0000-00-00', dateout: '0000-00-00'}
            ]
        }
    }
}
</script>