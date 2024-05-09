<template>
  <div class="sidebar-section">
    <div class="sidebar-section__title">
      <slot name="title" />
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 1px 0;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    border-bottom: 1px solid
      rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
