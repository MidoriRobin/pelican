<script lang="ts">
import ListItem from "./ListItem.vue";

export default {
  components: { ListItem },

  data() {
    return {
      items: ["Item 1", "Item 2", "Item 3"],
    };
  },
};
</script>

<template>
  <ul>
    <ListItem v-for="item in items" :key="item">{{ item }}</ListItem>
  </ul>
</template>
