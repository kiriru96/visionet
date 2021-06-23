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
            <div class="text-center"
                style="margin:10px">
                <v-btn
                    @click="printToPage">
                    Print
                </v-btn>
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
                                    Brand Name
                                </th>
                                <th class="text-left">
                                    Inventory Code
                                </th>
                                <th class="text-left">
                                    Model
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
                                v-for="(item, i) in reportTable"
                                :key="i">
                                <td>{{i+1}}</td>
                                <td>{{item.devicename}}</td>
                                <td>{{item.brandname}}</td>
                                <td>{{item.serial_number}}</td>
                                <td>{{item.model}}</td>
                                <td>{{item.count_input }}</td>
                                <td>{{item.datecreated}}</td>
                                <td>{{item.adminname}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-btn
                color="primary"
                @click="printTable"
                style="margin:10px">
                <v-icon>mdi-printer</v-icon>
            </v-btn>
        </v-container>
    </v-main>
</template>

<script>
export default {
    created() {
        const {dispatch} = this.$store
        dispatch('stockin/removeTableReport')
    },
    data() {
        return {
            dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
            items: [],
            urlprint: ''
        }
    },
    methods: {
        printToPage() {
            const {dispatch} = this.$store

            dispatch('stockin/tableReportStockIn', {startdate:this.dates[0], enddate:this.dates[1]})
        },
        printTable() {
            if(this.reportTable.length > 0 && this.dates.length >= 2) {
                window.open(`http://localhost/visionet-api/report/stockin?startdate=${this.dates[0]}&enddate=${this.dates[1]}`, '_black')
            }
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters['stockin/getLoading']
        },
        reportTable() {
            return this.$store.getters['stockin/getReportTable']
        }
    }
}
</script>