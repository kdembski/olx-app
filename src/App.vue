<template>
  <VApp class="h-screen overflow-hidden">
    <component :is="layout">
      <RouterView />
    </component>
  </VApp>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const layout = computed(() => {
  const type = useRoute()?.meta?.layout;
  switch (type) {
    default:
      return DefaultLayout;
  }
});
</script>
