<template>
    <v-main>
        <v-container fill-width>
            <v-dialog v-model="dialogStat" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{formTitle}}</span>
                    </v-card-title>

                    <v-card-text>
                        <EngineerInput ref="engineerinput" :forminput="forminput"/>
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="sendToEngineer">Save</v-btn>
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
                    label="Asset Inventory Code"
                    class="mx-3"
                    disabled>
                </v-text-field>
                <v-text-field
                    v-model="dataWO.location"
                    label="Location"
                    class="mx-3"
                    disabled>
                </v-text-field>
                <v-text-field
                    v-if="dataWO.engineername != null"
                    v-model="dataWO.engineername"
                    label="Work Order sended to"
                    class="mx-3"
                    disabled>
                </v-text-field>
                <v-btn block @click="inputEngineer">
                    Send To Engineer
                </v-btn>
            </v-form>
        </v-container>
            <v-snackbar
                :value="errorMsg"
                :color="color"
                :multi-line="mode === 'multi-line'"
                :timeout="timeout"
                :vertical="mode === 'vertical'">
                {{ errorMsg }}
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-btn
                    dark
                    text
                    @click="removeError()">
                    Close
                </v-btn>
            </v-snackbar>
    </v-main>
</template>

<script>
export default {
    components: {
        EngineerInput: () => import('../../components/EngineerInput.vue')
    },
    created() {
        this.id = this.$route.query.id
        this.detailWorkOrderAPI()
    },
    data() {
        return {
            formTitle: 'Send To Engineer',
            forminput: {
                woid: 0,
                engineer: {id: 0, name: ''}
            },
            id: 0,
            headers: [
                {text: '', value: ''},
                {text: '', value: ''}
            ],
            items: [],
            timeout: 6000,
            color: '',
            mode: '',
        }
    },
    methods: {
        detailWorkOrderAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            dispatch('wo/detailWorkOrder', this.id)
        },
        inputEngineer() {
            this.forminput = {
                id: this.id,
                engineer: {id: 0, name: ''}
            }

            const {dispatch} = this.$store

            dispatch('wo/openDialog')
        },
        sendToEngineer() {
            if(this.isLoading) return

            let data = {
                idwo: this.forminput.id,
                idengineer: this.forminput.engineer.id
            }
            
            const {dispatch} = this.$store

            dispatch('wo/inputEngineer', data)
        },
        closeDialog() {
            const {dispatch} = this.$store

            dispatch('wo/closeDialog')
        },
        removeError() {
            const {dispatch} = this.$store

            dispatch('wo/removeError')
        }
    },
    computed: {
        errorMsg() {
            return this.$store.getters['wo/getError']
        },
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