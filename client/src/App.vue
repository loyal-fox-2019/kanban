<template>
  <div>
  </div>
</template>

<script>
import db from '../config/firebase'

export default {

  name: 'app',
  data () {
    return {
      data: [
        {
          title: 'Backlog',
          color: 'danger',
          tasks: []
        },
        {
          title: 'Todo',
          color: 'warning',
          tasks: []
        },
        {
          title: 'Doing',
          color: 'info',
          tasks: []
        },
        {
          title: 'done',
          color: 'success',
          tasks: []
        }
      ]
    }
  },
  methods: {
    getData () {
      db.collection('kanban').onSnapshot(querySnapshot => {
        this.dataBacklog.tasks = []
        this.dataTodo.tasks = []
        this.dataDoing.tasks = []
        this.dataDone.tasks = []

        querySnapshot.forEach(doc => {
          if (doc.data().status === 'backlog') {
            this.dataBacklog.tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'todo') {
            this.dataTodo.tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'doing') {
            this.dataDoing.tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'done') {
            this.dataDone.tasks.push({ id: doc.id, ...doc.data() })
          }
        })
      })
    }
  },
  created () {
  }
}

</script>

<style>

</style>
