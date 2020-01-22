<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Papan Knavan</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.modal-1 size="sm" class="mr-2">New Task</b-button>

          <b-modal id="modal-1" title="BootstrapVue" @ok="createNewTask">
            <form ref="form" @submit.stop.prevent>
              <!-- TITLE -->
              <b-form-group
                label="Title"
                label-for="title-input"
                invalid-feedback="Title is required"
              >
                <b-form-input
                  id="title-input"
                  v-model="newTask.title"
                  placeholder="Task Title"
                  required
                ></b-form-input>
              </b-form-group>

              <!-- DESCRIPTION -->
              <b-form-group
                label="Description"
                label-for="description-input"
                invalid-feedback="Description is required"
              >
                <b-form-textarea
                  id="description-input"
                  v-model="newTask.description"
                  placeholder="Task Short Description"
                  required
                ></b-form-textarea>
              </b-form-group>

              <!-- POINT -->
              <b-form-group
                label="Point"
                label-for="point-input"
                invalid-feedback="Point is required"
              >
                <b-form-input
                  id="point-input"
                  v-model="newTask.point"
                  type="number"
                  required
                ></b-form-input>
              </b-form-group>

              <!-- ASSIGNED TO -->
              <b-form-group
                label="AssignedTo"
                label-for="AssignedTo-input"
                invalid-feedback="Assigned To is required"
              >
                <b-form-input
                  id="AssignedTo-input"
                  v-model="newTask.assignedTo"
                  placeholder="Assigned To"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
          </b-modal>

          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      newTask: {
        title: null,
        description: null,
        point: null,
        assignedTo: null
      }
    };
  },
  methods: {
    createNewTask() {
      console.log(`OK`);
      this.$emit('addNewTask', this.newTask);
    }
  }
};
</script>

<style>
</style>