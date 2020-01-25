<template>
  <div id="holder">
    <b-card
      border-variant="grey"
      :header="bindData[0]"
      :header-bg-variant="bindData[1]"
      header-text-variant="white"
      align="center"
    >
      <!-- mulai dragable -->
      <draggable
        v-model="bindData[2]"
        group="kanban"
        :move='penTau'
        :clone="coba"
        style="min-height: 20px"
        @start="drag=true"
        @end="log"
      >
        <!-- <div v-for="element in bindData[2]" :key="element.id">{{element.Status}}</div> -->
        <Card :cardData="document" v-for="(document, index) in bindData[2]" :key="index" />
        <!-- <Card :cardData="document" /> -->
        <!-- </div> -->
      </draggable>
    </b-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Card from "./Card.vue";
import db from "../firebase";
export default {
  components: {
    Card,
    draggable
  },
  props: ["bindData"],
  data() {
    return {};
  },
  methods: {
    penTau(val){
      // console.log(val);
      console.log(val.draggedContext.element);
    },
    coba(value){
      console.log(value.id, 'ini clone');
      return value.id
      // db.collection("kanban")
      //   .doc(value.id)
      //   .update({ Status: `${this.bindData[0]}` });
    },
    log(evt){
      console.log(evt.to);
    }
  }
};
</script>

<style scoped>
#holder {
  width: 20%;
}
</style>