<template>
  <b-card
    :class="categories[index].bgColor"
    header-tag="div"
    header-class="text-center font-weight-bold"
    tag="article"
  >
    <template v-slot:header>
      <h6 class="mb-2" style="font-size: xx-large">
        {{ categories[index].title }}
      </h6>
    </template>

    <div v-if="todos.length > 0">
      <div class="my-5" v-for="todo in todos" :key="todo.id">
        <TodoList
          :todo="{
            updateTo: index != 3 ? categories[index + 1].title : 'Back-Log',
            info: todo
          }"
        />
      </div>
    </div>

    <b-card-text v-else>
      <h2 class="text-center">No Todo</h2>
    </b-card-text>
  </b-card>
</template>

<script>
import TodoList from './TodoList'
export default {
  name: 'TodoCategory',
  props: ['todoData'],
  data() {
    return {
      // data from props saved to this obj
      index: this.todoData.index,
      categories: [
        { title: 'Back-Log', bgColor: 'bg-danger' },
        { title: 'To-Do', bgColor: 'bg-warning' },
        { title: 'Doing', bgColor: 'bg-primary' },
        { title: 'Done', bgColor: 'bg-success' }
      ]
    }
  },
  computed: {
    todos() {
      return this.todoData.todos
    }
  },
  components: {
    TodoList
  }
}
</script>

<style></style>
