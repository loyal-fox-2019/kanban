<template>
  <div class="home">
    <top-navbar></top-navbar>
    <status-board @showModal="modalShown($event)"></status-board>
    <board-modal :data="dataModal"></board-modal>
  </div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue';
import StatusBoard from '@/components/StatusBoard.vue';
import BoardModal from '@/components/BoardModal.vue';

export default {
  name: 'home',
  data() {
    return {
      dataModal: {
        title: null,
        description: null,
        point: null,
        assignedTo: null,
      },
    };
  },
  methods: {
    modalShown(data) {
      this.dataModal = data;
    },
  },
  components: {
    TopNavbar,
    StatusBoard,
    BoardModal,
  },
};
</script>
