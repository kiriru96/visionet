<template>
    <v-main>
        <v-container fill-width>
            <v-card justify-center>
                <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                        <v-avatar size="96" class="mr-4" justify-center>
                          <v-img
                            v-if="typeAccount == 0"
                            contain
                            :height="120"
                            lazy-src="../assets/admin.jpg"
                            src="../assets/admin.jpg">
                          </v-img>
                          <v-img
                            v-if="typeAccount == 1 || typeAccount == 2"
                            contain
                            :height="120"
                            lazy-src="../assets/leader.jpg"
                            src="../assets/leader.jpg">
                          </v-img>
                          <v-img
                            v-if="typeAccount == 3"
                            contain
                            :height="120"
                            lazy-src="../assets/engineer.jpg"
                            src="../assets/engineer.jpg">
                          </v-img>
                        </v-avatar>
                        <v-card-text class="text-h6">
                            {{nameAccount}}(@{{usernameAccount}})&nbsp;
                        </v-card-text>
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
