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
                    v-for="(item, i) in image_list"
                    :key="i">
                    <v-list-item-content
                        justify="center">
                        <v-img
                            aspect-ratio="1"
                            contain
                            block
                            width="300"
                            :src="item"
                            style="margin: 2px">
                        </v-img>
                        <v-textarea
                            v-model="description_list[i]"
                            :counter="100"
                            rows="3"
                            label="Description">
                        </v-textarea>
                        <v-icon
                            color="primary"
                            @click="removeImage(i)">
                            mdi-delete
                        </v-icon>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-btn
                :disabled="(image_list.length >= 3)"
                block
                color="primary"
                dark
                @click="selectImage"
                style="margin-bottom: 5px;margin-top: 5px">
                <v-icon>mdi-camera</v-icon>
            </v-btn>
            <v-btn
                :disabled="(image_list.length < 1)"
                block
                color="primary"
                dark
                @click="submitWO"
                style="margin-bottom: 5px;margin-top: 5px">
                <v-icon>mdi-send</v-icon>
            </v-btn>
            <input
                ref="fileinput"
                type="file"
                style="display: none"
                @input="pickFile">
        </v-container>
        <v-snackbar
            :value="responseMsg"
            :color="color"
            :multi-line="mode === 'multi-line'"
            :timeout="timeout"
            :vertical="mode === 'vertical'"
            >
            {{ responseMsg }}
        </v-snackbar>
    </v-main>
</template>

<script>
export default {
    props: {
        workobject: Object
    },
    created() {
        this.id = this.$route.query.id
        this.detailWorkOrderAPI()
    },
    data() {
        return {
            image_list: [],
            file_list: [],
            description_list: [],
            timeout: 6000,
            color: '',
            mode: '',
            send: true
        }
    },
    methods: {
        detailWorkOrderAPI() {
            if(this.isLoading) return

            const {dispatch} = this.$store

            dispatch('engineerpage/detailWorkOrder', this.id)
        },
        selectImage() {
            if(this.image_list.length <= 3) {
                this.$refs.fileinput.click()
            }
        },
        removeImage(index) {
            this.image_list.splice(index, 1)
            this.file_list.splice(index, 1)
        },
        pickFile() {
            let input = this.$refs.fileinput
            let file = input.files
            if(file && file[0]) {
                let reader = new FileReader()
                reader.onload = e => {
                    this.image_list.push(e.target.result)
                }
                this.file_list.push(file[0])
                this.description_list.push('')

                reader.readAsDataURL(file[0])
                this.$emit('input', file[0])
            }
        },
        submitWO() {
            let data = new FormData()
            data.append("idwo", this.woDetail.woid)
            
            for(let i = 0; i < this.file_list.length; i++) {
                let file = this.file_list[i]
                data.append(`image[${i}]`, file)
            }

            for(let i = 0; i < this.description_list.length; i++) {
                let descripition = this.description_list[i]
                data.append(`desc[${i}]`, descripition)
            }

            const {dispatch} = this.$store

            if(this.$route.name === "RevisiWO") {
                dispatch('engineerpage/editWO', data)
            } else {
                dispatch('engineerpage/inputWO', data)
            }
        }
    },
    computed: {
        woDetail() {
            return this.$store.getters['engineerpage/getDetail']
        },
        responseMsg() {
            return this.$store.getters['engineerpage/getError']
        }
    },
    watch: {

    }
}
</script>