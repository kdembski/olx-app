<template>
  <div ref="consoleContainer" class="console">
    <pre
      v-for="item in consoleStore.items"
      class="console__item"
      :class="'console__item--' + item.type"
      v-html="getPreparedMessage(item)"
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

  return `<span class="console__item--time">${format(
    item.createdAt,
    "HH:mm:ss"
  )}</span> ${message}`;
};

watch(consoleStore.items, async () => {
  if (!consoleContainer.value) return;

  await nextTick();
  consoleContainer.value.scrollTop = consoleContainer.value.scrollHeight;
});
</script>

<style lang="scss">
.console {
  display: flex;
  flex-direction: column;
  height: 15%;
  max-height: 200px;
  gap: 10px;
  padding: 10px 20px;
  overflow: auto;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgb(var(--v-theme-surface));

  &__item {
    font-size: 12px;

    &--error {
      color: rgb(var(--v-theme-error));
    }

    &--info {
      color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    }

    &--time {
      color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    }
  }
}
</style>
