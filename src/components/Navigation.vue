<template>
  <div>
    <nav class="navbar navbar-light bg-white shadow-sm fixed-top ">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Kanban</a>
        <div class="float-left">
          <slot></slot>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',

  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
