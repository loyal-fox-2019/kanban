<template>
   <div class="card shadow">
        <div class="card-body">
            <h4 class="card-title">{{title}}</h4>
            <p class="card-text">{{description}}</p>
            <p class="card-text">Point : {{point}}</p>
            <p class="card-text">Assigned to : {{assigned_to}}</p>
        </div>
        <div class="card-body">
            <div class="row">
                <button @click="undateTask({title,description,point,id,assigned_to,status})" class="btn btn-dark m-2">Move Back</button>
                <button @click="updateTask({title,description,point,id,assigned_to,status})" class="btn btn-dark m-2">Move Front</button>
            </div>
            <button @click="deleteTask(id)" class="btn btn-dark m-2">Delete</button>
        </div>
    </div>
</template>

<script>
import db from '../../config/firebase'
export default {
    props : {
        title : String,
        description : String,
        point : Number,
        assigned_to : String,
        id : String,
        status : String
    },
    methods : {
        deleteTask(id){
            console.log('deleting...')
            db.collection('kanban').doc(`${id}`).delete()
            .then(()=>console.log('berhasi delete'))
            .catch(err=>console.log('error delete '+err))
        },
        updateTask(payload){
            console.log('updating...')
            console.log(payload)
            switch(payload.status){
                case "backlog": 
                    db.collection('kanban').doc(`${payload.id}`).set({
                        title : payload.title,
                        description : payload.description,
                        point : payload.point,
                        id : payload.id,
                        assigned_to : payload.assigned_to,
                        status : "todo"
                        })
                    .then(()=>console.log('berhasi delete'))
                    .catch(err=>console.log('error delete '+err))
                    break
                case "todo": 
                    db.collection('kanban').doc(`${payload.id}`).set({
                        title : payload.title,
                        description : payload.description,
                        point : payload.point,
                        id : payload.id,
                        assigned_to : payload.assigned_to,
                        status : "doing"
                        })
                    .then(()=>console.log('berhasi delete'))
                    .catch(err=>console.log('error delete '+err))
                    break
                case "doing": 
                    db.collection('kanban').doc(`${payload.id}`).set({
                        title : payload.title,
                        description : payload.description,
                        point : payload.point,
                        id : payload.id,
                        assigned_to : payload.assigned_to,
                        status : "done"
                        })
                    .then(()=>console.log('berhasi delete'))
                    .catch(err=>console.log('error delete '+err))
                    break
                case "done": 
                    this.deleteTask(payload.id)
                    break
            }
        },
        undateTask(payload){
            console.log('undating...')
            console.log(payload)
            switch(payload.status){
                case "backlog": 
                    this.deleteTask(payload.id)
                    break
                case "todo": 
                    db.collection('kanban').doc(`${payload.id}`).set({
                        title : payload.title,
                        description : payload.description,
                        point : payload.point,
                        id : payload.id,
                        assigned_to : payload.assigned_to,
                        status : "backlog"
                    })
                    .then(()=>console.log('berhasi delete'))
                    .catch(err=>console.log('error delete '+err))
                    break
                case "doing": 
                    db.collection('kanban').doc(`${payload.id}`).set({
                        title : payload.title,
                        description : payload.description,
                        point : payload.point,
                        id : payload.id,
                        assigned_to : payload.assigned_to,
                        status : "todo"
                    })
                    .then(()=>console.log('berhasi delete'))
                    .catch(err=>console.log('error delete '+err))
                    break
                case "done": 
                    db.collection('kanban').doc(`${payload.id}`).set({
                        title : payload.title,
                        description : payload.description,
                        point : payload.point,
                        id : payload.id,
                        assigned_to : payload.assigned_to,
                        status : "doing"
                    })
                    .then(()=>console.log('berhasi delete'))
                    .catch(err=>console.log('error delete '+err))
                    break
            }
        }
    }
}
</script>

<style>

</style>