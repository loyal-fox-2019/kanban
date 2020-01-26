<template>
    <div class="card card-category">
        <h5 class="card-header" 
        v-bind:style='{"background-color": this.bgColor}'
        v-html="titleCategory.content"
        ></h5>
            <div class="card-body">
                <todoCard 
                v-for="(task, i) in taskArray" 
                :key="i" v-bind:task="task" 
                v-on:updateTask="updateTaskArray($event)"></todoCard>
            </div>
    </div>
</template>

<script>
import todoCard from '@/components/TodoCard.vue';
import db from '@/config/firebase.js';


export default {
    name: 'CategoryCard',
    props: ['titleCategory'],
    created() {
    db.collection("kanban")
        .onSnapshot((doc) => {
            this.taskArray = [];
            doc.docs.forEach(element => {
                if(element.data().status === this.titleCategory.status) {
                    this.taskArray.push({id: element.id, ...element.data()});    
                }
            });
        });
    },
    components: {
        todoCard,
    },
    data(){
        return {
            bgColor: this.titleCategory.bgColor,
            taskArray: [],
        }
    },
}
</script>

<style scoped>
.card-category {
    height: 500px;
    border-radius: 25px 25px 0 0;
}
.card-body {
    overflow-y: scroll;
}
.card-header {
    color: #fff;
    font-weight: bold;
    font-size: 22px;
    box-shadow: 0 0 10px #17202A;
    border-radius: 1em !important;
}
</style>