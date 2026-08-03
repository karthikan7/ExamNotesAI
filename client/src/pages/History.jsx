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
    <div className='min-h-screen bg-[#000000] text-white px-6 py-6'>
      <header className="mb-6 rounded-xl bg-[#0c0c0c] border border-zinc-800 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className='text-sm font-bold text-white tracking-tight'>ExamNotes <span className='text-zinc-400 font-normal'>AI</span></h1>
          <p className='text-[11px] text-zinc-400 mt-0.5'>AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-3'>
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden text-white text-lg'>
              <GiHamburgerMenu />
            </button>
          )}

          <button
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white text-xs font-medium transition-colors cursor-pointer'
            onClick={() => navigate("/pricing")}
          >
            <span>💠</span>
            <span>{credits} Credits</span>
            <span className='ml-1 text-zinc-400 text-[10px]'>+</span>
          </button>
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
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
                h-full lg:h-[78vh]
                lg:rounded-xl
                lg:col-span-1
                bg-[#0c0c0c]
                border border-zinc-800
                p-4
                overflow-y-auto'
            >
              <button onClick={() => setIsSidebarOpen(false)} className='lg:hidden text-xs text-zinc-400 mb-4 cursor-pointer'>
                ← Back
              </button>

              <div className='mb-4 space-y-2'>
                <button
                  onClick={() => navigate("/notes")}
                  className='w-full py-2.5 rounded-lg font-semibold text-xs text-black bg-white hover:bg-zinc-200 transition-colors text-center shadow-sm cursor-pointer'
                >
                  + Generate New Notes
                </button>

                <div className="h-px bg-zinc-800/80 my-3" />

                <h2 className='mb-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono'>
                  Saved Notes
                </h2>

                {topics.length === 0 && (
                  <p className="text-xs text-zinc-500">No notes created yet</p>
                )}

                <ul className='space-y-2'>
                  {topics.map((t, i) => (
                    <li
                      key={i}
                      onClick={() => openNotes(t._id)}
                      className={`
                        cursor-pointer rounded-lg p-3 border transition-colors
                        ${activeNoteId === t._id
                          ? "bg-zinc-900 border-white text-white"
                          : "bg-[#141414] border-zinc-800/80 hover:border-zinc-700"
                        }
                      `}
                    >
                      <p className='text-xs font-semibold text-white truncate'>{t.topic}</p>

                      <div className='flex flex-wrap gap-1.5 mt-2 text-[10px]'>
                        {t.classLevel && (
                          <span className='px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono'>
                            {t.classLevel}
                          </span>
                        )}
                        {t.examType && (
                          <span className='px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono'>
                            {t.examType}
                          </span>
                        )}
                      </div>

                      <div className='flex gap-2 mt-2 text-[10px] text-zinc-400'>
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

        <div className='lg:col-span-3 rounded-xl bg-[#0c0c0c] border border-zinc-800 p-6 min-h-[78vh]'>
          {loading && (
            <p className="text-center text-xs text-zinc-400 animate-pulse py-10">
              Loading notes…
            </p>
          )}

          {!loading && !selectedNote && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-20">
              <span className="text-2xl mb-2">📚</span>
              <p className="text-xs">Select a topic from the sidebar to view notes</p>
            </div>
          )}

          {!loading && selectedNote && <FinalResult result={selectedNote} />}
        </div>
      </div>
    </div>
  )
}

export default History
