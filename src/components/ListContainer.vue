<script lang="ts">
import ListItem from "./ListItem.vue";

export default {
  components: { ListItem },

  data() {
    return {
      items: ["Item 1", "Item 2", "Item 3"],
    };
  },
  props: {
    title: String,
    listData: { type: Array<{}>, required: false },
  },
  methods: {},
};
</script>

<template>
  <h3>{{ title }}</h3>
  <ul>
    <ListItem v-for="item in items" :key="item">{{ item }}</ListItem>
  </ul>
</template>
