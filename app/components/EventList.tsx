'use client'

import React from 'react'
import { Event } from '../types'
import { Calendar, Users, DollarSign, Share2, Trash2, MapPin, Coffee, TreePine, PartyPopper } from 'lucide-react'

interface EventListProps {
  events: Event[]
  onSelectEvent: (event: Event) => void
  onDeleteEvent: (eventId: string) => void
  onShareEvent: (event: Event) => void
}

const getEventIcon = (type: Event['type']) => {
  switch (type) {
    case 'trip': return <MapPin className="w-5 h-5" />
    case 'dinner': return <Coffee className="w-5 h-5" />
    case 'picnic': return <TreePine className="w-5 h-5" />
    case 'party': return <PartyPopper className="w-5 h-5" />
    default: return <Calendar className="w-5 h-5" />
  }
}

const getEventColor = (type: Event['type']) => {
  switch (type) {
    case 'trip': return 'from-blue-500 to-indigo-500'
    case 'dinner': return 'from-orange-500 to-red-500'
    case 'picnic': return 'from-green-500 to-emerald-500'
    case 'party': return 'from-purple-500 to-pink-500'
    default: return 'from-gray-500 to-slate-500'
  }
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onSelectEvent,
  onDeleteEvent,
  onShareEvent
}) => {
  const calculateTotalAmount = (event: Event) => {
    return event.expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-32 h-32 glass-card rounded-full flex items-center justify-center mx-auto mb-8 floating-animation">
          <Calendar className="w-16 h-16 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No events yet</h3>
        <p className="text-gray-600 text-lg">Create your first event to start splitting expenses with friends</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Events</h2>
        <p className="text-gray-600">Manage and track all your shared expenses</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="glass-card rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`h-3 bg-gradient-to-r ${getEventColor(event.type)}`} />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${getEventColor(event.type)} text-white shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{event.type}</p>
                  </div>
                </div>
                
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onShareEvent(event)
                    }}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteEvent(event.id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {event.description && (
                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">{event.description}</p>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{event.participants.length} participants</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{event.expenses.length} expenses</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">Total Amount</span>
                  <span className="text-xl font-bold gradient-text">
                    ${calculateTotalAmount(event).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectEvent(event)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}