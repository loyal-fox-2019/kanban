<template>
    <b-row align-h="between">
        <h1>h8-KanVan-OkkaLinardi</h1>
        <b-button variant="primary" v-b-modal.newTaskModal id="newTaskButton">New Task</b-button>

        <b-modal id="newTaskModal" title="New Task Form" hide-footer>
            <b-form @submit.prevent="addNewTask">
                <b-form-group
                id="newTaskTitle"
                label="Task Title:"
                label-for="newTaskTitle"
            >
                <b-form-input
                id="newTaskTitle"
                type="text"
                required
                v-model="title"
                placeholder="Enter Task Title"
                ></b-form-input>
      </b-form-group>
                <b-form-group
                id="newTaskDesc"
                label="Task Description:"
                label-for="newTaskDescription"
            >
                <b-form-input
                id="newTaskDescription"
                type="text"
                required
                v-model="description"
                placeholder="Enter Task Description"
                ></b-form-input>
      </b-form-group>
      <b-form-group
                id="newTaskPoint"
                label="Task Point:"
                label-for="newTaskPoint"
            >
                <b-form-input
                id="newTaskPoint"
                type="number"
                required
                v-model="point"
                placeholder="Enter Task Point"
                ></b-form-input>
      </b-form-group>
      <b-form-group
                id="newTaskAssign"
                label="Assigned To:"
                label-for="newTaskAssign"
            >
                <b-form-input
                id="newTaskAssign"
                type="text"
                required
                v-model="assigned"
                placeholder="This task is assigned to. . ."
                ></b-form-input>
      </b-form-group>
      <b-button block type="submit" @click="$bvModal.hide('newTaskModal')" variant="primary">Add Task</b-button>
            </b-form>
        </b-modal>
    </b-row>
</template>

<script>
import db from '../config/firebase'
export default {
  name: 'NavBar',
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assigned: ''
    }
  },
  methods: {
    addNewTask () {
      db.collection('tasks').add({
        title: this.title,
        description: this.description,
        point: this.point,
        status: 'Back-Log',
        assigned: this.assigned
      })
        .then(docRef => {
          this.title = ''
          this.description = ''
          this.point = ''
          this.assigned = ''
        })
    }
  }
}
</script>

<style scoped>
#newTaskButton {
    height: 5vh;
}
</style>
