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
      invalidList: false,
      loading: true,
    };
  },

  async created() {
    this.db = await idb.getDb();
    //? Should emit or some custom event be used to update the list everytime an edit is made?

    this.shopLists = await idb.getShopLists();
    console.log("List loading complete");
    this.loading = false;
  },

  async beforeUpdate() {
    console.log("Updating lists");
    // this.shopLists = await idb.getLists();
  },

  methods: {
    async addNewList(name: string) {
      if (this.shopLists.some((list) => list.name === name)) {
        this.invalidList = true;
        return;
      }

      this.invalidList = false;

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

    //! Unused
    async deleteFromList(itemId: number, listId: number) {
      console.log("deleting item from list: ", itemId);

      const shopList = await idb.getShopList(listId);

      // let newList = shopList.items.filter((item) => item.id !== itemId);

      console.log(shopList);
    },

    async updateItem(item: Item, listId: number) {
      console.log("updating item: ", item.name);

      //! Update call for indexed db not working as expected
      // await idb.updateListItem(item, listId);

      await this.deleteItem(item)
        .then(async () => {
          await this.addToList(item, listId);
        })
        .then(() => {
          console.log("item updated in list");
        });
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
      <div
        v-if="invalidList"
        class="alert alert-warning d-flex align-items-center"
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-exclamation-triangle-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </svg>
        <div>A list with that name already exists</div>
      </div>
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
      <div v-if="loading" class="d-flex justify-content-center">
        <div class="spinner-border text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <!-- TODO: Declare emits in component -->
      <ListContainer
        v-else
        v-for="shopList in shopLists"
        :key="shopList.id"
        :listId="(shopList.id as number)"
        :name="shopList.name"
        :listData="shopList.items"
        @add-item="addToList"
        @delete-list="deleteList"
        @delete-item="deleteItem"
        @update-item="updateItem"
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

div.alert {
  margin: 0;
}

div.alert > div {
  margin: 0 0;
}

.alert > svg {
  margin: 0 0.4rem;
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
