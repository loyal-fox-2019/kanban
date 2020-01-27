<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div>
        <b-button v-b-modal.modal-1>Create</b-button>
        <b-modal id="modal-1" title="Add new Kanban" hide-footer>
          <formCreate @close="hideModal" />
        </b-modal>
      </div>
    </nav>
  </div>
</template>
<script>
import formCreate from "./formCreate";
export default {
  methods: {
    hideModal() {
      this.$bvModal.hide("modal-1");
    }
  },
  components: {
    formCreate
  }
};
</script>

<style>
</style>