<template>
  <div>
    <modal :name="newName">
      <div class="card border-0">
        <div class="card-body">
          <h5 class="card-title">Detail todo</h5>
          <div class="card-text">
            <span> text description: {{ todo.task }} </span>
            <span> Point: {{ todo.point }} </span>
            <span> Status: {{ todo.status }} </span>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Change status</label>
              </div>
              <select
                class="custom-select"
                id="inputGroupSelect01"
                @change="changeStatus"
                v-model="status"
              >
                <option selected>Choose...</option>
                <option value="backLog">Back-log</option>
                <option value="toDo">To-Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button type="button" class="btn btn-dark" @click="deleteTodo">Delete</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import db from '@/config/firebase';

export default {
  name: 'ModalDetail',
  props: ['todo'],
  data() {
    return {
      status: '',
    };
  },
  computed: {
    newName() {
      return `modal-detail-${this.todo.id}`;
    },
  },
  methods: {
    changeStatus() {
      if (this.status !== this.todo.status) {
        console.log(this.todo.id);
        this.$modal.hide('modal-detail');
        const todoRef = db
          .collection('todoApp')
          .doc('36oKKCBIaSelFO2p3aJV')
          .collection('todos')
          .doc(this.todo.id);
        todoRef
          .update({
            status: this.status,
          })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteTodo() {
      this.$modal.hide('modal-detail');
      db.collection('todoApp')
        .doc('36oKKCBIaSelFO2p3aJV')
        .collection('todos')
        .doc(this.todo.id)
        .delete();
    },
  },
};
</script>

<style lang="css" scoped>
.card-text span {
  font-size: 15px;
  display: block;
}
</style>
