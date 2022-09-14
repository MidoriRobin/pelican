<template>
  <form>
    <label for="name">Name: </label>
    <input v-model="name" type="text" name="name" />

    <label for="price">Price: </label>
    <input v-model="price" type="text" name="price" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },

  data() {
    return {
      name: "",
      price: "",
    };
  },
});
</script>

<style scoped></style>
