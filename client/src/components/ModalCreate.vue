<template>
  <div class="d-flex justify-content-end mt-5 mr-5">
    <b-button v-b-modal.modal-create variant="primary">New Todo</b-button>

    <b-modal
      title="Create New Todo"
      title-tag="h4"
      title-class="d-flex w-100 justify-content-center"
      header-class="bg-warning"
      id="modal-create"
      centered
      hide-footer
    >
      <b-form @submit.prevent="create" class="bg-light">
        <b-form-group label="Title" label-for="" description="Title">
          <b-form-input v-model="title" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group label="Description: " label-for="">
          <b-form-input
            v-model="description"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Point: " label-for="">
          <b-form-input v-model="point" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group label="Assisgned to: " label-for="">
          <b-form-input
            v-model="assignedTo"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <div class="w-100 d-flex justify-content-end">
          <b-button class="mr-4" type="submit" variant="primary"
            >Submit</b-button
          >
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import db from '../config/firebase'
export default {
  name: 'ModalCreate',
  data() {
    return {
      title: '',
      description: '',
      point: '',
      assignedTo: ''
    }
  },
  methods: {
    create() {
      const data = {
        title: this.title,
        description: this.description,
        point: this.point,
        assignedTo: this.assignedTo,
        status: 'Back-Log'
      }
      db.collection('todos')
        .doc()
        .set(data)
        .then(result => {
          this.$bvModal.hide('modal-create')
          // eslint-disable-next-line
          console.log(result)
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
