<template>
  <VListItem class="list-item">
    <slot />
  </VListItem>
</template>

<style lang="scss">
.list-item {
  background-color: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding: 10px 20px;
  border-radius: 4px;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
}
</style>
