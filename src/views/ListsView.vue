<script lang="ts">
import { defineComponent } from "vue";
import ListContainer from "../components/ListContainer.vue";
import ListForm from "../components/ListForm.vue";

interface ListItem {
  id: number;
  name: string;
  price: string;
}

export default defineComponent({
  components: { ListContainer, ListForm },
  data() {
    return {
      listItems: new Array<ListItem>(),
    };
  },

  methods: {
    addNewList(newList: ListItem) {
      // this.list.push(newList);
      this.listItems.push(newList);
    },
  },
});
</script>

<template>
  <main>
    <h2>Lists</h2>

    <h4>Create a list</h4>
    <ListForm />

    <p>These are the lists</p>
    <!-- Example List -->
    <ListContainer title="First list" />

    <ListContainer v-for="item in listItems" :key="item.id" />
  </main>
</template>
