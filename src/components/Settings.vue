<template>
  <div class="settings">
    <VSwitch
      label="Open browser when found"
      color="primary"
      v-model="settingsStore.openWhenFound"
    />
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/settings.store";

const settingsStore = useSettingsStore();
</script>

<style lang="scss">
.settings {
  .v-label {
    font-size: 15px;
  }
}
</style>
