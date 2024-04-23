<template>
  <div class="sidebar-section blacklist">
    <p class="sidebar-section__title">Olx users blacklist</p>
    <div v-if="settingsStore.blacklistedUserIds.size" class="blacklist__chips">
      <VChip
        v-for="id in settingsStore.blacklistedUserIds"
        :key="id"
        density="compact"
        closable
        @click:close="() => removeBlacklistedId(id)"
      >
        {{ id }}
      </VChip>
    </div>
    <VTextField
      v-model="providedId"
      :density="'compact'"
      placeholder="Provide the user id you want to blacklist"
      class="blacklist__input"
      hide-details
      @keyup.enter="addBlacklistedId"
    />
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/settings.store";
import { ref } from "vue";

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
