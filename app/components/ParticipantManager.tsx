'use client'

import React, { useState } from 'react'
import { Event, Participant } from '../types'
import { UserPlus, X, Mail } from 'lucide-react'

interface ParticipantManagerProps {
  event: Event
  onUpdateEvent: (event: Event) => void
}

const avatarColors = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
  '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
  '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
  '#EC4899', '#F43F5E'
]

export const ParticipantManager: React.FC<ParticipantManagerProps> = ({
  event,
  onUpdateEvent
}) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    color: avatarColors[0]
  })

  const addParticipant = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newParticipant.name.trim()) return

    const participant: Participant = {
      id: Date.now().toString(),
      name: newParticipant.name.trim(),
      email: newParticipant.email.trim() || undefined,
      color: newParticipant.color
    }

    const updatedEvent = {
      ...event,
      participants: [...event.participants, participant]
    }

    onUpdateEvent(updatedEvent)
    setNewParticipant({ name: '', email: '', color: avatarColors[0] })
    setShowAddForm(false)
  }

  const removeParticipant = (participantId: string) => {
    const updatedEvent = {
      ...event,
      participants: event.participants.filter(p => p.id !== participantId),
      expenses: event.expenses.filter(e => 
        e.paidBy !== participantId && !e.splitBetween.includes(participantId)
      )
    }
    onUpdateEvent(updatedEvent)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">
          Participants ({event.participants.length})
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Participant</span>
        </button>
      </div>

      {/* Add Participant Form */}
      {showAddForm && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border-2 border-dashed border-emerald-300 animate-slide-up">
          <form onSubmit={addParticipant} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={newParticipant.name}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/70"
                  placeholder="Enter participant name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={newParticipant.email}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/70"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Avatar Color
              </label>
              <div className="flex space-x-2 flex-wrap gap-2">
                {avatarColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewParticipant(prev => ({ ...prev, color }))}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      newParticipant.color === color ? 'border-gray-900 scale-110 shadow-lg' : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
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
                disabled={!newParticipant.name.trim()}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:shadow-xl disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                Add Participant
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Participants List */}
      {event.participants.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-6 floating-animation">
            <UserPlus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No participants yet</h3>
          <p className="text-gray-600">Add participants to start splitting expenses</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.participants.map((participant, index) => (
            <div 
              key={participant.id} 
              className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: participant.color }}
                  >
                    {getInitials(participant.name)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{participant.name}</h4>
                    {participant.email && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Mail className="w-3 h-3" />
                        <span>{participant.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => removeParticipant(participant.id)}
                  className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}