<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      New Task
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              <input
                class="w3-input w3-hover-white"
                type="text"
                v-model="newTask.title"
                placeholder="Title"
              />
            </p>
            <p>
              <input
                class="w3-input w3-hover-white"
                type="text"
                placeholder="Description"
                v-model="newTask.description"
              />
            </p>
            <p>
              <input
                class="w3-input w3-hover-white"
                v-model="newTask.point"
                type="number"
                placeholder="Point"
              />
            </p>
            <p>
              <input
                class="w3-input w3-hover-white"
                v-model="newTask.assignTo"
                type="text"
                placeholder="Assigned To"
              />
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click.prevent="addNewList"
              class="btn btn-primary"
              data-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex row">
      <ProgressCard
        v-for="(progressCard, key) in progressCards"
        :key="key"
        :card="progressCard"
        class="col-sm-3"
      ></ProgressCard>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import db from './config/firebase'
import ProgressCard from './components/ProgressCard.vue'
export default {
  name: 'app',
  components: {
    // HelloWorld
    ProgressCard
  },
  data() {
    return {
      newTask: {
        title: '',
        description: '',
        point: '',
        assignTo: ''
      },
      progressCards: [
        {
          title: 'Back-Log',
          status: 'backlog',
          color: 'blue',
          items: []
        },
        {
          title: 'To Do',
          status: 'todo',
          color: 'red',
          items: []
        },
        {
          title: 'In Progress',
          status: 'inprogress',
          color: 'purple',
          items: []
        },
        {
          title: 'Completed',
          status: 'completed',
          color: 'yellow',
          items: []
        }
      ]
    }
  },
  methods: {
    addNewList() {
      db.collection('kanban')
        .add({
          title: this.newTask.title,
          description: this.newTask.description,
          point: this.newTask.point,
          assignTo: this.newTask.assignTo,
          status: 'backlog'
        })
        .then(ref => {
          // eslint-disable-next-line no-console
          console.log('Added document with ID: ', ref.id)
          // this.$bvModal.hide('exampleModal')
        })
    }
  },
  created() {
    db.collection('kanban').onSnapshot(querySnapshot => {
      for (let card of this.progressCards) {
        card.items = []
      }
      querySnapshot.docs.forEach(doc => {
        // console.log(doc.data(), doc.id)
        let task = { ...doc.data(), id: doc.id }
        switch (task.status) {
          case 'backlog':
            this.progressCards[0].items.push(task)
            break
          case 'todo':
            this.progressCards[1].items.push(task)
            break
          case 'inprogress':
            this.progressCards[2].items.push(task)
            break
          case 'completed':
            this.progressCards[3].items.push(task)
            break
        }
      })
    })
  },
  watch: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
