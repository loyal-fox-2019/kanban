<template>
    <div class="modal" id="todoAddModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center">
                    <h5 class="modal-title">Add New Todo</h5>
                </div>
                
                <div class="modal-body">
                    <form class="">
                        <div class="form-group col">
                            <label for="title">Title</label>
                            <input required type="text" class="form-control" id="title" v-model="title" value="">
                            <div class="invalid-feedback">Fail! Something wrong.</div>
                        </div>
                        <div class="form-group col">
                            <label for="assignedTo">Assigned To</label>
                            <input required type="text" class="form-control" id="assignedTo" v-model="assignedTo" value="">
                            <div class="invalid-feedback">Fail! Something wrong.</div>
                        </div>
                        <div class="form-group col">
                            <label for="point">Point</label>
                            <input required type="number" class="form-control" id="point" v-model="point">
                            <div class="invalid-feedback">Fail! Something wrong.</div>
                        </div>
                        <div class="form-group col">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="description" v-model="description"></textarea>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button type="submit" class="btn btn-info" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-danger" data-dismiss="modal" v-on:click.prevent="saveTodo">Save Todo</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import db from '../config/config.js';

export default {

    name: 'AddTodo',
    data() {
        return {
            title: '',
            point: 0,
            assignedTo: '',
            description: '',
        }
    },
    created() {
    },
    methods: {
        saveTodo() {
            if(this.title && this.assignedTo && this.point) {
                db.collection("kanban").add({
                    title: this.title,
                    point: this.point,
                    assignedTo: this.assignedTo,
                    description: this.description,
                    status: 'back-log',
                    date: new Date()
                })
                .then(function(response) {
                    console.log("Document written with ID: ", response.id);
                    this.title = '',
                    this.point = 0,
                    this.assignedTo = '',
                    this.description = '',
        
                    $('#todoAddModal').modal('hide');
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }
        }
    }
}
</script>

<style scoped>

</style>