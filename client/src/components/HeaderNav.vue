<template>
  <div>
    <!-- As a heading -->
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">KanMarz</a>
        <form class="form-inline">
          <b-button v-b-modal.modal-lg variant="primary">New Task</b-button>
        </form>
      </div>
    </nav>

    <b-modal id="modal-lg" size="lg" title="Add New Task" hide-footer>
      <b-form>
        <b-form-group id="input-group-1" label="Title" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            required
            placeholder="Task Title"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Description"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.description"
            required
            placeholder="Task Description"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Point" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.point"
            required
            placeholder="Task Point"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Assigned to"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="form.assigned"
            required
            placeholder="Assigned to"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Status" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.status"
            :options="status"
            required
          ></b-form-select>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="mr-2"
          @click.prevent="inputData"
          >Submit</b-button
        >
        <b-button type="reset" variant="danger" @click.prevent="resetData"
          >Reset</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import db from '../config/firebase'
import Swal from 'sweetalert2'

const todoCollection = db.collection('kanmarz')

export default {
  name: 'HeaderNav',
  data() {
    return {
      form: {
        title: '',
        description: '',
        point: '',
        assigned: '',
        status: ''
      },
      status: ['backlog', 'todo', 'doing', 'done']
    }
  },
  methods: {
    resetData() {
      this.form.title = ''
      this.form.description = ''
      this.form.point = ''
      this.form.assigned = ''
      this.form.status = ''
    },
    inputData() {
      const data = this.form

      todoCollection
        .add(data)
        .then(() => {
          this.form.title = ''
          this.form.description = ''
          this.form.point = ''
          this.form.assigned = ''
          this.form.status = ''
          this.$bvModal.hide('modal-lg')
          Swal.fire('Success!', 'New task added', 'success')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    }
  }
}
</script>

<style lang="css" scoped></style>
