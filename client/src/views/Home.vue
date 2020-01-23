<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!-- <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
      <!-- <v-content> -->
      <div class="mt-3">
        <h2>Add task?</h2>
      <v-form @submit.prevent="add" class="my-auto">
        <v-text-field
          label="Task Title"
          name="title"
          prepend-icon="person"
          type="text"
          v-model="title"
        />
        <v-text-field
          label="Task Description"
          name="desc"
          prepend-icon="person"
          type="text"
          v-model="desc"
        />
        <v-btn rounded color="primary" @click="add" dark>Add Task</v-btn>
      </v-form>
      </div>
    <!-- </v-content> -->
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Kanban</v-toolbar-title>
      <v-btn rounded color="primary" @click="logout" class="ml-auto" dark>Log Out</v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <kanban-list :listname="'BACKLOG'" :tasks="kanban.backlogs"/>
          <kanban-list :listname="'TODO'" :tasks="kanban.todos"/>
          <kanban-list :listname="'DOING'" :tasks="kanban.doings"/>
          <kanban-list :listname="'DONE'" :tasks="kanban.dones"/>
          <!-- <v-col class="text-center">todo</v-col>
          <v-col class="text-center">doing</v-col>
          <v-col class="text-center">done</v-col> -->
        </v-row>
      </v-container>
    </v-content>
    <!-- <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>-->
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
      // .then(() => {
      //   this.$router.push('/login')
      // })
    },
    add () {
      let db = firebase.firestore()
      db.collection('users').doc(localStorage.getItem('userId')).collection('kanbans')
        .add({
          title: this.title,
          desc: this.desc,
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
