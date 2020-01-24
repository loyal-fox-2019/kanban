<template>
  <div class="home">
    <MainHeader />
    <div class="columns">
    <KanbanBoard v-for="(set, index) in sets"
                  :key="index"
                  :set="set"
    />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import db from '@/config/firestore'
const tasks = db.collection('tasks')

export default {
  name: 'home',
  data: function () {
    return {
      sets: [
        {
          title: 'Back-Log',
          emoji: '<i class="em em-thinking_face" aria-role="presentation" aria-label="THINKING FACE"></i>',
          color: 'green',
          tasks: []
        },
        {
          title: 'To-Do',
          emoji: '<i class="em em-bangbang" aria-role="presentation" aria-label="DOUBLE EXCLAMATION MARK"></i>',
          color: 'blue',
          tasks: []
        },
        {
          title: 'On-Going',
          emoji: '<i class="em em---1" aria-role="presentation" aria-label="THUMBS UP SIGN"></i>',
          color: 'red',
          tasks: []
        },
        {
          title: 'Finished',
          emoji: '<i class="em em-100" aria-role="presentation" aria-label="HUNDRED POINTS SYMBOL"></i>',
          color: 'yellow',
          tasks: []
        }
      ]
    }
  },
  watch: {
    backlog: {
      handler: function () {
        for (let list of this.sets[0].tasks) {
          if (list.category !== 'Back-Log') {
            tasks
              .doc(list.id)
              .update({
                category: 'Back-Log'
              })
              .then(() => {
                this.$swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Task successfully updated'
                })
              })
              .catch(err => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: err
                })
              })
          }
        }
      },
      deep: true
    },
    todo: {
      handler: function () {
        for (let list of this.sets[1].tasks) {
          if (list.category !== 'To-Do') {
            tasks
              .doc(list.id)
              .update({
                category: 'To-Do'
              })
              .then(() => {
                this.$swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Task successfully updated'
                })
              })
              .catch(err => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: err
                })
              })
          }
        }
      },
      deep: true
    },
    ongoing: {
      handler: function () {
        for (let list of this.sets[2].tasks) {
          if (list.category !== 'On-Going') {
            tasks
              .doc(list.id)
              .update({
                category: 'On-Going'
              })
              .then(() => {
                this.$swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Task successfully updated'
                })
              })
              .catch(err => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: err
                })
              })
          }
        }
      },
      deep: true
    },
    finished: {
      handler: function () {
        for (let list of this.sets[3].tasks) {
          if (list.category !== 'Finished') {
            tasks
              .doc(list.id)
              .update({
                category: 'Finished'
              })
              .then(() => {
                this.$swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Task successfully updated'
                })
              })
              .catch(err => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: err
                })
              })
          }
        }
      },
      deep: true
    }
  },
  computed: {
    backlog: function () {
      return this.sets[0].tasks
    },
    todo: function () {
      return this.sets[1].tasks
    },
    ongoing: function () {
      return this.sets[2].tasks
    },
    finished: function () {
      return this.sets[3].tasks
    }
  },
  created () {
    tasks.onSnapshot(snapshot => {
      for (let set of this.sets) {
        set.tasks = []
      }
      snapshot.forEach(obj => {
        const id = obj.id
        const data = obj.data()
        const createdAt = new Date()
        if (data.category === 'Back-Log') {
          this.sets[0].tasks.push({
            id,
            title: data.title,
            description: data.description,
            assignee: data.assignee,
            category: data.category,
            createdAt
          })
        } else if (data.category === 'To-Do') {
          this.sets[1].tasks.push({
            id,
            title: data.title,
            description: data.description,
            assignee: data.assignee,
            category: data.category,
            createdAt
          })
        } else if (data.category === 'On-Going') {
          this.sets[2].tasks.push({
            id,
            title: data.title,
            description: data.description,
            assignee: data.assignee,
            category: data.category,
            createdAt
          })
        } else if (data.category === 'Finished') {
          this.sets[3].tasks.push({
            id,
            title: data.title,
            description: data.description,
            assignee: data.assignee,
            category: data.category,
            createdAt
          })
        }
      })
    })
  },
  components: {
    MainHeader,
    KanbanBoard
  }
}
</script>

<style scoped>
  .columns {
    margin: 7px;
  }
</style>
