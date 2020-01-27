<template>
  <div>
    <div class="card border-primary mb-3" style="width: 18rem;color: white;">
        <div :class="`card-header bg-${colors}`">{{judul[0]}}</div>
        <div class="card-body text-primary">
            <card v-for="todo in datas" :key="todo.id" :dataTodo="todo" :next="judul[1]" :back="judul[2]"></card>
        </div>
    </div>
  </div>
</template>

<script>
import card from './card'

export default {
  props: ['judul', 'colors', 'datas'],
  name: 'table',
  data: function () {
    return {
      header: ''
    }
  },
  components: {
    card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
