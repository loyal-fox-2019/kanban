<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand href="#">
        <strong>Kanban Realtime App</strong>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto"></b-navbar-nav>
        <b-button variant="primary" v-b-modal.modal-navbar>New Task</b-button>
      </b-collapse>
      <!-- Modal -->
    </b-navbar>
    <b-modal id="modal-navbar" ref="modal-add" title="New Task" hide-footer>
      <form>
        <div class="form-group">
          <label for="text">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Task Title"
            autocomplete="off"
            v-model="title"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            rows="2"
            placeholder="Task Short Description"
            autocomplete="off"
            v-model="description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="point">Point</label>
          <input
            type="number"
            class="form-control"
            id="point"
            placeholder="Point"
            autocomplete="off"
            v-model="point"
          />
        </div>
        <div class="form-group">
          <label for="text">Assigned To</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Assigned To"
            autocomplete="off"
            v-model="assignedTo"
          />
        </div>
        <button
          @click="$bvModal.hide('modal-navbar')"
          @click.prevent="sendDb"
          class="btn btn-primary w-100"
        >
          Submit
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import db from '../config/firebase'
export default {
  data() {
    return {
      title: '',
      description: '',
      point: 0,
      assignedTo: ''
    }
  },
  methods: {
    sendDb() {
      db.collection('Kanban')
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assignedTo: this.assignedTo,
          status: 'Back Log'
        })
        .then(docRef => {
          this.title = ''
          this.description = ''
          this.point = ''
          this.assignedTo = ''
        })
    }
  }
}
</script>
