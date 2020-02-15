<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light">
        <b-navbar-brand href="#" id="brand">KamVan Board</b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button variant="outline-dark" v-b-modal.modal-1>
                <b-icon icon="plus"></b-icon> New Task
              </b-button>
            </b-nav-form>
        </b-navbar-nav>
        <!-- modal -->
        <b-modal
        id="modal-1"
        title="New Task"
        hide-footer
        ref="my-modal">
          <b-form @submit.prevent="writeTask">
            <h5>Title</h5>
            <b-input placeholder="Task Title" v-model="title"></b-input>
            <h5>Description</h5>
            <b-textarea placeholder="Task Short Description" v-model="description"></b-textarea>
            <h5>Point</h5>
            <b-input placeholder="Task Point" v-model="point"></b-input>
            <h5>Assigned to</h5>
            <b-input placeholder="Assigned To" v-model="assignedTo"></b-input>
            <hr>
            <br>
            <b-button class="newtask" type="submit" variant="dark">Save</b-button>
            <b-button class="newtask" @click="hidemodal" variant="light">Cancel</b-button>
          </b-form>
        </b-modal>
    </b-navbar>
  </div>
</template>

<script>
import db from '../config/firebase'

export default {
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assignedTo: ''
    }
  },
  methods: {
    hidemodal: function () {
      this.$refs['my-modal'].hide()
    },
    writeTask: function () {
      let input = {
        title: this.title,
        description: this.description,
        point: this.point,
        assignedTo: this.assignedTo,
        status: 'Back-Log'
      }
      db.collection('task').add(input)
        .then((data) => {
          this.$refs['my-modal'].hide()
        })
    }
  }
}
</script>

<style>
#brand {
  color: black
}

.newtask{
  position: relative;
  float: right;
  margin-left: 10px;
}

</style>
