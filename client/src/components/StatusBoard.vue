<template>
  <b-col cols="3">
    <b-card
      border-variant="primary"
      :header="headerTxt"
      :header-bg-variant="headerVariant"
      header-text-variant="white"
      align="center"
      class="font-weight-bold"
    >
      <board-list
        v-for="todo in todos"
        :key="todo.title"
        :data="todo"
        :variant="headerVariant"
      >
      </board-list>
    </b-card>
  </b-col>
</template>

<script>
import BoardList from '@/components/BoardList.vue';

export default {
  props: ['headerVariant', 'headerTxt', 'todos'],
  components: {
    BoardList,
  },
};
</script>
