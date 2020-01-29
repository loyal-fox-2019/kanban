<template>

<div>
  <b-navbar toggleable="lg" type="dark"  style="background-color: orange;">
    <b-navbar-brand href="#">KanBan?</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-item href="#"><b-button id="show-btn" @click="$bvModal.show('bv-modal-navbar')">New Task</b-button></b-nav-item>
          <b-modal id="bv-modal-navbar" hide-footer>
            <template v-slot:modal-title>
              New Task: 
            </template>
            <div class="d-block text-center">
              <h6>Title</h6>
              <b-form-input placeholder="Task Title" v-model="title"></b-form-input>
              <h6>Description</h6>
              <b-form-input placeholder="Short Description"  v-model="description"></b-form-input>
              <h6>Points</h6>
              <b-form-input placeholder="Point"  v-model="points"></b-form-input>
              <h6>Assigned To</h6>
              <b-form-input placeholder="Assigned To"  v-model="assigned"></b-form-input>
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')" v-on:click="addNewTask">Submit Task</b-button>
          </b-modal>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  
</template>

<script>
import db from '../config/firebase'
export default {
    name: 'navbar',
    data(){
      return{
        title: '',
        description: '',
        points: '',
        assigned: ''
      }
    },
    methods:{
      addNewTask(){
        console.log('masuk woy')
        db.collection('kanban').add({
          title: this.title,
          description: this.description,
          points: this.points,
          assigned: this.assigned,
          status: 'backlog'
        })
        .then(()=>{
          console.log('berhasil')
        })
        .catch(err=>{
          console.log(err)
        })
      }
    }
}
</script>

<style>

</style>