<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img src="../../public/Fire3D.gif" width="30" height="30" alt="">
                Kanban on Fire
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">                
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Show tasks by progress
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div class="dropdown-item">
                                <input type="checkbox" name="" id="backlog" @click="toggleColumn('backlog')" checked> Backlog<br>
                            </div>
                            <div class="dropdown-item">
                                <input type="checkbox" name="" id="todo" @click="toggleColumn('todo')" checked> Todo<br>
                            </div>
                            <div class="dropdown-item">
                                <input type="checkbox" name="" id="doing" @click="toggleColumn('doing')" checked> Doing<br>
                            </div>
                            <div class="dropdown-item">
                                <input type="checkbox" name="" id="done" @click="toggleColumn('done')" checked> Done<br>
                            </div>
                        </div>
                    </li>                
                </ul>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                </form>
                <button class="btn btn-outline-success my-2 my-sm-0 addtask-btn"  data-toggle="modal" data-target="#addTaskModal">New task</button>

                <!-- Add Task Modal -->
                <div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="addTask">
                        <div class="modal-body">
                            Task name:<br>
                            <input class="form-control" type="text" v-model="name" placeholder="Task name" required>
                            Description:<br>
                            <textarea class="form-control" rows="5" placeholder="Description" v-model="description"></textarea>
                            Due date:<br>
                            <input class="form-control" type="date" v-model="due_date">
                            Priority:<br>
                            <input class="form-control" type="number" min="0" max="100" v-model="priority" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closemodal">Close</button>
                            <button type="submit" class="btn btn-primary">Add</button>
                        </div>
                    </form>
                    </div>
                    
                </div>
                </div>

            </div>
            </nav>
    </div>
</template>

<script>
    import JQuery from 'jquery';
    const $ = JQuery;
    import db from "../config/firebase.js";
    import firebase from "firebase";
    export default {
        name: "navbar",
        data() {
            return {
                name: "",
                description: "",
                due_date: null,
                priority: 0
            }
        },
        methods: {
            toggleColumn(columnId) {
                this.$emit('toggleShowColumn',columnId);
            },
            search(str) {
                str;
            },
            addTask() {
                if(this.name.length != 0)
                {
                    let taskObj = {
                        name: this.name,
                        description: this.description,
                        category: "backlog",
                        priority: this.priority,
                        created_date: firebase.firestore.Timestamp.fromDate(new Date())
                    };

                    if(this.due_date)
                    {
                        taskObj.due_date = firebase.firestore.Timestamp.fromDate(new Date(this.due_date));
                    }
                    db.collection('tasks').add(taskObj)
                    .then(() => {
                        $('#closemodal').click()
                        this.name = "";
                        this.description = "";
                        this.due_date = null;
                        this.priority = 0;
                    })
                    
                    
                }
                else
                {
                    ''
                }
                
            }
        }
    }
</script>

<style scoped>
.navbar {
    background-color: orange !important;
    height: 50px;
}
.addtask-btn {
    background-color: greenyellow;
    color: black;
}
</style>