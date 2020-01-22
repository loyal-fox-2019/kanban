<template>
    <b-card border-variant="light" :header="forTaskCard.title" class="text-left my-1">
        <b-card-text>Poin: {{forTaskCard.point}}</b-card-text>
        <b-card-text>Assigned to:  {{forTaskCard.assigned}}</b-card-text>
        <!-- modal -->
        <b-button @click="$bvModal.show(`modal-${forTaskCard.id}`)">Show Detail</b-button>

        <b-modal :id="'modal-'+forTaskCard.id" :title="forTaskCard.title" hide-footer>
            <p>Task Description:</p>
            <p>{{forTaskCard.description}}</p>
            <p>Point:</p>
            <p>{{forTaskCard.point}}</p>
            <p>Status:</p>
            <p>{{forTaskCard.status}}</p>
            <b-row align-h="around">
            <b-button variant="warning" v-if="forTaskCard.status=='To-Do'" @click="prevBack(forTaskCard.id)">Back-Log</b-button>
            <b-button variant="warning" v-if="forTaskCard.status=='Doing'" @click="toTodo(forTaskCard.id)">To-Do</b-button>
            <b-button variant="warning" v-if="forTaskCard.status=='Done'" @click="toDoing(forTaskCard.id)">Doing</b-button>
            <b-button variant="danger" @click="deleteTask(forTaskCard.id)">Delete</b-button>
            <b-button variant="success" v-if="forTaskCard.status=='Back-Log'" @click="toTodo(forTaskCard.id)">To-Do</b-button>
            <b-button variant="success" v-if="forTaskCard.status=='To-Do'" @click="toDoing(forTaskCard.id)">Doing</b-button>
            <b-button variant="success" v-if="forTaskCard.status=='Doing'" @click="nextDone(forTaskCard.id)">Done</b-button>
            </b-row>
        </b-modal>
  <!-- modal -->
      </b-card>
</template>

<script>
import db from '../config/firebase'
export default {
  name: 'TaskCard',
  props: {
    forTaskCard: Object
  },
  methods: {
    toTodo (id) {
      db.collection('tasks').doc(id).update({
        status: 'To-Do'
      })
    },
    toDoing (id) {
      db.collection('tasks').doc(id).update({
        status: 'Doing'
      })
    },
    nextDone (id) {
      db.collection('tasks').doc(id).update({
        status: 'Done'
      })
    },
    prevBack (id) {
      db.collection('tasks').doc(id).update({
        status: 'Back-Log'
      })
    },
    deleteTask (id) {
      db.collection('tasks').doc(id).delete()
        .then(() => {
          console.log('Deleted')
        })
    }
  }
}
</script>

<style scoped>

</style>
