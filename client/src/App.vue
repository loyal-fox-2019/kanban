<template>
  <div id="app">
    <div class="logo">
      <img src="https://cdn6.f-cdn.com/contestentries/1233379/15631726/5a61d5c574b8d_thumb900.jpg" style="width:400px;">
    </div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li style="float:right"><b-button v-b-modal.modal-multi-2 class="mt-3 mr-5">New Task</b-button></li>
      </ul>    

      <b-modal id="modal-multi-2" size="lg" title="First Modal" hide-footer v-model="show">
        <formNya @hideModal="show = false"></formNya>
      </b-modal>
    <Main id="content"></Main>
  </div>
</template>

<script>
import Main from './views/Main'
import formNya from './components/form'

export default {
  name: "app",
  components:{
    Main,
    formNya
  },
  data(){
    return{
      show: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Bree Serif', serif;
  text-align: center;
  color: #2c3e50;
  font-size: 25px;
}

#nav {
  padding: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#content {
  display: flex;
  justify-content: space-around
}

ul {
  list-style-type: none;
  margin: 200px;
  padding: 0;
  overflow: hidden;
  background-color: rgb(246, 246, 246);
}

li {
  float: left;
}

li a {
  display: block;
  color: rgb(27, 26, 26);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: rgb(0, 0, 0);
  color: rgb(246, 246, 246);
}
</style>
