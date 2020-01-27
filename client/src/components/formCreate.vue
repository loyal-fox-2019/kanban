<template>
  <div>
    <form @submit.prevent="create">
      <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="title"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <br />
        <textarea
          v-model="description"
          placeholder="Task Short Description"
          rows="2"
          cols="48%"
          class="ivu-input"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Point</label>
        <input
          v-model="point"
          type="number"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Assigned To</label>
        <input
          v-model="assignedTo"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <button @click="closeForm" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import db from "../config/firebase";
export default {
  data: function() {
    return {
      title: "",
      description: "",
      point: "",
      assignedTo: ""
    };
  },
  methods: {
    closeForm() {
      this.$emit("close");
    },
    create() {
      const obj = {
        title: this.title,
        description: this.description,
        point: this.point,
        assignTo: this.assignedTo,
        status: "back-log"
      };
      db.collection("kanban")
        .add(obj)
        .then(() => {
          console.log("sucess");
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