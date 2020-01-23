<template>
  <div>
    <div class="row mt-4">
      <div class="card col-md-3" v-for="(category, key) in mainStat" :key="key">
        <div
          class="card-header"
          :style="{ backgroundColor: category.color, color: 'white' }"
        >
          <h5 class="card-header" style="font-weight: 800;">
            {{ category.title }}
          </h5>
        </div>
        <div class="card-body">
          <draggable
            v-model="category.list"
            group="task"
            @start="drag = true"
            @end="drag = false"
          >
            <TaskCard
              v-for="task in category.list"
              :key="task.id"
              :task="task"
            ></TaskCard>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard'
import Swal from 'sweetalert2'
import draggable from 'vuedraggable'
import db from '../config/firebase'

const todoCollection = db.collection('kanmarz')

export default {
  name: 'MainCard',
  components: {
    TaskCard,
    draggable
  },
  data() {
    return {
      mainStat: [
        {
          title: 'Back-Log',
          color: 'red',
          status: 'backlog',
          list: []
        },
        {
          title: 'Todo',
          color: 'orange',
          status: 'todo',
          list: []
        },
        {
          title: 'Doing',
          color: 'blue',
          status: 'doing',
          list: []
        },
        {
          title: 'Done',
          color: 'green',
          status: 'done',
          list: []
        }
      ]
    }
  },
  watch: {
    mainStat: {
      deep: true,
      handler: (val, oldVal) => {
        console.log(val)
        val.forEach(element => {
          if (element.list.length !== 0) {
            element.list.forEach(task => {
              if (element.status !== task.status) {
                todoCollection.doc(task.id).update({
                  status: element.status
                })
              }
            })
          }
        })
      }
    }
  },
  created() {
    Swal.showLoading()
    todoCollection.onSnapshot(querySnapshot => {
      this.mainStat.forEach(el => {
        el.list = []
        Swal.close()
      })
      querySnapshot.forEach(doc => {
        const todoStatus = doc.data().status
        const index = this.mainStat.findIndex(el => el.status === todoStatus)
        const data = {
          id: doc.id,
          ...doc.data()
        }
        this.mainStat[index].list.push(data)
      })
    })
  }
}
</script>

<style lang="css" scoped>
.card {
  border: 1px solid black;
}
</style>
