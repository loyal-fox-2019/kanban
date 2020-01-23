<template>
  <div class="col-md-3">
    <div class="card p-0 kanbanlist">
      <div class="card-header kanban-header" :class="'bg-' + kanbanstat.color">
        {{ kanbanstat.progress }}
      </div>
      <div class="card-body">
        <TaskCard
          v-for="(task, i) in tasks"
          :key="i"
          :itemTask="task"
        ></TaskCard>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../config/firebase'
import TaskCard from '../components/TaskCard'
export default {
  props: ['kanbanstat'],
  components: {
    TaskCard
  },
  data() {
    return {
      Name: '',
      tasks: []
    }
  },
  created() {
    db.collection('Kanban').onSnapshot(doc => {
      let arr = []
      doc.docs.forEach(data => {
        let kanbanId = data.id
        if (data.data().status === this.kanbanstat.progress) {
          let tmp = data.data()
          arr.push({ id: kanbanId, ...tmp })
        }
      })
      this.tasks = arr
    })
  }
}
</script>

<style>
.kanban-header {
  text-align: left;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
}
</style>
