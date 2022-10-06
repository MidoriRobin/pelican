<script lang="ts">
import type { Item } from "@/types/types";
import type { ShopList } from "@/types/types";
import { defineComponent } from "vue";
import ListContainer from "../components/ListContainer.vue";
import ListForm from "../components/ListForm.vue";
import idb from "../idb";

export default defineComponent({
  components: { ListContainer, ListForm },
  data() {
    return {
      shopLists: [] as ShopList[],
      db: {} as IDBDatabase,
      ready: false,
    };
  },

  async created() {
    this.db = await idb.getDb();
    //? Should emit or some custom event be used to update the list everytime an edit is made?
    this.shopLists = await idb.getShopLists();
  },

  async beforeUpdate() {
    console.log("Updating lists");
    // this.shopLists = await idb.getLists();
  },

  methods: {
    async addNewList(name: string) {
      let newList: ShopList = { name, items: [] };

      await idb.saveList(newList);
      this.shopLists = await idb.getShopLists();
    },

    async addToList(item: Item, listId: number) {
      console.log("submitting form data to db: ", item);

      item.listId = listId;
      // Used spread operator as an error was being thrown on idb side due to the proxy being passed over
      await idb.saveListItem({ ...item });
      this.shopLists = await idb.getShopLists();
    },

    async deleteFromList(itemId: number, listId: number) {
      console.log("deleting item from list: ", itemId);

      const shopList = await idb.getShopList(listId);

      // let newList = shopList.items.filter((item) => item.id !== itemId);

      console.log(shopList);
    },

    async clearAllLists() {
      console.log("Clearing all lists");
      await idb.deleteAllLists();

      this.shopLists = await idb.getShopLists();
    },

    async deleteList(id: number) {
      console.log("deleting list..", id);
      await idb.deleteList(id);
      this.shopLists = await idb.getShopLists();
    },

    async deleteItem(item: Item) {
      console.log("sending delete request to database: ", item);

      await idb.deleteListItem({ ...item });
      this.shopLists = await idb.getShopLists();
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
        :listId="shopList.id"
        :name="shopList.name"
        :listData="shopList.items"
        @add-item="addToList"
        @delete-list="deleteList"
        @delete-item="deleteItem"
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
