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
                <button class="btn btn-outline-success my-2 my-sm-0">New task</button>
                
            </div>
            </nav>
    </div>
</template>

<script>
    export default {
        name: "navbar",
        data() {
            return {
                
            }
        },
        props: {
            showTask: Object
        },
        methods: {
            toggleColumn(columnId) {
                this.$emit('toggleShowColumn',columnId);
            },
            search(str) {
                str;
            },
            newTask() {
                this.$emit('newTask');
            }
        }
    }
</script>

<style scoped>
.navbar {
    background-color: orange !important;
    height: 50px;
}
.btn {
    background-color: greenyellow;
    color: black;
}
</style>