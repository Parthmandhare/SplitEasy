'use client'

import React, { useState } from 'react'
import { Event } from '../types'
import { ParticipantManager } from './ParticipantManager'
import { ExpenseManager } from './ExpenseManager'
import { SettlementView } from './SettlementView'
import { ArrowLeft, Users, DollarSign, Calculator, Share2 } from 'lucide-react'

interface EventDetailsProps {
  event: Event
  onUpdateEvent: (event: Event) => void
  onBackToList: () => void
  onShareEvent: (event: Event) => void
}

type TabType = 'participants' | 'expenses' | 'settlements'

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  onUpdateEvent,
  onBackToList,
  onShareEvent
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('participants')

  const totalAmount = event.expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const tabs = [
    { id: 'participants' as TabType, label: 'Participants', icon: Users, count: event.participants.length },
    { id: 'expenses' as TabType, label: 'Expenses', icon: DollarSign, count: event.expenses.length },
    { id: 'settlements' as TabType, label: 'Settlements', icon: Calculator, count: null }
  ]

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="glass-card rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToList}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Events</span>
          </button>
          
          <button
            onClick={() => onShareEvent(event)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
            {event.description && (
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{event.description}</p>
            )}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="capitalize bg-gray-100 px-3 py-1 rounded-full">Type: {event.type}</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">Created: {new Date(event.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Total Amount</h3>
            <p className="text-4xl font-bold mb-2">${totalAmount.toFixed(2)}</p>
            <p className="text-emerald-100 text-sm">
              {event.participants.length > 0 
                ? `$${(totalAmount / event.participants.length).toFixed(2)} per person`
                : 'Add participants to calculate'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card rounded-2xl shadow-xl mb-8">
        <div className="border-b border-white/20">
          <nav className="flex space-x-8 px-8">
            {tabs.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 py-6 border-b-2 font-semibold text-sm transition-all duration-300 ${
                  activeTab === id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
                {count !== null && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activeTab === id
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'participants' && (
            <ParticipantManager event={event} onUpdateEvent={onUpdateEvent} />
          )}
          {activeTab === 'expenses' && (
            <ExpenseManager event={event} onUpdateEvent={onUpdateEvent} />
          )}
          {activeTab === 'settlements' && (
            <SettlementView event={event} />
          )}
        </div>
      </div>
    </div>
  )
}