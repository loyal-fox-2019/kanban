<template>
  <div>
    <modal name="modal-add">
      <div class="card border-0">
        <div class="card-body">
          <form @submit.prevent="addTodo">
            <div class="row">
              <div class="form-group col-6 mb-3">
                <label for="task">Task</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Task"
                  id="task"
                  v-model="form.task"
                />
              </div>
              <div class="form-group col-6 mb-3">
                <label for="point">Point</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="point"
                  id="point"
                  v-model="form.point"
                />
              </div>
              <div class="form-group col-6 mb-3">
                <label for="point">Assign</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="assign to"
                  id="assign"
                  v-model="form.assign"
                />
              </div>
              <div class="form-group col-6 mb-3">
                <label for="status">Status</label>
                <div class="form-group">
                  <select class="form-control" id="status" v-model="form.status">
                    <option value="backLog">Back log</option>
                    <option value="toDo">To-Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div class="form-group col-12">
                <button type="submit" class="btn btn-dark mr-2">Save it</button>
                <button type="submit" class="btn btn-warning" @click="$modal.hide('modal-add')">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import db from '@/config/firebase';

export default {
  name: 'ModalAdd',

  data() {
    return {
      form: {
        task: '',
        point: '',
        assign: '',
        status: '',
        created_at: new Date(),
      },
    };
  },
  methods: {
    addTodo() {
      this.$modal.hide('modal-add');
      db.collection('todoApp')
        .doc('36oKKCBIaSelFO2p3aJV')
        .collection('todos')
        .add(this.form)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="css" scoped></style>
