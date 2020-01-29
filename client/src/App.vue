<template>
  <div id="app">
    <b-container>
      <NavBar></NavBar>
      <b-row>
        <b-col cols="3" v-for="(stat, i) in status" :key="i">
          <statusCard :statusPass="stat"></statusCard>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import StatusCard from './components/StatusCard.vue'
import db from './config/firebase.js'
import NavBar from './components/NavBar'

export default {
  name: 'app',
  data () {
    return {
      status: [
        { header: 'Back-Log', bg: 'danger', tasks: [] },
        { header: 'To-Do', bg: 'warning', tasks: [] },
        { header: 'Doing', bg: 'primary', tasks: [] },
        { header: 'Done', bg: 'success', tasks: [] }
      ]
    }
  },
  components: {
    StatusCard,
    NavBar
  },
  created () {
    db.collection('tasks').onSnapshot((querySnapshot) => {
      let tasks0 = []
      let tasks1 = []
      let tasks2 = []
      let tasks3 = []
      querySnapshot.docs.forEach((doc) => {
        if (doc.data().status === 'Back-Log') {
          tasks0.push({ id: doc.id, ...doc.data() })
        } else if (doc.data().status === 'To-Do') {
          tasks1.push({ id: doc.id, ...doc.data() })
        } else if (doc.data().status === 'Doing') {
          tasks2.push({ id: doc.id, ...doc.data() })
        } else if (doc.data().status === 'Done') {
          tasks3.push({ id: doc.id, ...doc.data() })
        }
      })
      // console.log(tasks)
      this.status[0].tasks = tasks0
      this.status[1].tasks = tasks1
      this.status[2].tasks = tasks2
      this.status[3].tasks = tasks3
    })
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
