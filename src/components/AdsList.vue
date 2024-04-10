<template>
  <div class="bg-grey-lighten-5 pa-4 w-100 h-100 overflow-auto">
    <VList class="d-flex flex-column ga-4 bg-transparent pa-0">
      <VListItem v-for="item in foundItems" class="bg-white px-4 py-2 border">
        <div class="d-flex flex-column">
          <div class="d-flex align-center ga-1">
            <a :href="item.ad.url" target="_blank">
              {{ item.ad.name }}
            </a>
            <span class="text-body-2">
              ({{ item.ad.productAd?.product.brand }}
              {{ item.ad.productAd?.product.model }})
            </span>
          </div>
          <div class="d-flex ga-4">
            <span class="text-body-2">
              {{ format(item.ad.createdAt, "HH:mm:ss") }}
            </span>
            <span class="text-body-2"> {{ item.ad.price }} zł </span>
          </div>
        </div>

        <div>
          <template v-for="product in item.products">
            <div v-if="product._count.productAds > 1">
              {{ product.brand }} - {{ product.model }} -
              {{ product.avgPrice }} ({{ product._count.productAds }})
              <div v-for="{ ad } in product.productAds">
                {{ ad.name }} {{ ad.price }} zł
              </div>
            </div>
          </template>
        </div>
      </VListItem>
    </VList>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { format } from "date-fns";
import { useOlxAdStore } from "@/store/olx/olx-ad.store";
import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";
import { OlxAd, OlxAdProduct } from "@/types/types/olx-ad.types";
import {
  OlxProduct,
  OlxProductAd,
  OlxProductAdsCount,
} from "@/types/types/olx-product.types";

type WsMessageT = {
  ad: OlxAd & OlxAdProduct;
  products: (OlxProduct & OlxProductAd & OlxProductAdsCount)[];
};

const foundItems = ref<WsMessageT[]>([]);

const olxAdCategoryStore = useOlxAdCategoryStore();
const olxAdStore = useOlxAdStore();

olxAdStore.ws.onmessage = async (event: MessageEvent<string>) => {
  if (!event.data) return;

  const item: WsMessageT = JSON.parse(event.data);

  if (olxAdCategoryStore.selectedIds.includes(item.ad.categoryId)) {
    foundItems.value.unshift(item);
    window.ipcRenderer.send("window-flash");
  }
};
</script>
