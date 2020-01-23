<template>
  <div id="kanban-card">
    <b-card :header="task.title" align="center">
      <b-table stacked :items="[taskDetailOnCard]"></b-table>
      <b-button-group>
        <b-button variant="primary">
          <b-icon icon="chevron-left"></b-icon>
        </b-button>
        <b-button @click="deleteTask" variant="danger">
          <b-icon icon="trash"></b-icon>
        </b-button>
        <b-button variant="primary">
          <b-icon icon="chevron-right"></b-icon>
        </b-button>
      </b-button-group>
      <!-- <b-card-text> <b>Description</b> </b-card-text>
      <b-card-text> {{ task.description }} </b-card-text> -->
    </b-card>
  </div>
</template>

<script>
import db from '../config/firebase';

export default {
  name: 'KanbanCard',
  props: {
    task: Object
  },
  computed: {
    taskDetailOnCard() {
      return { point: this.task.point, assignedTo: this.task.assignedTo };
      // return {};
    }
  },
  methods: {
    deleteTask() {
      db.collection('tasks')
        .doc(this.task.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch(error => {
          console.error('Error removing document: ', error);
        });

      // console.log(this.task.id);
    }
  }
};
</script>

<style>
</style>