<template>
  <b-modal id="modal-center" centered title="BootstrapVue" v-if="show">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    showData() {
      console.log({ 'ini show modal': this.data });

      return this.data;
    },
  },
};
</script>
