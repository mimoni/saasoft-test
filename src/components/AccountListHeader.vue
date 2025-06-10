<template>
  <div class="header">
    <h2 class="header">Учетные записи</h2>
    <Button icon="pi pi-plus" class="p-button p-button-outlined" @click="$emit('add-row')" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

defineEmits<{
  (e: 'add-row'): void
}>()
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header {
  font-weight: bold;
}
</style>
