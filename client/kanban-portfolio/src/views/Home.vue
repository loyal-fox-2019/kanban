<template>
  <div class="home">
    <b-card-group deck>
      <cardlist v-for="(progress, i) in process" :key="i" :data="progress"></cardlist>
    </b-card-group>
  </div>
</template>

<script>
// @ is an alias to /src
import cardlist from '../components/cardlist'

export default {
  name: 'home',
  components: {
    cardlist
  },
  data () {
    return {
      process: ['Back-Log', 'To-Do', 'Doing', 'Done']
    }
  }
}
</script>
