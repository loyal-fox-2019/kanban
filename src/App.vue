<template>
  <div id="app">
    <home v-bind:taskToHome="taskLists"></home>
  </div>
</template>

<script>
import home from '@/components/Home.vue'
import db from './config/config.js';

export default {
  name: 'app',
  components: {
    home
  },
  data() {
    return {
       taskLists: '',
    }
  },
  mounted() {
   let taskData = [
      {
        name: 'Back-Log',
        tasks: []
      },
      {
        name: 'To-Do',
        tasks: []
      },
      {
        name: 'Doing',
        tasks: []
      },
      {
        name: 'Done',
        tasks: []
      },  
    ]
    db.collection("kanban")
    .onSnapshot((querySnapshot) => {
        taskData[0].tasks = [];
        taskData[1].tasks = [];
        taskData[2].tasks = [];
        taskData[3].tasks = [];
        
        querySnapshot.forEach((element) => {
          if(element.data().status === 'back-log') {
            const obj = element.data();
            obj.id = element.id;
            taskData[0].tasks.push(obj);
          } else if(element.data().status === 'to-do') {
            const obj = element.data();
            obj.id = element.id;
            taskData[1].tasks.push(obj);
          } else if(element.data().status === 'doing') {
            const obj = element.data();
            obj.id = element.id;
            taskData[2].tasks.push(obj);
          } else {
            const obj = element.data();
            obj.id = element.id;
            taskData[3].tasks.push(obj);
          }
        });
    })
    this.taskLists = taskData;
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
