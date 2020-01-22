<template>
  <div >
        <div class="card">
            <div class="card-header">
                {{ cat }}
            </div>
            <div class="card-body">
                <todo v-for="(todo, i) in data" :key="i" :id="i" :oneTodo="todo"></todo>
            </div>
        </div>
  </div>
</template>

<script>
import todo from '../components/todo.vue'
export default {
    name: 'notes',
    props: ['data', 'cat'],
    components:{
        todo
    },
    data(){
        return{
            todos: this.data,
        }
    },
}
</script>

<style>

</style>