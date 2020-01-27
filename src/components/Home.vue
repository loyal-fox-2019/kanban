<template>
  <div class="container-fluid">
    <navbar></navbar>
    <div class="d-flex justify-content-between">
      <kanbancard v-for="tasks in taskToHome" :key="tasks.name" :data="tasks"></kanbancard>
    </div>
    <addtodo/>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue';
import kanbancard from '@/components/KanbanCard.vue';
import addtodo from '@/components/AddTodo.vue';

export default {
  name: 'Home',
  components: {
    navbar,
    kanbancard,
    addtodo
  },
  props: ['taskToHome'],
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  }
}
</script>

<style scoped>
  .container-fluid {
    top: 0;
  }
</style>
