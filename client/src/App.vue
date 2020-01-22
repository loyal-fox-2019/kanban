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

export default {
  name: 'app',
  components: {
    Header,
    KanbanBin
  },
  data() {
    return {
      allTask: [
        {
          id: 1,
          status: 0,
          title: 'Login Feature',
          description: `user should have option to login manually (with standard email and password) or to login using google account`,
          point: 213,
          assignedTo: `Markus`
        }
      ]
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
      this.allTask.push({ ...newTask, status: 0, id: this.allTask.length + 1 });
    }
  }
};
</script>

<style>
</style>
