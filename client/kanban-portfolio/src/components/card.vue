<template>
  <b-card border-variant="dark" :header="prog.title">
    <b-card-text>
        <p>Point: {{prog.point}}</p>
        <p>Assigned To: {{prog.assignedTo}}</p>
        <b-button variant="warning" @click="$bvModal.show(prog.id)">Show Detail</b-button>
    </b-card-text>
    <!-- modal -->
    <b-modal
    :ref="prog.id + 'e'"
    :id="prog.id"
    :title="titl"
    hide-footer>
    <h5>Task Description: </h5>
    <p>{{prog.description}}</p>
    <h5>Point: </h5>
    <p>{{prog.point}}</p>
    <h5>Status: </h5>
    <p>{{prog.status}}</p>
    <hr><br>
    <span v-if="prog.status == 'Back-Log'">
    <b-button variant="danger" @click="del">Delete</b-button>
    <b-button variant="info" @click="todo" class="mid">To Do</b-button>
    </span>
    <span v-if="prog.status == 'To-Do'">
    <b-button variant="secondary" @click="backlog">Back-Log</b-button>
    <b-button variant="danger" @click="del" class="mid">Delete</b-button>
    <b-button variant="primary" class="last" @click="doing">Doing</b-button>
    </span>
    <span v-if="prog.status == 'Doing'">
    <b-button variant="info" @click="todo">To Do</b-button>
    <b-button variant="danger" @click="del" class="mid">Delete</b-button>
    <b-button variant="success" @click="done" class="last">Done</b-button>
    </span>
    <span v-if="prog.status == 'Done'">
    <b-button variant="primary" @click="doing">Doing</b-button>
    <b-button variant="danger" @click="del" class="mid">Delete</b-button>
    </span>
    </b-modal>
  </b-card>
</template>

<script>
import db from '../config/firebase'

export default {
  computed: {
    titl: function () {
      return `Detail Task: ${this.prog.title} for ${this.prog.assignedTo}`
    }
  },
  props: ['prog'],
  methods: {
    del: function () {
      db.collection('task').doc(this.prog.id).delete()
        .then((data) => {
          this.$refs[this.prog.id + 'e'].hide()
        })
    },
    todo: function () {
      db.collection('task').doc(this.prog.id).update({ status: 'To-Do' })
        .then((data) => {
        })
    },
    doing: function () {
      db.collection('task').doc(this.prog.id).update({ status: 'Doing' })
        .then((data) => {
        })
    },
    done: function () {
      db.collection('task').doc(this.prog.id).update({ status: 'Done' })
        .then((data) => {
        })
    },
    backlog: function () {
      db.collection('task').doc(this.prog.id).update({ status: 'Back-Log' })
        .then((data) => {
        })
    }
  }
}
</script>

<style>
.mid{
    position: relative;
    left: 25%;
}

.last{
    position: relative;
    left: 50%;
}

</style>
