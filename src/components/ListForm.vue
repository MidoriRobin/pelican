<template>
  <form @submit.prevent="submitItem">
    <label for="name">Name: </label>
    <input v-model="name" type="text" name="name" />

    <!-- <label for="price">Price: </label>
    <input v-model="item.price" type="text" name="price" /> -->

    <button type="submit">Submit</button>
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
    };
  },
  methods: {
    submitItem() {
      this.$emit("submit-list", this.name);
      this.name = "";
    },
  },
});
</script>

<style scoped></style>
