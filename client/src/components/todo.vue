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
                    <!-- <b-button variant="warning" v-on:click="goBack(`${oneTodo.status}`)">Warning</b-button>
                    <b-button variant="danger" v-on:click="deleteTodo(`${oneTodo.status}`)">Delete</b-button>
                    <b-button variant="success" v-on:click="forward(`${oneTodo.status}`)">Success</b-button> -->
                </div>
            </b-modal>
        </div>
    </div>
</div>
    
</template>

<script>
// import db from '../config/firebase'
export default {
    name: 'todo',
    props: ['oneTodo','id'],
    data(){
        return{
            items: null,
        }
    },
    methods:{
        // goBack(status){

        // },
        // forward(status){

        // },
        // deleteTodo(status){

        // }
    }
}
</script>

<style>

</style>