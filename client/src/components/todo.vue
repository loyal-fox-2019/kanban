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
                    {{ oneTodo.title }}
                </template>
                <div class="d-block text-center">
                    <h6>Description</h6>
                    <p>{{ oneTodo.description }}</p>
                    <h6>Points</h6>
                    <p>{{ oneTodo.points }}</p>
                    <h6>Assigned To</h6>
                    <p>{{ oneTodo.assigned }}</p>
                </div>
                <div>
                    <b-button variant="warning" v-on:click="goBack(oneTodo)" v-if="oneTodo.status!=='backlog'">Back</b-button>
                    <b-button variant="danger" v-on:click="deleteTodo(oneTodo)">Delete</b-button>
                    <b-button variant="success" v-on:click="forward(oneTodo)" v-if="oneTodo.status!=='done'">Forward</b-button>
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
        goBack(todo){
            const sfDocRef = db.collection("kanban").doc(todo.id)
            return db.runTransaction(function(transaction) {
                return transaction.get(sfDocRef).then(function(sfDoc) {
                    if (!sfDoc.exists) {
                        throw "Document does not exist!";
                    }
                    let newStatus = null
                    switch (sfDocRef.status){
                        case 'todo':
                            newStatus = 'backlog'
                            break;
                        case 'doing':
                            newStatus = 'todo'
                            break;
                        case 'done':
                            newStatus = 'doing'
                            break
                    }
                    transaction.update(sfDocRef, { status: newStatus });
                });
            }).then(function() {
                console.log("Transaction successfully committed!");
            }).catch(function(error) {
                console.log("Transaction failed: ", error);
            });

        },
        forward(status){
            const sfDocRef = db.collection("kanban").doc(todo.id)
            return db.runTransaction(function(transaction) {
                return transaction.get(sfDocRef).then(function(sfDoc) {
                    if (!sfDoc.exists) {
                        throw "Document does not exist!";
                    }
                    let newStatus = null
                    switch (sfDocRef.status){
                        case 'backlog':
                            newStatus = 'todo'
                            break
                        case 'todo':
                            newStatus = 'doing'
                            break;
                        case 'doing':
                            newStatus = 'done'
                            break;
                    }
                    transaction.update(sfDocRef, { status: newStatus });
                });
            }).then(function() {
                console.log("Transaction successfully committed!");
            }).catch(function(error) {
                console.log("Transaction failed: ", error);
            });
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