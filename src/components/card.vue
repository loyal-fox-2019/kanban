<template>
  <div class="card" style="width: 17.5rem;">
    <div class="card-header">{{headerTitle}}</div>
    <div class="card-body">
      <div class="card" style="width: 15rem;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example tt.</p>
          <div class="d-flex justify-content-around">
            <a href="#" class="card-link">preview</a>
            <a href="#" class="card-link">delete</a>
            <a href="#" class="card-link">next</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["headerTitle", "isi"]
};
</script>

<style>
</style>