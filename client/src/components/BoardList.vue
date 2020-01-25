<template>
  <b-card :border-variant="variant" align="right" class="my-2 font-weight-light">
    <template v-slot:header>
      <h6 class="mb-0 font-weight-bold" style="font-size:40px;">{{ data.title }}</h6>
    </template>
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
        <b-dropdown variant="link" size="sm" toggle-class="text-decoration-none" no-caret>
          <template v-slot:button-content>
            <b-icon icon="three-dots"></b-icon>
          </template>
          <b-dropdown-item-button
            style="font-size:12px;"
            @click.prevent="showDetailModal"
          >Show Detail</b-dropdown-item-button>
          <b-dropdown-group id="dropdown-group-1" header="Move To">
            <b-dropdown-item-button
              v-for="status in statusList"
              :key="status"
              style="font-size:12px;"
              @click.prevent="changeStatus(status)"
            >{{ status }}</b-dropdown-item-button>
          </b-dropdown-group>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button
            style="font-size:12px;"
            @click.prevent="confirmDelete"
            class="mt-3"
          >
            <p class="text-danger font-weight-bold">Delete</p>
          </b-dropdown-item-button>
        </b-dropdown>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import Swal from 'sweetalert2';
import db from '@/config/firebaseConfig';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: false,
});

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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Document does not exist!',
          });
        }

        transaction.update(docRef, { status: newStatus });
      }))
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Transaction successfully committed!',
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        });
    },
    showDetailModal() {
      this.$emit('showBoardModal', this.data);
    },
    deleteTodo() {
      db.collection('todos')
        .doc(this.data.id)
        .delete()
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Successfully delete board',
          });
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        });
    },
    confirmDelete() {
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.deleteTodo();
        } else if (
        /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your board is safe in our place',
            'error',
          );
        }
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
