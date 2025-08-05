export interface Participant {
  id: string
  name: string
  email?: string
  avatar?: string
  color: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string // participant id
  splitBetween: string[] // participant ids
  category: string
  date: string
  notes?: string
}

export interface Event {
  id: string
  title: string
  description?: string
  type: 'trip' | 'dinner' | 'picnic' | 'party' | 'other'
  createdAt: string
  participants: Participant[]
  expenses: Expense[]
}

export interface Settlement {
  from: string // participant id
  to: string // participant id
  amount: number
}