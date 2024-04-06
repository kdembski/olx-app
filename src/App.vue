<script setup lang="ts">
import { API_URL } from "@/consts/api";
import axios from "axios";
import { onMounted, ref } from "vue";

const products = ref();
onMounted(async () => {
  products.value = await axios.get(API_URL + "/olx-products/41");
});
</script>

<template>
  <VApp>{{ products }} </VApp>
</template>
