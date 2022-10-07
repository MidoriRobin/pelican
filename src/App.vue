<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header class="d-grid gap-2">
    <div
      class="nav-wrapper offcanvas offcanvas-start"
      tabindex="-1"
      id="mainSidebar"
      data-bs-scroll="true"
    >
      <NavBar />
    </div>
    <button
      class="btn btn-primary menu-opn-btn"
      data-bs-toggle="offcanvas"
      data-bs-target="#mainSidebar"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-list btn-icon-mobile"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-caret-right btn-icon-desk"
        viewBox="0 0 16 16"
      >
        <path
          d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
        />
      </svg>
    </button>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  background-color: aqua;
}

header {
  grid-area: 1 / 1 / 2 / 4;
}

main {
  grid-area: 2 / 1 / 3 / 4;
}

@media (max-width: 1023px) {
  header {
    margin-bottom: 1rem;
  }

  .offcanvas {
    width: 200px;
  }

  svg.btn-icon-desk {
    display: none;
  }
}

@media (min-width: 1024px) {
  header > button {
    margin: 1rem 0;
  }

  svg.btn-icon-desk {
    display: inline;
  }

  svg.btn-icon-mobile {
    display: none;
  }
}
</style>
