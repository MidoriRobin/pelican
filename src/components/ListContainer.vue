<script lang="ts">
import type Item from "@/types/types";
import type { PropType } from "vue";
import ListItem from "./ListItem.vue";

export default {
  components: { ListItem },

  data() {
    return {};
  },
  props: {
    name: String,
    listData: { type: Object as PropType<Item>, required: false },
  },
  methods: {},
};
</script>

<template>
  <h3>{{ name }}</h3>

  <h5>Add an item</h5>

  <ul>
    <ListItem v-for="item in listData" :key="item">{{ item.name }}</ListItem>
  </ul>
</template>
