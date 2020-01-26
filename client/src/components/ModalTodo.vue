<template>
  <b-modal
    title="Details"
    title-tag="h4"
    title-class="d-flex w-100 justify-content-center"
    header-class="bg-warning"
    class="d-flex flex-column bg-light"
    :id="todo.info.id"
    centered
    hide-footer
  >
    <table class="my-4">
      <tr>
        <td>Title</td>
        <td class="pl-4">:</td>
        <td class="pl-4">{{ todo.info.title }}</td>
      </tr>

      <tr>
        <td>Description</td>
        <td class="pl-4">:</td>
        <td class="pl-4">{{ todo.info.description }}</td>
      </tr>

      <tr>
        <td>Point</td>
        <td class="pl-4">:</td>
        <td class="pl-4">{{ todo.info.point }}</td>
      </tr>

      <tr>
        <td>Assigned To</td>
        <td class="pl-4">:</td>
        <td class="pl-4">{{ todo.info.assignedTo }}</td>
      </tr>
    </table>

    <div class="border-top my-2 d-flex justify-content-end">
      <b-button
        class="mt-2 mr-4"
        type="delete"
        variant="danger"
        @click="deleteTask(todo.info.id)"
      >
        Delete
      </b-button>
      <b-button
        class="mt-2"
        type="submit"
        variant="success"
        @click="update(todo.info.id, todo.updateTo)"
      >
        {{ todo.updateTo }}
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import db from '../config/firebase'
export default {
  name: 'ModalTodo',
  props: ['todo'],
  methods: {
    deleteTask(docId) {
      db.collection('todos')
        .doc(docId)
        .delete()
        .then(result => {
          // eslint-disable-next-line
          console.log(result)
          this.$bvModal.hide(docId)
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    update(docId, updateTo) {
      db.collection('todos')
        .doc(docId)
        .update({ status: updateTo })
        .then(result => {
          // eslint-disable-next-line
          console.log(result)
          this.$bvModal.hide(docId)
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
