<template>
    <b-card :bg-variant="statusPass.bg" :header="statusPass.header" class="text-center">
        <TaskCard v-for="(task, i) in statusPass.tasks" :key="i" :forTaskCard="task"></TaskCard>
    </b-card>
</template>

<script>
import TaskCard from './TaskCard'
export default {
  name: 'StatusCard',
  components: {
    TaskCard
  },
  props: {
    statusPass: Object
  }
}
</script>

<style scoped>

</style>
