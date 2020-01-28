<template>
    <div class="card mb-2">
        <div class="card-header">
            {{indivData.title}}
        </div>
        <div class="card-body">
            <p class="card-text">Point: {{indivData.point}}</p>
            <p class="card-text">Assigned To: {{indivData.assignedTo}}</p>
            <b-button variant="primary" v-b-modal="`modal-detail${indivData.id}`">Show Detail</b-button>
            <b-modal :id="`modal-detail${indivData.id}`" hide-footer>
                <template class="headers" v-slot:modal-title>
                    Detail Task {{indivData.title}} for {{indivData.assignedTo}}
                </template>
                <p class="subtitle">
                    Task Description:
                </p>
                <p>{{indivData.description}}</p>
                <br>
                <p class="subtitle">
                    Point:
                </p>
                <p>{{indivData.point}}</p>
                <br>
                <p class="subtitle">
                    Status:
                </p>
                <p>{{indivData.status}}</p>
                <br>
                <div class="d-flex justify-content-between mt-4 mb-2">
                    <div class="col">
                        <button type="button" class="btn btn-warning" v-on:click.prevent="back" v-if="!isBackLog" @click="$bvModal.hide(`modal-detail${indivData.id}`)">{{backText}}</button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger" v-on:click.prevent="del" @click="$bvModal.hide(`modal-detail${indivData.id}`)">Delete</button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-success" v-on:click.prevent="next" v-if="!isDone" @click="$bvModal.hide(`modal-detail${indivData.id}`)">{{nextText}}</button>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import db from '../config/firebase-config'
import Swal from 'sweetalert2'
export default {
    name: "mini-card",
    data(){
        return {
            isBackLog: false,
            isDone: false
        }
    },
    props: {
        indivData: Object
    },
    computed: {
        nextText(){
            let text = ''
            switch(this.indivData.status) {
                case "Back-Log":
                    text = "To-Do"
                    break;
                case "To-Do":
                    text = "Doing"
                    break;
                case "Doing":
                    text = "Done"
                    break;
            }
            return text
        },
        backText(){
            let text = ''
            switch(this.indivData.status) {
                case "Done":
                    text = "Doing"
                    break;
                case "Doing":
                    text = "To-Do"
                    break;
                case "To-Do":
                    text = "Back-Log"
                    break;
            }
            return text
        }
    },
    methods: {
        next: function(){
            let newStatus
            switch(this.indivData.status) {
                case "Back-Log":
                    newStatus = "To-Do"
                    break;
                case "To-Do":
                    newStatus = "Doing"
                    break;
                case "Doing":
                    newStatus = "Done"
                    break;
            }
            db.collection("kanban").doc(this.indivData.id).update({
                status: newStatus
            })

        },
        back: function(){
            let newStatus
            switch(this.indivData.status) {
                case "Done":
                    newStatus = "Doing"
                    break;
                case "Doing":
                    newStatus = "To-Do"
                    break;
                case "To-Do":
                    newStatus = "Back-Log"
                    break;
            }
            db.collection("kanban").doc(this.indivData.id).update({
                status: newStatus
            })
        },
        del: function(){
            db.collection("kanban").doc(this.indivData.id).delete()
            .then(()=>{
                Swal.fire(
                    'Success!',
                    'File deleted!',
                    'success'
                )         
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
        }
    },
    created(){
        if(this.indivData.status == "Back-Log") {
            this.isBackLog = true
        }
        else if(this.indivData.status == "Done") {
            this.isDone = true
        }
    }
}
</script>

<style scoped>
.subtitle {
    font-weight: bold;
}
.col {
    text-align: center;
}
</style>