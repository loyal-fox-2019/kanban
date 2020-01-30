<template>
  <div id="home" class="container">
    <div class="row" v-if="showProgress">
      <div class="col-xs-12 col-md-6 col-lg-3" v-for="(card, index) in progressCards" :key="index">
        <ProgressCard :title="card.title" :status="card.status" :items="card.items" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProgressCard from "@/components/ProgressCard.vue";

export default {
  name: "home",
  components: {
    ProgressCard
  },
  created() {
    this.getData();
  },
  data() {
    return {
      showProgress: false,
      progressCards: [
        {
          title: "Back-Log",
          status: "back_log",
          items: []
        },
        {
          title: "To Do",
          status: "to_do",
          items: []
        },
        {
          title: "In Progress",
          status: "in_progress",
          items: []
        },
        {
          title: "Completed",
          status: "completed",
          items: []
        }
      ]
    }
  },
  methods: {
    getData() {
      this.$firestoredb.collection("tasks")
        .onSnapshot(querySnapshot => {
          this.showProgress = false;
          for (const card of this.progressCards) {
            card.items = [];
          }
          querySnapshot.forEach(doc => {
            const task = { ...doc.data(), id: doc.id };
            console.log(task.status);
            switch (task.status) {
              case "back_log":
                this.progressCards[0].items.push(task);
                break;
              case "to_do":
                this.progressCards[1].items.push(task);
                break;
              case "in_progress":
                this.progressCards[2].items.push(task);
                break;
              case "completed":
                this.progressCards[3].items.push(task);
                break;
            }
          });
          this.showProgress = true;
        });
    }
  }
};
</script>
