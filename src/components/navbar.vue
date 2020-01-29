<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          src="https://cdn141.picsart.com/294673609243211.png?r1024x1024"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt
        />
        A N B A N
      </a>
      <b-button v-b-modal.modal-prevent-closing class="btn btn-secondary btn-sm">Add Kanban</b-button>
      <b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Kanban" hide-footer>
        <form ref="form" @submit.prevent="handleSubmit">
          <b-form-group label="Title" label-for="titile-input" invalid-feedback="Title is required">
            <b-form-input id="title-input" v-model="title" required></b-form-input>
          </b-form-group>
          <b-form-group
            label="Description"
            label-for="description-input"
            invalid-feedback="description is required"
          >
            <b-form-input id="description-input" v-model="description" required></b-form-input>
          </b-form-group>
          <b-form-group label="Point" label-for="point-input" invalid-feedback="point is required">
            <b-form-input id="point-input" v-model="point" required></b-form-input>
          </b-form-group>
          <b-form-group
            label="Assigned To"
            label-for="assignedTo-input"
            invalid-feedback="assignedTo is required"
          >
            <b-form-input id="assignedTo-input" v-model="assignedTo" required></b-form-input>
            <button class="mt-3" type="submit" style="margin-left:400px">add</button>
          </b-form-group>
        </form>
      </b-modal>
    </nav>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import db from "../assets/config";
export default {
  data() {
    return {
      title: "",
      description: "",
      point: "",
      assignedTo: ""
    };
  },
  methods: {
    handleSubmit() {
      db.collection("kanban")
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assignedTo: this.assignedTo,
          status: "back-log",
          createdAt: new Date()
        })
        .then(data => {
          this.title = "";
          this.description = "";
          this.point = "";
          this.assignedTo = "";
          this.$bvModal.hide("modal-prevent-closing");
          Swal.fire("Good job!", "add kanban", "success");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    }
  }
};
</script>

<style>
</style>