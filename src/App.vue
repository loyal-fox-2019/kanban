<template>
  <div>
    <div id="nav" class="mb-3">
      <navbar></navbar>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <card
            @checkKanban="checkKanban"
            :headerTitle="dataKanban[0].headerName"
            :isiKanban="dataKanban[0].isi"
          ></card>
        </div>
        <div class="col-3">
          <card
            @checkKanban="checkKanban"
            :headerTitle="dataKanban[1].headerName"
            :isiKanban="dataKanban[1].isi"
          ></card>
        </div>
        <div class="col-3">
          <card
            @checkKanban="checkKanban"
            :headerTitle="dataKanban[2].headerName"
            :isiKanban="dataKanban[2].isi"
          ></card>
        </div>
        <div class="col-3">
          <card
            @checkKanban="checkKanban"
            :headerTitle="dataKanban[3].headerName"
            :isiKanban="dataKanban[3].isi"
          ></card>
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
          headerName: "back-log",
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
    },
    checkKanban() {
      this.dataKanban = [
        {
          headerName: "back-log",
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
      ];
      // this.kumpulKanban();
    },
    kumpulKanban() {
      database.collection("kanban").onSnapshot(newData => {
        this.checkKanban();
        newData.forEach(result => {
          const dataMasuk = result.data();
          dataMasuk.id = result.id;
          this.dataKanban.forEach(kanban => {
            if (dataMasuk.status == kanban.headerName) {
              kanban.isi.push(dataMasuk);
            }
          });
        });
      });
    }
  },
  created() {
    this.kumpulKanban();
  }
};
</script>

<style>
</style>
