<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-alert type="error" v-for="(error, i) in errors" :key="i">
                  {{error}}
                </v-alert>
                <v-form @submit.prevent="login">
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    v-model="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <span class="ml-2">Dont have an coount? <router-link to="register">Register</router-link></span>
                <v-spacer />
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  props: {
    source: String
  },
  data () {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('/')
        })
        .catch(error => {
          this.errors.push(error.message)
        })
    }
  }
}
</script>
