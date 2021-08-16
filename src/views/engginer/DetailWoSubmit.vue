<template>
    <v-main>
        <v-container fill-width justify-center>
            <v-text-field
                v-model="woDetail.woid"
                label="ID"
                disabled>
            </v-text-field>
            <v-text-field
                v-model="woDetail.device"
                label="Device"
                disabled>
            </v-text-field>
            <v-text-field
                v-model="woDetail.customer"
                label="Customer"
                disabled>
            </v-text-field>
            
            <v-list>
                <v-list-item
                    v-for="(item, i) in picList"
                    :key="i">
                    <v-list-item-content>
                        <v-card>
                            <v-img
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                :lazy-src="`http://localhost/visionet-api/public/uploads/${item}`"
                                :src="`http://localhost/visionet-api/public/uploads/${item}`"
                                style="margin: 2px">
                            </v-img>
                            <v-card-title>Description</v-card-title>
                            <v-card-text>{{descList[i]}}</v-card-text>
                        </v-card>
                    </v-list-item-content>
                    <v-list-item-content>
                        <v-list-item-action-text>
                            
                        </v-list-item-action-text>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
        <v-snackbar
            :value="responseMsg"
            :color="color"
            :multi-line="mode === 'multi-line'"
            :timeout="timeout"
            :vertical="mode === 'vertical'">
            {{ responseMsg }}
        </v-snackbar>
    </v-main>
</template>

<script>
export default {
    components: {
        Dialog: () => import('../../components/Dialog.vue')
    },  
    props: {
        workobject: Object
    },
    created() {
        this.id = this.$route.query.id
        this.detailWorkOrderAPI()
    },
    data() {
        return {
            timeout: 500,
            color: '',
            mode: '',
            send: true
        }
    },
    methods: {
        detailWorkOrderAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            dispatch('engginerpage/detailWorkOrder', this.id)
        }
    },
    computed: {
        responseMsg() {
            return this.$store.getters['engginerpage/getError']
        },
        woDetail() {
            return this.$store.getters['engginerpage/getDetail']
        },
        picList() {
            return this.$store.getters['engginerpage/getPicList']
        },
        descList() {
            return this.$store.getters['engginerpage/getDescList']
        },
        engginerSubmitID() {
            return this.$store.getters['engginerpage/getEngginerSubmitId']
        },
        statusWorkOrderSubmit() {
            return this.$store.getters['engginerpage/getWorkOrderSubmitStatus']
        },
        isLoading() {
            return this.$store.getters['engginerpage/getLoading']
        }
    },
    watch: {
        woDetail: {
            handler(val, oldVal) {
                
            },
            deep: true
        }
    }
}
</script>