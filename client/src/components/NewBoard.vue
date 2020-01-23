<template>
  <div>
    <b-button variant="outline-primary" size="sm" v-b-modal.new-task-modal>
      New Board
    </b-button>

    <b-modal id="new-task-modal" centered title="New Task" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Title" label-for="title">
          <b-form-input
            id="title"
            v-model="form.title"
            type="text"
            required
            placeholder="Task title"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Description"
          label-for="description"
        >
          <b-form-textarea
            id="textarea"
            v-model="form.description"
            placeholder="Task Description..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-3" label="Point" label-for="point">
          <b-form-input
            id="point"
            v-model="form.point"
            type="number"
            placeholder="Task point priority"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Assigned To"
          label-for="assignedTo"
        >
          <b-form-input
            id="assignedTo"
            v-model="form.assignedTo"
            type="text"
            placeholder="Task assigned"
          ></b-form-input>
        </b-form-group>

        <div class="text-center">
          <b-button type="submit" size="sm" variant="primary" block>
            Save
          </b-button>
          <b-row class="justify-content-center">
            <b-col cols="6">
              <b-button
                type="button"
                size="sm"
                variant="outline-secondary"
                class="mt-2"
                @click.prevent="$bvModal.hide('new-task-modal')"
                block
              >
                Cancel
              </b-button>
            </b-col>
            <b-col cols="6">
              <b-button
                type="reset"
                size="sm"
                variant="outline-danger"
                class="mt-2"
                block
              >
                Reset
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
const db = require('@/config/firebaseConfig.js');

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        point: null,
        assignedTo: '',
        status: 'Back-Log',
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      // Add a new document with a generated id.
      db.collection('todos')
        .add(this.form)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.$bvModal.hide('new-task-modal');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          this.$bvModal.hide('new-task-modal');
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.title = '';
      this.form.description = '';
      this.form.point = null;
      this.form.assignedTo = [];
    },
  },
};
</script>

<style scoped>
div {
  font-size: 13px;
}
</style>
