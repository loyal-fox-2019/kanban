<template>
    <div class="card" style="width: 18rem;">
        <div class="card-header">{{ taskDetail.title }}</div>
        <div class="card-body">
            <p class="card-text text-left">{{ taskDetail.point }}</p>
            <p class="card-text text-left">{{ taskDetail.assignedTo }}</p>
            <div class="container-button">
                <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#'+ taskDetail.id">
                Show Detail
                </button>
                <div class="modal" :id="taskDetail.id" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div :class="modalHeaderContent">
                            <div class="d-flex p-2 justify-content-between">
                            <h5 class="modal-title">Detail Todo: {{ taskDetail.title }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        </div>
                        <div class="modal-body text-left">
                            <p class="font-weight-bold">Point:</p>
                            <p>{{ taskDetail.point }}</p>
                            <p class="font-weight-bold">Assigned To:</p>
                            <p>{{ taskDetail.assignedTo }}</p>
                            <p class="font-weight-bold">Description:</p>
                            <p>{{ taskDetail.description }}</p>
                            <p class="font-weight-bold">Status:</p>
                            <p>{{ taskDetail.status }}</p>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-warning" data-dismiss="modal" v-on:click.prevent="buttonOneClick">{{ buttonOne }}</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click.prevent="buttonTwoClick">{{ buttonTwo }}</button>
                            <button type="button" class="btn btn-success" data-dismiss="modal" v-on:click.prevent="buttonThreeClick">{{ buttonThree }}</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import db from '../config/config.js';

export default {
name: 'ContentCard',
    components: {
    },
    data() {
        return {
            buttonOne: '',
            buttonTwo: '',
            buttonThree: '',
            dataModal: null,
            modalHeaderContent: '',
        }
    },
    props: ['taskDetail'],
    created() {
        if(this.taskDetail.status === 'back-log') {
            this.buttonOne = ''
            this.buttonTwo = 'Remove'
            this.buttonThree = 'To-Do'
        } else if(this.taskDetail.status === 'to-do') {
            this.buttonOne = 'Back-Log'
            this.buttonTwo = 'Remove'
            this.buttonThree = 'Doing'
        } else if(this.taskDetail.status === 'doing') {
            this.buttonOne = 'To-Do'
            this.buttonTwo = 'Remove'
            this.buttonThree = 'Done'
        } else if(this.taskDetail.status === 'done') {
            this.buttonOne = 'Doing'
            this.buttonTwo = 'Remove'
            this.buttonThree = ''
        }
        switch (this.taskDetail.status) {
        case 'back-log':
            this.modalHeaderContent ='card-header text-white bg-secondary';
            break;
        case 'to-do':
            this.modalHeaderContent ='card-header text-white bg-info';
            break;
        case 'doing':
            this.modalHeaderContent ='card-header text-white bg-danger';
            break;
        case 'done':
            this.modalHeaderContent ='card-header text-white bg-success';
            break;
        }
    },
    methods: {
        buttonOneClick(id) {
            if(this.buttonOne === 'Back-Log') {
                db.collection("kanban").doc(this.taskDetail.id)
                .update({status: 'back-log'})
                .then(function() {
                    console.log("Document successfully updated!");
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            } else if(this.buttonOne === 'To-Do') {
                db.collection("kanban").doc(this.taskDetail.id)
                .update({status: 'to-do'})
                .then(function() {
                    console.log("Document successfully updated!");
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            } else if(this.buttonOne === 'Doing') {
                db.collection("kanban").doc(this.taskDetail.id)
                .update({status: 'doing'})
                .then(function() {
                    console.log("Document successfully updated!");
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            }
        },
        buttonThreeClick(id) {
            if(this.buttonThree === 'To-Do') {
                db.collection("kanban").doc(this.taskDetail.id)
                .update({status: 'to-do'})
                .then(function() {
                    console.log("Document successfully updated!");
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            } else if(this.buttonThree === 'Doing') {
                db.collection("kanban").doc(this.taskDetail.id)
                .update({status: 'doing'})
                .then(function() {
                    console.log("Document successfully updated!");
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            } else if(this.buttonThree === 'Done') {
                db.collection("kanban").doc(this.taskDetail.id)
                .update({status: 'done'})
                .then(function() {
                    console.log("Document successfully updated!");
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            }
        },
        buttonTwoClick() {
            if(this.buttonTwo === 'Remove') {
                db.collection("kanban").doc(this.taskDetail.id)
                .delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error deleting document: ", error);
                });
            }
        },
        myLove(data) {
            this.dataModal = data;
        }
    }

}
</script>

<style scoped>
    .card {
        margin-top: 10px;
        font: 10px;
    }
</style>