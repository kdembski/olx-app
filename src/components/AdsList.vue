<template>
  <div>
    <VList class="bg-grey-lighten-4">
      <VListItem v-for="ad in foundAds">{{ ad.name }}</VListItem>
    </VList>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { OlxAdSelectResult } from "@/types/olx.types";
import { useOlxAdStore } from "@/store/olx/olx-ad.store";
import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";

const foundAds = ref<OlxAdSelectResult[]>([]);

const olxAdCategoryStore = useOlxAdCategoryStore();
const olxAdStore = useOlxAdStore();

olxAdStore.ws.onmessage = (event: MessageEvent<string>) => {
  if (!event.data) return;

  const { ad }: { ad: OlxAdSelectResult } = JSON.parse(event.data);

  if (olxAdCategoryStore.selectedIds.includes(ad.categoryId)) {
    foundAds.value.push(ad);
  }
};
</script>
