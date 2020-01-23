<template>
  <div>
    <div class="card overflow-auto">
      <div class="card-header">{{perActivity.title}}</div>
      <div class="card-body">
        <p class="card-text">Point: {{perActivity.point}}</p>
        <p class="card-text">Assigned To: {{perActivity.assignedTo}}</p>
        <div
          class="btn btn-primary"
          v-b-modal="'modal-detail' + getId +perActivity.status"
        >Go somewhere</div>
      </div>
    </div>
    <b-modal
      :id="'modal-detail'+getId + perActivity.status"
      :title="'Assigned to: ' +perActivity.assignedTo"
      hide-footer
    >
      <h4 class="my-4">Task Description</h4>
      <p>{{perActivity.description}}</p>

      <h4 class="my-4">Point</h4>
      <p>{{perActivity.point}}</p>

      <h4 class="my-4">Status</h4>
      <p>{{perActivity.status}}</p>
      <div class="d-flex justify-content-between">
        <div
          class="btn btn-warning mx-2"
          @click="$bvModal.hide('modal-detail' + getId +perActivity.status)"
          v-on:click="jadiTodo"
        >To Do</div>
        <div
          class="btn btn-primary mx-2"
          @click="$bvModal.hide('modal-detail' + getId +perActivity.status)"
          v-on:click="jadiDoing"
        >Doing</div>
        <div
          class="btn btn-success mx-2"
          @click="$bvModal.hide('modal-detail' + getId +perActivity.status)"
          v-on:click="jadiDone"
        >Done</div>
        <div
          class="btn btn-danger mx-2"
          @click="$bvModal.hide('modal-detail' + getId +perActivity.status)"
          v-on:click="hapus"
        >Delete</div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import db from "../config/firebase-config.js";
export default {
  name: "miniCard",
  props: ["perActivity", "id"],
  methods: {
    jadiTodo() {
      // let tadi = doc._document.proto.fields.status.stringValue
      db.collection("kanban")
        .doc(this.perActivity.id)
        .update({
          status: "To-do"
        });
    },
    jadiDoing() {
      db.collection("kanban")
        .doc(this.perActivity.id)
        .update({
          status: "Doing"
        });
    },
    jadiDone() {
      db.collection("kanban")
        .doc(this.perActivity.id)
        .update({
          status: "Done"
        });
    },
    hapus() {
      db.collection("kanban")
        .doc(this.perActivity.id)
        .delete()
        .then(function() {
          console.log("successfully deleted");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    getId() {
      return this.id.toString();
    }
  }
};
</script>

<style scoped>
.card {
  max-height: 100vh;
}
</style>