<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand" href="#">Kanban</a>
        <div class="ml-auto">
            <b-button v-b-modal.modal-1><i class="mr-2 far fa-plus-square" style="font-size: 23px; vertical-align: middle;"></i>New Task</b-button>
            <b-modal ref="modal-1" id="modal-1" title="Create your new Task!" hide-footer>
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Title</label>
                        <input type="text" class="form-control" v-model="newTask.title" placeholder="Input your task title here!">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea class="form-control" v-model="newTask.description" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Assigned To</label>
                        <input type="text" class="form-control" v-model="newTask.assignTo" placeholder="Who you want to assign this task?">
                    </div>
                    <div class="button-group">
                        <button class="btn btn-lg btn-success" v-on:click.prevent="addNewTask()">Create</button>
                    </div>
                </form>
            </b-modal>
        </div>
    </nav>
</template>

<script>
import db from '@/config/firebase.js';

export default {
    name: 'Navbar',
    data() {
        return {
            newTask: {
                title: '',
                description: '',
                assignTo: '',
            }
        }
    },
    methods: {
        addNewTask: function() {
            db.collection('kanban').add({
                title: this.newTask.title,
                description: this.newTask.description,
                assign_to: this.newTask.assignTo,
                status: 'Todo'
            })
            .then(user => {
                this.$refs['modal-1'].hide()
                this.newTask.title = '';
                this.newTask.description = '';
                this.newTask.assignTo = '';
            })
            .catch(error => {
                console.log(error, 'MASUK ERROR');
            })
        }
    }
}
</script>

<style scoped>
.navbar-brand {
    font-family: 'Bangers', cursive;
    font-size: 35px !important;
    color: #ffffff !important;
    padding: 0 !important;
}
.button-group {
    text-align: center;
}
</style>