<template>
  <SidebarSection>
    <template #title> Olx users blacklist </template>
    <div v-if="settingsStore.blacklistedUserIds.size" class="blacklist__chips">
      <CChip
        v-for="id in settingsStore.blacklistedUserIds"
        :key="id"
        closable
        @click:close="() => removeBlacklistedId(id)"
      >
        {{ id }}
      </CChip>
    </div>
    <CTextField
      v-model="providedId"
      placeholder="Provide the user id you want to blacklist"
      class="blacklist__input"
      @keyup.enter="addBlacklistedId"
    />
  </SidebarSection>
</template>

<script setup lang="ts">
import { ref } from "vue";

import CChip from "@/components/_base/CChip.vue";
import CTextField from "@/components/_base/CTextField.vue";
import SidebarSection from "@/components/home-view/sidebar/SidebarSection.vue";

import { useSettingsStore } from "@/store/settings.store";

const settingsStore = useSettingsStore();
const providedId = ref<string>();

const addBlacklistedId = () => {
  if (!providedId.value) return;
  settingsStore.blacklistedUserIds.add(providedId.value);
  providedId.value = undefined;
};

const removeBlacklistedId = (id: string) => {
  settingsStore.blacklistedUserIds.delete(id);
};
</script>

<style lang="scss">
.blacklist {
  &__input input {
    font-size: 14px;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
}
</style>
