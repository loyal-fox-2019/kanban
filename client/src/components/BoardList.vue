<template>
  <b-card
    :border-variant="variant"
    :header="data.title"
    align="right"
    class="my-2 font-weight-light"
  >
    <b-card-text class="text-right">
      <div class="d-flex justify-content-between">
        <span class="font-weight-bold">Description:</span>
        <span>{{ data.description }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span class="font-weight-bold">Point:</span>
        <span>{{ data.point }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span class="font-weight-bold">Assigned To:</span>
        <span>{{ data.assignedTo }}</span>
      </div>
      <div class="text-center">
        <b-dropdown
          variant="link"
          size="sm"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template v-slot:button-content>
            <b-icon icon="three-dots"></b-icon>
          </template>
          <b-dropdown-item-button style="font-size:12px;">
            Show Detail
          </b-dropdown-item-button>
          <b-dropdown-group id="dropdown-group-1" header="Move To">
            <b-dropdown-item-button
              v-for="status in statusList"
              :key="status"
              style="font-size:12px;"
              @click.prevent="changeStatus(status)"
            >
              {{ status }}
            </b-dropdown-item-button>
          </b-dropdown-group>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button
            style="font-size:12px;"
            @click.prevent="deleteTodo"
            class="mt-3"
          >
          <p class="text-danger font-weight-bold"> Delete </p>
          </b-dropdown-item-button>
        </b-dropdown>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
const db = require('../config/firebaseConfig.js');

export default {
  props: ['data', 'variant'],
  data() {
    return {
      statusList: [],
    };
  },
  methods: {
    onClick() {
      this.$refs.dropdown.hide(true);
    },
    changeStatus(newStatus) {
      const docRef = db.collection('todos').doc(this.data.id);
      db.runTransaction(transaction => transaction.get(docRef).then((sfDoc) => {
        if (!sfDoc.exists) {
          console.log('Document does not exist!');
        }

        transaction.update(docRef, { status: newStatus });
      }))
        .then(() => {
          console.log('Transaction successfully committed!');
        })
        .catch((error) => {
          console.log('Transaction failed: ', error);
        });
    },
    deleteTodo() {
      db.collection('todos').doc(this.data.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
  },
  created() {
    this.statusList = [];
    const availableStatus = ['Back-Log', 'To-Do', 'Doing', 'Done'];
    availableStatus.forEach((status) => {
      if (status !== this.data.status) {
        this.statusList.push(status);
      }
    });
  },
};
</script>
