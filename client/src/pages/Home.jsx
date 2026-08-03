import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-[#000000] text-white flex flex-col'>
      <Navbar />

      {/* Hero Section */}
      <main className='flex-1 max-w-6xl w-full mx-auto px-6 pt-20 pb-24 flex flex-col items-center justify-center text-center'>
        
        {/* Minimal Pill Badge */}
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-8'>
          <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
          AI Exam Notes Engine
        </div>

        {/* Clean Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.15]">
          Generate exam-focused study notes in seconds.
        </h1>

        {/* Description */}
        <p className='mt-6 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed'>
          Transform topics into exam cheat sheets, visual flowcharts, 
          analytical graphs, and clean printable PDFs — powered by AI.
        </p>

        {/* Primary & Secondary Action Buttons */}
        <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
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

        {/* Minimal Demo Mockup Card */}
        <div className='mt-16 w-full max-w-4xl rounded-xl bg-[#0c0c0c] border border-zinc-800 text-left overflow-hidden shadow-2xl'>
          <div className='px-4 py-3 bg-[#121212] border-b border-zinc-800 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full bg-zinc-700'></div>
              <div className='w-2.5 h-2.5 rounded-full bg-zinc-700'></div>
              <div className='w-2.5 h-2.5 rounded-full bg-zinc-700'></div>
            </div>
            <span className='text-[11px] font-mono text-zinc-500'>examnotes.ai/notes</span>
            <div className='w-10'></div>
          </div>

          <div className='p-6 sm:p-8 space-y-6'>
            <div className='flex items-center justify-between border-b border-zinc-800/80 pb-4'>
              <div>
                <h3 className='text-base font-semibold text-white'>Photosynthesis & Plant Biology</h3>
                <p className='text-xs text-zinc-400 mt-0.5'>Class 12 • Biology • Board Exam Preparation</p>
              </div>
              <span className='px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20'>
                ⚡ 5 Min Revision Mode
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-xs'>
              <div className='p-4 rounded-lg bg-[#141414] border border-zinc-800'>
                <span className='text-zinc-500 block mb-1 font-mono'>⭐ HIGH PRIORITY</span>
                <span className='text-white font-medium'>Light Dependent Reactions & ATP Synthesis</span>
              </div>
              <div className='p-4 rounded-lg bg-[#141414] border border-zinc-800'>
                <span className='text-zinc-500 block mb-1 font-mono'>⭐⭐ EXAM FREQUENCY</span>
                <span className='text-white font-medium'>Calvin Cycle (C3 & C4 Pathways)</span>
              </div>
              <div className='p-4 rounded-lg bg-[#141414] border border-zinc-800'>
                <span className='text-zinc-500 block mb-1 font-mono'>📊 VISUAL DIAGRAM</span>
                <span className='text-white font-medium'>Chloroplast Thylakoid Membrane Flowchart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className='mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 text-left w-full'>
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
