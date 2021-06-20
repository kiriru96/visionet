<template>
    <v-main>
        <v-container fill-width>
            <v-date-picker
                full-width
                v-model="dates"
                range>
            </v-date-picker>
                <div class="text-center">
                <v-chip
                    class="ma-2">
                    From : {{dates[0]}}
                </v-chip>
                <v-chip
                    class="ma-2">
                    To : {{dates[1] ? dates[1] : "????-??-??"}}
                </v-chip>
            </div>
            <v-card>
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
                                    Date
                                </th>
                                <th class="text-left">
                                    CC
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
            </v-card>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
        }
    }
}
</script>