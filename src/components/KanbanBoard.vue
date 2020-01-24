<template>
  <div class="column" :id="set.color">
    <div class="is-flex" id="title">
      <span v-html="set.emoji"></span>&nbsp;
      <p class="title is-3 is-spaced">{{ set.title }}</p>
    </div>
      <draggable class="list-group" :list="list" group="kanban" v-model="set.tasks" @add="add">
        <TaskCard
          class="list-group-item"
          v-for="task in set.tasks" :key="task.id" :task="task"
        />
      </draggable>
  </div>
</template>

<script>

import TaskCard from '@/components/TaskCard.vue'
import draggable from 'vuedraggable'
import db from '@/config/firestore'
const tasks = db.collection('tasks')

export default {
  props: {
    set: Object
  },
  data: function () {
    return {
      
    }
  },
  methods: {
    add: function (evt) {
      tasks.doc(evt.item._underlying_vm_.id).update({ category: this.category })
        .then(() => {
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err
          })
        })
    }
  },
  components: {
    draggable,
    TaskCard
  }
}
</script>

<style scoped>
.column {
  margin: 5px;
  border-radius: 10px;
}
#title {
  margin-left: 15%;
}
#red {
  background-color: hsl(348, 100%, 61%)
}
#blue {
  background-color: hsl(204, 86%, 53%)
}
#green {
  background-color: hsl(171, 100%, 41%)
}
#yellow {
  background-color: hsl(48, 100%, 67%)
}
</style>