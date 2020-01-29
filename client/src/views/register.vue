<template>

<div>
    <h1>Welcome to My Awesome App</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
</div>
  
</template>

<script>
import {ui, firebase} from '../config/firebaseAuth'
export default {
    name: 'register',
    methods:{
        registerFirebase(){
            const uiConfig={
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                        console.log(authResult,redirectUrl)
                    return true;
                    },
                    uiShown: function() {
                    document.getElementById('loader').style.display = 'none';
                    }
                },
                signInOptions: [
                    {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                    }
                ]
            }
           ui.start('#firebaseui-auth-container', uiConfig);
        }
    }
}
</script>

<style>

</style>