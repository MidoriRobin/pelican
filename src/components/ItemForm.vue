<template>
  <form @submit.prevent="submitItem" class="needs-validation" novalidate>
    <div class="name-area">
      <label for="name" class="form-label">Name: </label>
      <!-- <p v-if="!isValidName" class="validation">Input a valid name</p> -->
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
      <p v-if="!isValid" class="validation">Input a valid dollar value or 0</p>
      <input
        v-model="item.price"
        type="text"
        name="price"
        id="name"
        placeholder="10.99"
        class="form-control form-control-sm"
      />
    </div>

    <div class="quantity-area">
      <label for="quantity" class="form-label">Quantity: </label>
      <p v-if="!isValid" class="validation">Enter a quantity or 0</p>
      <input
        v-model="item.quantity"
        type="text"
        name="quantity"
        id="quantity"
        placeholder="5"
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
      item: { obtained: false } as Item,
      isValid: true,
    };
  },
  props: {
    listId: Number,
  },
  methods: {
    // TODO: Add input validation
    submitItem() {
      // emit within an emit
      if (this.isAllValid) {
        this.isValid = true;
        this.$emit("submit-form", this.item);
        this.item = { obtained: false } as Item;
      } else {
        this.isValid = false;
      }
    },
  },
  computed: {
    isValidPrice() {
      if (isNaN(this.item.price)) {
        return false;
      }
      return true;
    },
    isValidName() {
      if (this.item.name === "") {
        return false;
      }

      return true;
    },
    isAllValid() {
      if (!this.isValidPrice) {
        return false;
      }
      return true;
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

.validation {
  color: red;

  font-size: 0.8rem;
  margin: 0;
}
</style>
