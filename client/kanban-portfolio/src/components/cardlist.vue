<template>
  <b-card
  border-variant="primary"
  :header="data"
  :header-bg-variant="colors"
  header-text-variant="white"
  align="center"
  >
  <b-card-text>
      <card v-for="(task, i) in tasks" :key="i" :prog="task"></card>
  </b-card-text>
  </b-card>
</template>

<script>
import card from './card'
import db from '../config/firebase'

export default {
  data () {
    return {
      tasks: null
    }
  },
  components: {
    card
  },
  computed: {
    colors: function () {
      if (this.data === 'Back-Log') {
        return 'secondary'
      }
      if (this.data === 'To-Do') {
        return 'info'
      }
      if (this.data === 'Doing') {
        return 'primary'
      }
      if (this.data === 'Done') {
        return 'success'
      } else {
        return 'secondary'
      }
    }
  },
  props: ['data'],
  created () {
    db.collection('task').onSnapshot((doc) => {
      let arr = []
      doc.docs.forEach(data => {
        if (data.data().status === this.data) {
          let tmp = data.data()
          tmp.id = data.id
          arr.push(tmp)
        }
      })
      this.tasks = arr
    })
  }
}
</script>

<style>

</style>
