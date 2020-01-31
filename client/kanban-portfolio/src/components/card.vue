<template>
  <b-card border-variant="dark" :header="prog.title">
    <b-card-text>
        <p>Point: {{prog.point}}</p>
        <p>Assigned To: {{prog.assignedTo}}</p>
        <b-button variant="warning" @click="$bvModal.show(prog.id)">Show Detail</b-button>
    </b-card-text>
    <!-- modal -->
    <b-modal
    ref="mod"
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
    <b-button variant="danger" id="delete1">Delete</b-button>
    <b-popover target="delete1" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="del">Yes</b-button>
    </b-popover>
    <b-button variant="info" id="todo1" class="mid">To Do</b-button>
    <!-- popove -->
    <b-popover target="todo1" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="todo">Yes</b-button>
    </b-popover>
    </span>
    <span v-if="prog.status == 'To-Do'">
    <b-button variant="secondary" id="backlog1">Back-Log</b-button>
    <!-- popover -->
    <b-popover target="backlog1" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="backlog">Yes</b-button>
    </b-popover>
    <b-button variant="danger" id="del2" class="mid">Delete</b-button>
    <!-- popover -->
    <b-popover target="del2" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="del">Yes</b-button>
    </b-popover>
    <b-button variant="primary" id="doing1" class="last">Doing</b-button>
    <!-- popover -->
    <b-popover target="doing1" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="doing">Yes</b-button>
    </b-popover>
    </span>
    <span v-if="prog.status == 'Doing'">
    <b-button variant="info" id="todo3">To Do</b-button>
    <!-- popover -->
    <b-popover target="todo3" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="todo">Yes</b-button>
    </b-popover>
    <b-button variant="danger" id="del4" class="mid">Delete</b-button>
    <b-popover target="del4" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="del">Yes</b-button>
    </b-popover>
    <b-button variant="success" id="done1" class="last">Done</b-button>
    <b-popover target="done1" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="done">Yes</b-button>
    </b-popover>
    </span>
    <span v-if="prog.status == 'Done'">
    <b-button variant="primary" id="doing3">Doing</b-button>
    <b-popover target="doing3" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="doing">Yes</b-button>
    </b-popover>
    <b-button variant="danger" id="del5" class="mid">Delete</b-button>
    <b-popover target="del5" triggers="click">
    <template v-slot:title>Are you sure?</template>
    <b-button size="sm" @click="hidepop" class="mar">No</b-button>
    <b-button size="sm" variant="primary" @click="del">Yes</b-button>
    </b-popover>
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
          this.$refs['mod'].hide()
        })
    },
    todo: function () {
      db.collection('task').doc(this.prog.id).update({ status: 'To-Do' })
        .then((data) => {
          this.$refs['mod'].hide()
        })
    },
    doing: function () {
      db.collection('task').doc(this.prog.id).update({ status: 'Doing' })
        .then((data) => {
          this.$refs['mod'].hide()
        })
    },
    done: function () {
      db.collection('task').doc(this.prog.id).update({ status: 'Done' })
        .then((data) => {
          this.$refs['mod'].hide()
        })
    },
    backlog: function () {
      db.collection('task').doc(this.prog.id).update({ status: 'Back-Log' })
        .then((data) => {
          this.$refs['mod'].hide()
        })
    },
    hidepop () {
      this.$refs['mod'].hide()
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
.mar{
  margin-right: 18%
}

</style>
