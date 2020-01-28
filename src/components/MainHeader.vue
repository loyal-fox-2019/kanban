<template>
<div>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <img src="../assets/kanban.png" width="200" height="100">
  </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <button class="button" @click="open">
          <i class="em em-writing_hand" aria-role="presentation" aria-label=""></i></button>
      </div>
    </div>
  </nav>
  <div :class="this.class" id="modal-div">
    <section class="modal-card-body" id="modal-box">
      <button class="delete" aria-label="close"
      @click="close"></button>
      <div class="field">
        <label class="label"><i class="em em-paperclip" aria-role="presentation" aria-label="PAPERCLIP"></i> Task</label>
        <div class="control">
          <input class="input" type="text" placeholder="Input task title here.." v-model="title">
        </div>
      </div>
      <div class="field">
        <label class="label"><i class="em em-book" aria-role="presentation" aria-label="OPEN BOOK"></i> Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Input task description here.." v-model="description"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label"><i class="em em-person_with_blond_hair" aria-role="presentation" aria-label="PERSON WITH BLOND HAIR"></i> Assignee</label>
        <div class="control">
          <input class="input" type="text" placeholder="Input asignee here.." v-model="assignee">
        </div>
      </div>
      <div class="field">
        <label class="label"><i class="em em-clipboard" aria-role="presentation" aria-label="CLIPBOARD"></i> Category</label>
        <div class="control has-icons-left">
          <div class="select">
            <select v-model="category">
              <option selected>Back-Log</option>
              <option>To-Do</option>
              <option>On-Going</option>
              <option>Finished</option>
            </select>
          </div>
          <span class="icon is-left">
            <i class="fa fa-list-alt" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-dark" @click.prevent="addTask">Submit</button>
        </div>
        <div class="control">
          <button class="button is-dark is-light">Clear</button>
        </div>
      </div>
      </section>
    </div>

  </div>
</template>

<script>
import firebase from '@/config/firebase'
import db from '@/config/firestore'
const tasks = db.collection('tasks')

export default {
  name: 'MainHeader',
  data: function () {
    return {
      class: 'modal',
      title: '',
      description: '',
      category: '',
      assignee: ''
    }
  },
  methods: {
    open: function () {
      this.class = 'modal is-active'
    },
    close: function () {
      this.class = 'modal'
    },
    addTask: function () {
      tasks
        .add({
          title: this.title,
          description: this.description,
          assignee: this.assignee,
          category: this.category,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Task successfully added'
          })
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err
          })
        })
        .finally(() => {
          this.title = ''
          this.description = ''
          this.assignee = ''
          this.category = ''
        })
    }
  }
}
</script>

<style scoped>
#modal-div {
  background-color: rgba(0, 0, 0, 0.5);
}
#modal-box {
  margin-top: 3%;
  margin-bottom: 3%;
}
.navbar {
  padding: 0px;
  margin: 0px;
}
</style>