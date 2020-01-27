<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#" class="kanban">
      <i class="fas fa-clipboard-list"></i>KANBAN</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <Create />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
        <!-- <img src="https://image.freepik.com/free-vector/student-moving-clock-hands_74855-2538.jpg"
        class="d-inline-block align-center"
        alt="Kitten"> -->

<script>
import CreateModal from './CreateModal.vue';

export default {
  components: {
    Create: CreateModal,
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Hind+Siliguri&display=swap');

img {
  height: 70px;;
}
.kanban {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 42px
}
</style>
