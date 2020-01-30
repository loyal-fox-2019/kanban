<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand" href="/">Kamban</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <button class="btn btn-primary"
          data-toggle="modal"
          data-target="#addTaskModal">Add New Taks</button>
        </li>
      </ul>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" aria-labelledby="addTaskModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTaskModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="text-left" @submit="addTask">
              <div class="form-group">
                <label for="name">Name</label>
                <input id="name" type="text" class="form-control" placeholder="Name">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input id="description" type="text" class="form-control" placeholder="Description">
              </div>
              <div class="form-group">
                <label for="point">Point</label>
                <input id="point" type="text" class="form-control" placeholder="Point">
              </div>
              <div class="form-group">
                <label for="assign_to">Assign To</label>
                <input id="assign_to" type="text" class="form-control" placeholder="Assgin to">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style>

</style>