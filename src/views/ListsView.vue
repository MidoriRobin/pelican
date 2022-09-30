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
  computed: {
    listEmpty() {
      return this.listItems.length == 0 ? true : false;
    },
  },
});
</script>

<template>
  <main class="list-main container">
    <div class="header-area">
      <h2>Lists</h2>
      <hr />
    </div>

    <div class="list-form">
      <h4>Create a list</h4>
      <!-- TODO: Declare emits in component -->
      <ListForm @submit-list="addNewList" />
    </div>

    <hr />

    <div class="list-options">
      <h4>Delete all lists</h4>
      <button
        @click="clearAllLists"
        class="btn btn-danger"
        :disabled="listEmpty"
      >
        Clear
      </button>
    </div>

    <hr />

    <div class="list">
      <h4>These are the lists</h4>
      <!-- Example List -->
      <!-- <ListContainer name="First list" /> -->

      <!-- TODO: Declare emits in component -->
      <ListContainer
        v-for="items in listItems"
        :key="items.id"
        :name="items.name"
        :listData="items.listItems"
        @add-item="addToList"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-flow: column nowrap;
}

div {
  margin: 1.5rem 0;
}

div.header-area {
  margin: 0;
}
</style>
