<template>
  <div class="ads">
    <VList class="ads-list" lines="two">
      <VListItem
        v-for="item in foundItems"
        class="ads-list__item"
        :key="item.ad.id"
      >
        <div class="d-flex flex-column ga-2">
          <AdsListItemHeader :item="item" />
          <AdsListItemContent :item="item" />
        </div>
      </VListItem>
    </VList>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useOlxAdStore } from "@/store/olx/olx-ad.store";
import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";
import { OlxAdWsResponse } from "@/types/types/olx-ad.types";
import AdsListItemContent from "@/components/ads-list/AdsListItemContent.vue";
import AdsListItemHeader from "@/components/ads-list/AdsListItemHeader.vue";

const foundItems = ref<OlxAdWsResponse[]>([]);

const olxAdCategoryStore = useOlxAdCategoryStore();
const olxAdStore = useOlxAdStore();

olxAdStore.ws.onmessage = async (event: MessageEvent<string>) => {
  if (!event.data) return;

  const item: OlxAdWsResponse = JSON.parse(event.data);

  if (olxAdCategoryStore.selectedIds.includes(item.ad.categoryId)) {
    item.products = item.products.filter(
      (product) => product.productAds.length > 1
    );
    foundItems.value.unshift(item);
    window.ipcRenderer.send("window-flash");
  }
};
</script>

<style lang="scss">
.ads {
  background-color: rgba(var(--v-theme-surface-variant), 0.14);
  padding: 10px;
  height: 100%;
  width: 100%;
  overflow: auto;
}

.ads-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: transparent;
  padding: 0;

  &__item {
    background-color: rgb(var(--v-theme-surface));
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding: 10px 20px;
    border-radius: 4px;

    span {
      font-size: 15px;
      color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));

      &.price {
        font-weight: 600;
        color: rgba(var(--v-theme-on-surface), 0.9);
      }
    }
  }

  .v-list-item__content {
    overflow: unset;
  }
}
</style>
