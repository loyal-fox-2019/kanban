<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-subtitle>{{task.title}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{task.desc}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="text-center">
      <v-btn class="mx-auto" v-if="task.status == 'backlog'" @click="destroy" text>DEL</v-btn>
      <v-btn class="mx-auto" v-if="task.status !== 'backlog'" @click="prev" text>Prev</v-btn>
      <v-btn class="mx-auto" v-if="task.status !== 'done'" @click="next" text>Next</v-btn>
      <v-btn class="mx-auto" v-if="task.status == 'done'" @click="destroy" text>DEL</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'KanbanItem',
  props: {
    task: Object
  },
  methods: {
    next () {
      let update = ''
      switch (this.task.status) {
        case 'backlog': {
          update = 'todo'
          break
        }
        case 'todo': {
          update = 'doing'
          break
        }
        case 'doing': {
          update = 'done'
          break
        }
      }
      let db = firebase.firestore()
      db.collection('users').doc(localStorage.getItem('userId')).collection('kanbans').doc(this.task.id)
        .update({
          status: update
        })
    },
    prev () {
      let update = ''
      switch (this.task.status) {
        case 'done': {
          update = 'doing'
          break
        }
        case 'todo': {
          update = 'backlog'
          break
        }
        case 'doing': {
          update = 'todo'
          break
        }
      }
      let db = firebase.firestore()
      db.collection('users').doc(localStorage.getItem('userId')).collection('kanbans').doc(this.task.id)
        .update({
          status: update
        })
    },
    destroy () {
      let db = firebase.firestore()
      db.collection('users').doc(localStorage.getItem('userId')).collection('kanbans').doc(this.task.id)
        .delete()
    }
  }
}
</script>

<style>

</style>
