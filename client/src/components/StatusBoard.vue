<template>
  <b-row class="mt-5 mx-1">
    <b-col cols="3" v-for="(status, i) in statusList" :key="i">
      <b-card
        border-variant="primary"
        :header="status.name"
        :header-bg-variant="status.headerVariant"
        header-text-variant="white"
        align="center"
        class="font-weight-bold"
      >
        <draggable v-model="status.boards" group="boards" @start="drag = true" @end="drag = false">
          <board-list
            v-for="todo in status.boards"
            :key="todo.title"
            :data="todo"
            :variant="status.headerVariant"
          ></board-list>
        </draggable>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import draggable from 'vuedraggable';
import Swal from 'sweetalert2';
import BoardList from '@/components/BoardList.vue';
import db from '@/config/firebaseConfig';

const todos = db.collection('todos');
const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export default {
  components: {
    BoardList,
    draggable,
  },
  data() {
    return {
      statusList: [
        { headerVariant: 'danger', name: 'Back-Log', boards: [] },
        { headerVariant: 'warning', name: 'To-Do', boards: [] },
        { headerVariant: 'primary', name: 'Doing', boards: [] },
        { headerVariant: 'success', name: 'Done', boards: [] },
      ],
      indexStatus: {
        'Back-Log': 0,
        'To-Do': 1,
        Doing: 2,
        Done: 3,
      },
      showDataModal: null,
      initialData: true,
    };
  },
  methods: {
    showDetailModal(event) {
      this.$emit('showModal', event);
    },
    initBoards() {
      for (let i = 0; i < this.statusList.length; i += 1) {
        this.statusList[i].boards = [];
      }
    },
    insertBoard(todo) {
      this.statusList[this.indexStatus[todo.status]].boards.push(todo);
    },
    updateShowModal(data) {
      this.showDataModal = data;
    },
  },
  created() {
    todos.onSnapshot((querySnapshot) => {
      this.initBoards();
      querySnapshot.forEach((doc) => {
        this.insertBoard({ id: doc.id, ...doc.data() });
      });
    });
  },
  watch: {
    statusList: {
      handler: (newVal) => {
        newVal.forEach((val) => {
          if (val.boards.length !== 0) {
            val.boards.forEach((board) => {
              if (board.status !== val.name) {
                const docRef = todos.doc(board.id);
                docRef.update({
                  status: val.name,
                });
                Toast.fire({
                  icon: 'success',
                  title: 'Successfully change board status',
                });
              }
            });
          }
        });
      },
      deep: true,
    },
  },
};
</script>
