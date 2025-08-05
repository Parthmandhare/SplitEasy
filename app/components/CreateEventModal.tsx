'use client'

import React, { useState } from 'react'
import { X, MapPin, Coffee, TreePine, PartyPopper, Calendar } from 'lucide-react'
import { Event } from '../types'

interface CreateEventModalProps {
  onClose: () => void
  onCreateEvent: (event: Omit<Event, 'id' | 'createdAt' | 'participants' | 'expenses'>) => void
}

const eventTypes = [
  { type: 'trip' as const, label: 'Trip', icon: MapPin, color: 'from-blue-500 to-indigo-500' },
  { type: 'dinner' as const, label: 'Dinner', icon: Coffee, color: 'from-orange-500 to-red-500' },
  { type: 'picnic' as const, label: 'Picnic', icon: TreePine, color: 'from-green-500 to-emerald-500' },
  { type: 'party' as const, label: 'Party', icon: PartyPopper, color: 'from-purple-500 to-pink-500' },
  { type: 'other' as const, label: 'Other', icon: Calendar, color: 'from-gray-500 to-slate-500' }
]

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose, onCreateEvent }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedType, setSelectedType] = useState<Event['type']>('trip')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onCreateEvent({
      title: title.trim(),
      description: description.trim(),
      type: selectedType
    })

    setTitle('')
    setDescription('')
    setSelectedType('trip')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass-card rounded-3xl shadow-2xl w-full max-w-md transform transition-all animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold gradient-text">Create New Event</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/50"
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none bg-white/50"
              placeholder="Optional description"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Event Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {eventTypes.map(({ type, label, icon: Icon, color }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`p-4 border-2 rounded-xl transition-all duration-300 text-center group ${
                    selectedType === type
                      ? 'border-emerald-500 bg-emerald-50 scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white/50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}