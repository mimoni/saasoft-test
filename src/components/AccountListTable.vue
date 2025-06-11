<template>
  <DataTable :value="rows" class="p-datatable-sm account-table">
    <Column field="labels" header="Метки" style="width: 20%">
      <template #body="{ data }">
        <InputText
          v-model="data.labels"
          placeholder="Значение"
          :maxlength="50"
          @input="validateLabels(data)"
          @blur="validateRow(data)"
        />
      </template>
    </Column>
    <Column field="type" header="Тип записи" style="width: 15%">
      <template #body="{ data }">
        <Dropdown
          v-model="data.type"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          class="type-dropdown"
          @change="handleTypeChange(data)"
        />
      </template>
    </Column>
    <Column field="login" header="Логин" style="width: 20%">
      <template #body="{ data }">
        <InputText
          v-model="data.login"
          placeholder="Значение"
          :maxlength="100"
          @input="validateLogin(data)"
          @blur="validateRow(data)"
          :class="{ 'p-invalid': data.errors?.login }"
        />
      </template>
    </Column>
    <Column field="password" header="Пароль" style="width: 20%">
      <template #body="{ data }">
        <Password
          v-if="data.type === 'local'"
          v-model="data.password"
          toggleMask
          :feedback="false"
          placeholder="Значение"
          :maxlength="100"
          @input="validatePassword(data)"
          @blur="validateRow(data)"
          :class="{ 'p-invalid': data.errors?.password }"
        />
      </template>
    </Column>
    <Column header="" style="width: 50px">
      <template #body="{ index }">
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-text delete-button"
          @click="$emit('remove-row', index)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Password from 'primevue/password'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { AccountRow, TypeOption } from '@/types/account'

const props = defineProps<{
  rows: AccountRow[]
  typeOptions: TypeOption[]
}>()

const emit = defineEmits<{
  (e: 'update:rows', rows: AccountRow[]): void
  (e: 'remove-row', index: number): void
}>()

const rows = computed({
  get: () => props.rows,
  set: (value) => emit('update:rows', value),
})

function validateRow(data: AccountRow) {
  const errors: Record<string, string> = {}

  if (!data.login || !data.login.trim()) {
    errors.login = 'Логин обязателен для заполнения'
  } else if (data.login.length > 100) {
    errors.login = 'Логин не должен превышать 100 символов'
  }

  if (data.type === 'local') {
    if (!data.password || !data.password.trim()) {
      errors.password = 'Пароль обязателен для заполнения'
    } else if (data.password.length > 100) {
      errors.password = 'Пароль не должен превышать 100 символов'
    }
  }

  data.errors = errors
  emit('update:rows', rows.value)
  return Object.keys(errors).length === 0
}

function validateLabels(data: AccountRow) {
  if (data.labels.length > 50) {
    data.labels = data.labels.slice(0, 50)
  }
}

function validateLogin(data: AccountRow) {
  if (data.login.length > 100) {
    data.login = data.login.slice(0, 100)
  }
  validateRow(data)
}

function validatePassword(data: AccountRow) {
  if (data.password && data.password.length > 100) {
    data.password = data.password.slice(0, 100)
  }
  validateRow(data)
}

function handleTypeChange(data: AccountRow) {
  if (data.type === 'ldap') {
    data.password = null
  } else {
    data.password = ''
  }
  validateRow(data)
  emit('update:rows', rows.value)
}
</script>

<style scoped>
.account-table {
  margin-top: 0.5rem;
}

.type-dropdown {
  width: 100%;
}

:deep(.p-inputtext) {
  width: 100%;
}

:deep(.p-password) {
  width: 100%;
}

:deep(.p-password-input) {
  width: 100%;
}

:deep(.p-invalid),
:deep(.p-invalid input),
:deep(.p-invalid .p-inputtext::placeholder){
  border-color: var(--red-500) !important;
  color: var(--red-500) !important;
}

:deep(.delete-button) {
  color: var(--red-500) !important;
}

:deep(.delete-button:hover) {
  background: var(--red-100) !important;
}
</style>
