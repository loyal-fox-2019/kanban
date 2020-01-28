<template>
  <section>
    <b-collapse
          aria-id="contentIdForA11y2"
          class="panel"
          :open.sync="isOpen">
        <div
          slot="trigger"
          class="panel-heading"
          role="button"
          aria-controls="contentIdForA11y2">
          <p><i class="em em-paperclip" aria-role="presentation" aria-label="PAPERCLIP"></i> {{ task.title }}</p>
        </div>
        <div class="panel-block">
          <p><i class="em em-book" aria-role="presentation" aria-label="OPEN BOOK"></i> {{ task.description }}</p>
        </div>
        <div class="panel-block">
          <p><i class="em em-person_with_blond_hair" aria-role="presentation" aria-label="PERSON WITH BLOND HAIR"></i> {{ task.assignee }}</p>
        </div>
        <footer class="card-footer">
          <button class="card-footer-item button is-dark" @click.prevent="remove(task.id)"><p id="delete"><i class="em em-wastebasket" aria-role="presentation" aria-label=""></i></p></button>
        </footer>
    </b-collapse>
  </section>
</template>

<script>
import db from '@/config/firestore'
const tasks = db.collection('tasks')

export default {
  name: 'TaskCard',
  props: {
    task: Object
  },
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    remove (id) {
      tasks
        .doc(id)
        .delete()
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Task successfully deleted'
          })
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err
          })
        })
    }
  }
}
</script>

<style scoped>
.card-footer {
  background-color: gainsboro
}
.panel-block {
  background-color: snow;
  text-align: left;
}
section {
  padding: 5px;
}
#delete {
  margin-top: -7px;
}
</style>
