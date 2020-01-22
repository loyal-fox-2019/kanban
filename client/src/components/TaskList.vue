<template>
  <b-col md="3">
    <b-card
      :border-variant="sendData.color"
      :header="sendData.title"
      :header-bg-variant="sendData.color"
      header-text-variant="white"
      align="left"
    >
      <TaskItem v-for="(task, index) in sendData.tasks"
      :key="index" :sendTask="task" />
    </b-card>
  </b-col>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue'

export default {
  name: 'BoardItem',

  data () {
    return {
    }
  },
  props: {
    sendData: {
      type: Object
    }
  },
  components: {
    TaskItem
  }
}
</script>

<style>
  .task-wrapper {
    border: 1px solid #b3b3b3;
    border-radius: 4px;
  }
  .task-wrapper .title {
    width: 100%;
    text-align: left;
    padding: 0.8rem 1rem;
    background-color: red;
    color: #ffffff;
  }
</style>
