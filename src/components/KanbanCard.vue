<template>
    <div id="kanbanCard">
        <div class="card" style="width: 20rem;">
            <div :class="classHeaderContent">{{ data.name }}</div>
            <div class="card-body">
                <contentcard v-for="(task, i) in data.tasks" :key="i" :taskDetail="task"></contentcard>
            </div>
        </div>
    </div>
</template>

<script>
import contentcard from '@/components/ContentCard.vue';

export default {
    name: 'KanBanCard',
    components: {
        contentcard,
    },
    data() {
        return {
            classHeaderContent: ''
        }
    },
    methods: {

    },
    props: ['data'],
    created() {
        switch (this.data.name) {
        case 'Back-Log':
            this.classHeaderContent ='card-header text-white h5 bg-secondary';
            break;
        case 'To-Do':
            this.classHeaderContent ='card-header text-white h5 bg-info';
            break;
        case 'Doing':
            this.classHeaderContent ='card-header text-white h5 bg-danger';
            break;
        case 'Done':
            this.classHeaderContent ='card-header text-white h5 bg-success';
            break;
        }
    }
}
</script>

<style scoped>
    .card {
        transition: box-shadow .3s;
    }
    .card:hover {
        box-shadow: 0 0 15px rgba(33,33,33,.2); 
    }
</style>