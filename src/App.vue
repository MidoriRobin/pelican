<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <div
      class="nav-wrapper offcanvas offcanvas-start"
      tabindex="-1"
      id="mainSidebar"
      data-bs-scroll="true"
    >
      <NavBar />
    </div>
    <button
      class="btn btn-primary btn-sm"
      data-bs-toggle="offcanvas"
      data-bs-target="#mainSidebar"
      type="button"
    >
      Open
    </button>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  background-color: aqua;
}

@media (max-width: 1023px) {
  .nav-wrapper {
    /* display: none; */
  }

  /* .btn-close {
    position: absolute;
  } */

  .offcanvas {
    width: 200px;
  }
}
</style>
