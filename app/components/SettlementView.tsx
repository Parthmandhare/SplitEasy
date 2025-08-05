'use client'

import React from 'react'
import { Event, Settlement } from '../types'
import { ArrowRight, DollarSign, CheckCircle } from 'lucide-react'

interface SettlementViewProps {
  event: Event
}

export const SettlementView: React.FC<SettlementViewProps> = ({ event }) => {
  const calculateSettlements = (): Settlement[] => {
    if (event.participants.length === 0 || event.expenses.length === 0) {
      return []
    }

    // Calculate balances for each participant
    const balances: { [participantId: string]: number } = {}
    
    // Initialize balances
    event.participants.forEach(participant => {
      balances[participant.id] = 0
    })

    // Calculate what each person paid and owes
    event.expenses.forEach(expense => {
      const splitAmount = expense.amount / expense.splitBetween.length
      
      // Person who paid gets credited
      balances[expense.paidBy] += expense.amount
      
      // Everyone in the split gets debited
      expense.splitBetween.forEach(participantId => {
        balances[participantId] -= splitAmount
      })
    })

    // Convert balances to settlements
    const settlements: Settlement[] = []
    const creditors: { id: string; amount: number }[] = []
    const debtors: { id: string; amount: number }[] = []

    Object.entries(balances).forEach(([participantId, balance]) => {
      if (balance > 0.01) {
        creditors.push({ id: participantId, amount: balance })
      } else if (balance < -0.01) {
        debtors.push({ id: participantId, amount: -balance })
      }
    })

    // Create settlements to minimize transactions
    creditors.forEach(creditor => {
      let remainingCredit = creditor.amount
      
      debtors.forEach(debtor => {
        if (remainingCredit > 0.01 && debtor.amount > 0.01) {
          const settlementAmount = Math.min(remainingCredit, debtor.amount)
          
          settlements.push({
            from: debtor.id,
            to: creditor.id,
            amount: settlementAmount
          })
          
          remainingCredit -= settlementAmount
          debtor.amount -= settlementAmount
        }
      })
    })

    return settlements.filter(s => s.amount > 0.01)
  }

  const getParticipantName = (participantId: string) => {
    return event.participants.find(p => p.id === participantId)?.name || 'Unknown'
  }

  const getParticipantColor = (participantId: string) => {
    return event.participants.find(p => p.id === participantId)?.color || '#6B7280'
  }

  const settlements = calculateSettlements()
  const totalAmount = event.expenses.reduce((sum, expense) => sum + expense.amount, 0)

  if (event.participants.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-6 floating-animation">
          <CheckCircle className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Add participants first</h3>
        <p className="text-gray-600">You need participants to calculate settlements</p>
      </div>
    )
  }

  if (event.expenses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-6 floating-animation">
          <DollarSign className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No expenses to settle</h3>
        <p className="text-gray-600">Add some expenses to see settlement calculations</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-6">Settlement Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-emerald-100 mb-2">Total Amount</p>
            <p className="text-3xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-100 mb-2">Total Settlements</p>
            <p className="text-3xl font-bold">{settlements.length}</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-100 mb-2">Per Person Average</p>
            <p className="text-3xl font-bold">
              ${event.participants.length > 0 ? (totalAmount / event.participants.length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>

      {settlements.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 floating-animation">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">All settled up!</h3>
          <p className="text-gray-600 text-lg">Everyone has paid their fair share</p>
        </div>
      ) : (
        <div className="space-y-6">
          <h4 className="text-2xl font-bold text-gray-900">
            Required Settlements ({settlements.length})
          </h4>
          
          {settlements.map((settlement, index) => (
            <div 
              key={index} 
              className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg"
                      style={{ backgroundColor: getParticipantColor(settlement.from) }}
                    >
                      {getParticipantName(settlement.from).charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900 text-lg">
                      {getParticipantName(settlement.from)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-500">
                    <ArrowRight className="w-6 h-6" />
                    <span className="font-medium">pays</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg"
                      style={{ backgroundColor: getParticipantColor(settlement.to) }}
                    >
                      {getParticipantName(settlement.to).charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900 text-lg">
                      {getParticipantName(settlement.to)}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-3xl font-bold gradient-text">
                    ${settlement.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Individual Balances */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Individual Balances</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.participants.map((participant, index) => {
            let balance = 0
            
            event.expenses.forEach(expense => {
              if (expense.paidBy === participant.id) {
                balance += expense.amount
              }
              if (expense.splitBetween.includes(participant.id)) {
                balance -= expense.amount / expense.splitBetween.length
              }
            })

            return (
              <div 
                key={participant.id} 
                className="bg-white/70 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 shadow-lg"
                  style={{ backgroundColor: participant.color }}
                >
                  {participant.name.charAt(0)}
                </div>
                <p className="font-semibold text-gray-900 mb-2">{participant.name}</p>
                <p className={`text-2xl font-bold mb-1 ${
                  balance > 0.01 ? 'text-green-600' : balance < -0.01 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {balance > 0.01 ? '+' : ''}${balance.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {balance > 0.01 ? 'Owed' : balance < -0.01 ? 'Owes' : 'Settled'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}