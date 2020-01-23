<template>
  <router-view/>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App',
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // var displayName = user.displayName
        // var email = user.email
        // var emailVerified = user.emailVerified
        // var photoURL = user.photoURL
        // var isAnonymous = user.isAnonymous
        // var uid = user.uid
        // var providerData = user.providerData
        // console.log('KALAU DI THEN, TETEP MASUK SINI GA? ternyata tetep masuk')
        // fetch data
        localStorage.setItem('userId', user.uid)
        // this.$router.push('/')
      } else {
        // User is signed out.
        // ...
        this.$router.push('/login')
      }
    })
  }
}
</script>
