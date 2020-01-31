<template>
<div>
  <b-card-group deck>
  <b-card
  border-variant="primary"
  header-text-variant="white"
  align="center"
  v-for="(pro, i) in dbstatus" :key="i"
  :header="pro.title"
  :header-bg-variant="colors"
  class="kartu"
  >
  <b-card-text>
    <draggable v-model="pro.list" group="task" @start="drag=true" @end="drag=false">
      <card v-for="(task, i) in pro.list" :key="i" :prog="task"></card>
    </draggable>
  </b-card-text>
  </b-card>
  </b-card-group>
</div>
</template>

<script>
import card from './card'
import draggable from 'vuedraggable'
import db from '../config/firebase'
export default {
  components: {
    card,
    draggable
  },
  computed: {
    colors: () => {
      return 'secondary'
      // return 'info'
      // return 'primary'
      // return 'success'
      // return 'secondary'
    }
  },
  data () {
    return {
      process: ['Back-Log', 'To-Do', 'Doing', 'Done'],
      cla: 0,
      dbstatus: [
        {
          title: 'Back-log',
          list: []
        },
        {
          title: 'To-Do',
          list: []
        },
        {
          title: 'Doing',
          list: []
        },
        {
          title: 'Done',
          list: []
        }

      ]
    }
  },
  watch: {
    dbstatus: {
      deep: true,
      handler: (newval, oldval) => {
        newval.forEach(element => {
          element.list.forEach(el => {
            if (element.title !== el.status) {
              db.collection('task').doc(el.id).update({ status: element.title })
                .then((data) => {
                  console.log('berhasil')
                })
            }
          })
        })
      }
    }
  },
  created () {
    db.collection('task').onSnapshot((doc) => {
      this.dbstatus.forEach(element => {
        element.list = []
      })
      doc.docs.forEach(element => {
        if (element.data().status === 'Back-log') {
          let tmp = element.data()
          tmp.id = element.id
          this.dbstatus[0].list.push(tmp)
        }
        if (element.data().status === 'To-Do') {
          let tmp = element.data()
          tmp.id = element.id
          this.dbstatus[1].list.push(tmp)
        }
        if (element.data().status === 'Doing') {
          let tmp = element.data()
          tmp.id = element.id
          this.dbstatus[2].list.push(tmp)
        }
        if (element.data().status === 'Done') {
          let tmp = element.data()
          tmp.id = element.id
          this.dbstatus[3].list.push(tmp)
        }
      })
    })
  }
}
</script>

<style>

</style>
