<template>
  <div class="ads-list-item-header">
    <div class="ads-list-item-header__title">
      <a :href="item.ad.url" target="_blank">{{ item.ad.name }}</a>
      <span>{{ getProductInfo() }}</span>
    </div>

    <div class="ads-list-item-header__subtitle">
      <span>{{ format(item.ad.createdAt, "HH:mm:ss") }}</span>
      <span class="price">{{ getAdPrice() }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { OlxAdWsResponse } from "@/types/types/olx-ad.types";
import { format } from "date-fns";

const props = defineProps<{ item: OlxAdWsResponse }>();

const getProductInfo = () => {
  const brand = props.item.ad.productAd?.product.brand;
  const model = props.item.ad.productAd?.product.model;
  if (!model || !brand) return "";
  return `(${brand} ${model})`;
};

const getAdPrice = () => {
  const price = props.item.ad.price;
  return price ? price + " zł" : "";
};
</script>

<style lang="scss">
.ads-list-item-header {
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__title {
    line-height: 1.2;

    a {
      margin-right: 5px;
    }
  }

  &__subtitle {
    display: flex;
    gap: 12px;
  }
}
</style>
