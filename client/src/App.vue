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
      dataTask: [
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
        this.dataTask[0].tasks = []
        this.dataTask[1].tasks = []
        this.dataTask[2].tasks = []
        this.dataTask[3].tasks = []

        querySnapshot.forEach(doc => {
          if (doc.data().status === 'backlog') {
            this.dataTask[0].tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'todo') {
            this.dataTask[1].tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'doing') {
            this.dataTask[2].tasks.push({ id: doc.id, ...doc.data() })
          }
          if (doc.data().status === 'done') {
            this.dataTask[3].tasks.push({ id: doc.id, ...doc.data() })
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
