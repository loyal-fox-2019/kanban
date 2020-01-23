<template>
  <div class="card mb-3">
    <div class="card-header task-header">{{ itemTask.title }}</div>
    <div class="card-body set-body">
      <p>Point : {{ itemTask.point }}</p>
      <p>Assigned To: {{ itemTask.assignedTo }}</p>
    </div>
    <div class="card-footer">
      <b-button variant="primary" @click="$bvModal.show(itemTask.id)"
        >Show Detail</b-button
      >
    </div>
    <!-- Modal -->
    <b-modal :id="itemTask.id" hide-footer>
      <h4 align="center">{{ itemTask.title }} for {{ itemTask.assignedTo }}</h4>
      <div class="my-4">
        <div class="task-description">
          <h6>Task Description:</h6>
          <p class="mb-2">{{ itemTask.description }}</p>
          <h6>Point :</h6>
          <p class="mb-2">{{ itemTask.point }}</p>
          <h6>Status :</h6>
          <p class="mb-3">{{ itemTask.status }}</p>
        </div>
        <div class="d-flex justify-content-around">
          <button
            class="btn btn-danger"
            v-if="itemTask.status === 'To Do'"
            @click="setasBacklog(itemTask.id)"
          >
            Move to Back-Log
          </button>
          <button
            class="btn btn-warning"
            @click="setasTodo(itemTask.id)"
            v-if="itemTask.status === 'Back Log' || itemTask.status === 'Doing'"
          >
            Move to To Do
          </button>
          <button
            class="btn btn-primary"
            @click="setasDoing(itemTask.id)"
            v-if="itemTask.status === 'To Do' || itemTask.status === 'Done'"
          >
            Move To Doing
          </button>
          <button class="btn btn-dark" @click="deleteTask(itemTask.id)">
            Delete Task
          </button>
          <button
            class="btn btn-success"
            @click="setasDone(itemTask.id)"
            v-if="itemTask.status === 'Doing'"
          >
            Move To Done
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import db from '../config/firebase'
export default {
  props: ['itemTask'],
  data() {
    return {}
  },
  methods: {
    setasTodo(id) {
      db.collection('Kanban')
        .doc(id)
        .update({
          status: 'To Do'
        })
    },
    setasBacklog(id) {
      db.collection('Kanban')
        .doc(id)
        .update({
          status: 'Back Log'
        })
    },
    setasDoing(id) {
      db.collection('Kanban')
        .doc(id)
        .update({
          status: 'Doing'
        })
    },
    setasDone(id) {
      db.collection('Kanban')
        .doc(id)
        .update({
          status: 'Done'
        })
    },
    deleteTask(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          db.collection('Kanban')
            .doc(id)
            .delete()
            .then(() => {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            })
        }
      })
      db.collection('Kanban')
        .doc(id)
        .delete()
    }
  }
}
</script>

<style>
.task-header {
  font-weight: 700;
  text-align: left;
  border: 1px solid #cecece;
  border-top: none;
  background-color: #fff!Important;
}
.set-body {
  text-align: left!Important;
  padding: 5px!Important;
}
.set-body p {
  margin: 8px;
}
</style>
