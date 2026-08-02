import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import img from "../assets/img1.png"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen overflow-hidden bg-[#080808] text-white'
      style={{
        backgroundImage: `radial-gradient(ellipse at 10% 40%, rgba(99,102,241,0.09) 0%, transparent 55%),
                          radial-gradient(ellipse at 85% 15%, rgba(139,92,246,0.07) 0%, transparent 50%),
                          radial-gradient(ellipse at 60% 80%, rgba(99,102,241,0.05) 0%, transparent 40%)`
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6'
            >
              <span className='w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse'></span>
              Powered by Google Gemini AI
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              <span className='text-white'>Create Smart</span>
              <br />
              <span className='bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent'>
                AI Notes
              </span>
              <br />
              <span className='text-white text-4xl lg:text-5xl'>in Seconds</span>
            </h1>

            <p className='mt-6 max-w-xl text-base text-gray-400 leading-relaxed'>
              Generate exam-focused notes, project documentation,
              flow diagrams and revision-ready content using AI —
              faster, cleaner and smarter.
            </p>

            <motion.button
              onClick={() => navigate("/notes")}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className='mt-10 px-9 py-3.5 rounded-xl
                flex items-center gap-3
                bg-gradient-to-r from-indigo-600 to-violet-600
                text-white font-semibold text-base
                shadow-[0_0_30px_rgba(99,102,241,0.4)]
                hover:shadow-[0_0_45px_rgba(99,102,241,0.6)]
                transition-shadow duration-300'
            >
              Get Started →
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className='overflow-hidden rounded-2xl border border-white/[0.07] shadow-[0_40px_80px_rgba(0,0,0,0.8)]'>
            <img src={img} alt="img" className='w-full' />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className='max-w-6xl mx-auto px-8 py-28'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-14'
        >
          <h2 className='text-3xl font-bold text-white mb-3'>Everything You Need to Ace Exams</h2>
          <p className='text-gray-500 text-base max-w-xl mx-auto'>One platform for notes, diagrams, revision guides and PDFs — all AI-generated.</p>
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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className='rounded-2xl p-6
        bg-white/[0.03]
        border border-white/[0.07]
        hover:border-indigo-500/30
        hover:bg-white/[0.05]
        hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]
        transition-all duration-300
        text-white'
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{des}</p>
    </motion.div>
  )
}

export default Home
