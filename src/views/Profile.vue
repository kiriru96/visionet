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
                        <v-card-text class="text-h6">
                            {{nameAccount}}(@{{usernameAccount}})&nbsp;
                            <!-- <v-btn @click="editFullnameAction" color="primary"><v-icon>mdi-pencil</v-icon></v-btn> -->
                        </v-card-text>
                        <!-- <v-list-item-title
                            class="mx-auto text-center"
                            v-show="edit_fullname"
                            style="max-width: 300px">                            
                            <v-form
                                v-show="typeAccount != 0"
                                ref="fullname">
                                <v-text-field
                                    label="First Name"
                                    v-model="firstname"
                                    outlined>
                                </v-text-field>
                                <v-text-field
                                    label="Last Name"
                                    v-model="lastname"
                                    outlined>
                                </v-text-field>
                            </v-form>
                            <v-form
                                v-show="typeAccount == 0"
                                ref="fullname">
                                <v-text-field
                                    label="Full Name"
                                    v-model="fullname"
                                    outlined>
                                </v-text-field>
                            </v-form>
                            <div
                                style="margin: 5px">
                                <v-btn
                                    style="margin: 5px"
                                    v-show="edit_fullname"
                                    color="primary">
                                    <v-icon>mdi-checkbox-marked-circle</v-icon>&nbsp;Save
                                </v-btn>
                                <v-btn
                                    style="margin: 5px"
                                    @click="editFullnameAction"
                                    color="primary">
                                    <v-icon>mdi-close</v-icon>&nbsp;Cancel
                                </v-btn>
                            </div>
                        </v-list-item-title>

                        <v-list-item-title
                            class="mx-auto text-center"
                            v-show="edit_username"
                            style="max-width: 300px">
                            <v-form
                                ref="username">
                                <v-text-field
                                    label="Username"
                                    v-model="username"
                                    outlined>
                                </v-text-field>
                            </v-form>
                        </v-list-item-title>
                        <div
                            style="margin: 5px">
                            <v-btn
                                style="margin: 5px"
                                v-show="edit_username"
                                color="primary">
                                <v-icon>mdi-checkbox-marked-circle</v-icon>&nbsp;Save
                            </v-btn>
                            <v-btn
                                style="margin: 5px"
                                @click="editUsernameAction"
                                color="primary">
                                <v-icon>{{edit_username ? 'mdi-close' : 'mdi-pencil'}}</v-icon>&nbsp;{{edit_username ? 'Cancel' : 'Username'}} 
                            </v-btn>
                        </div>
                        <v-list-item-title
                            class="mx-auto text-center"
                            style="max-width: 300px"
                            v-show="edit_password">
                            <v-form
                                ref="password">
                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    outlined>
                                </v-text-field>
                            </v-form>
                        </v-list-item-title>
                        <div
                            style="margin: 5px">
                            <v-btn
                                style="margin: 5px"
                                v-show="edit_password"
                                color="primary">
                                <v-icon>mdi-checkbox-marked-circle</v-icon>&nbsp;Save
                            </v-btn>
                            <v-btn
                                style="margin: 5px"
                                @click="editPasswordAction"
                                color="primary">
                                <v-icon>{{edit_password ? 'mdi-close' : 'mdi-pencil'}}</v-icon>&nbsp;{{edit_password ? 'Cancel' : 'Password'}} 
                            </v-btn>
                        </div> -->
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
            firstname: '',
            lastname: '',
            fullname: '',
            username: '',
            password: '',
            edit_pass: false,
            showpass: false,
            edit_fullname: false,
            edit_username: false,
            edit_password: false
        }
    },
    mounted() {
        this.getProfile()
    },
    methods: {
        editFullnameAction() {
            this.edit_fullname = !this.edit_fullname
            this.edit_username = false
            this.edit_password = false

            this.fullname = ''
            this.password = ''
            this.username = ''
        },
        editUsernameAction() {
            this.edit_username = !this.edit_username
            this.edit_password = false
            this.edit_fullname = false

            this.fullname = ''
            this.password = ''
            this.username = ''
        },
        editPasswordAction() {
            this.edit_password = !this.edit_password
            this.edit_username = false
            this.edit_fullname = false

            this.fullname = ''
            this.password = ''
            this.username = ''
        },
        submitUsername() {

        },
        submitPassword() {

        },
        sendUpdateName() {
            const {dispatch} = this.$store

            let data = {}
            if(this.typeAccount == 0) {
                data = {fullname: this.fullname}
            } else {
                data = {firstname: this.firstname, lastname: this.lastname}
            }
            dispatch('profile/updateName', data)
        },
        sendUpdatePassword() {
            const {dispatch} = this.$store

            const data = {password: this.password}
            dispatch('profile/updatePassword', data)
        },
        sendUpdateUsername() {
            const {dispatch} = this.$store

            const data = {username: this.username}
            dispatch('profile/updateUsername', data)
        },
        getProfile() {
            const {dispatch} = this.$store

            dispatch('profile/getProfile')
        }
    },
    computed: {
        nameAccount() {
            this.fullname = this.$store.getters['profile/getName']
            return this.fullname
        },
        typeAccount() {
            return this.$store.getters['profile/getType']
        },
        usernameAccount() {
            return this.$store.getters['profile/getUsername']
        },
        isLoading() {
            return this.$store.getters['profile/getLoading']
        },
        errorMsg() {
            return this.$store.getters['profile/getError']
        }
    }
}
</script>
