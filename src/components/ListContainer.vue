<script lang="ts">
import type { Item } from "@/types/types";
import { defineComponent } from "vue";
import ListItem from "./ListItem.vue";
import ItemForm from "./ItemForm.vue";

export default defineComponent({
  components: { ListItem, ItemForm },

  data() {
    return {};
  },
  props: {
    listId: { type: Number, required: false },
    name: { type: String, required: true },
    listData: { type: Array<Item>, required: false },
  },
  methods: {
    addItem(item: Item) {
      console.log("List name in container: ", this.name);
      this.$emit("add-item", item, this.listId);
    },
    deleteItem(item: Item) {
      console.log("deleteing item: ", item.name);
      this.$emit("delete-item", item);
    },
    deleteList() {
      console.log("Deleting this list");
      this.$emit("delete-list", this.listId);
    },
    numToPrice(number: number) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(number);
    },
    giveString(): String {
      return "String";
    },
    cleanName(): String {
      let newString = "";

      if (this.name !== "" || this.name !== undefined) {
        newString = this.name.trim().split(" ").join("");
      }

      return newString;
    },
  },
  computed: {
    itemCount() {
      return this.listData?.length ? this.listData?.length : 0;
    },

    total(): number {
      const initialVal = 0;

      return this.listData?.reduce((accumulator, currVal) => {
        return accumulator + Number(currVal.price);
      }, initialVal) as number;
    },
  },
  emits: ["add-item", "delete-item", "delete-list"],
});
</script>

<template>
  <div class="accordion list-cont" :id="`accordion-${cleanName()}List`">
    <div class="list-head">
      <!-- TODO: flex flow row, delete button icon? -->
      <h3>{{ name }} - {{ itemCount }}</h3>
      <button type="button" class="btn btn-danger btn-sm" @click="deleteList()">
        Delete list
      </button>
    </div>

    <div class="item-form-area accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#collapse${cleanName()}ItemForm`"
        >
          Add an item
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        :id="`collapse${cleanName()}ItemForm`"
        :data-bs-parent="`#accordion-${cleanName()}List`"
      >
        <div class="accordion-body">
          <ItemForm @submit-form="addItem" :list-id="listId" />
        </div>
      </div>
    </div>

    <ul v-if="itemCount > 0">
      <!-- TODO: add price -->
      <ListItem
        v-for="item in listData"
        :key="item.name"
        @delete-event="deleteItem(item)"
        >{{ item.name }} - {{ numToPrice(item.price) }}</ListItem
      >
    </ul>

    <hr />

    <h5>Total: {{ numToPrice(total) }}</h5>
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
  padding: 0 1.5rem;
}

.list-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
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
