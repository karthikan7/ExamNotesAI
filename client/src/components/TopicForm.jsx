import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { generateNotes } from '../services/api';
import { useDispatch } from 'react-redux';
import { updateCredits } from '../redux/userSlice';

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic")
      return;
    }
    setError("")
    setLoading(true)
    setResult(null)
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart
      })
      setResult(result.data)
      setLoading(false)
      setClassLevel("")
      setTopic("")
      setExamType("")
      setIncludeChart(false)
      setRevisionMode(false)
      setIncludeDiagram(false)

      if (typeof result.creditsLeft === "number") {
        dispatch(updateCredits(result.creditsLeft));
      }
    } catch (error) {
      console.error("Notes Generation Error:", error)
      setError(typeof error === "string" ? error : "Failed to fetch notes from server");
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("")
      return;
    }
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done…");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing notes…");
      } else if (value > 40) {
        setProgressText("Processing content…");
      } else {
        setProgressText("Generating notes…");
      }

      setProgress(Math.floor(value))
    }, 700)

    return () => clearInterval(interval);
  }, [loading])

  return (
    <div className="rounded-xl bg-[#0c0c0c] border border-zinc-800 p-6 sm:p-8 space-y-5 text-white">
      <div>
        <label className='block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2'>Topic / Subject Name</label>
        <input
          type="text"
          className='w-full p-3 rounded-lg bg-[#141414] border border-zinc-800 placeholder-zinc-600 text-white text-xs focus:outline-none focus:border-zinc-600 transition-colors'
          placeholder='Enter topic (e.g. Photosynthesis, Newton Laws, Operating Systems)'
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2'>Class / Level</label>
          <input
            type="text"
            className='w-full p-3 rounded-lg bg-[#141414] border border-zinc-800 placeholder-zinc-600 text-white text-xs focus:outline-none focus:border-zinc-600 transition-colors'
            placeholder='Class 10, B.Tech, 12th, etc.'
            onChange={(e) => setClassLevel(e.target.value)}
            value={classLevel}
          />
        </div>

        <div>
          <label className='block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2'>Learning For</label>
          <input
            type="text"
            className='w-full p-3 rounded-lg bg-[#141414] border border-zinc-800 placeholder-zinc-600 text-white text-xs focus:outline-none focus:border-zinc-600 transition-colors'
            placeholder='Board Exam, GATE, Revision, Assignment'
            onChange={(e) => setExamType(e.target.value)}
            value={examType}
          />
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-6 pt-2 border-t border-zinc-800/80'>
        <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
        <Toggle label="Include Diagram" checked={includeDiagram} onChange={() => setIncludeDiagram(!includeDiagram)} />
        <Toggle label="Include Charts" checked={includeChart} onChange={() => setIncludeChart(!includeChart)} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`
          w-full mt-4 py-3 rounded-lg font-semibold text-xs transition-colors cursor-pointer
          ${loading
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-800"
            : "bg-white text-black hover:bg-zinc-200 shadow-sm"
          }
        `}
      >
        {loading ? "Generating Notes..." : "Generate AI Notes"}
      </button>

      {loading && (
        <div className='mt-4 space-y-2'>
          <div className='w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.6 }}
              className='h-full bg-white'
            />
          </div>

          <div className='flex justify-between text-xs text-zinc-400'>
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className='flex items-center gap-3 cursor-pointer select-none' onClick={onChange}>
      <div
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? "bg-white" : "bg-zinc-800 border border-zinc-700"}`}
      >
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full transition-transform ${checked ? "translate-x-4 bg-black" : "translate-x-0.5 bg-zinc-400"}`}
        />
      </div>
      <span className={`text-xs font-medium ${checked ? "text-white" : "text-zinc-400"}`}>
        {label}
      </span>
    </div>
  )
}

export default TopicForm
