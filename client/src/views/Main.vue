<template>
  <div>
    <Table :judul="['Back-Log','todo','back-log']" :colors="'warning'" :datas="backLog"></Table>
    <Table :judul="['Todo','doing','back-log']" :colors="'danger'" :datas="todo"></Table>
    <Table :judul="['Doing','done','todo']" :colors="'primary'" :datas="doing"></Table>
    <Table :judul="['Done','doing','doing']" :colors="'dark'" :datas="done"></Table>
  </div>
</template>

<script>
import Table from '../components/table'
import draggable from "vuedraggable";

export default {
  components: {
    Table
  },
  data: function () {
    return {
      backLog: [],
      todo: [],
      doing: [],
      done: [],
    }
  },
  created () {
   this.$db.collection('task').onSnapshot(querySnapshot=>{
       this.backLog = []
      this.todo = []
      this.doing = []
      this.done = []
      querySnapshot.forEach(doc=>{
        if(doc.data().status === 'back-log'){
          this.backLog.push({
            id: doc.id,
            ...doc.data()
          })
        }else if(doc.data().status === 'todo'){
          this.todo.push({
            id: doc.id,
            ...doc.data()
          })
        }else if(doc.data().status === 'doing'){
          this.doing.push({
            id: doc.id,
            ...doc.data()
          })
        }else if(doc.data().status === 'done'){
          this.done.push({
            id: doc.id,
            ...doc.data()
          })
        }
      })
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
