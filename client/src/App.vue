<template>
  <div id="app">
    <Header v-on:addNewTask="onAddNewTask"></Header>
    <div class="container-fluid">
      <div class="row">
        <KanbanBin
          class="col mt-2"
          :binType="0"
          :tasks="taskToBackLog"
        ></KanbanBin>
        <KanbanBin
          class="col mt-2"
          :binType="1"
          :tasks="taskToToDo"
        ></KanbanBin>
        <KanbanBin
          class="col mt-2"
          :binType="2"
          :tasks="taskToDoing"
        ></KanbanBin>
        <KanbanBin
          class="col mt-2"
          :binType="3"
          :tasks="taskToDone"
        ></KanbanBin>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * INGAT
 * status 0 --- backlog
 *        1 --- todo
 *        2 --- doing
 *        3 --- done
 */

import Header from './components/Header.vue';
import KanbanBin from './components/KanbanBin.vue';
import db from './config/firebase';

export default {
  name: 'app',
  components: {
    Header,
    KanbanBin
  },
  data() {
    return {
      allTask: []
    };
  },
  computed: {
    taskToBackLog() {
      return this.allTask.filter(task => task.status === 0);
    },
    taskToToDo() {
      return this.allTask.filter(task => task.status === 1);
    },
    taskToDoing() {
      return this.allTask.filter(task => task.status === 2);
    },
    taskToDone() {
      return this.allTask.filter(task => task.status === 3);
    }
  },
  methods: {
    onAddNewTask(newTask) {
      console.log(newTask);
      db.collection('tasks')
        .add({ ...newTask, status: 0 })
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }
  },
  created() {
    console.log(db);
    db.collection('tasks').onSnapshot(querySnapshot => {
      this.allTask = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        this.allTask.push({ ...doc.data(), id: doc.id });
      });
    });
  }
};
</script>

<style></style>
