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
});
</script>

<template>
  <h3>{{ name }}</h3>

  <h5>Add an item</h5>
  <ItemForm @submit-form="addItem" />

  <ul>
    <ListItem v-for="item in listData" :key="item">{{ item.name }}</ListItem>
  </ul>
</template>
