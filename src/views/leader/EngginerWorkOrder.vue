<template>
    <v-main>
        <v-container fill-width>
            <v-dialog v-model="dialogStat" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{formTitle}}</span>
                    </v-card-title>

                    <v-card-text>
                        <EngginerInput ref="engginerinput" :forminput="forminput"/>
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="sendToEngginer">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-form>
                <v-text-field
                    v-model="dataWO.customer"
                    label="Customer"
                    class="mx-3"
                    disabled>
                </v-text-field>
                <v-text-field
                    v-model="dataWO.device"
                    label="Device"
                    class="mx-3"
                    disabled>
                </v-text-field>
                <v-text-field
                    v-model="dataWO.serial_number"
                    label="Serial Number"
                    class="mx-3"
                    disabled>
                </v-text-field>
                <v-text-field
                    v-model="dataWO.location"
                    label="Location"
                    class="mx-3"
                    disabled>
                </v-text-field>
                <v-btn block @click="inputEngginer">
                    Send To Engginer
                </v-btn>
            </v-form>
        </v-container>
    </v-main>
</template>

<script>
export default {
    components: {
        EngginerInput: () => import('../../components/EngginerInput.vue')
    },
    created() {
        this.id = this.$route.query.id
        this.detailWorkOrderAPI()
    },
    data() {
        return {
            formTitle: 'Send To Engginer',
            forminput: {
                woid: 0,
                engginer: {id: 0, name: ''}
            },
            id: 0,
            headers: [
                {text: '', value: ''},
                {text: '', value: ''}
            ],
            items: [
                ]
        }
    },
    methods: {
        detailWorkOrderAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            dispatch('wo/detailWorkOrder', this.id)
        },
        inputEngginer() {
            this.forminput = {
                id: this.id,
                engginer: {id: 0, name: ''}
            }

            const {dispatch} = this.$store

            dispatch('wo/openDialog')
        },
        sendToEngginer() {
            if(this.isLoading) return

            let data = {
                idwo: this.forminput.id,
                idengginer: this.forminput.engginer.id
            }
            
            const {dispatch} = this.$store

            dispatch('wo/inputEngginer', data)
        },
        closeDialog() {
            const {dispatch} = this.$store

            dispatch('wo/closeDialog')
        }
    },
    computed: {
        dataWO() {
            return this.$store.getters['wo/getDetail']
        },
        isLoading() {
            return this.$store.getters['wo/getLoading']
        },
        dialogStat() {
            return this.$store.getters['wo/getDialog']
        }
    }
}
</script>