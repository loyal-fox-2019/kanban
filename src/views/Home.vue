<template>
  <div>
    <div>
      <b-navbar toggleable="md" type="light" variant="light" fixed="top">
        <b-navbar-brand href="#">My Kanban Board</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav>
              <b-button variant="outline-primary" v-b-modal.addTaskModal><i class="far fa-plus-square"></i> New Task</b-button>
              <b-modal id="addTaskModal" title="Add New Task" hide-footer size="lg">
                <form @submit.prevent="addTask">
                  <div class="form-group">
                    <label for="task">Task :</label>
                    <input
                      type="text"
                      class="form-control"
                      id="task"
                      v-model="dataInput.title"
                      required
                      autofocus
                    />
                  </div>
                  <div class="form-group">
                    <label for="description">Description :</label>
                    <textarea
                      class="form-control"
                      id="description"
                      rows="4"
                      v-model="dataInput.description"
                      required
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="assigned">Assigned To :</label>
                    <input
                      type="text"
                      class="form-control"
                      id="assigned"
                      v-model="dataInput.assigned"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="point">Point :</label>
                    <input
                      type="text"
                      class="form-control"
                      id="point"
                      v-model="dataInput.point"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-success">Submit</button>
                </form>
              </b-modal>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="d-flex mt-5 pt-4">
      <main-kanban-card card-title="Backlog" card-variant="danger" :taskList="kanbanList.backlog" icon-title-card="far fa-sticky-note"></main-kanban-card>
      <main-kanban-card card-title="Todo" card-variant="secondary" :taskList="kanbanList.todo" icon-title-card="far fa-list-alt"></main-kanban-card>
      <main-kanban-card card-title="Doing" card-variant="primary" :taskList="kanbanList.doing" icon-title-card="fas fa-wrench"></main-kanban-card>
      <main-kanban-card card-title="Done" card-variant="success" :taskList="kanbanList.done" icon-title-card="far fa-check-square"></main-kanban-card>
    </div>
  </div>
</template>



<script>
// @ is an alias to /src
import firebase from "firebase";
import MainKanbanCard from "../components/MainKanbanCard";

export default {
  name: "home",
  components: {
    MainKanbanCard
  },
  data() {
    return {
      db: firebase.firestore(),
      dataInput: {
        title: null,
        description: null,
        assigned: null,
        point: null
      },
      kanbanList: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      }
    };
  },
  methods: {
    addTask: function() {
      this.$bvModal.hide("addTaskModal");
      let db = firebase.firestore();
      db.collection("tasks")
        .add({
          title: this.dataInput.title,
          description: this.dataInput.description,
          point: this.dataInput.point,
          assigned: this.dataInput.assigned,
          status: "backlog"
        })
        .then(docRef => {
          this.dataInput = {
            title: null,
            description: null,
            point: null,
            assigned: null
          };
        });
    }
  },
  beforeCreate() {
    let db = firebase.firestore();
    // snapshot
    db.collection("tasks").onSnapshot(querySnapshot => {
      this.kanbanList = {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      };
      querySnapshot.forEach(doc => {
        const task = { id: doc.id, ...doc.data() };
        this["kanbanList"][task.status].push(task);
      });
    });
  }
};
</script>
