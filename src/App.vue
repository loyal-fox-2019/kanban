<template>
  <div>
    <navbar :showTask="showTask" @toggleShowColumn="toggleShowColumn"></navbar>
    <div class="columns">
      <column id="backlog" :categoryName="'backlog'" :searchStr="searchStr" v-if="showTask.backlog"></column>
      <column id="todo" :categoryName="'todo'" :searchStr="searchStr" v-if="showTask.todo"></column>
      <column id="doing" :categoryName="'doing'" :searchStr="searchStr" v-if="showTask.doing"></column>
      <column id="done" :categoryName="'done'" :searchStr="searchStr" v-if="showTask.done"></column>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar.vue';
import column from './components/column.vue';

export default {
  name: 'app',
  components: {
    navbar,
    column,
  },
  data() {
    return {
      showTask: {
        backlog: true,
        todo: true,
        doing: true,
        done: true
      },
      searchStr: ""
    }
  },
  methods: {
    toggleShowColumn(columnId) {
      this.showTask[columnId] = !this.showTask[columnId];
    }
  }
}
</script>

<style>
.columns {
  display: flex;
  justify-content: space-evenly;
}
#id {
  background-color: dodgerblue;
}
</style>
