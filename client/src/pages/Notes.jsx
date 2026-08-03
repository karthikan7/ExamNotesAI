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
    <div className='min-h-screen bg-[#000000] text-white px-6 py-6'>
      <header className="mb-8 rounded-xl bg-[#0c0c0c] border border-zinc-800 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className='text-sm font-bold text-white tracking-tight'>ExamNotes <span className='text-zinc-400 font-normal'>AI</span></h1>
          <p className='text-[11px] text-zinc-400 mt-0.5'>AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-3'>
          <button
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white text-xs font-medium transition-colors cursor-pointer'
            onClick={() => navigate("/pricing")}
          >
            <span>💠</span>
            <span>{credits} Credits</span>
            <span className='ml-1 text-zinc-400 text-[10px]'>+</span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className='px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white transition-colors cursor-pointer'
          >
            📚 Saved Notes
          </button>
        </div>
      </header>

      {!result && (
        <div className="mb-10 max-w-4xl mx-auto">
          <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
        </div>
      )}

      {loading && (
        <div className="text-center text-zinc-400 text-xs font-medium mb-6 animate-pulse">
          Generating exam-focused notes…
        </div>
      )}

      {error && (
        <div className="mb-6 text-center text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-lg max-w-lg mx-auto">
          ⚠️ {error}
        </div>
      )}

      {!result && !loading && (
        <div className="max-w-4xl mx-auto h-48 rounded-xl flex flex-col items-center justify-center bg-[#0c0c0c] border border-dashed border-zinc-800 text-zinc-500">
          <span className="text-2xl mb-2">📘</span>
          <p className="text-xs text-zinc-400">Generated notes will appear here</p>
        </div>
      )}

      {result && (
        <div className='flex flex-col lg:grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
          <div className='lg:col-span-1 flex flex-col gap-4'>
            <button
              onClick={() => {
                setResult(null);
                setError("");
              }}
              className='w-full py-2.5 px-4 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer'
            >
              ← Generate New Notes
            </button>
            <Sidebar result={result} />
          </div>

          <div className='lg:col-span-3 rounded-xl bg-[#0c0c0c] border border-zinc-800 p-6'>
            <FinalResult result={result} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Notes
