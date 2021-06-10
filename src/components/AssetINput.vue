<template>
    <v-form
        v-model="valid"
        ref="form">
        <v-autocomplete
            v-model="forminput.device_name"
            :loading="loadingdevice"
            :items="listDeviceName"
            :search-input.sync="searchDeviceName"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            hide-details
            label="Device Name">
        </v-autocomplete>
        <v-autocomplete
            v-model="forminput.device_brand"
            :loading="loadingbrand"
            :items="listDeviceBrand"
            :search-input.sync="searchDeviceBrand"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            hide-details=""
            label="Device Brand">
        </v-autocomplete>
        <v-text-field
            v-model="forminput.model"
            :counter="50"
            :rules="inputRules"
            label="Model"
            required>
        </v-text-field>
        <v-text-field
            v-model="forminput.serial_number"
            :counter="50"
            :rules="inputRules"
            label="Serial Number"
            required>
        </v-text-field>
        <v-select
            v-model="forminput.status"
            :items="statusList"
            item-text="name"
            item-value="id"
            label="Status"
            return-object
            single-line>
        </v-select>
        <v-textarea
            v-model="forminput.description"
            :counter="50"
            :rules="inputRules"
            label="Description"
            required>
        </v-textarea>
        <v-autocomplete
            v-model="forminput.warehouse"
            :loading="loadingwarehouse"
            :items="listWarehouse"
            :search-input.sync="searchWarehouse"
            item-text="name"
            item-value="id"
            cache-items
            class="mx-3"
            hide-no-data
            hide-details=""
            label="Warehouse">
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
            valid: false,
            inputRules: [
                v => !!v || 'Tidak boleh kosong',
                v => v && v.length >= 1 || "Input harus diisi"
            ]
        }
    },
    methods: {
        
    },
    computed: {
        
    }
}
</script>