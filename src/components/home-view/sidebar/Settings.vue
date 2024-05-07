<template>
  <SidebarSection>
    <template #title> Settings </template>
    <div class="settings__content">
      <CSwitch
        label="Open in browser when found"
        v-model="settingsStore.openWhenFound"
      />
    </div>
  </SidebarSection>
</template>

<script setup lang="ts">
import CSwitch from "@/components/_base/CSwitch.vue";
import SidebarSection from "@/components/home-view/sidebar/SidebarSection.vue";

import { useSettingsStore } from "@/store/settings.store";

const settingsStore = useSettingsStore();
</script>

<style lang="scss">
.settings {
  &__content {
    padding-left: 5px;
  }
}
</style>
