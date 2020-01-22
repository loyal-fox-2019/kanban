<template>
    <div>
        <div class="category-header"><h2>{{categoryName}}</h2></div>
        <div class="task-column">
            <taskcard v-for="task in tasks" :key="task.id" :task="task"></taskcard>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import 'firebase/firestore';
    const firebaseConfig = {
        apiKey: "AIzaSyDjU8ffKV72f2lMBiuLmolPWTAxyVPPyAM",
        authDomain: "kanban-on-fire.firebaseapp.com",
        databaseURL: "https://kanban-on-fire.firebaseio.com",
        projectId: "kanban-on-fire",
        storageBucket: "kanban-on-fire.appspot.com",
        messagingSenderId: "700513586872",
        appId: "1:700513586872:web:beedbbf09d3877782dee4d"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    import taskcard from "./taskcard.vue";

    export default {
        name: "task-columns",
        props: {
            categoryName: String,
            searchStr: String
        },
        data() {
            return {
                tasks: []
            }
        },
        created() {
            db.collection("tasks")
            .where("category","==",this.categoryName)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let t = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.tasks.push(t);
                });
            });
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
</style>