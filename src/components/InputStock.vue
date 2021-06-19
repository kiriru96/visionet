<template>
    <v-form
        ref="form"
        lazy-validation>
        <v-autocomplete
            v-model="forminput.asset"
            :loading="loadingasset"
            :items="listAssetName"
            :search-input.sync="search_asset"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            hide-details
            return-object
            label="Device Name"
            hint="Type more than 3 character"
            required>
        </v-autocomplete>
    </v-form>
</template>

<script>
export default {
    
}
</script>