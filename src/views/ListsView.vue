<script lang="ts">
import type { Item } from "@/types/types";
import type { ShopList } from "@/types/types";
import { defineComponent } from "vue";
import ListContainer from "../components/ListContainer.vue";
import ListForm from "../components/ListForm.vue";

export default defineComponent({
  components: { ListContainer, ListForm },
  data() {
    return {
      shopLists: [] as ShopList[],
    };
  },

  methods: {
    addNewList(name: string) {
      // this.list.push(newList);
      // newItem.id = this.listItems.length;
      // console.log("Adding list: ", newItem);

      let newListItems: Item[] = [];

      this.shopLists.push({
        id: this.shopLists.length,
        name,
        items: newListItems,
      });
    },
    addToList(item: Item, listName: string) {
      console.log("adding an item to list");
      let itemList = this.shopLists.find(
        (element) => element.name === listName
      );

      itemList?.items.push(item);
    },

    clearAllLists() {
      console.log("Clearing all lists");
      this.shopLists = [];
    },
  },
  computed: {
    listEmpty() {
      return this.shopLists.length == 0 ? true : false;
    },
  },
});
</script>

<template>
  <main class="accordion list-main container" id="accordionMain">
    <div class="header-area">
      <h2>Lists</h2>
      <hr />
    </div>

    <div class="list-form accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseListForm"
        >
          Create a list
        </button>
      </h2>
      <!-- TODO: Declare emits in component -->
      <div
        class="accordion-collapse collapse"
        id="collapseListForm"
        data-bs-parent="#accordionMain"
      >
        <div class="accordion-body">
          <ListForm @submit-list="addNewList" />
        </div>
      </div>
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
        v-for="shopList in shopLists"
        :key="shopList.id"
        :name="shopList.name"
        :listData="shopList.items"
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
}
</style>
