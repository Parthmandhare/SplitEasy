'use client'

import React from 'react'
import { Header } from '../components/Header'
import { Github, Linkedin, Mail, Heart, Code, Coffee, Zap } from 'lucide-react'
import Image from 'next/image'

export default function TeamPage() {
  const skills = [
    'React & Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS',
    'UI/UX Design', 'Full-Stack Development', 'API Development'
  ]

  const achievements = [
    { icon: Code, label: 'Projects Built', value: '50+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: Zap, label: 'Lines of Code', value: '100K+' },
    { icon: Heart, label: 'Happy Clients', value: '25+' }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl floating-animation"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              Meet the Creator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate full-stack developer crafting beautiful and functional web applications
            </p>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Profile Image */}
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                  PM
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Parth Mandhare</h2>
              <p className="text-xl text-gray-600 mb-6">Full-Stack Developer</p>
              
              <p className="text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                I'm a passionate developer who loves creating intuitive and beautiful web applications. 
                With expertise in modern technologies like React, Next.js, and Node.js, I build solutions 
                that not only look great but also provide exceptional user experiences. This expense 
                splitting app is one of my projects that combines functionality with elegant design.
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-6 mb-8">
                {[
                  { icon: Github, href: 'https://github.com/Parthmandhare', label: 'GitHub', color: 'hover:text-gray-900' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/parth-mandhare-1977001a1/', label: 'LinkedIn', color: 'hover:text-blue-600' },
                  { icon: Mail, href: 'mailto:parthmandhare12@gmail.com', label: 'Email', color: 'hover:text-emerald-600' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-3 bg-white/50 rounded-xl text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-gray-800 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                <div className="text-gray-600 text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">About This Project</h3>
            <p className="text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              SplitEasy is a modern expense splitting application built with Next.js, TypeScript, and Tailwind CSS. 
              It features real-time collaboration, smart settlement calculations, and a beautiful responsive design. 
              The app uses localStorage for data persistence and includes sharing capabilities for seamless group expense management.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Built with', value: 'Next.js & TypeScript' },
                { label: 'Styled with', value: 'Tailwind CSS' },
                { label: 'Data Storage', value: 'MongoDB & LocalStorage' }
              ].map((tech, index) => (
                <div key={index} className="bg-white/50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">{tech.label}</div>
                  <div className="font-semibold text-gray-900">{tech.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}