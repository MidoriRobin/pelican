<script lang="ts">
import type Item from "@/types/types";
import { defineComponent } from "vue";
import ListContainer from "../components/ListContainer.vue";
import ListForm from "../components/ListForm.vue";

export default defineComponent({
  components: { ListContainer, ListForm },
  data() {
    return {
      listItems: [] as { id: number; name: string; listItems: Item[] }[],
    };
  },

  methods: {
    addNewList(name: string) {
      // this.list.push(newList);
      // newItem.id = this.listItems.length;
      // console.log("Adding list: ", newItem);

      let newListItems: Item[] = [];

      this.listItems.push({
        id: this.listItems.length,
        name,
        listItems: newListItems,
      });
    },
    addToList(item: Item, listName: string) {
      console.log("adding an item to list");
      let itemList = this.listItems.find(
        (element) => element.name === listName
      );

      itemList?.listItems.push(item);
    },

    clearAllLists() {
      console.log("Clearing all lists");
      this.listItems = [];
    },
  },
});
</script>

<template>
  <main>
    <h2>Lists</h2>

    <h4>Create a list</h4>
    <ListForm @submit-list="addNewList" />

    <h4>Delete all list</h4>
    <button @click="clearAllLists">Clear</button>

    <p>These are the lists</p>
    <!-- Example List -->
    <!-- <ListContainer name="First list" /> -->

    <ListContainer
      v-for="items in listItems"
      :key="items.id"
      :name="items.name"
      :listData="items.listItems"
      @add-item="addToList"
    />
  </main>
</template>
