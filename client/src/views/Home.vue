<template>
  <div class="home">
    <top-navbar></top-navbar>
    <b-row class="mt-5 mx-1">
      <status-board
        v-for="status in statusList"
        :key="status.name"
        :headerTxt="status.name"
        :headerVariant="status.headerVariant"
        :todos="status.boards"
      >
      </status-board>
    </b-row>
  </div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue';
import StatusBoard from '@/components/StatusBoard.vue';

const db = require('../config/firebaseConfig.js');

export default {
  name: 'home',
  data() {
    return {
      statusList: {
        'Back-Log': { headerVariant: 'danger', name: 'Back-Log', boards: [] },
        'To-Do': { headerVariant: 'warning', name: 'To-Do', boards: [] },
        Doing: { headerVariant: 'primary', name: 'Doing', boards: [] },
        Done: { headerVariant: 'success', name: 'Done', boards: [] },
      },
    };
  },
  methods: {
    initBoards() {
      const keys = Object.keys(this.statusList);
      keys.forEach((key) => {
        this.statusList[key].boards = [];
      });
    },
    insertBoard(todo) {
      this.statusList[todo.status].boards.push(todo);
    },
  },
  components: {
    TopNavbar,
    StatusBoard,
  },
  created() {
    db.collection('todos').onSnapshot((querySnapshot) => {
      this.initBoards();
      querySnapshot.forEach((doc) => {
        this.insertBoard({ id: doc.id, ...doc.data() });
      });
    });
  },
};
</script>
