<template>
  <div class="ads-list-item-header">
    <div class="ads-list-item-header__title">
      <span v-if="isNew" class="ads-list-item-header__badge">new</span>
      <a :href="item.ad.url" target="_blank">{{ item.ad.name }}</a>
      <CText variant="tonal">{{ getProductInfo() }}</CText>
    </div>
    <div class="ads-list-item-header__subtitle">
      <CText variant="tonal">
        {{ format(item.ad.createdAt, "HH:mm:ss") }}
      </CText>
      <CText variant="bold">{{ getAdPrice() }}</CText>
    </div>
  </div>
</template>
<script setup lang="ts">
import { addMinutes, format, isFuture } from "date-fns";
import { onMounted, ref } from "vue";

import CText from "@/components/_base/CText.vue";

import { OlxAdWsResponse } from "@/types/olx/olx-ad.types";

const props = defineProps<{ item: OlxAdWsResponse }>();
const isNew = ref(false);

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

const updateIsNew = () => {
  const createdAt = props.item.ad.createdAt;
  isNew.value = isFuture(addMinutes(createdAt, 2));
};

setInterval(updateIsNew, 30000);
onMounted(updateIsNew);
</script>

<style lang="scss">
.ads-list-item-header {
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__title {
    line-height: 1.2;
  }

  &__subtitle {
    display: flex;
    gap: 12px;
  }

  &__badge {
    position: relative;
    top: -1px;
    padding: 2px 4px;
    font-size: 10px;
    text-transform: uppercase;
    background-color: rgb(var(--v-theme-success));
    color: rgb(var(--v-theme-on-success));
    border-radius: 2px;
    margin-right: 5px;
  }

  a {
    margin-right: 5px;
  }
}
</style>
