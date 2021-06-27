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
                        <v-img
                            aspect-ratio="1"
                            contain
                            block
                            width="300"
                            :lazy-src="`http://localhost/visionet-api/public/uploads/${item}`"
                            :src="`http://localhost/visionet-api/public/uploads/${item}`"
                            style="margin: 2px">
                        </v-img>
                    </v-list-item-content>
                    <v-list-item-content>
                        <v-list-item-action-text>
                            {{descList[i]}}
                        </v-list-item-action-text>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-btn
                :disabled="statusWorkOrderSubmit == 1"
                block
                :loading="isLoading"
                color="primary"
                @click="confirmWO"
                style="margin-bottom: 5px;margin-top: 5px">
                {{statusWorkOrderSubmit == 1 ? 'Confirmed' : 'Confirm'}}
            </v-btn>
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
        confitmWO() {

        },
        detailWorkOrderAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            dispatch('engginerpage/detailWorkOrder', this.id)
        },
        selectImage() {
            if(this.image_list.length <= 3) {
                this.$refs.fileinput.click()
            }
        },
        confirmWO() {
            const {dispatch} = this.$store
            let data = {id: this.engginerSubmitID}
            
            dispatch('engginerpage/confirmWO', data)
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