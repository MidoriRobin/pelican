<script lang="ts">
import { defineComponent } from "vue";
import type { Item } from "@/types/types";
import type { PropType } from "vue";
import CheckboxChecked from "./svgs/CheckboxChecked.vue";
import CheckboxEmpty from "./svgs/CheckboxEmpty.vue";

export default defineComponent({
  components: { CheckboxEmpty, CheckboxChecked },
  data() {
    return { listItem: this.item };
  },
  props: {
    item: { type: {} as PropType<Item>, required: true },
  },
  methods: {
    updateItem() {
      // this.isObtained = !this.isObtained;
      this.$emit("update-event", this.listItem);
    },
    flipObtained() {
      this.listItem.obtained = !this.listItem.obtained;
    },
    numToPrice(number: number) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(number);
    },
  },
  emits: ["delete-event", "update-event"],
});
</script>

<template>
  <li>
    <!-- TODO: Add svgs from assets file here, guide: https://blog.logrocket.com/using-svg-and-vue-js-a-complete-guide/ -->
    <!-- TODO: Conditionally render one of these -->
    <button type="button" @click="flipObtained()" class="check-btn">
      <CheckboxChecked v-if="listItem.obtained" color="#FFD900" />
      <CheckboxEmpty v-else color="#FFD900" />
    </button>
    <p :class="{ obtained: listItem.obtained }">
      {{ listItem.name }} - {{ numToPrice(listItem.price) }}
    </p>
    <button
      type="button"
      class="btn-close btn-close-white"
      aria-label="Close"
      @click="$emit('delete-event')"
    ></button>
  </li>
</template>

<style scoped>
li {
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  margin: 1rem auto;

  /* border: 1px solid red; */
}

p {
  margin: 0;
  /* -webkit-animation: fade-out 1s ease-out reverse both;
  animation: fade-out 1s ease-out reverse both; */
}

p.obtained {
  text-decoration: line-through;
  -webkit-animation: fade-out 1s ease-out both;
  animation: fade-out 1s ease-out both;
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.check-btn {
  background-color: inherit;
  border: none;
  padding: none;
}
</style>
