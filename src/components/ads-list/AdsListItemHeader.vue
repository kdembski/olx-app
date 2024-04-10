<template>
  <div class="ads-list-item-header">
    <div class="ads-list-item-header__title">
      <span v-if="isNew" class="ads-list-item-header__badge">new</span>
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
import { addMinutes, format, isFuture } from "date-fns";
import { onMounted, ref } from "vue";

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

    a {
      margin-right: 5px;
    }
  }

  &__subtitle {
    display: flex;
    gap: 12px;
  }

  .ads-list-item-header__badge {
    padding: 2px 4px;
    font-size: 10px;
    text-transform: uppercase;
    background-color: rgb(var(--v-theme-success));
    color: rgb(var(--v-theme-on-success));
    border-radius: 2px;
    margin-right: 5px;
  }
}
</style>
