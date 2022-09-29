<template>
  <div class="nav-container d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
    <div class="nav-top">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg class="bi pe-none me-2" width="40" height="32">
          <use xlink:href="#bootstrap" />
        </svg>
        <span class="fs-4">Sidebar</span>
      </a>
      <hr />
    </div>
    <nav class="nav-main">
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href="#home" />
            </svg>
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/lists" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href="#speedometer2" />
            </svg>
            Lists
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="nav-bottom">
      <hr />
      <button
        type="button"
        class="btn btn-warning text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.nav-container {
  height: -webkit-fill-available;
}

.nav-bottom button {
  width: -webkit-fill-available;
}
</style>
