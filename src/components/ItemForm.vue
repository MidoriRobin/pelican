<template>
  <form @submit.prevent="submitItem">
    <label for="name">Name: </label>
    <input v-model="item.name" type="text" name="name" />

    <label for="price">Price: </label>
    <input v-model="item.price" type="text" name="price" />

    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import type Item from "@/types/types";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },

  data() {
    return {
      item: {} as Item,
    };
  },
  methods: {
    submitItem() {
      // emit within an emit
      this.$emit("submit-form", this.item);
      this.item = { name: "", price: "" };
    },
  },
});
</script>

<style scoped></style>
