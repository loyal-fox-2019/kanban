<template>
  <div class="card mr-2" style="width: 18rem;">
    <div class="card-header">{{header}}</div>
    <ul
      class="list-group list-group-flush justify-content-center"
      v-for="(detail, index) in content"
      :key="index"
    >
      <Content :isi="detail" :before="previous" :after="next" />
    </ul>
  </div>
</template>

<script>
import Content from "../components/Cards";
export default {
  props: ["content", "previous", "next", "header"],
  components: {
    Content
  }
};
</script>

<style>
</style>