<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <div class="nav-wrapper">
      <NavBar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  background-color: aqua;
}

@media (max-width: 1023px) {
  .nav-wrapper {
    display: none;
  }
}
</style>
