<template>
  <v-col class="text-center">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{listname}}</v-list-item-title>
            <kanban-item v-for="task in tasks" :key="task.id" :task="task"/>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
import KanbanItem from './KanbanItem'
export default {
  name: 'KanbanList',
  components: {
    KanbanItem
  },
  data () {
    return {
      // listName: 'BACKLOG'
    }
  },
  props: {
    listname: String,
    tasks: Array
  }
}
</script>

<style>

</style>
