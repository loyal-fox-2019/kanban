<template>
  <div id="app" class="container">
    <navbar />
    <div class="d-flex">
      <card :content="backlog" :next="kanban[1]" :header="kanban[0]" />
      <card :previous="kanban[0]" :content="todo" :header="kanban[1]" :next="kanban[2]" />
      <card :previous="kanban[1]" :content="doing" :header="kanban[2]" :next="kanban[3]" />
      <card :previous="kanban[2]" :content="done" :header="kanban[3]" />
    </div>
  </div>
</template>

<script>
import navbar from "./components/navbar";
import card from "./components/Title";
import db from "./config/firebase";

export default {
  created() {
    this.findDoc();
  },
  name: "app",
  components: {
    navbar,
    card
  },
  data: function() {
    return {
      kanban: ["back-log", "to-do", "doing", "done"],
      backlog: [],
      todo: [],
      doing: [],
      done: []
    };
  },
  methods: {
    findDoc() {
      const docKanban = db.collection("kanban");
      docKanban.onSnapshot(querySnapshot => {
        this.backlog = [];
        this.todo = [];
        this.doing = [];
        this.done = [];
        querySnapshot.forEach(doc => {
          if (doc.data().status === "back-log") {
            let obj = { id: doc.id, ...doc.data() };
            this.backlog.push(obj);
          } else if (doc.data().status === "to-do") {
            let obj = { id: doc.id, ...doc.data() };
            this.todo.push(obj);
          } else if (doc.data().status === "doing") {
            let obj = { id: doc.id, ...doc.data() };
            this.doing.push(obj);
          } else {
            let obj = { id: doc.id, ...doc.data() };
            this.done.push(obj);
          }
        });
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
