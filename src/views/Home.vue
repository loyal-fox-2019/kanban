<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container-fluid">
      <div class="row pt-5">
        <div class="col-lg-3" v-for="(titleCategory, i) in titleCategorys" :key="i"> 
          <categoryCard :titleCategory="titleCategory" ></categoryCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import categoryCard from '@/components/CategoryCard.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'home',
  data: function() {
    return {
      titleCategorys: [{content: '<i class="fas fa-list-ul mr-2"></i> To do', bgColor: '#F4D03F', status: 'Todo' },
       {content: '<i class="fas fa-spinner mr-2"></i> In Progess', bgColor: '#3498DB', status: 'InProgress'}, 
       {content: '<i class="fas fa-check-circle mr-2"></i> Done', bgColor: '#27AE60', status: 'Done'}, 
       {content: '<i class="fas fa-trash mr-2"></i> Gone', bgColor: '#C0392B', status: 'Gone'}],
      taskArray: [],
    }
  },
  components: {
    categoryCard,
    Navbar
  }
}
</script>

<style scoped>

</style>