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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        shadow-[0_8px_32px_rgba(0,0,0,0.6)]
        p-8
        space-y-5
        text-white
      "
    >
      <div>
        <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>Topic / Subject</label>
        <input
          type="text"
          className='w-full p-3 rounded-xl
            bg-white/[0.06] backdrop-blur-lg
            border border-white/[0.12]
            placeholder-gray-500
            text-white text-sm
            focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition'
          placeholder='Enter topic (e.g., Photosynthesis, Newton Laws, Operating Systems)'
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>Class / Level</label>
          <input
            type="text"
            className='w-full p-3 rounded-xl
              bg-white/[0.06] backdrop-blur-lg
              border border-white/[0.12]
              placeholder-gray-500
              text-white text-sm
              focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition'
            placeholder='Class 10, B.Tech, 12th, etc.'
            onChange={(e) => setClassLevel(e.target.value)}
            value={classLevel}
          />
        </div>

        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>Learning For</label>
          <input
            type="text"
            className='w-full p-3 rounded-xl
              bg-white/[0.06] backdrop-blur-lg
              border border-white/[0.12]
              placeholder-gray-500
              text-white text-sm
              focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition'
            placeholder='Board Exam, GATE, Revision, Assignment'
            onChange={(e) => setExamType(e.target.value)}
            value={examType}
          />
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-6 pt-2'>
        <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
        <Toggle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label="Include Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>

      <motion.button
        onClick={handleSubmit}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.97 } : {}}
        disabled={loading}
        className={`
          w-full mt-4
          py-3 rounded-xl
          font-semibold text-xs uppercase tracking-wider
          flex items-center justify-center gap-3
          transition-all duration-200 cursor-pointer
          ${loading
            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/[0.05]"
            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_25px_rgba(99,102,241,0.3)]"
          }
        `}
      >
        {loading ? "Generating Notes..." : "✨ Generate AI Notes"}
      </motion.button>

      {loading && (
        <div className='mt-4 space-y-2'>
          <div className='w-full h-2 rounded-full bg-white/[0.1] overflow-hidden'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.6 }}
              className='h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400'
            />
          </div>

          <div className='flex justify-between text-xs text-gray-400'>
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>
          <p className='text-[11px] text-gray-500 text-center'>
            This may take up to 2–5 minutes. Please don’t close or refresh the page.
          </p>
        </div>
      )}
    </motion.div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className='flex items-center gap-3 cursor-pointer select-none' onClick={onChange}>
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(99,102,241,0.5)"
            : "rgba(255,255,255,0.1)"
        }}
        transition={{ duration: 0.25 }}
        className='relative w-11 h-6 rounded-full
          border border-white/[0.15]
          backdrop-blur-lg'
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className='absolute top-0.5
            h-5 w-5 rounded-full
            bg-white
            shadow-md'
          style={{
            left: checked ? "1.35rem" : "0.2rem",
          }}
        />
      </motion.div>

      <span className={`text-xs font-medium transition-colors ${checked ? "text-indigo-300" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  )
}

export default TopicForm
