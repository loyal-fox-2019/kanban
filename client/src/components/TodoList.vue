<template>
  <b-card tag="article">
    <b-card-text class="border-bottom text-center">
      <h2>{{ todo.info.title }}</h2>
    </b-card-text>

    <b-card-text> Point : {{ todo.info.point }} </b-card-text>

    <b-card-text> Description : {{ todo.info.description }} </b-card-text>

    <b-card-text> Assigned To : {{ todo.info.assignedTo }} </b-card-text>

    <div class="d-flex justify-content-end">
      <b-button
        class="d-flex align-self-end mt-2"
        variant="primary"
        @click="$bvModal.show(todo.info.id)"
      >
        Show Detail
      </b-button>
      <ModalTodo
        :todo="{ updateTo: todo.updateTo, info: todo.info }"
      ></ModalTodo>
    </div>
  </b-card>
  <!-- 
   "updateTo": "To-Do",
  "todo": {
    "id": "sb24J1UYLsDuXCEvi6PA",
    "assignedTo": "siapa",
    "description": "coba",
    "point": "10",
    "status": "Back-Log",
    "title": "Coba"
  }
   -->
</template>

<script>
import ModalTodo from './ModalTodo'
export default {
  name: 'TodoList',
  props: ['todo'],
  components: {
    ModalTodo
  }
}
</script>

<style></style>
