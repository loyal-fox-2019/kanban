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
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Kanban"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="title"
            label="Title"
            label-for="titile-input"
            invalid-feedback="Title is required"
          >
            <b-form-input id="title-input" v-model="title" :state="title" required></b-form-input>
          </b-form-group>
          <b-form-group
            :state="description"
            label="Description"
            label-for="description-input"
            invalid-feedback="description is required"
          >
            <b-form-input
              id="description-input"
              v-model="description"
              :state="description"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            :state="point"
            label="Point"
            label-for="point-input"
            invalid-feedback="point is required"
          >
            <b-form-input id="point-input" v-model="point" :state="point" required></b-form-input>
          </b-form-group>
          <b-form-group
            :state="assignedTo"
            label="Assigned To"
            label-for="assignedTo-input"
            invalid-feedback="assignedTo is required"
          >
            <b-form-input id="assignedTo-input" v-model="assignedTo" :state="assignedTo" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      point: "",
      assignedTo: ""
    };
  }
};
</script>

<style>
</style>