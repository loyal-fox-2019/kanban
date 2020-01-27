<template>
    <div class="card mt-3">
        <div class="card-body">
            <h5 class="card-title">{{dataTodo.title}}</h5>
            <hr>
            <p class="card-text">Description: {{dataTodo.description}}</p>
            <p class="card-text" style="color:black;">Assigned To: {{dataTodo.assignedTo}}</p>
            <a @click="balik" style="cursor: pointer" class="mr-3"><i class="fa fa-caret-square-o-left" style="font-size:36px"></i></a>
            <a @click="destroy" style="cursor: pointer"><i style="font-size:24px" class="fa" >&#xf014;</i></a>
            <a @click="go" style="cursor: pointer" class="ml-3"><i class="fa fa-toggle-right" style="font-size:36px"></i></a>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  props: ['dataTodo', 'next' , 'back'],
  name: 'card',
  methods:{
      go(){
          if(this.dataTodo.status === 'done'){
                this.destroy()
            Swal.fire({
            icon: "success",
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          }else{
          const where = this.$db.collection('task').doc(this.dataTodo.id)
          const set = where.set({
              title: this.dataTodo.title,
              status: this.next,
              description: this.dataTodo.description,
              assignedTo: this.dataTodo.assignedTo
          })
          } 
      },
      balik(){
          const where = this.$db.collection('task').doc(this.dataTodo.id)
          const set = where.set({
              title: this.dataTodo.title,
              status: this.back,
              description: this.dataTodo.description,
              assignedTo: this.dataTodo.assignedTo
          })
      },
      destroy(){
          this.$db.collection('task').doc(this.dataTodo.id).delete()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
