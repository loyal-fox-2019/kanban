<template>
  <b-modal
    id="modal-center"
    centered
    v-model="show"
    ok-only
    :header-bg-variant="'secondary'"
    :header-text-variant="'light'"
  >
    <template v-slot:modal-title>
      {{ data.title || '' }}
      (
        <span
        class="font-weight-light"
        style="font-size:13px;"
        >
          {{ data.point || 'No Rate' }}
        </span>
      )
    </template>
    <h3 class="my-4">{{data.description || 'Nothing Here...' }}</h3>
    <p class="text-right" style="font-size:13px;">
      <span class="font-weight-light">Assigned To:</span>
      <span class="font-weight-bold"> {{data.assignedTo || 'No One'}} </span>
    </p>
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
  watch: {
    data() {
      this.show = true;
    },
  },
};
</script>
