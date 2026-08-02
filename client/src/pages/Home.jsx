import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import img from "../assets/img1.png"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-[#09090b] text-white overflow-hidden'
      style={{
        backgroundImage: `radial-gradient(ellipse at 15% 30%, rgba(99,102,241,0.12) 0%, transparent 60%),
                          radial-gradient(ellipse at 85% 20%, rgba(139,92,246,0.1) 0%, transparent 50%),
                          radial-gradient(ellipse at 50% 85%, rgba(99,102,241,0.08) 0%, transparent 50%)`
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className='max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6'
            >
              <span className='w-2 h-2 rounded-full bg-indigo-400 animate-pulse'></span>
              AI-Powered Study Platform
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              <span className='text-white'>Create Smart</span>
              <br />
              <span className='bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent'>
                AI Notes
              </span>
              <br />
              <span className='text-white text-3xl sm:text-4xl lg:text-5xl'>in Seconds</span>
            </h1>

            <p className='mt-6 max-w-xl text-sm sm:text-base text-gray-400 leading-relaxed'>
              Generate exam-focused notes, project documentation,
              flow diagrams and revision-ready content using AI —
              faster, cleaner and smarter.
            </p>

            <div className='mt-10 flex flex-wrap items-center gap-4'>
              <motion.button
                onClick={() => navigate("/notes")}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className='px-8 py-3.5 rounded-xl
                  flex items-center gap-2.5
                  bg-gradient-to-r from-indigo-600 to-violet-600
                  text-white font-semibold text-sm sm:text-base
                  shadow-[0_0_30px_rgba(99,102,241,0.4)]
                  hover:shadow-[0_0_45px_rgba(99,102,241,0.6)]
                  transition-all duration-300 cursor-pointer'
              >
                Get Started Free →
              </motion.button>

              <motion.button
                onClick={() => navigate("/pricing")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className='px-6 py-3.5 rounded-xl
                  bg-white/[0.05] border border-white/[0.1]
                  hover:bg-white/[0.1] text-gray-300 text-sm font-semibold
                  transition cursor-pointer'
              >
                View Plans
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Hero Preview - Mac Style Window Frame */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -6 }}
          className="relative"
        >
          <div className='rounded-2xl bg-[#121218] border border-white/[0.12] shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden'>
            {/* Window Bar */}
            <div className='px-4 py-3 bg-[#181822] border-b border-white/[0.08] flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='w-3 h-3 rounded-full bg-red-500/80'></div>
                <div className='w-3 h-3 rounded-full bg-amber-500/80'></div>
                <div className='w-3 h-3 rounded-full bg-emerald-500/80'></div>
              </div>
              <span className='text-[11px] font-mono text-gray-400'>examnotes.ai/demo</span>
              <div className='w-12'></div>
            </div>

            {/* Content area */}
            <div className='p-6 bg-[#0f0f15] flex flex-col items-center justify-center text-center relative min-h-[280px]'>
              <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 pointer-events-none'></div>
              <div className='w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl mb-4 shadow-[0_0_20px_rgba(99,102,241,0.3)]'>
                ✨
              </div>
              <h3 className='text-lg font-bold text-white mb-2'>AI Notes Generator</h3>
              <p className='text-xs text-gray-400 max-w-sm mb-5 leading-relaxed'>
                High-yield exam notes, instant Mermaid diagrams, Rechart analytics graphs, and 1-click PDF exports.
              </p>
              <div className='flex flex-wrap gap-2 justify-center text-[10px] text-indigo-300 font-medium'>
                <span className='px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25'>⚡ Revision Mode</span>
                <span className='px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/25'>📊 Mermaid Charts</span>
                <span className='px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25'>📄 Printable PDFs</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className='max-w-6xl mx-auto px-6 md:px-8 py-24 border-t border-white/[0.06]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-14'
        >
          <h2 className='text-3xl font-bold text-white mb-3'>Everything You Need to Ace Exams</h2>
          <p className='text-gray-400 text-sm max-w-xl mx-auto'>One platform for notes, diagrams, revision guides and PDFs — all AI-generated.</p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <Feature icon="📘" title="Exam Notes" des="High-yield exam-oriented notes with revision points." />
          <Feature icon="📂" title="Project Notes" des="Well-structured content for assignments and projects." />
          <Feature icon="📊" title="Diagrams" des="Auto-generated visual diagrams for clarity." />
          <Feature icon="⬇️" title="PDF Download" des="Download clean, printable PDFs instantly." />
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className='rounded-2xl p-6
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        hover:border-indigo-500/40
        hover:bg-white/[0.05]
        hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]
        transition-all duration-300
        text-white'
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed">{des}</p>
    </motion.div>
  )
}

export default Home
