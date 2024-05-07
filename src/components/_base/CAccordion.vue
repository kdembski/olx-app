<template>
  <VExpansionPanel elevation="0" class="c-accordion">
    <template #title>
      <slot name="title" />
    </template>
    <template #text>
      <slot name="content" />
    </template>
  </VExpansionPanel>
</template>

<style lang="scss">
.c-accordion {
  .v-expansion-panel-title {
    padding: 10px;
    min-height: 36px !important;
  }

  .v-expansion-panel-text__wrapper {
    padding: 5px 0 0 0;
  }
}
</style>
