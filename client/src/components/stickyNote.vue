<template>
  <div class="col-md-3 mt-3">
    <div class="card">
      <div class="card-header head" :class="'bg-'+color">{{kategori}}</div>
    </div>
    <div class="card-body">
      <mini-card v-for="(data, i) in datas" :key="i" :perActivity="data" :id="i"></mini-card>
    </div>
  </div>
</template>
data
<script>
import MiniCard from "../components/miniCard.vue";
export default {
  name: "stickyNote",
  props: ["kategori", "datas", "id"],
  components: {
    MiniCard
  },
  data() {
    return {
      color: ""
    };
  },
  created() {
    // console.log(this.datas, "ini diaaaa");
    switch (this.kategori) {
      case "Back-Log":
        this.color = "danger";
        break;
      case "To-do":
        this.color = "warning";
        break;
      case "Doing":
        this.color = "primary";
        break;
      case "Done":
        this.color = "success";
        break;
    }
  }
};
</script>

<style scoped>
.head {
  color: black;
  font-weight: bold;
}
</style>