<template>
    <div>
        <div class="card text-white mb-3" :class="cardclass" style="max-width: 18rem;">
        <div class="card-header"><h5 class="card-title">{{task.data.name}}</h5></div>
        <div class="card-body" :class="cardclass">            
            <p class="card-text">{{task.data.description || 'no description'}}</p>
            <p class="card-text"><b>Due date:</b> {{task.data.due_date ? task.data.due_date.toDate() : "n/a"}}</p>
            <p class="card-text"><b>Priority:</b> {{task.data.priority}}</p>
            <button type="button" class="btn btn-primary to-left" @click="moveLeft" v-if="task.data.category!='backlog'"><span class="fas fa-arrow-left"></span></button>
            <button type="button" class="btn btn-primary to-right" @click="moveRight" v-if="task.data.category!='done'"><span class="fas fa-arrow-right"></span></button>

            <!-- Delete -->                
            <b-button type="button" class="btn btn-danger trash" :id="'popoverdeletebtn'+task.id" @click="openDeletePopover"><span class="fas fa-trash"></span></b-button>
            <b-popover :target="'popoverdeletebtn'+task.id" triggers="click" :show="popoverShow" placement="auto">
            <template v-slot:title>
                <b-button @click="onCloseDeletePopover" class="close" aria-label="Close" ref="button">
                <span class="d-inline-block" aria-hidden="true">&times;</span>
                </b-button>
                Are you sure?
            </template>

            <div>
                <b-button @click="onCloseDeletePopover" size="sm">Cancel</b-button>
                <b-button @click="onOkDeletePopover" size="sm" variant="primary">Ok</b-button>
            </div>
            </b-popover>
                
            
        </div>
        </div>
    </div>
</template>

<script>
    import db from "../config/firebase.js";
    export default {
        name: "taskcard",
        props: {
            task: Object
        },
        data() {
            return {
                popoverShow: false
            }
        },
        computed: {
            cardclass() {
                if(this.task.data.category == "done")
                {
                    return "bg-success";
                }
                else if(this.task.data.hasOwnProperty("due_date"))
                {
                    if(this.task.data.due_date.seconds*1000 <= (new Date()).getTime())
                    {                        
                        return "bg-danger";
                    }
                }
                return "bg-info";
            }
        },
        methods: {
            moveLeft() {
                let prevCat;
                switch(this.task.data.category)
                {
                    case "done":
                        prevCat = "doing";
                        break;
                    case "doing":
                        prevCat = "todo";
                        break;
                    case "todo":
                        prevCat = "backlog";
                        break;
                    default:
                        prevCat = this.task.data.category;
                }
                db.collection('tasks').doc(this.task.id)
                .set({
                    category: prevCat
                },{merge: true})
                .then(() => {
                    ''
                })
                .catch(() => {
                    ''
                });
            },
            moveRight() {
                let nextCat;
                switch(this.task.data.category)
                {
                    case "backlog":
                        nextCat = "todo";
                        break;
                    case "todo":
                        nextCat = "doing";
                        break;
                    case "doing":
                        nextCat = "done";
                        break;
                    default:
                        nextCat = this.task.data.category;
                }
                db.collection('tasks').doc(this.task.id)
                .set({
                    category: nextCat
                },{merge: true})
                .then(() => {

                })
                .catch(() => {

                });
            },
            deleteTask() {
                db.collection('tasks').doc(this.task.id)
                .delete()
                .then(() => {
                    this.popoverShow = false
                })
                .catch(() => {
                    this.popoverShow = false
                });
            },
            onCloseDeletePopover() {
                this.popoverShow = false;
            },
            onOkDeletePopover() {
                this.deleteTask();
            },
            openDeletePopover() {
                this.popoverShow = true;
            },
        }
    }
</script>

<style scoped>
.card {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
.card-title {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.trash {
    float: right;
    border: 2px solid darkred;
}
.to-left {
    margin-right: 5px;
    border: 2px solid darkblue;
}
.to-right {
    border: 2px solid darkblue;
}
.card-body.bg-danger {
    background-image: url("../../public/Fire3D.gif")
}
</style>