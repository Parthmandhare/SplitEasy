'use client'

import React, { useState } from 'react'
import { Event, Expense } from '../types'
import { Plus, X, Calendar, Tag, DollarSign, User } from 'lucide-react'

interface ExpenseManagerProps {
  event: Event
  onUpdateEvent: (event: Event) => void
}

const categories = [
  'Food & Dining', 'Transportation', 'Accommodation', 'Entertainment',
  'Shopping', 'Groceries', 'Utilities', 'Other'
]

export const ExpenseManager: React.FC<ExpenseManagerProps> = ({
  event,
  onUpdateEvent
}) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splitBetween: [] as string[],
    category: 'Food & Dining',
    notes: ''
  })

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExpense.description.trim() || !newExpense.amount || !newExpense.paidBy) return

    const expense: Expense = {
      id: Date.now().toString(),
      description: newExpense.description.trim(),
      amount: parseFloat(newExpense.amount),
      paidBy: newExpense.paidBy,
      splitBetween: newExpense.splitBetween.length > 0 ? newExpense.splitBetween : [newExpense.paidBy],
      category: newExpense.category,
      date: new Date().toISOString(),
      notes: newExpense.notes.trim() || undefined
    }

    const updatedEvent = {
      ...event,
      expenses: [...event.expenses, expense]
    }

    onUpdateEvent(updatedEvent)
    setNewExpense({
      description: '',
      amount: '',
      paidBy: '',
      splitBetween: [],
      category: 'Food & Dining',
      notes: ''
    })
    setShowAddForm(false)
  }

  const removeExpense = (expenseId: string) => {
    const updatedEvent = {
      ...event,
      expenses: event.expenses.filter(e => e.id !== expenseId)
    }
    onUpdateEvent(updatedEvent)
  }

  const getParticipantName = (participantId: string) => {
    return event.participants.find(p => p.id === participantId)?.name || 'Unknown'
  }

  const getParticipantColor = (participantId: string) => {
    return event.participants.find(p => p.id === participantId)?.color || '#6B7280'
  }

  const toggleSplitParticipant = (participantId: string) => {
    setNewExpense(prev => ({
      ...prev,
      splitBetween: prev.splitBetween.includes(participantId)
        ? prev.splitBetween.filter(id => id !== participantId)
        : [...prev.splitBetween, participantId]
    }))
  }

  if (event.participants.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-6 floating-animation">
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Add participants first</h3>
        <p className="text-gray-600">You need to add participants before creating expenses</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">
          Expenses ({event.expenses.length})
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border-2 border-dashed border-emerald-300 animate-slide-up">
          <form onSubmit={addExpense} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/70"
                  placeholder="What was this expense for?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/70"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Paid by *
                </label>
                <select
                  value={newExpense.paidBy}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, paidBy: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/70"
                  required
                >
                  <option value="">Select participant</option>
                  {event.participants.map(participant => (
                    <option key={participant.id} value={participant.id}>
                      {participant.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/70"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Split between (leave empty to split with payer only)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {event.participants.map(participant => (
                  <button
                    key={participant.id}
                    type="button"
                    onClick={() => toggleSplitParticipant(participant.id)}
                    className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 ${
                      newExpense.splitBetween.includes(participant.id)
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 scale-105'
                        : 'border-gray-300 bg-white/70 text-gray-700 hover:border-gray-400 hover:scale-105'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: participant.color }}
                      />
                      <span>{participant.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={newExpense.notes}
                onChange={(e) => setNewExpense(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all duration-200 bg-white/70"
                placeholder="Additional notes"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-white/50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newExpense.description.trim() || !newExpense.amount || !newExpense.paidBy}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:shadow-xl disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expenses List */}
      {event.expenses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-6 floating-animation">
            <DollarSign className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No expenses yet</h3>
          <p className="text-gray-600">Add your first expense to start tracking</p>
        </div>
      ) : (
        <div className="space-y-6">
          {event.expenses.map((expense, index) => (
            <div 
              key={expense.id} 
              className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 text-lg">{expense.description}</h4>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold gradient-text">
                        ${expense.amount.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeExpense(expense.id)}
                        className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Paid by: </span>
                      <span
                        className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: getParticipantColor(expense.paidBy) }}
                      >
                        {getParticipantName(expense.paidBy)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4" />
                      <span>{expense.category}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-gray-600 font-medium">Split between: </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {expense.splitBetween.map(participantId => (
                        <span
                          key={participantId}
                          className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                          style={{ backgroundColor: getParticipantColor(participantId) }}
                        >
                          {getParticipantName(participantId)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {expense.notes && (
                    <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">{expense.notes}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}