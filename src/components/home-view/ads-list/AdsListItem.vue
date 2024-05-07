<template>
  <CListItem>
    <div class="d-flex flex-column ga-2">
      <AdsListItemHeader :item="item" />
      <AdsListItemContent :item="item" />
    </div>
  </CListItem>
</template>

<script setup lang="ts">
import CListItem from "@/components/_base/CListItem.vue";
import AdsListItemContent from "@/components/home-view/ads-list/AdsListItemContent.vue";
import AdsListItemHeader from "@/components/home-view/ads-list/AdsListItemHeader.vue";

import { OlxAdWsResponse } from "@/types/olx/olx-ad.types";

defineProps<{ item: OlxAdWsResponse }>();
</script>
