<template>
  <div class="d-flex flex-column">
    <ModalCreate />
    <div class="row my-5 px-5">
      <!-- <pre>
        {{ todoObj }}
      </pre> -->
      <div
        class="col-sm-3"
        v-for="(category, index) in categories"
        :key="index"
      >
        <TodoCategory
          :todoData="{
            index,
            todos: selectTodo(index)
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ModalCreate from '../components/ModalCreate'
import TodoCategory from '../components/TodoCategory'
import db from '../config/firebase'
export default {
  name: 'home',
  data() {
    return {
      categories: ['Back-Log', 'To-Do', 'Doing', 'Done'],
      todoObj: {}
    }
  },
  created() {
    db.collection('todos').onSnapshot(
      docSnapshot => {
        this.categorized(docSnapshot.docs)
      },
      err => {
        // eslint-disable-next-line
        console.log(`Encountered error: ${err}`)
      }
    )
  },
  methods: {
    categorized(docs) {
      const todoObjTemp = {
        backlogs: [],
        toDos: [],
        doings: [],
        dones: []
      }
      docs.forEach(doc => {
        let data = {
          id: doc.id,
          ...doc.data()
        }
        if (data.status == 'To-Do') {
          todoObjTemp.toDos.push(data)
        } else if (data.status == 'Doing') {
          todoObjTemp.doings.push(data)
        } else if (data.status == 'Done') {
          todoObjTemp.dones.push(data)
        } else {
          todoObjTemp.backlogs.push(data)
        }
      })
      this.todoObj = todoObjTemp
    },
    selectTodo(index) {
      let keys = Object.keys(this.todoObj)
      return this.todoObj[keys[index]]
    }
  },
  components: {
    ModalCreate,
    TodoCategory
  }
}
</script>
