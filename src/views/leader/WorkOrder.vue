<template>
    <v-main>
        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-icon="mdi-calender"
                    readonly
                    v-bind="attrs"
                    v-on="on">
                </v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                scrollable>
                <v-spacer></v-spacer>
                <v-btn 
                    text
                    color="primary"
                    @click="menu = false">
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu">
                    Ok
                </v-btn>
            </v-date-picker>
        </v-menu>
        <v-list-item
            v-for="item in items"
            :key="item.id"
            @click="$router.push({path: '/leader/workorder/detail', query: {id: item.id}})">
            <v-list-item-avatar>
                <v-icon class="grey lighten-1" dark>
                    mdi-folder
                </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title v-text="item.device"></v-list-item-title>
                <v-list-item-subtitle v-text="item.customer"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {text: '', value: ''},
                {text: '', value: ''}
            ],
            items: [
                {id:0, device:'Print', customer: 'OVO'},
                {id:1, device:'Print', customer: 'OVO'},
                {id:2, device:'Print', customer: 'OVO'},
                {id:3, device:'Print', customer: 'OVO'},
                {id:4, device:'Print', customer: 'OVO'},
                {id:5, device:'Print', customer: 'OVO'},
                {id:6, device:'Print', customer: 'OVO'},
                {id:7, device:'Print', customer: 'OVO'},
                {id:8, device:'Print', customer: 'OVO'},
                {id:9, device:'Print', customer: 'OVO'},
                {id:0, device:'Print', customer: 'OVO'},
                {id:1, device:'Print', customer: 'OVO'},
                {id:2, device:'Print', customer: 'OVO'},
                {id:3, device:'Print', customer: 'OVO'},
                {id:4, device:'Print', customer: 'OVO'},
                {id:5, device:'Print', customer: 'OVO'},
                {id:6, device:'Print', customer: 'OVO'},
                {id:7, device:'Print', customer: 'OVO'},
                {id:8, device:'Print', customer: 'OVO'},
                {id:9, device:'Print', customer: 'OVO'}
                ]
        }
    }
}
</script>