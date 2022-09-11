<script lang="ts">
export default {
  data() {
    return { someData: {} };
  },
  props: {
    item: String,
  },
};
</script>

<template>
  <li>
    <p><slot /></p>
  </li>
</template>

<style scoped></style>
