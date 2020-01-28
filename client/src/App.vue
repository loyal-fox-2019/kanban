<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="row">
      <MainCard :datas="backlogList" :kategori="'Back-Log'"></MainCard>
      <MainCard :datas="todoList" :kategori="'To-Do'"></MainCard>
      <MainCard :datas="doingList" :kategori="'Doing'"></MainCard>
      <MainCard :datas="doneList" :kategori="'Done'"></MainCard>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import MainCard from './components/MainCard.vue'
import db from './config/firebase-config'

export default {
  name: 'app',
  data(){
    return {
      backlogList: [],
      todoList: [],
      doingList: [],
      doneList: [],
      types: ["Back-Log", "To-Do", "Doing", "Done"]
    }
  },
  components: {
    NavBar,
    MainCard
  },
  created(){
    db.collection("kanban").onSnapshot(querySnapshot=>{
      this.backlogList = []
      this.todoList = []
      this.doingList = []
      this.doneList = []
      let backlog = []
      let todo = []
      let doing = []
      let done = []
      querySnapshot.forEach(doc=>{
        let obj = doc.data()
        let data = {
          id: doc.id,
          ...obj
        }
        switch(data.status) {
          case "Back-Log":
            backlog.push(data)
            break;
          case "To-Do":
            todo.push(data)
            break;
          case "Doing":
            doing.push(data)
            break;
          case "Done":
            done.push(data)
            break;
        }
      })
      this.backlogList = backlog
      this.todoList = todo
      this.doingList = doing
      this.doneList = done
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
</style>
