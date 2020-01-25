<template>
  <div class="home">
    <top-navbar></top-navbar>
    <status-board></status-board>
    <board-modal :data="showDataModal"></board-modal>
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
      showDataModal: null,
    };
  },
  methods: {
    updateShowModal(data) {
      this.showDataModal = data;
    },
  },
  components: {
    TopNavbar,
    StatusBoard,
    BoardModal,
  },
};
</script>
