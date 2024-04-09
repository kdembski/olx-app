<template>
  <div
    ref="consoleContainer"
    class="h-25 overflow-auto d-flex flex-column ga-2 px-4 py-2 border bg-grey-lighten-5"
  >
    <pre
      v-for="item in consoleStore.items"
      class="text-caption"
      :class="getTextColorClass(item)"
      v-html="getPreparedMessage(item)"
      style="line-height: 1.4"
    />
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { nextTick, ref, watch } from "vue";
import { useConsoleStore } from "@/store/console.store";
import { ConsoleItemI } from "@/types/console.types";

const consoleContainer = ref<HTMLElement>();
const consoleStore = useConsoleStore();

const getPreparedMessage = (item: ConsoleItemI) => {
  const message = item.message.replaceAll("\n", " ");

  if (!item.createdAt) return message;

  return `<span class="text-grey-darken-2">${format(
    item.createdAt,
    "HH:mm:ss"
  )}</span> ${message}`;
};

const getTextColorClass = (item: ConsoleItemI) => {
  switch (item.type) {
    case "error":
      return "text-red-darken-3";
    case "info":
      return "text-indigo-darken-3";
  }
};

watch(consoleStore.items, async () => {
  if (!consoleContainer.value) return;

  await nextTick();
  consoleContainer.value.scrollTop = consoleContainer.value.scrollHeight;
});
</script>
