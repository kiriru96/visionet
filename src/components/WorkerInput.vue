<template>
    <v-form
        ref="form"
        lazy-validation>
        <v-text-field
            ref="fname"
            class="mx-3"
            label="First Name"
            v-model="forminput.firstname">
        </v-text-field>
        <v-text-field
            ref="lname"
            class="mx-3"
            label="Last Name"
            v-model="forminput.lastname">
        </v-text-field>
        <v-text-field
            ref="username"
            class="mx-3"
            label="Username"
            v-model="forminput.username">
        </v-text-field>
        <v-text-field
            ref="password"
            v-show="!edit"
            label="Password"
            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpass ? 'text' : 'password'"
            v-model="forminput.password"
            @click:append="showpass = !showpass"
            class="mx-3">
        </v-text-field>
        <v-autocomplete
            ref="location"
            v-model="forminput.location"
            :loading="loadinglocation"
            :items="listLocation"
            :search-input.sync="search_location"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            label="Location">
        </v-autocomplete>
    </v-form>
</template>

<script>
export default {
    props: {
        forminput: Object,
        edit: Boolean
    },
    data() {
        return {
            showpass: false,
            search_location: '',
            loadinglocation: false
        }
    },
    methods: {
        resetForm() {
            this.$refs.form.reset()
        },
        isValid() {
            return this.$refs.form.validate()
        }
    },
    computed: {
        listLocation() {
            let fakelist = []

            if(this.forminput.location) {
                fakelist.push(this.forminput.location)
            }

            let list = this.$store.getters['leader/getLightLocationList']
            return list.length === 0 ? fakelist : list
        }
    },
    watch: {
        search_location(val) {
            if(val.length >= 3) {
                const {dispatch} = this.$store
            }
        }
    }
}
</script>