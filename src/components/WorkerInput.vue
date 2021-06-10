<template>
    <v-form
        ref="form"
        lazy-validation>
        <v-text-field
            label="`First Name`"
            v-model="forminput.firstname">
        </v-text-field>
        <v-text-field
            label="`Last Name`"
            v-model="forminput.lastname">
        </v-text-field>
        <v-text-field
            label="`Username`"
            v-model="forminput.username">
        </v-text-field>
        <v-text-field
            label="`Password`"
            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpass ? 'text' : 'password'"
            v-model="forminput.password"
            @click:append="showpass = !showpass">
        </v-text-field>
        <v-autocomplete
            v-model="forminput.location"
            :loading="loadinglocation"
            :items="listLocation"
            :search-input.sync="searchLocation"
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
        forminput: Object
    },
    data() {
        return {
            showpass: false
        }
    }
}
</script>