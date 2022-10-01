<script lang="ts">
import type Item from "@/types/types";
import { defineComponent } from "vue";
import ListItem from "./ListItem.vue";
import ItemForm from "./ItemForm.vue";

export default defineComponent({
  components: { ListItem, ItemForm },

  data() {
    return {};
  },
  props: {
    name: String,
    listData: { type: Array<Item>, required: false },
  },
  methods: {
    addItem(item: Item) {
      // Second emit
      // console.log("attempting to add item: ", item);
      console.log("List name in container: ", this.name);
      this.$emit("add-item", item, this.name);
    },
  },
  emits: ["add-item"],
});
</script>

<template>
  <div class="accordion list-cont" id="accordionItem">
    <h3>{{ name }}</h3>

    <div class="item-form-area accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseItemForm"
        >
          Add an item
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        id="collapseItemForm"
        data-bs-parent="#accordionItem"
      >
        <div class="accordion-body">
          <ItemForm @submit-form="addItem" />
        </div>
      </div>
    </div>

    <ul>
      <ListItem v-for="item in listData" :key="item">{{ item.name }}</ListItem>
    </ul>
  </div>
</template>

<style scoped>
.list-cont {
  padding: 0.4rem;
  border: 0.1rem solid var(--color-text);
  border-radius: 0.3rem;
}

ul {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.accordion-item {
  border-radius: 4px;
  border: none;
  background-color: var(--color-background-soft);
  color: white;
}

.accordion-item button {
  background-color: inherit;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
}
</style>
