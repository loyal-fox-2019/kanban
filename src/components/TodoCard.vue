<template>
    <div class="card" style="width: 18rem;" @mouseover="cardContent = true" @mouseleave="cardContent = false">
        <div class="card-body todo-card-body">
            <h5 class="card-title todo-card-title">{{getTask.title}}</h5>
            <div class="card-content mt-3" v-if="cardContent">
                <h6>Description: {{getTask.description}}</h6>
                <h6>Assign to: {{getTask.assign_to}}</h6>
                <div class="button-container mt-3">
                    <button class="btn btn-warning btn-sm" v-on:click.prevent="updateStatus()">Update</button>
                    <button class="btn btn-danger btn-sm" v-on:click.prevent="deleteTask()">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/config/firebase.js';
import swal from 'sweetalert2';

export default {
    name: 'todoCard',
    props: ['task'],
    data() {
        return {
            cardContent: false
        }
    },
    computed: {
        getTask() {
            return {title: this.task.title, description: this.task.description, 
            assign_to: this.task.assign_to, status: this.task.status}
        }  
    },
    methods: {
        updateStatus() {
            let updateTask = {
                title: this.getTask.title,
                description: this.getTask.description,
                assign_to: this.getTask.assign_to,
                status: this.getTask.status
            }
            if(updateTask.status === 'Todo') {
                updateTask.status = 'InProgress'
            } else if(updateTask.status === 'InProgress') {
                updateTask.status = 'Done'
            } else if(updateTask.status === 'Done') {
                updateTask.status = 'Gone'
            }
            db.collection("kanban").doc(this.task.id).set(updateTask)
            .then(function() {
                swal.fire({
                    icon: 'success',
                    title: 'Task Updated',
                    text: `${updateTask.title} status now ${updateTask.status}`
                })                
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        },
        deleteTask() {
            db.collection('kanban').doc(this.task.id).delete()
            .then(_ => {
                swal.fire({
                    icon: 'success',
                    title: 'Task Deleted',
                })
            })
            .catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    }
}
</script>

<style scoped>
.todo-card-title {
    text-align: center;
}
.todo-card-body {
    padding-top: 15px !important;
    padding-bottom: 10px !important;
}
.button-container {
    display: flex;
    justify-content: space-evenly;
}
</style>