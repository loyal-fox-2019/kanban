<template>
  <div id="app" class="px-5">
    <NavBar></NavBar>
    <div class="row">
      <KanbanList
        v-for="(status, i) in KanbanStatus"
        :key="i"
        :kanbanstat="status"
      ></KanbanList>
    </div>
  </div>
</template>

<script>
import NavBar from '../src/components/NavBar'
import KanbanList from '../src/components/KanbanList'
export default {
  name: 'app',
  components: {
    NavBar,
    KanbanList
  },
  data() {
    return {
      KanbanStatus: [
        { progress: 'Back Log', color: 'danger' },
        { progress: 'To Do', color: 'warning' },
        { progress: 'Doing', color: 'primary' },
        { progress: 'Done', color: 'success' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
