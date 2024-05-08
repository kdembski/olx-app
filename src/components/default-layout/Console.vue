<template>
  <div class="console__wrapper">
    <CChipGroup
      v-model="selectedLabels"
      selected-class="text-primary"
      class="console__labels"
      multiple
    >
      <CChip v-for="label in labels" :value="label">
        {{ label }}
      </CChip>
    </CChipGroup>
    <div ref="consoleContainer" class="console">
      <pre
        v-for="item in consoleItems"
        class="console__item"
        :class="'console__item--' + item.type"
        v-html="getPreparedMessage(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { computed, nextTick, ref, watch } from "vue";

import CChip from "@/components/_base/CChip.vue";
import CChipGroup from "@/components/_base/CChipGroup.vue";

import { useConsoleStore } from "@/store/console.store";

import { ConsoleItemI } from "@/types/console.types";

const consoleContainer = ref<HTMLElement>();
const consoleStore = useConsoleStore();

const labels = ["general", "bot"];
const selectedLabels = ref(["general"]);

const consoleItems = computed(() =>
  consoleStore.items.filter(
    (item) => item.label && selectedLabels.value.includes(item.label),
  ),
);

const getPreparedMessage = (item: ConsoleItemI) => {
  const message = item.message.replaceAll("\n", " ");

  if (!item.createdAt) return message;

  const time = `<span class="console__item--time">${format(
    item.createdAt,
    "HH:mm:ss",
  )}</span>`;

  const label = `<span class="console__item--label">${item.label}</span>`;

  return `${time} ${label} ${message}`;
};

watch([consoleStore.items, selectedLabels], async () => {
  if (!consoleContainer.value) return;

  await nextTick();
  consoleContainer.value.scrollTop = consoleContainer.value.scrollHeight;
});
</script>

<style lang="scss">
.console {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
  overflow: auto;

  &__wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 20%;
    max-width: 100vw;
    border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    background-color: rgb(var(--v-theme-surface));
  }

  &__labels {
    background-color: rgba(var(--v-theme-surface-variant), 0.055);
    border-bottom: 1px solid
      rgba(var(--v-border-color), var(--v-border-opacity));
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);

    &.c-chip-group {
      padding: 4px 10px;
    }
  }

  &__item {
    font-size: 12px;
    white-space: pre-line;

    &--error {
      color: rgb(var(--v-theme-error));
    }

    &--success {
      color: rgb(var(--v-theme-success));
    }

    &--info {
      color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    }

    &--time {
      color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    }

    &--label {
      color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
      background-color: rgb(var(--v-theme-surface-variant), 0.15);
      padding: 1px 3px;
      border-radius: 4px;
    }
  }
}
</style>
