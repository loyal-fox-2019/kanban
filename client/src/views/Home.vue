<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app width=300 class="text-center">
      <div class="mt-3">
        <h2>Add task?</h2>
      <v-form @submit.prevent="add" class="my-3">
        <v-text-field
          label="Task Title"
          name="title"
          prepend-icon="mdi-clipboard-check"
          type="text"
          required
          v-model="title"
        />
        <v-text-field
          label="Asiigned to"
          name="desc"
          prepend-icon="mdi-account-plus"
          type="text"
          v-model="assigned"
        />
        <v-text-field
          label="Task Description"
          name="desc"
          prepend-icon="mdi-pencil-plus"
          type="text"
          v-model="desc"
        />
        <v-text-field
          label="Point"
          name="desc"
          prepend-icon="mdi-currency-usd"
          type="number"
          v-model="point"
        />
        <v-btn rounded class="m-2" color="primary" @click="add" dark>Add Task</v-btn>
      </v-form>
      </div>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Kanban</v-toolbar-title>
      <v-btn rounded color="primary" @click="logout" class="ml-auto" dark>Log Out</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row align="top" justify="center">
          <kanban-list :color="'#B2DFDB'" :listname="'BACKLOG'" :tasks="kanban.backlogs"/>
          <kanban-list :color="'#B2EBF2'" :listname="'TODO'" :tasks="kanban.todos"/>
          <kanban-list :color="'#80DEEA'" :listname="'DOING'" :tasks="kanban.doings"/>
          <kanban-list :color="'#AED581'" :listname="'DONE'" :tasks="kanban.dones"/>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import KanbanList from '../components/KanbanList'
export default {
  props: {
    source: String
  },
  components: {
    KanbanList
  },
  data: () => ({
    point: 100,
    assigned: '',
    title: '',
    desc: '',
    drawer: null,
    db: null,
    kanban: {
      backlogs: [],
      todos: [],
      doings: [],
      dones: []
    }
  }),
  methods: {
    logout () {
      firebase.auth().signOut()
    },
    add () {
      let db = firebase.firestore()
      db.collection('users').doc(localStorage.getItem('userId')).collection('kanbans')
        .add({
          title: this.title,
          desc: this.desc,
          assigned: this.assigned,
          point: this.point,
          status: 'backlog'
        })
        .then(() => {
          this.title = ''
          this.desc = ''
        })
    }
  },
  mounted () {
    let db = firebase.firestore()
    // snapshot
    db.collection('users').doc(localStorage.getItem('userId')).collection('kanbans')
      .onSnapshot((querySnapshot) => {
        let backlogs = []
        let todos = []
        let doings = []
        let dones = []
        querySnapshot.forEach(doc => {
          const task = { id: doc.id, ...doc.data() }
          // console.log(task)
          switch (task.status) {
            case 'todo': {
              todos.push(task)
              break
            }
            case 'backlog': {
              backlogs.push(task)
              break
            }
            case 'doing': {
              doings.push(task)
              break
            }
            case 'done': {
              dones.push(task)
              break
            }
          }
        })
        this.kanban.backlogs = backlogs
        this.kanban.todos = todos
        this.kanban.doings = doings
        this.kanban.dones = dones
      })
  }
}
</script>
