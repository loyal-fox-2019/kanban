<template>
  <div class="card" style="width: 17.5rem;">
    <div class="card-header">{{headerTitle}}</div>
    <div class="card-body">
      <div v-for="(kanban, i) in isiKanban" :key="i" class="card mt-2" style="width: 15rem;">
        <div class="card-body">
          <h4 class="card-title">{{kanban.title}}</h4>
          <h6 class="card-title">{{kanban.description}}</h6>
          <p class="card-text">Point: {{kanban.point}} | Assing to: {{kanban.assignTo}}</p>
          <div class="d-flex justify-content-around">
            <button @click.prevent="preview(kanban.id)" class="card-link">preview</button>
            <button @click.prevent="remove(kanban.id)" class="card-link">delete</button>
            <button @click.prevent="next(kanban.id)" class="card-link">next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import db from "../assets/config";
export default {
  name: "card",
  props: ["headerTitle", "isiKanban"],
  methods: {
    remove(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(remove => {
          if (remove.value) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            return db
              .collection("kanban")
              .doc(id)
              .delete();
          }
        })
        .then(() => {
          // this.$emit("checkKanban");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    },
    preview(id) {
      const data = db.collection("kanban").doc(id);
      let prevHeader;
      if (this.headerTitle === "done") {
        prevHeader = "doing";
      } else if (this.headerTitle === "doing") {
        prevHeader = "to-do";
      } else if (this.headerTitle === "to-do") {
        prevHeader = "back-log";
      } else {
        prevHeader = "hilang";
      }
      return db
        .runTransaction(transaction =>
          transaction.get(data).then(kanvan => {
            if (!kanvan.exists) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Document Not Found"
              });
            }
            transaction.update(data, { status: prevHeader });
          })
        )
        .then(() => {
          this.$emit("checkKanban");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    },
    next(id) {
      const data = db.collection("kanban").doc(id);
      let nextHeader;
      if (this.headerTitle === "back-log") {
        nextHeader = "to-do";
      } else if (this.headerTitle === "to-do") {
        nextHeader = "doing";
      } else if (this.headerTitle === "doing") {
        nextHeader = "done";
      } else {
        nextHeader = "hilang";
      }
      return db
        .runTransaction(transaction =>
          transaction.get(data).then(kanvan => {
            if (!kanvan.exists) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Document Not Found"
              });
            }
            transaction.update(data, { status: nextHeader });
          })
        )
        .then(() => {
          this.$emit("checkKanban");
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