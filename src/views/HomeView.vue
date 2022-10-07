<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <main class="home-main container">
    <h1>Pelican</h1>
    <div class="intro">
      <p class="lead"><em>A List of Lists</em></p>
      <button
        type="button"
        class="btn btn-primary"
        @click="router.push('/lists')"
      >
        Go To Lists
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 3rem;
}

.intro {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
