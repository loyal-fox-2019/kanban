<template>
  <div class="my-5 w-100">
    <div
      class="card-header"
      :style="{ backgroundColor: card.color, color: 'white' }"
    >
      {{ card.title }}
    </div>
    <draggable
      group="card.status"
      v-model="card.items"
      @start="drag = true"
      @end="drag = false"
      @change="berubah"
    >
      <TaskItem
        v-for="(item, key) in card.items"
        :key="key"
        :item="item"
        class="d-flex"
      ></TaskItem>
    </draggable>
  </div>
</template>

<script>
import TaskItem from './TaskItem'
import draggable from 'vuedraggable'
import db from '../config/firebase.js'

export default {
  name: 'ProgressCard',
  components: {
    TaskItem,
    draggable
  },
  props: ['card'],
  methods: {
    berubah(event) {
      if (event.added) {
        // console.log(
        //   'saya telah bertambah',
        //   this.card.status,
        //   'masuk sini dlu',
        //   event.added.element.id
        // )
        db.collection('kanban')
          .doc(event.added.element.id)
          .update({
            status: this.card.status
          })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log('Update')
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      }
    }
  }
}
</script>

<style></style>
