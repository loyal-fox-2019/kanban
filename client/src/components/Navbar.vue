<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="navbar">
      <b-navbar-brand href="#">Kanban</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div class="btn btn-primary" v-b-modal.modal-1>Add Task</div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal id="modal-1" title="New Task" hide-footer>
      <b-form @reset="onReset">
        <b-form-group id="input-group-1" label="Title" label-for="input-1">
          <b-form-input id="input-1" v-model="title" type="text" required placeholder="Enter title"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Description" label-for="input-3">
          <textarea v-model="description" cols="50"></textarea>
        </b-form-group>
        <b-form-group id="input-group-4" label="Point" label-for="input-4">
          <b-form-input id="input-4" v-model="point" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Assigned To" label-for="input-5">
          <b-form-input id="input-5" v-model="assignedTo" type="text" required></b-form-input>
        </b-form-group>

        <b-button
          v-on:click.prevent="onSubmit"
          @click="$bvModal.hide('modal-1')"
          variant="primary"
        >Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import db from "../config/firebase-config.js";
export default {
  name: "navbar",
  data() {
    return {
      title: "",
      description: "",
      point: null,
      assignedTo: "",
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      db.collection("kanban")
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assignedTo: this.assignedTo,
          status: "Back-Log"
        })
        .then(() => {
          this.show = false;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.title = "";
      this.description = "";
      this.point = "";
      this.assignedTo = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>
</style>