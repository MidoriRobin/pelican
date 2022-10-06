<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return { someData: {} };
  },
  emits: ["delete-event"],
});
</script>

<template>
  <li>
    <p>
      <slot />
    </p>
    <button
      type="button"
      class="btn-close btn-close-white"
      aria-label="Close"
      @click="$emit('delete-event')"
    ></button>
  </li>
</template>

<style scoped>
li {
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  justify-content: space-between;
}
</style>
