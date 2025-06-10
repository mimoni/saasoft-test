<template>
  <Message severity="info" class="info-message">
    Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message'
</script>

<style scoped>
.info-message {
  margin: 1rem 0;
}
</style>
