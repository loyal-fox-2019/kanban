<template>
  <div class="card p-5">
    <div class="card-header">{{ item.title }}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ item.point }}</li>
      <li class="list-group-item">{{ item.assignTo }}</li>
    </ul>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      :data-target="`#${item.id}`"
    >
      Show Details
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      :id="item.id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ item.title }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="deleteItem"
              data-dismiss="modal"
            >
              Delete
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="previousItem"
              data-dismiss="modal"
            >
              Mundur
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="nextItem"
              data-dismiss="modal"
            >
              Maju
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../config/firebase.js'
export default {
  name: 'TaskItem',
  props: ['item'],
  methods: {
    nextItem() {
      if (this.item.status === 'backlog') {
        db.collection('kanban')
          .doc(this.item.id)
          .update({
            status: 'todo'
          })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log('update')
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      } else if (this.item.status === 'todo') {
        db.collection('kanban')
          .doc(this.item.id)
          .update({
            status: 'inprogress'
          })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log('update')
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      } else if (this.item.status === 'inprogress') {
        db.collection('kanban')
          .doc(this.item.id)
          .update({
            status: 'completed'
          })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log('update')
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      }
    },
    previousItem() {
      if (this.item.status === 'completed') {
        db.collection('kanban')
          .doc(this.item.id)
          .update({
            status: 'inprogress'
          })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log('update')
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      } else if (this.item.status === 'inprogress') {
        db.collection('kanban')
          .doc(this.item.id)
          .update({
            status: 'todo'
          })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log('update')
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      } else if (this.item.status === 'todo') {
        db.collection('kanban')
          .doc(this.item.id)
          .update({
            status: 'backlog'
          })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log('update')
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      }
    },
    deleteItem() {
      db.collection('kanban')
        .doc(this.item.id)
        .delete()
        .then(function() {
          // eslint-disable-next-line no-console
          console.log('Frank food updated')
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
