<template>
  <form @submit.prevent="submitItem">
    <div class="name-area">
      <label for="name" class="form-label">Name</label>
      <input
        v-model="name"
        type="text"
        name="name"
        id="name"
        placeholder="Spices List"
        class="form-control form-control-sm"
      />
    </div>

    <!-- <label for="price">Price: </label>
    <input v-model="item.price" type="text" name="price" /> -->

    <button type="submit" class="btn btn-primary btn-sm">Create List</button>
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
    // TODO: add input validation, unique names
    submitItem() {
      this.$emit("submit-list", this.name);
      this.name = "";
    },
  },
  emits: ["submit-list"],
});
</script>

<style scoped>
form {
}

.btn {
  margin: 1rem 0;
}
</style>
