<template>
  <div id="kanban-bin">
    <h1>{{ nameBinType }}</h1>
    <b-list-group>
      <b-list-group-item v-for="task in tasks" :key="task.id">
        <KanbanCard :task="task"></KanbanCard>
        <!-- <b-card :header="task.title">
          <b-card-text> <b>Description</b> </b-card-text>
          <b-card-text> {{ task.description }} </b-card-text>
        </b-card> -->
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import KanbanCard from './KanbanCard.vue';

export default {
  name: 'KanbanBin',
  props: {
    binType: Number,
    tasks: Array
  },
  components: {
    KanbanCard
  },
  computed: {
    nameBinType() {
      switch (this.binType) {
        case 0:
          return 'Back Log';
        case 1:
          return 'To Do';
        case 2:
          return 'Doing';
        case 3:
          return 'Done';
        default:
          return undefined;
      }
    }
  }
};
</script>

<style>
</style>