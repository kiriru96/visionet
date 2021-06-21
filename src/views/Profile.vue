<template>
    <v-main>
        <v-container fill-width>
            <v-card justify-center>
                <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                        <v-avatar size="96" class="mr-4" justify-center>
                            <v-img
                                contain
                                :height="120"
                                lazy-src="../assets/avatar.png"
                                src="../assets/avatar.png">
                            </v-img>    
                        </v-avatar>
                        <v-card-text class="text-h6">{{nameAccount}}</v-card-text>
                        <v-list-item-content 
                            class="justify-center"
                            v-show="edit_pass">
                            <v-text-field
                                :full-width="false"
                                ref="password"
                                label="Password"
                                :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showpass ? 'text' : 'password'"
                                v-model="password"
                                @click:append="showpass = !showpass"
                                autocomplete="new-password"
                                class="mx-2">
                            </v-text-field>
                        </v-list-item-content>
                        <v-list-item-content v-show="false" class="justify-center">
                            <v-btn
                                max-width="200"
                                min-width="150"
                                color="primary"
                                @click="edit_pass = !edit_pass">
                                Change Password
                            </v-btn>
                        </v-list-item-content>
                    </div>
                </v-list-item-content>
            </v-card>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            edit_pass: false,
            showpass: false,
            password: ''
        }
    },
    computed: {
        nameAccount() {
        return this.$store.getters['auth/getName']
        }
    }
}
</script>
