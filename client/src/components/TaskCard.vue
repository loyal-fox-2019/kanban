<template>
  <div>
    <div class="card mt-2" style="width: 100%; cursor: grab;">
      <div class="card-body">
        <h5 class="card-title">{{ task.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Point: {{ task.point }}</h6>
        <p class="card-text">
          {{ task.description }}
        </p>
        <h6 class="card-subtitle mb-2 text-muted">
          Assigned to: {{ task.assigned }}
        </h6>
        <a
          href="#"
          id="deleteBtn"
          class="card-link btn btn-danger"
          @click.prevent="deleteTask(task.id)"
          >Delete Task</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import db from '../config/firebase'

const todoCollection = db.collection('kanmarz')

export default {
  name: 'TaskCard',
  data() {
    return {}
  },
  props: ['task'],
  methods: {
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
          todoCollection
            .doc(id)
            .delete()
            .then(() => {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .card {
    border: 2px solid black;
  }
</style>
