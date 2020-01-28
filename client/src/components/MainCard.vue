<template>
    <div class="col-md-3 mt-3">
        <div class="card">
            <div class="card-header" :class="'bg-' + color">
                {{ kategori }}
            </div>
            <div class="card-body">
                <MiniCard v-for="(data, i) in datas" :key="i" :indivData="data"></MiniCard>
            </div>
        </div>
    </div>
</template>

<script>
import MiniCard from '../components/MiniCard'
export default {
    name: "main-card",
    data(){
        return {
            color: ""
        }
    },
    props: {
        kategori: String,
        datas: Array
    },
    components: {
        MiniCard
    },
    created(){
        switch(this.kategori){
            case 'Back-Log':
                this.color = "danger"
                break;
            case 'To-Do':
                this.color = "warning"
                break;
            case 'Doing':
                this.color = "primary"
                break;
            case 'Done':
                this.color = "success"
                break;
        }
    }
}
</script>

<style scoped>

</style>