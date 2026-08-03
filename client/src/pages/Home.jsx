import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import img1 from '../assets/img1.png'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-[#000000] text-white flex flex-col'>
      <Navbar />

      {/* Hero Section */}
      <main className='flex-1 max-w-7xl w-full mx-auto px-6 pt-20 pb-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          
          {/* Left Side: Content */}
          <div className='flex flex-col items-start text-left'>
            {/* Minimal Pill Badge */}
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-6'>
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
              AI Exam Notes Engine
            </div>

            {/* Clean Hero Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Generate exam-focused study notes in seconds.
            </h1>

            {/* Description */}
            <p className='mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl'>
              Transform topics into exam cheat sheets, visual flowcharts, 
              analytical graphs, and clean printable PDFs — powered by AI.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className='mt-10 flex flex-wrap items-center gap-4'>
              <button
                onClick={() => navigate("/notes")}
                className='px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer'
              >
                Start Generating Notes →
              </button>

              <button
                onClick={() => navigate("/pricing")}
                className='px-6 py-3 rounded-lg bg-zinc-900 text-zinc-300 font-medium text-sm border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer'
              >
                View Pricing
              </button>
            </div>
          </div>

          {/* Right Side: Image */}
          <motion.div 
            whileTap={{ scale: 0.95, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className='w-full rounded-xl bg-[#0c0c0c] border border-zinc-800 overflow-hidden shadow-2xl cursor-pointer hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-shadow duration-500'
          >
            <img 
              src={img1} 
              alt="Study Notes AI Dashboard" 
              className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className='mt-32 grid grid-cols-1 md:grid-cols-4 gap-6 text-left w-full'>
          <Feature icon="📘" title="Exam Notes" des="Structured high-yield study guides tailored to your syllabus." />
          <Feature icon="⚡" title="5-Min Revision" des="Bullet-point cheat sheets highlighting key formulas & definitions." />
          <Feature icon="📊" title="Flow Diagrams" des="Auto-generated Mermaid diagrams for process visualization." />
          <Feature icon="📄" title="PDF Export" des="Download clean, printable PDF documents with one click." />
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Feature({ icon, title, des }) {
  return (
    <div className='rounded-xl p-5 bg-[#0c0c0c] border border-zinc-800 hover:border-zinc-700 transition-colors'>
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-xs font-semibold text-white mb-1.5">{title}</h3>
      <p className="text-zinc-400 text-xs leading-relaxed">{des}</p>
    </div>
  )
}

export default Home
