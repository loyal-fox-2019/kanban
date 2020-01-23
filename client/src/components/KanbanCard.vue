<template>
  <div id="kanban-card">
    <b-card :header="task.title" align="center">
      <b-table stacked :items="[taskDetailOnCard]"></b-table>
      <b-button-group>
        <b-button @click="goToPrevBin" variant="primary">
          <b-icon icon="chevron-left"></b-icon>
        </b-button>
        <b-button v-b-modal="task.id" variant="primary">
          <b-icon icon="justify"></b-icon>
        </b-button>
        <b-button @click="goToNextBin" variant="primary">
          <b-icon icon="chevron-right"></b-icon>
        </b-button>
      </b-button-group>

      <!-- MODAL -->
      <b-modal :id="task.id" title="Task Detail" centered hide-footer>
        <b-table stacked :items="[taskDetailonModal]"></b-table>
        <div class="d-flex flex-row-reverse">
          <b-button variant="danger"><b-icon icon="trash"></b-icon></b-button>
        </div>
      </b-modal>

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
    },
    taskDetailonModal() {
      return {
        point: this.task.point,
        assignedTo: this.task.assignedTo,
        description: this.task.description
      };
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
    },
    goToNextBin() {
      db.collection('tasks')
        .doc(this.task.id)
        .update({
          status: this.task.status + 1
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch(error => {
          console.error('Error updating document: ', error);
        });
    },
    goToPrevBin() {
      db.collection('tasks')
        .doc(this.task.id)
        .update({
          status: this.task.status - 1
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch(error => {
          console.error('Error updating document: ', error);
        });
    }
  }
};
</script>

<style>
</style>