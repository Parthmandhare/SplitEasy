'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, Users, Share2, User } from 'lucide-react'

export const Header: React.FC = () => {
  const pathname = usePathname()

  return (
    <header className="glass-card border-b border-white/20 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                SplitEasy
              </h1>
              <p className="text-sm text-gray-500">Expense Management</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                pathname === '/' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
            </Link>
            
            <Link 
              href="/team"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                pathname === '/team' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="font-medium">Team</span>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-emerald-500" />
                <span>Collaborate</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 className="w-4 h-4 text-blue-500" />
                <span>Share</span>
              </div>
            </div>
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Link 
                href="/team"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}