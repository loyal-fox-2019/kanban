<template>
    <div>
        <b-navbar type="light" variant="light">
            <b-navbar-brand href="#">Kanban Board</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-button variant="primary" v-b-modal.modal-newtask>New Task</b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-modal id="modal-newtask" title="New Task" hide-footer>
            <form>
                <div class="form-group">
                    <label for="inputTitle">Title</label>
                    <input type="text" class="form-control" id="inputTitle" placeholder="Task Title" v-model="newTitle">
                </div>
                <div class="form-group">
                    <label for="inputDescription">Description</label>
                    <textarea class="form-control" id="inputDescription" placeholder="Task Short Description" rows="2" v-model="newDescription"></textarea>
                </div>
                <div class="form-group">
                    <label for="inputPoint">Point</label>
                    <input class="form-control" type="number" value="0" id="inputPoint" v-model="newPoint">
                </div>
                <div class="form-group">
                    <label for="inputAssigned">Assigned To</label>
                    <input type="text" class="form-control" id="inputAssigned" placeholder="Assigned To" v-model="newAssigned">
                </div>
                <b-button variant="light" v-on:click.prevent="clear" @click="$bvModal.hide('modal-newtask')">Cancel</b-button>
                <b-button class="ml-4" variant="primary" v-on:click.prevent="save" @click="$bvModal.hide('modal-newtask')">Save</b-button>
            </form>
        </b-modal>
    </div>
</template>

<script>
import db from '../config/firebase-config'
export default {
    name: 'navbar',
    data(){
        return {
            newTitle: "",
            newDescription: "",
            newPoint: "",
            newAssigned: ""
        }
    },
    methods: {
        clear: function(){
            this.newTitle = ""
            this.newDescription = ""
            this.newPoint = ""
            this.newAssigned = ""
        },
        save: function(){
            db.collection("kanban").add({
                title: this.newTitle,
                description: this.newDescription,
                point: this.newPoint,
                assignedTo: this.newAssigned,
                status: "Back-Log"
            })
            this.newTitle = ""
            this.newDescription = ""
            this.newPoint = ""
            this.newAssigned = ""
        }
    }
}
</script>

<style>

</style>