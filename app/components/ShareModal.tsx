'use client'

import React, { useState } from 'react'
import { X, Copy, Check, Share2, Mail, MessageCircle, QrCode } from 'lucide-react'

interface ShareModalProps {
  url: string
  onClose: () => void
}

export const ShareModal: React.FC<ShareModalProps> = ({ url, onClose }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Join my expense group')
    const body = encodeURIComponent(`Hi! I've created an expense group and would like you to join. Please click the link below to access it:\n\n${url}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const shareViaSMS = () => {
    const message = encodeURIComponent(`Join my expense group: ${url}`)
    window.open(`sms:?body=${message}`)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass-card rounded-3xl shadow-2xl w-full max-w-md transform transition-all animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold gradient-text">Share Event</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Share Link
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  copied
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Anyone with this link can view and contribute to this expense group
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Quick Share
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={shareViaEmail}
                className="flex items-center justify-center space-x-3 px-6 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Email</span>
              </button>
              
              <button
                onClick={shareViaSMS}
                className="flex items-center justify-center space-x-3 px-6 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">SMS</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <QrCode className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Pro Tip</h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Share this link with your group members so they can add their own expenses and see real-time updates! 
                  All data is automatically synced across devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}