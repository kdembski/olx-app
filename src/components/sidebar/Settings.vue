<template>
  <div class="sidebar-section settings">
    <p class="sidebar-section__title">Settings</p>
    <div class="settings__content">
      <VSwitch
        label="Open browser when found"
        color="primary"
        v-model="settingsStore.openWhenFound"
        hide-details
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/settings.store";

const settingsStore = useSettingsStore();
</script>

<style lang="scss">
.settings {
  .v-selection-control {
    --v-input-control-height: 20px;
    --v-selection-control-size: 20px;

    &__wrapper {
      width: unset;
    }
  }

  &__content {
    padding-left: 5px;
  }

  .v-label {
    font-size: 14px;
  }
}
</style>
