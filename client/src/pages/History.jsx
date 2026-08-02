import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import FinalResult from '../components/FinalResult'

function History() {
  const [topics, setTopics] = useState([])
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 0
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/getnotes", { withCredentials: true })
        setTopics(Array.isArray(res.data) ? res.data : [])
      } catch (error) {
        console.log(error)
      }
    }
    myNotes()
  }, [])

  const openNotes = async (noteId) => {
    setLoading(true)
    setActiveNoteId(noteId)
    try {
      const res = await axios.get(serverUrl + `/api/notes/${noteId}`, { withCredentials: true })
      setSelectedNote(res.data.content)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true)
    }
  }, [])

  return (
    <div className='min-h-screen bg-[#080808] text-white px-6 py-8'
      style={{
        backgroundImage: `radial-gradient(ellipse at 30% 10%, rgba(99,102,241,0.06) 0%, transparent 50%)`
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 rounded-2xl
          bg-white/[0.03] backdrop-blur-xl
          border border-white/[0.08]
          px-8 py-5 items-start
          flex justify-between md:items-center gap-4 flex-wrap 
          shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className='text-xl font-bold text-white'>ExamNotes <span className='text-indigo-400'>AI</span></h1>
          <p className='text-xs text-gray-400 mt-0.5'>AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4'>
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden text-white text-xl'>
              <GiHamburgerMenu />
            </button>
          )}

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
        </div>
      </motion.header>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className='fixed lg:static
                top-0 left-0 z-50 lg:z-auto
                w-72 lg:w-auto
                h-full lg:h-[75vh]
                lg:rounded-2xl
                lg:col-span-1
                bg-[#121216] lg:bg-white/[0.03]
                backdrop-blur-xl 
                border border-white/[0.08]
                shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                p-5
                overflow-y-auto'
            >
              <button onClick={() => setIsSidebarOpen(false)} className='lg:hidden text-xs text-gray-400 mb-4 cursor-pointer'>
                ← Back
              </button>

              <div className='mb-4 space-y-1'>
                <button
                  onClick={() => navigate("/notes")}
                  className='w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors text-center shadow-sm cursor-pointer'
                >
                  + New Notes
                </button>

                <hr className="border-white/[0.08] my-4" />

                <h2 className='mb-3 text-sm font-bold text-gray-300'>
                  📚 Your Saved Notes
                </h2>

                {topics.length === 0 && (
                  <p className="text-xs text-gray-500">No notes created yet</p>
                )}

                <ul className='space-y-2.5'>
                  {topics.map((t, i) => (
                    <li
                      key={i}
                      onClick={() => openNotes(t._id)}
                      className={`
                        cursor-pointer rounded-xl p-3 border transition-all duration-200
                        ${activeNoteId === t._id
                          ? "bg-indigo-600/20 border-indigo-500/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
                        }
                      `}
                    >
                      <p className='text-xs font-semibold text-white truncate'>{t.topic}</p>

                      <div className='flex flex-wrap gap-1.5 mt-2 text-[10px]'>
                        {t.classLevel && (
                          <span className='px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium'>
                            Level: {t.classLevel}
                          </span>
                        )}
                        {t.examType && (
                          <span className='px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-medium'>
                            {t.examType}
                          </span>
                        )}
                      </div>

                      <div className='flex gap-2.5 mt-2 text-[10px] text-gray-400'>
                        {t.revisionMode && <span>⚡ Revision</span>}
                        {t.includeDiagram && <span>📊 Diagram</span>}
                        {t.includeChart && <span>📈 Chart</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='lg:col-span-3
            rounded-2xl
            bg-white/[0.03] backdrop-blur-xl
            border border-white/[0.08]
            shadow-[0_8px_32px_rgba(0,0,0,0.6)]
            p-6
            min-h-[75vh]'
        >
          {loading && (
            <p className="text-center text-xs text-gray-400 animate-pulse py-10">
              Loading notes…
            </p>
          )}

          {!loading && !selectedNote && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 py-20">
              <span className="text-3xl mb-2">📚</span>
              <p className="text-xs">Select a topic from the sidebar to view notes</p>
            </div>
          )}

          {!loading && selectedNote && <FinalResult result={selectedNote} />}
        </motion.div>
      </div>
    </div>
  )
}

export default History
