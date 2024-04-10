<template>
  <VExpansionPanels
    v-if="item.products?.length"
    variant="accordion"
    class="ads-list-item-content"
  >
    <VExpansionPanel
      v-for="product in item.products"
      elevation="0"
      class="ads-list-item-content__panel panel"
      :key="product.id"
    >
      <template #title>
        <div class="panel__header">
          <p>{{ getProductInfo(product) }}</p>
          <span class="price">{{ getAvgPrice(product) }}</span>
        </div>
      </template>

      <template #text>
        <div class="panel__content">
          <div v-for="{ ad } in product.productAds">
            <a :href="ad.url" target="_blank">{{ ad.name }}</a>

            <div class="d-flex ga-3">
              <span>{{ formatDistanceToNow(ad.createdAt) }} ago</span>
              <span class="price">{{ ad.price }} zł</span>
            </div>
          </div>
        </div>
      </template>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";
import { OlxAdWsResponse } from "@/types/types/olx-ad.types";
import {
  OlxProduct,
  OlxProductAdsCount,
} from "@/types/types/olx-product.types";

defineProps<{ item: OlxAdWsResponse }>();

const getProductInfo = (product: OlxProduct & OlxProductAdsCount) => {
  return `${product.brand} ${product.model} (${product._count.productAds})`;
};

const getAvgPrice = (product: OlxProduct) => {
  const price = product.avgPrice;
  return price ? price + " zł" : "";
};
</script>

<style lang="scss">
.ads-list-item-content {
  margin: 0 -9px;

  .v-expansion-panel-title {
    padding: 10px;
    min-height: 36px !important;
  }

  .v-expansion-panel-text__wrapper {
    padding: 5px 0 0 0;
  }
}

.panel {
  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 25px 5px;

    a {
      font-size: 14px;
    }
  }
}
</style>
