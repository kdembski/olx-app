<template>
  <CAccordionGroup v-if="item.products?.length" class="ads-list-item-content">
    <CAccordion
      v-for="product in item.products"
      class="ads-list-item-content__card card"
      :value="product.id"
    >
      <template #title>
        <div class="card__header">
          <div>
            <CText>{{ getProductInfo(product) }}</CText>
            <CText variant="tonal"> ({{ product._count.productAds }}) </CText>
          </div>
          <CText variant="bold"> {{ getAvgPrice(product) }}</CText>
        </div>
      </template>

      <template #content>
        <div class="card__content">
          <div v-for="{ ad } in product.productAds">
            <a :href="ad.url" target="_blank">{{ ad.name }}</a>
            <div class="d-flex ga-3">
              <CText variant="tonal" size="small">
                {{ formatDistanceToNow(ad.createdAt) }} ago
              </CText>
              <CText variant="bold" size="small"> {{ ad.price }} zł </CText>
            </div>
          </div>
        </div>
      </template>
    </CAccordion>
  </CAccordionGroup>
</template>
<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";

import CAccordion from "@/components/_base/CAccordion.vue";
import CAccordionGroup from "@/components/_base/CAccordionGroup.vue";
import CText from "@/components/_base/CText.vue";

import { OlxAdWsResponse } from "@/types/olx/olx-ad.types";
import { OlxProduct, OlxProductAdsCount } from "@/types/olx/olx-product.types";

defineProps<{ item: OlxAdWsResponse }>();

const getProductInfo = (product: OlxProduct & OlxProductAdsCount) => {
  return `${product.brand} ${product.model}`;
};

const getAvgPrice = (product: OlxProduct) => {
  const price = product.avgPrice;
  return price ? price + " zł" : "";
};
</script>

<style lang="scss">
.card {
  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20px;

    a {
      font-size: 14px;
    }
  }

  &:not(:last-child) {
    .card__content {
      padding-bottom: 10px;
    }
  }
}
</style>
