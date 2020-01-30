<template>
  <div :id="status" class="card">
    <div class="card-header text-white">
      <p>{{ title }}</p>
    </div>
    <div class="card-body">
      <TaskItem v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue';

export default {
  components: {
    TaskItem
  },
  name: "progress-card",
  created() {},
  data() {
    return {};
  },
  methods: {},
  props: ["title", "status", "items"]
};
</script>

<style scoped>
  #back_log .card-header {
    background-color: orangered;
  }

  #to_do .card-header {
    background-color: orange;
  }

  #in_progress .card-header {
    background-color: dodgerblue;
  }

  #completed .card-header {
    background-color: green;
  }
</style>