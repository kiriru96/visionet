<template>
    <v-main>
        <v-container fluid fill-width>
            <!-- <v-text-field
                v-model="workobject.id"
                label="ID"
                disabled>
            </v-text-field>
            <v-text-field
                v-model="workobject.device"
                label="Device"
                disabled>
            </v-text-field>
            <v-text-field
                v-model="workobject.customer"
                label="Customer"
                disabled>
            </v-text-field> -->
            <v-btn
                height="50"
                width="50"
                @click="selectImage">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-list>
                <v-list-item
                    v-for="(item, i) in image_list"
                    :key="i">
                    <v-img
                        max-height="250"
                        max-width="250  "
                       :src="item"
                       style="margin: 10px">
                    </v-img>
                </v-list-item>
            </v-list>
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
    data() {
        return {
            image_list: [],
            file_list: [],
            timeout: 6000,
            color: '',
            mode: '',
            responseMsg: ''
        }
    },
    methods: {
        selectImage() {
            if(this.image_list.length <= 3) {
                this.$refs.fileinput.click()
            }
        },
        pickFile() {
            let input = this.$refs.fileinput
            let file = input.files
            if(file && file[0]) {
                let reader = new FileReader()
                reader.onload = e => {
                    this.image_list.push(e.target.result)
                    console.log(this.image_list)
                }
                this.file_list.push(file[0])
                console.log(this.file_list)
                reader.readAsDataURL(file[0])
                this.$emit('input', file[0])
            }
        }
    },
    computed: {
        
    },
    watch: {

    }
}
</script>