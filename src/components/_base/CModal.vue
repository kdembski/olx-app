<template>
  <VDialog
    v-model="model"
    class="c-modal"
    content-class="c-modal__container"
    max-width="500"
    attach="#layout_main"
    contained
    persistent
    no-click-animation
    :transition="VSlideYTransition"
  >
    <template #activator="scope">
      <slot name="activator" v-bind="scope" />
    </template>
    <template #default="scope">
      <div class="c-modal__header">
        <slot name="header">
          <span>{{ title }}</span>
          <CButton icon="mdi-close" size="small" @click="model = false" />
        </slot>
      </div>
      <VForm @submit="onSubmit">
        <div class="c-modal__content">
          <slot v-bind="scope" />
        </div>
        <div class="c-modal__actions">
          <slot name="actions" />
        </div>
      </VForm>
      <VOverlay
        :model-value="loading"
        contained
        persistent
        class="d-flex justify-center align-center"
      >
        <CLoader />
      </VOverlay>
    </template>
  </VDialog>
</template>

<script setup lang="ts">
import { VSlideYTransition } from "vuetify/lib/components/index.mjs";

import CButton from "@/components/_base/CButton.vue";
import CLoader from "@/components/_base/CLoader.vue";

const emits = defineEmits<{
  (e: "submit", value: SubmitEvent): void;
}>();

defineProps<{
  title?: string;
  loading?: boolean;
}>();

const model = defineModel<boolean>();

const onSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  emits("submit", e);
};
</script>

<style lang="scss">
.c-modal {
  .v-overlay__scrim {
    background: rgb(var(--v-theme-surface-variant));
  }

  &__container {
    background-color: rgb(var(--v-theme-surface));
    border-radius: 4px;
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.2);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px 10px;
    border-bottom: 1px solid
      rgba(var(--v-border-color), var(--v-border-opacity));
    font-size: 18px;
  }

  &__content {
    padding: 15px 20px;
    overflow: auto;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px 20px;
    border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
