<template>
  <div class="ads">
    <CList class="ads-list" lines="two">
      <AdsListItem
        v-if="foundAds.length"
        v-for="item in foundAds"
        :item="item"
        :key="item.ad.id"
      />
      <div v-else class="d-flex justify-center">Waiting for ads...</div>
    </CList>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import CList from "@/components/_base/CList.vue";
import AdsListItem from "@/components/home-view/ads-list/AdsListItem.vue";

import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";
import { useOlxAdStore } from "@/store/olx/olx-ad.store";
import { useSettingsStore } from "@/store/settings.store";

import { OlxAdWsResponse } from "@/types/olx/olx-ad.types";

const foundAds = ref<OlxAdWsResponse[]>([]);

const olxAdCategoryStore = useOlxAdCategoryStore();
const olxAdStore = useOlxAdStore();
const settingsStore = useSettingsStore();

olxAdStore.ws.onmessage = async (event) => {
  const item: OlxAdWsResponse = JSON.parse(event.data);

  if (!olxAdCategoryStore.selectedIds.includes(item.ad.categoryId)) return;
  if (settingsStore.blacklistedUserIds.has(item.ad.olxUserId)) return;

  foundAds.value.unshift(item);
  window.ipcRenderer.send("window-flash");

  if (settingsStore.openWhenFound) {
    window.ipcRenderer.send("open-url", item.ad.url);
  }

  if (foundAds.value.length > 50) {
    foundAds.value.pop();
  }
};
</script>

<style lang="scss">
.ads {
  display: flex;
  width: 100%;
  background-color: rgba(var(--v-theme-surface-variant), 0.06);
}
</style>
