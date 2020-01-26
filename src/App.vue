<template>
  <div>
    <div id="nav" class="mb-3">
      <navbar></navbar>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <card :headerTitle="dataKanban[0].headerName" :isiKanban="dataKanban[0].isi"></card>
        </div>
        <div class="col-3">
          <card :headerTitle="dataKanban[1].headerName" :isiKanban="dataKanban[1].isi"></card>
        </div>
        <div class="col-3">
          <card :headerTitle="dataKanban[2].headerName" :isiKanban="dataKanban[2].isi"></card>
        </div>
        <div class="col-3">
          <card :headerTitle="dataKanban[3].headerName" :isiKanban="dataKanban[3].isi"></card>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import navbar from "./components/navbar";
import card from "./components/card";
import database from "./assets/config";

export default {
  name: "App.vue",
  data() {
    return {
      dataKanban: [
        {
          headerName: "back-Log",
          isi: []
        },
        {
          headerName: "to-do",
          isi: []
        },
        {
          headerName: "doing",
          isi: []
        },
        {
          headerName: "done",
          isi: []
        }
      ]
    };
  },
  components: {
    navbar,
    card
  },
  methods: {
    addKanban() {
      this.addForm = true;
    }
  },
  created() {
    database.collection("kanban").onSnapshot(newData => {
      newData.forEach(result => {
        const dataMasuk = result.data();
        const { id } = result;
        this.dataKanban.forEach(kanban => {
          if (dataMasuk.status == kanban.headerName) {
            kanban.isi.push(dataMasuk);
          }
          console.log(kanban.isi);
        });
        console.log(this.dataKanban);
      });
    });
  }
};
</script>

<style>
</style>
