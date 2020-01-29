<template>

<div>
    <div class="card">
        <div class="card-header">
            {{ oneTodo.title }}
        </div>
        <div class="card-body">
            <h5 class="card-title">Point: {{ oneTodo.points }}</h5>
            <h5>Assigned To: {{ oneTodo.assigned }}</h5>
            <b-button v-b-modal.modal-center id="show-btn" @click="$bvModal.show(`${oneTodo.status} ${id}`)">Show Detail</b-button>
            <b-modal :id="`${oneTodo.status} ${id}`" centered title="BootstrapVue" hide-footer>
                <template v-slot:modal-title>
                    <h3>{{ oneTodo.title }}</h3>
                </template>
                <div class="d-block text-center">
                    <h6>Description</h6>
                    <p>{{ oneTodo.description }}</p>
                    <h6>Points</h6>
                    <p>{{ oneTodo.points }}</p>
                    <h6>Assigned To</h6>
                    <p>{{ oneTodo.assigned }}</p>
                </div>
                <div class="row justify-content-around">
                    <b-button class="col-md-3" variant="warning" @click="$bvModal.hide(`${oneTodo.status} ${id}`)" v-on:click="goBack(oneTodo)" v-show="oneTodo.status!=='backlog'">Back</b-button>
                    <b-button class="col-md-3" variant="danger"  @click="$bvModal.hide(`${oneTodo.status} ${id}`)" v-on:click="deleteTodo(oneTodo)">Delete</b-button>
                    <b-button class="col-md-3" variant="success" @click="$bvModal.hide(`${oneTodo.status} ${id}`)" v-on:click="forward(oneTodo)" v-show="oneTodo.status!=='done'">Forward</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</div>
    
</template>

<script>
import db from '../config/firebase'
export default {
    name: 'todo',
    props: ['oneTodo','id'],
    data(){
        return{
            items: null,
        }
    },
    methods:{
        showAlertGood() {
                // Use sweetalert2
                this.$swal('Great Job, Keep it up!!');
            },
        showAlertBad() {
                // Use sweetalert2
                this.$swal("Let's Get Back To Work");
            },
        goBack(todo){
            let newStatus = null
                switch (todo.status){
                    case 'done':
                        newStatus = 'doing'
                        break
                    case 'doing':
                        newStatus = 'todo'
                        break;
                    case 'todo':
                        newStatus = 'backlog'
                        break;
                    case 'backlog':
                        newStatus = 'backlog'
                        break;
                }
            db.collection('kanban').doc(todo.id).update({status: newStatus})
            .then(()=>{
                this.showAlertBad()
                console.log('successfully updated')
            })

        },
        forward(todo){
            let newStatus = null
                switch (todo.status){
                    case 'backlog':
                        newStatus = 'todo'
                        break
                    case 'todo':
                        newStatus = 'doing'
                        break;
                    case 'doing':
                        newStatus = 'done'
                        break;
                    case 'done': 
                        newStatus = 'done'
                        break;
                }
                console.log(newStatus)
            db.collection('kanban').doc(todo.id).update({status: newStatus})
            .then(()=>{
                 this.showAlertGood()
                console.log('successfully updated')
            })
        },
        deleteTodo(todo){
            db.collection('kanban').doc(todo.id).delete()
            .then(()=>{
                console.log('delete document successful')
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