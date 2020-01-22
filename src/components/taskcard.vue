<template>
    <div>
        <div class="card text-white mb-3" :class="cardclass" style="max-width: 18rem;">
        <div class="card-header"><h5 class="card-title">{{task.data.name}}</h5></div>
        <div class="card-body">            
            <p class="card-text">{{task.data.description}}</p>
            <p class="card-text">Due date: {{task.data.due_date ? task.data.due_date.toDate() : "n/a"}}</p>
            <p class="card-text">Priority: {{task.data.priority}}</p>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "taskcard",
        props: {
            task: Object
        },
        data() {
            return {
                cardclass: this.task.data.category == "done" ? "bg-success" : "bg-info"
            }
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
</style>