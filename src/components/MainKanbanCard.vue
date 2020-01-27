<template>
  <div class="col-md-3">
    <div :class="cardClass">
      <div :class="cardTitleClass"> <i :class="iconTitleCard"></i> {{cardTitle}}</div>
      <div class="card-body d-flex flex-column-reverse">
          <task-card v-for="task in taskList" :key="task.id" :task-detail="task"></task-card>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "../components/TaskCard";

export default {
  name: "MainKanbanCard",
  components: {
    TaskCard
  },
  props: ["cardTitle", "cardVariant", "tasksList", "taskList", "iconTitleCard"],
  computed: {
    cardClass: function() {
      return `card border-${this.cardVariant}`;
    },
    cardTitleClass: function() {
      return `card-header bg-${this.cardVariant} text-center text-white`;
    }
  }
};
</script>

<style scoped>
</style>