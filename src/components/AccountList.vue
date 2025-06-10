<template>
  <div class="account-list">
    <AccountListHeader @add-row="accountStore.addRow" />
    <AccountListInfo />
    <AccountListTable
      :rows="accountStore.rows"
      :type-options="typeOptions"
      @update:rows="accountStore.updateRows"
      @remove-row="accountStore.removeRow"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AccountListHeader from './AccountListHeader.vue'
import AccountListInfo from './AccountListInfo.vue'
import AccountListTable from './AccountListTable.vue'
import { useAccountStore } from '@/stores/account'
import type { TypeOption } from '@/types/account'

const typeOptions: TypeOption[] = [
  { label: 'Локальная', value: 'local' },
  { label: 'LDAP', value: 'ldap' },
]

const accountStore = useAccountStore()

onMounted(() => {
  accountStore.loadSavedData()
})
</script>

<style scoped>
.account-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
