<template>
  <div>
    <div class="card ">
      <div class="card-header">{{ name }}</div>
      <div class="card-body">
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WrapperCard',

  data() {
    return {};
  },
  props: ['name'],
};
</script>

<style lang="css" scoped>
.card-header {
  padding: 0.5rem 0.3rem;
}
.card-body {
  padding: 0.2rem;
}
</style>
