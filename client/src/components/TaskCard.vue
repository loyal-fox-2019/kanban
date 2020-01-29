<template>
    <b-card border-variant="light" :header="forTaskCard.title" class="text-left my-1">
        <b-card-text>Poin: {{forTaskCard.point}}</b-card-text>
        <b-card-text>Assigned to:  {{forTaskCard.assigned}}</b-card-text>
        <!-- modal -->
        <b-button @click="$bvModal.show(`modal-${forTaskCard.id}`)">Show Detail</b-button>

        <b-modal :id="'modal-'+forTaskCard.id" :title="forTaskCard.title+':'+forTaskCard.assigned" hide-footer>
            <p>Task Description:</p>
            <p>{{forTaskCard.description}}</p>
            <p>Point:</p>
            <p>{{forTaskCard.point}}</p>
            <p>Status:</p>
            <p>{{forTaskCard.status}}</p>
            <b-row align-h="around">
            <b-button variant="warning" id="toBack" v-if="forTaskCard.status=='To-Do'">Back-Log</b-button>
            <b-popover target="toBack" triggers="click" placement="top">
              <template v-slot:title>Are You Sure?</template>
              <b-button class="mx-1" variant="primary" @click="prevBack(forTaskCard.id)">yes</b-button>
              <b-button @click="closePop" variant="danger">no</b-button>
            </b-popover>
            <b-button variant="warning" id="toTodo" v-if="forTaskCard.status=='Doing'">To-Do</b-button>
            <b-popover target="toTodo" triggers="click" placement="top">
              <template v-slot:title>Are You Sure?</template>
              <b-button class="mx-1" variant="primary" @click="toTodo(forTaskCard.id)">yes</b-button>
              <b-button @click="closePop" variant="danger">no</b-button>
            </b-popover>
            <b-button variant="warning" id="toDoingPop" v-if="forTaskCard.status=='Done'">Doing</b-button>
            <b-popover target="toDoingPop" triggers="click" placement="top">
              <template v-slot:title>Are You Sure?</template>
              <b-button class="mx-1" variant="primary" @click="toDoing(forTaskCard.id)">yes</b-button>
              <b-button @click="closePop" variant="danger">no</b-button>
            </b-popover>
            <b-button variant="danger" id="deletePop">Delete</b-button>
            <b-popover target="deletePop" triggers="click" placement="top">
              <template v-slot:title>Are You Sure?</template>
              <b-button class="mx-1" variant="danger" @click="deleteTask(forTaskCard.id)">yes</b-button>
              <b-button @click="closePop" variant="primary">no</b-button>
            </b-popover>
            <b-button variant="success" id="nextTodo" v-if="forTaskCard.status=='Back-Log'">To-Do</b-button>
            <b-popover target="nextTodo" triggers="click" placement="top">
              <template v-slot:title>Are You Sure?</template>
              <b-button class="mx-1" variant="primary" @click="toTodo(forTaskCard.id)">yes</b-button>
              <b-button @click="closePop" variant="danger">no</b-button>
            </b-popover>
            <b-button variant="success" id="nextDoing" v-if="forTaskCard.status=='To-Do'">Doing</b-button>
            <b-popover target="nextDoing" triggers="click" placement="top">
              <template v-slot:title>Are You Sure?</template>
              <b-button class="mx-1" variant="primary" @click="toDoing(forTaskCard.id)">yes</b-button>
              <b-button @click="closePop" variant="danger">no</b-button>
            </b-popover>
            <b-button variant="success" id="toDone" v-if="forTaskCard.status=='Doing'">Done</b-button>
            <b-popover target="toDone" triggers="click" placement="top">
              <template v-slot:title>Are You Sure?</template>
              <b-button class="mx-1" variant="primary" @click="nextDone(forTaskCard.id)">yes</b-button>
              <b-button @click="closePop" variant="danger">no</b-button>
            </b-popover>
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
      this.$bvModal.hide(`modal-${id}`)
    },
    toDoing (id) {
      db.collection('tasks').doc(id).update({
        status: 'Doing'
      })
      this.$bvModal.hide(`modal-${id}`)
    },
    nextDone (id) {
      db.collection('tasks').doc(id).update({
        status: 'Done'
      })
      this.$bvModal.hide(`modal-${id}`)
    },
    prevBack (id) {
      db.collection('tasks').doc(id).update({
        status: 'Back-Log'
      })
      this.$bvModal.hide(`modal-${id}`)
    },
    deleteTask (id) {
      db.collection('tasks').doc(id).delete()
        .then(() => {
          this.$root.$emit('bv::hide::popover')
        })
    },
    closePop () {
      this.$root.$emit('bv::hide::popover')
    }
  }
}
</script>

<style scoped>

</style>
