<template>
    <v-main>
        <v-list-item
            v-for="item in items"
            :key="item.id">
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
                {id:9, device:'Print', customer: 'OVO'}
                ]
        }
    }
}
</script>