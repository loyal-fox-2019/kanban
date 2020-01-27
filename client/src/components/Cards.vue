<template>
  <div class="card mt-2 mb-2" style="width: 15rem;margin-left: 5%">
    <div class="card-header">{{isi.title}}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Point: {{isi.point}}</li>
      <li class="list-group-item">Assigned To: {{isi.assignTo}}</li>
      <div>
        <b-button id="show-btn" @click="$bvModal.show(isi.id)">Detail</b-button>

        <b-modal :id="isi.id" hide-footer>
          <template v-slot:modal-title>Deatail Task: {{isi.title}} for {{isi.assignTo}}</template>
          <div class="d-block text-center">
            <p>Task Description: {{isi.title}}</p>
            <p>Point: {{isi.point}}</p>
            <p>Status: {{isi.status}}</p>
          </div>
          <div class="d-flex justify-content-between">
            <div v-if="before">
              <button @click="beforeKanban(isi.id)" type="button" class="btn btn-success">{{before}}</button>
            </div>
            <button @click="deleteKanban(isi.id)" type="button" class="btn btn-danger">Delete</button>
            <div v-if="after">
              <button @click="nextKanban(isi.id)" type="button" class="btn btn-success">{{after}}</button>
            </div>
            <!-- <b-button class="mt-3" block @click="$bvModal.hide(isi.id)">Close Me</b-button> -->
          </div>
        </b-modal>
      </div>
    </ul>
  </div>
</template>

<script>
import db from "../config/firebase";
export default {
  props: ["isi", "before", "after"],
  methods: {
    deleteKanban(isi) {
      db.collection("kanban")
        .doc(isi)
        .delete()
        .then(() => {
          console.log("success");
          this.$bvModal.hide(isi);
        })
        .catch(err => {
          console.log(err);
        });
    },
    nextKanban(isi) {
      db.collection("kanban")
        .doc(isi)
        .update({ status: this.after })
        .then(() => {
          console.log("success");
          this.$bvModal.hide(isi);
        })
        .catch(err => {
          console.log(err);
        });
    },
    beforeKanban(isi) {
      db.collection("kanban")
        .doc(isi)
        .update({ status: this.before })
        .then(() => {
          console.log("success");
          this.$bvModal.hide(isi);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>