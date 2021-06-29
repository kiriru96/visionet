<template>
    <v-main>
        <v-container>
            <v-subheader>Personal</v-subheader>
            <v-expansion-panels>
                <v-expansion-panel
                    v-show="accountType == 0">
                    <v-expansion-panel-header>
                        Name
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-form
                            ref="name">
                            <v-text-field
                                v-model="fullname"
                                :value="fullnameVal"
                                label="Fullname">
                            </v-text-field>
                            <v-btn
                                @click="submitFullname"
                                color="primary">
                                Submit
                            </v-btn>
                        </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel
                    v-show="accountType != 0">
                    <v-expansion-panel-header>
                        Name
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-form
                            ref="name">
                            <v-text-field
                                v-model="firstname"
                                :value="firstnameVal"
                                label="First Name">
                            </v-text-field>
                            <v-text-field
                                v-model="lastname"
                                :value="lastnameVal"
                                label="Last Name">
                            </v-text-field>
                            <v-btn
                                @click="submitName"
                                color="primary">
                                Submit
                            </v-btn>
                        </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Username
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-form
                            ref="username">
                            <v-text-field
                                v-model="username"
                                :value="usernameVal"
                                label="Username"
                                class="mr-2">
                            </v-text-field>
                            <v-btn
                                @click="submitUsername"
                                color="primary">
                                Submit
                            </v-btn>
                        </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Password
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-form
                            ref="password">
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password">
                            </v-text-field>
                            <v-btn
                                @click="submitPassword"
                                color="primary">
                                Submit
                            </v-btn>
                        </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-subheader>Display</v-subheader>
            <v-card>
                <v-card-actions>
                    <v-switch
                        v-model="switcher"
                        @change="switchTheme"
                        hint="This toggle to change theme to dark/light"
                        inset
                        :label="switcher ? 'Dark' : 'Light'"
                        persistent-hint>
                    </v-switch>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-main>
</template>

<script>
export default {
    mounted() {
        const {dispatch} = this.$store
        dispatch('profile/getProfile')
    },
    destroyed() {
        this.username = ''
        this.password = ''
        this.fullname = ''
        this.firstname = ''
        this.lastname = ''
    },
    data() {
        return {
            username: '',
            password: '',
            fullname: '',
            firstname: '',
            lastname: '',
            switcher: localStorage.getItem('theme') === 'dark'
        }
    },
    methods: {
        switchTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

            localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light');
        },
        submitFullname() {
            if(this.$refs.name.validate()) {
                const {dispatch} = this.$store
                
                let data = {fullname: this.fullname}
                dispatch('profile/updateName', data)
            }
        },
        submitName() {
            if(this.$refs.name.validate()) {
                const {dispatch} = this.$store

                let data = {firstname: this.firstname, lastname: this.lastname}
                dispatch('profile/updateName', data)
            }
        },
        submitUsername() {
            if(this.$refs.username.validate()) {
                const {dispatch} = this.$store

                let data = {username: this.username}
                dispatch('profile/updateUsername', data)
            }
        },
        submitPassword() {
            if(this.$refs.password.validate()) {
                const {dispatch} = this.$store

                let data = {password: this.password}
                dispatch('profile/updatePassword', data)
            }
        }
    },
    computed: {
        accountType() {
            return this.$store.getters['profile/getType']
        },
        isLoading() {
            return this.$store.getters['profile/getLoading']
        },
        errorMsg() {
            return this.$store.getters['profile/getError']
        },
        usernameVal() {
            this.username = this.$store.getters['profile/getUsername']
            return this.username
        },
        fullnameVal() {
            this.fullname = this.$store.getters['profile/getName']
            return this.fullname
        },
        firstnameVal() {
            this.firstname = this.$store.getters['profile/getFirstName']
            return this.firstname
        },
        lastnameVal() {
            this.lastname = this.$store.getters['profile/getLastName']
            return this.lastname
        }
    }
}
</script>