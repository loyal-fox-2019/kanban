<template>
  <div class="home">
      <cardlist></cardlist>
  </div>
</template>

<script>
// @ is an alias to /src
import cardlist from '../components/cardlist'

export default {
  name: 'home',
  components: {
    cardlist
  }
}
</script>
