<template>
  <div id="app">
    <NavigationBar />
    <b-container fluid class="task-board">
      <b-row>
        <TaskList v-for="task in dataTask" :key="task.id" :sendData="task" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from '../config/firebase'
import NavigationBar from '@/components/NavigationBar.vue'
import TaskList from '@/components/TaskList.vue'

export default {

  name: 'app',
  data () {
    return {
      dataTask: [
        {
          title: 'Backlog',
          color: 'danger',
          tasks: []
        },
        {
          title: 'Todo',
          color: 'warning',
          tasks: []
        },
        {
          title: 'Doing',
          color: 'info',
          tasks: []
        },
        {
          title: 'done',
          color: 'success',
          tasks: []
        }
      ]
    }
  },
  methods: {
    getData () {
      db.collection('kanban').onSnapshot(querySnapshot => {
        this.dataTask[0].tasks = []
        this.dataTask[1].tasks = []
        this.dataTask[2].tasks = []
        this.dataTask[3].tasks = []

        querySnapshot.forEach(doc => {
          if (doc.data().status === 'backlog') {
            this.dataTask[0].tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'todo') {
            this.dataTask[1].tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'doing') {
            this.dataTask[2].tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'done') {
            this.dataTask[3].tasks.push({ id: doc.id, ...doc.data() })
          }
        })
      })
    }
  },
  components: {
    NavigationBar,
    TaskList
  },
  created () {
    this.getData()
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
}
</style>
