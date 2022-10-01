<template>
  <form @submit.prevent="submitItem">
    <div class="name-area">
      <label for="name" class="form-label">Name: </label>
      <input
        v-model="item.name"
        type="text"
        name="name"
        id="name"
        placeholder="Black Pepper"
        class="form-control form-control-sm"
      />
    </div>

    <div class="price-area">
      <label for="price" class="form-label">Price: </label>
      <input
        v-model="item.price"
        type="text"
        name="price"
        id="name"
        placeholder="10.99"
        class="form-control form-control-sm"
      />
    </div>

    <button type="submit" class="btn btn-primary btn-sm">Add Item</button>
  </form>
</template>

<script lang="ts">
import type { Item } from "@/types/types";
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
    // TODO: Add input validation
    submitItem() {
      // emit within an emit
      this.$emit("submit-form", this.item);
      this.item = { name: "", price: "" };
    },
  },
  emits: ["submit-form"],
});
</script>

<style scoped>
div {
  margin: 0.5rem 0;
}
.btn {
  margin: 1rem 0;
}
</style>
