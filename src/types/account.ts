export interface AccountLabel {
  text: string
}

export interface AccountError {
  login?: string
  password?: string
}

export interface AccountRow {
  id: number
  labels: string
  type: 'local' | 'ldap'
  login: string
  password: string | null
  errors: AccountError
}

export interface TypeOption {
  label: string
  value: 'local' | 'ldap'
}
