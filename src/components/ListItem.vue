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
    item: { type: Object as PropType<Item>, required: true },
  },
  methods: {
    updateItem() {
      this.$emit("update-event", this.listItem);
    },
    flipObtained() {
      this.listItem.obtained = !this.listItem.obtained;
    },
    numToPrice(number: number | undefined) {
      if (number == undefined) {
        return 0;
      }

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(number);
    },
    modifyAndSave() {
      this.flipObtained();
      this.updateItem();
    },
  },
  emits: ["delete-event", "update-event"],
});
</script>

<template>
  <li>
    <!-- TODO: Add svgs from assets file here, guide: https://blog.logrocket.com/using-svg-and-vue-js-a-complete-guide/ -->
    <!-- TODO: Conditionally render one of these -->
    <button type="button" @click="modifyAndSave()" class="check-btn">
      <CheckboxChecked v-if="listItem?.obtained" color="#FFD900" />
      <CheckboxEmpty v-else color="#FFD900" />
    </button>
    <div class="desc-area" :class="{ obtained: listItem?.obtained }">
      <p class="main-text">
        {{ listItem?.name }} - {{ numToPrice(listItem?.price) }}
      </p>
      <span class="sub-text">Qty: {{ listItem?.quantity }}</span>
    </div>
    <button
      type="button"
      class="btn-close btn-close-white"
      aria-label="Close"
      @click="$emit('delete-event', listItem)"
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

button {
  flex-grow: 1;
}

div {
  flex-grow: 10;
}

p {
  margin: 0 1rem;
  /* -webkit-animation: fade-out 1s ease-out reverse both;
  animation: fade-out 1s ease-out reverse both; */
}

p.obtained {
  text-decoration: line-through;
  -webkit-animation: fade-out 1s ease-out both;
  animation: fade-out 1s ease-out both;
}

span.sub-text {
  font-size: 0.8rem;
  line-height: 1.5rem;
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

div.desc-area {
  display: flex;
  flex-flow: row wrap;
}
</style>
