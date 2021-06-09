<template>
    <v-main>
        <v-container fill-width>
            <v-dialog persistent max-width="500px">
                <v-card>
                </v-card>
            </v-dialog>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                @keyup="searchAction">
            </v-text-field>
            <v-spacer></v-spacer>
            <v-fab-transition>
                <v-btn
                    v-show="!hidden"
                    color="primary"
                    class="mb-2"
                    fab
                    dark
                    small
                    fixed
                    bottom
                    right
                    @click="dialog = true">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-fab-transition>
            <Dialog :dialog="alert" :title="`Delete`" :text="`Are you sure delete this?`" v-on:ok="OkButton" v-on:no="NoButton"/>
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
    components: {
        AssetInput: () => import('../../components/AssetInput.vue'),
        Dialog: () => import('../../components/Dialog.vue')
    },
    data() {
        return {
            alert: false,
            search: '',
            headers: [
                {text: 'ID', value: 'id', sortable: false},
                {text: 'Device', value: 'device', sortable: false},
                {text: 'Brand', value: 'brand', sortable: false},
                {text: 'Serial Number', value: 'serial_number', sortable: false},
                {text: 'Condition', value: 'condition', sortable: false},
                {text: 'Description', value: 'description', sortable: false},
                {text: 'Warehouse', value: 'warehouse', sortable: false},
                {text: 'Date In', value: 'datein', sortable: false},
                {text: 'Date Out', value: 'dateout', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            items: [],
            currentY: 0,
            lastY:0,
            hidden: false
        }
    },
    created () {
        this.initialize()
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll () {
            this.currentY = window.top.scrollY
            if(this.currentY > this.lastY){
                this.hidden = true
            }else{
                this.hidden = false
            }
            this.lastY = this.currentY
        },
        searchAction() {
            
        },
        editAction(item) {
            console.log('edit')
            console.log(item)
        },
        deleteAction(item) {
            const index = this.items.indexOf(item)
            this.alert = true
        },
        OkButton(){
            const {dispatch} = this.$store

            this.alert = false
            this.idselected = -1
        },
        NoButton() {
            this.alert = false
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