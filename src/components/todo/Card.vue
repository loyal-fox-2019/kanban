<template>
  <div>
    <div class="card border-0 mb-2">
      <div class="card-body border-bottom">
        <h5 class="card-title">
          {{ todo.task }}
        </h5>
        <div class="card-text">
          <span> Point: {{ todo.point }} </span>
          <span> Assigned to: {{ todo.assign }} </span>
          <button class="btn btn-sm btn-dark shadow-sm float-right" @click="$modal.show(nameModal)">
            Show Detail
          </button>
        </div>
      </div>
    </div>
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'Card',

  data() {
    return {};
  },
  props: ['todo'],
  computed: {
    nameModal() {
      return `modal-detail-${this.todo.id}`;
    },
  },
};
</script>

<style lang="css" scoped>
.card-body {
  padding: 0.3rem;
}
.card-title {
  font-size: 17px;
  font-weight: bolder;
}
.card-text span {
  font-size: 15px;
  display: block;
}
</style>
