<template>
  <div class="card">
    <div class="card-header">
      <p>{{ item.title }}</p>
    </div>
    <div class="card-body text-left">
      <p>Point: {{ item.point }}</p>
      <p>Assign To: {{ item.assign_to }}</p>
    </div>
    <div class="card-footer">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Show Detail
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {{ item.title }}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <p>Description: {{ item.description }}</p>
              <p>Point: {{ item.point }}</p>
              <p>Status: {{ item.status }}</p>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                @click="toPrev"
                v-if="isPrev"
              >
                {{ prev }}
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="toDelete"
              >
                Delete
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
                @click="toNext"
                v-if="isNext"
              >
                {{ next }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "task-item",
  created() {
    console.log(this.item.status);
    switch (this.item.status) {
      case "back_log":
        this.next = "to_do";
        this.isNext = true;
        break;
      case "to_do":
        this.prev = "Back Log";
        this.next = "in_progress";
        this.isPrev = true;
        this.isNext = true;
        break;
      case "in_progress":
        this.prev = "to_do";
        this.next = "completed";
        this.isPrev = true;
        this.isNext = true;
        break;
      case "completed":
        this.prev = "in_progress";
        this.isPrev = true;
        break;
    }
  },
  data() {
    return {
      prev: "",
      next: "",
      isPrev: false,
      isNext: false
    };
  },
  methods: {
    toDelete() {

    },
    toPrev() {
      console.log(this.item);
      console.log(this.item.id);
      this.$firestoredb.collection("tasks")
        .doc(this.item.id)
        .set({
          status: this.prev
        })
        .then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
    },
    toNext() {
      console.log(this.item);
      console.log(this.item.id);
      this.$firestoredb.collection("tasks")
        .doc(this.item.id)
        .set({
          status: this.next
        })
        .then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
    }
  },
  props: ["item"]
};
</script>
