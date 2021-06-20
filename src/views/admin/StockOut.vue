<template>
    <v-main>
        <v-container fill-width>
            <v-list>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    No
                                </th>
                                <th class="text-left">
                                    Device Name
                                </th>
                                <th class="text-left">
                                    Quantity
                                </th>
                                <th class="text-left">
                                    Opsi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, i) in items"
                                :key="i">
                                <td>{{i+1}}</td>
                                <td>{{item.devicename}}</td>
                                <td>{{item.quantity}}</td>
                                <td><v-icon>mdi-delete</v-icon></td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-list>
        </v-container>
    </v-main>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            items:[]
        }
    },
    methods: {
        
    },
    created: {

    },
    computed: {

    },
    watch: {

    }
}
</script>