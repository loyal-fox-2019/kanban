<template>
  <div>
    <Navbar></Navbar>

    <div class="row">
      <!-- <StickyNote v-for="(type,i) in types" :key="i" :kategori="type"></StickyNote> -->
      <StickyNote :datas="backlog" :kategori="'Back-Log'" :id="'Back-Log.id'"></StickyNote>
      <StickyNote :datas="todo" :kategori="'To-do'" :id="'To-do.id'"></StickyNote>
      <StickyNote :datas="doing" :kategori="'Doing'" :id="'Doing.id'"></StickyNote>
      <StickyNote :datas="done" :kategori="'Done'" :id="'Done.id'"></StickyNote>
    </div>
  </div>
</template>

<script>
import db from "../src/config/firebase-config";
import Navbar from "./components/Navbar.vue";
import StickyNote from "./components/stickyNote.vue";
export default {
  name: "app",
  components: {
    Navbar,
    StickyNote
  },
  data() {
    return {
      types: ["Back-Log", "To-do", "Doing", "Done"],
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      datas: []
    };
  },
  created() {
    db.collection("kanban").onSnapshot(doc => {
      this.backlog = [];
      this.todo = [];
      this.doing = [];
      this.done = [];
      this.datas = [];
      for (let i of doc.docs) {
        let temporary = i.data();
        if (i.data().status == "Back-Log") {
          this.backlog.push({ id: i.id, ...temporary });
        } else if (i.data().status == "To-do") {
          this.todo.push({ id: i.id, ...temporary });
        } else if (i.data().status == "Doing") {
          this.doing.push({ id: i.id, ...temporary });
        } else if (i.data().status == "Done") {
          this.done.push({ id: i.id, ...temporary });
        }

        this.datas.push(i.data());
      }
    });
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
