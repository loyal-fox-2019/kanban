<template>
  <b-card :header="taskDetail.title" header-tag="header" class="mb-3">
    <!-- {{taskDetail}} -->
    <b-card-text>{{taskDetail.description}}</b-card-text>
    <b-card-text>Assigned : {{taskDetail.assigned}}</b-card-text>
    <b-card-text>Point : {{taskDetail.point}}</b-card-text>
    <template v-slot:footer>
      <div class="d-flex justify-content-between">
        <b-button variant="outline-primary" :style="backButtonVisibilityStyle" @click="prevStatus">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <b-button variant="outline-primary" @click="destroyTask">
          <i class="far fa-trash-alt"></i> Delete
        </b-button>
        <b-button variant="outline-primary" :style="nextButtonVisibilityStyle" @click="nextStatus">
          <i class="fas fa-arrow-right"></i>
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "TaskCard",
  data() {
    return {
      db: firebase.firestore()
    };
  },
  props: ["taskDetail"],
  computed: {
    backButtonVisibilityStyle() {
      if (this.taskDetail.status === "backlog") {
        return "visibility:hidden";
      } else {
        return "";
      }
    },
    nextButtonVisibilityStyle() {
      if (this.taskDetail.status === "done") {
        return "visibility:hidden";
      } else {
        return "";
      }
    }
  },
  methods: {
    nextStatus() {
      let newStatus = "";
      switch (this.taskDetail.status) {
        case "backlog": {
          newStatus = "todo";
          break;
        }
        case "todo": {
          newStatus = "doing";
          break;
        }
        case "doing": {
          newStatus = "done";
          break;
        }
      }
      this.db
        .collection("tasks")
        .doc(this.taskDetail.id)
        .update({
          status: newStatus
        });
    },
    prevStatus() {
      let newStatus = "";
      switch (this.taskDetail.status) {
        case "done": {
          newStatus = "doing";
          break;
        }
        case "doing": {
          newStatus = "todo";
          break;
        }
        case "todo": {
          newStatus = "backlog";
          break;
        }
      }
      this.db
        .collection("tasks")
        .doc(this.taskDetail.id)
        .update({
          status: newStatus
        });
    },
    destroyTask() {
      this.db
        .collection("tasks")
        .doc(this.taskDetail.id)
        .delete()
    }
  }
};
</script>

<style scoped>
</style>