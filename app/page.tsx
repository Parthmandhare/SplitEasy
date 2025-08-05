'use client'

import React, { useState, useEffect } from 'react'
import { EventList } from './components/EventList'
import { EventDetails } from './components/EventDetails'
import { CreateEventModal } from './components/CreateEventModal'
import { ShareModal } from './components/ShareModal'
import { Header } from './components/Header'
import { Event } from './types'
import { Plus, Sparkles, Users, Calculator, Share2 } from 'lucide-react'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedEvents = localStorage.getItem('splitwise-events')
        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents)
          setEvents(parsedEvents)
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Save to localStorage whenever events change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('splitwise-events', JSON.stringify(events))
      } catch (error) {
        console.error('Error saving data to localStorage:', error)
      }
    }
  }, [events, isLoading])

  const createEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'participants' | 'expenses'>) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      participants: [],
      expenses: [],
      ...eventData
    }
    setEvents(prev => [...prev, newEvent])
    setSelectedEvent(newEvent)
    setShowCreateModal(false)
  }

  const updateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
    setSelectedEvent(updatedEvent)
  }

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(null)
    }
  }

  const shareEvent = (event: Event) => {
    const url = `${window.location.origin}?event=${event.id}`
    setShareUrl(url)
    setShowShareModal(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your expenses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!selectedEvent ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-96 h-96 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-3xl floating-animation"></div>
              </div>
              
              <div className="relative z-10 animate-fade-in">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-2xl pulse-glow">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                  Split Expenses Made Simple
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Create events, add participants, track expenses, and settle up with ease. 
                  Perfect for trips, dinners, and group activities with real-time collaboration.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                    Create New Event
                  </button>
                  
                  <div className="flex items-center space-x-6 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-emerald-500" />
                      <span className="font-medium">Collaborate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Calculate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Users,
                  title: "Easy Collaboration",
                  description: "Invite friends via shareable links and track expenses together in real-time",
                  color: "from-emerald-500 to-green-500"
                },
                {
                  icon: Calculator,
                  title: "Smart Calculations",
                  description: "Automatically calculate who owes what with minimal settlement transactions",
                  color: "from-blue-500 to-indigo-500"
                },
                {
                  icon: Share2,
                  title: "Instant Sharing",
                  description: "Share expense groups via email, SMS, or direct links for seamless collaboration",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((feature, index) => (
                <div key={index} className="glass-card rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <EventList 
              events={events}
              onSelectEvent={setSelectedEvent}
              onDeleteEvent={deleteEvent}
              onShareEvent={shareEvent}
            />
          </div>
        ) : (
          <EventDetails
            event={selectedEvent}
            onUpdateEvent={updateEvent}
            onBackToList={() => setSelectedEvent(null)}
            onShareEvent={shareEvent}
          />
        )}
      </main>

      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onCreateEvent={createEvent}
        />
      )}

      {showShareModal && (
        <ShareModal
          url={shareUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}