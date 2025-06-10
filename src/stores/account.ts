import { defineStore } from 'pinia'
import type { AccountRow } from '@/types/account'

const STORAGE_KEY = 'account_list_data'

export const useAccountStore = defineStore('account', {
  state: () => ({
    lastId: 0,
    rows: [] as AccountRow[],
  }),

  actions: {
    getNextId(): number {
      return ++this.lastId
    },

    initializeId(rows: AccountRow[]) {
      if (rows.length > 0) {
        this.lastId = Math.max(...rows.map((row) => row.id))
      }
    },

    loadSavedData() {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        this.rows = parsedData.map((item: any) => ({
          ...item,
          labels: item.labels.map((label: { text: string }) => label.text).join(';'),
          errors: {},
        }))
        this.initializeId(this.rows)
      }
    },

    addRow() {
      this.rows.push({
        id: this.getNextId(),
        labels: '',
        type: 'local',
        login: '',
        password: '',
        errors: {},
      })
      this.saveToLocalStorage()
    },

    removeRow(idx: number) {
      this.rows.splice(idx, 1)
      this.saveToLocalStorage()
    },

    updateRows(rows: AccountRow[]) {
      this.rows = rows
      this.saveToLocalStorage()
      console.log(rows)
    },

    saveToLocalStorage() {
      const dataToSave = this.rows.map((row) => ({
        ...row,
        labels: row.labels
          .split(';')
          .filter((label) => label.trim())
          .map((label) => ({ text: label.trim() })),
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    },
  },
})
