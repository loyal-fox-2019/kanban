<template>
    <div>
        <div class="category-header"><h2><i>{{categoryName}}</i></h2></div>
        <div class="task-column">
            <div v-if="loading" class="loading"><img src="../../public/Fire3D.gif" width="30" height="30" alt="">Loading...</div>
            <taskcard v-for="task in tasks" :key="task.id" :task="task"></taskcard>
        </div>
    </div>
</template>

<script>
    import db from "../config/firebase.js";
    import taskcard from "./taskcard.vue";

    export default {
        name: "task-columns",
        props: {
            categoryName: String,
            searchStr: String
        },
        data() {
            return {
                tasks: [],
                loading: true,
                unsubscribe: null
            }
        },
        created() {
            this.unsubscribe = this.getTasks();
        },
        methods: {
            getTasks() {
                return db.collection("tasks")
                .where("category","==",this.categoryName)
                //.orderBy("created_date")
                .onSnapshot((querySnapshot) => {
                    this.tasks = [];
                    querySnapshot.forEach((doc) => {
                        let t = {
                            id: doc.id,
                            data: doc.data()
                        }

                        if(this.searchStr != "") {
                            if(RegExp('\\b'+this.searchStr,'gi').test(t.data.name) || RegExp('\\b'+this.searchStr,'gi').test(t.data.description))
                            {
                                this.tasks.push(t);
                            }
                        }
                        else
                        {
                            this.tasks.push(t);
                        }
                        
                        
                    });
                    this.loading = false;
                });
            }
        },
        watch: {
            searchStr: {
                handler() {
                    this.unsubscribe();
                    this.unsubscribe = this.getTasks();
                }
            }
        },
        components: {
            taskcard
        }
    }
</script>

<style scoped>
.task-column {
    width: 22vw;
    margin-top: 15px;
    margin-bottom: 15px;
    height: calc(100vh - 120px);
    overflow-y: scroll;
    
    border: 1px solid blue;
}
.category-header {
    text-align: center;
}
.loading {
    margin-top: 50%;
    text-align: center;
}
</style>