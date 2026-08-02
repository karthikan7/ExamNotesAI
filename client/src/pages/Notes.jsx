import React, { useState } from 'react'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'

function Notes() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 0
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  return (
    <div className='min-h-screen bg-[#080808] text-white px-6 py-8'
      style={{
        backgroundImage: `radial-gradient(ellipse at 40% 15%, rgba(99,102,241,0.07) 0%, transparent 60%)`
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 rounded-2xl
          bg-white/[0.03] backdrop-blur-xl
          border border-white/[0.08]
          px-8 py-5 items-start
          flex md:items-center justify-between gap-4 flex-col md:flex-row
          shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className='text-xl font-bold text-white'>ExamNotes <span className='text-indigo-400'>AI</span></h1>
          <p className='text-xs text-gray-400 mt-0.5'>AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>
          <button
            className='flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/[0.06] border border-white/[0.12]
              hover:border-indigo-500/40 text-white text-xs font-medium transition-all cursor-pointer'
            onClick={() => navigate("/pricing")}
          >
            <span className='text-base'>💠</span>
            <span>{credits}</span>
            <span className='ml-1 h-4 w-4 flex items-center justify-center rounded-full bg-indigo-600 text-white text-[10px] font-bold'>+</span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className='px-4 py-2 rounded-full text-xs font-medium
              bg-white/[0.06] border border-white/[0.12]
              hover:bg-white/[0.12] text-white transition flex items-center gap-2 cursor-pointer'
          >
            📚 Your Notes
          </button>
        </div>
      </motion.header>

      {!result && (
        <motion.div className="mb-12">
          <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
        </motion.div>
      )}

      {loading && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-center text-indigo-300 font-medium text-xs mb-6"
        >
          Generating exam-focused notes…
        </motion.div>
      )}

      {error && (
        <div className="mb-6 text-center text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-xl max-w-lg mx-auto">
          ⚠️ {error}
        </div>
      )}

      {!result && !loading && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
            h-64
            rounded-2xl
            flex flex-col items-center justify-center
            bg-white/[0.02] backdrop-blur-lg
            border border-dashed border-white/[0.1]
            text-gray-500
          "
        >
          <span className="text-4xl mb-3 opacity-60">📘</span>
          <p className="text-xs text-gray-400">
            Generated notes will appear here
          </p>
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='flex flex-col lg:grid lg:grid-cols-4 gap-6'
        >
          <div className='lg:col-span-1 flex flex-col gap-4'>
            <button
              onClick={() => {
                setResult(null);
                setError("");
              }}
              className='w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer'
            >
              ← Generate New Notes
            </button>
            <Sidebar result={result} />
          </div>

          <div className='lg:col-span-3 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-6'>
            <FinalResult result={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Notes
