<template>
  {{ data.foo }}
  <button @click="$emit('close')">Cancel</button>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style>
</style>