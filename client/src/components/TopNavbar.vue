<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="shadow-sm">
      <b-container>
        <b-navbar-brand href="#" class="font-weight-bold"
          >FireBan Board</b-navbar-brand
        >

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-button variant="outline-primary" size="sm">New Board</b-button> -->
            <new-board></new-board>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import NewBoard from '@/components/NewBoard.vue';

export default {
  components: {
    NewBoard,
  },
};
</script>
