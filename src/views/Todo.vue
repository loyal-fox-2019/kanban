<template>
  <div>
    <Navigation class="mb-7">
      <div class="my-2 my-lg-0">
        <button class="btn btn-outline-dark my-2 my-sm-0" @click="$modal.show('modal-add')">
          Add todo
        </button>
        <ModalAdd />
      </div>
    </Navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3">
          <WrapperCard :name="'Back-Log'">
            <Card v-for="todo in todos.backLog" :key="todo.id" :todo="todo">
              <ModalDetail :todo="todo" />
            </Card>
          </WrapperCard>
        </div>
        <div class="col-lg-3">
          <WrapperCard :name="'To-Do'">
            <Card v-for="todo in todos.toDo" :key="todo.id" :todo="todo">
              <ModalDetail :todo="todo" />
            </Card>
          </WrapperCard>
        </div>
        <div class="col-lg-3">
          <WrapperCard :name="'Doing'">
            <Card v-for="todo in todos.doing" :key="todo.id" :todo="todo">
              <ModalDetail :todo="todo" />
            </Card>
          </WrapperCard>
        </div>
        <div class="col-lg-3">
          <WrapperCard :name="'Done'">
            <Card v-for="todo in todos.done" :key="todo.id" :todo="todo">
              <ModalDetail :todo="todo" />
            </Card>
          </WrapperCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import WrapperCard from '@/components/todo/WrapperCard.vue';
import Card from '@/components/todo/Card.vue';
import ModalDetail from '@/components/todo/ModalDetail.vue';
import ModalAdd from '@/components/todo/ModalAdd.vue';
import db from '@/config/firebase';

export default {
  name: 'Todo',
  data() {
    return {
      todos: [],
    };
  },
  components: {
    Navigation,
    WrapperCard,
    Card,
    ModalDetail,
    ModalAdd,
  },
  computed: {},
  methods: {
    updateTodos(docs) {
      const todosTemp = {
        backLog: [],
        toDo: [],
        doing: [],
        done: [],
      };
      docs.forEach((val) => {
        const data = val.data();
        switch (data.status) {
          case 'backLog':
            todosTemp.backLog.push({
              id: val.id,
              ...data,
            });
            break;
          case 'toDo':
            todosTemp.toDo.push({
              id: val.id,
              ...data,
            });
            break;
          case 'doing':
            todosTemp.doing.push({
              id: val.id,
              ...data,
            });
            break;
          case 'done':
            todosTemp.done.push({
              id: val.id,
              ...data,
            });
            break;
          default:
            // statements_def
            break;
        }
      });
      this.todos = todosTemp;
      return true;
    },
  },
  created() {
    db.collection('todoApp')
      .doc('36oKKCBIaSelFO2p3aJV')
      .collection('todos')
      .orderBy('created_at', 'asc')
      .onSnapshot(({ docs }) => {
        this.updateTodos(docs);
      });
  },
};
</script>

<style lang="css" scoped></style>
