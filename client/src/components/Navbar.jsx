import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const credits = userData?.credits ?? 0
    const [showCredits, setShowCredits] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/auth")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className='w-full bg-[#000000] border-b border-zinc-800/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50'>
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
                <img src={logo} alt="ExamNotes AI" className='w-7 h-7 object-contain' />
                <span className='text-sm font-semibold text-white tracking-tight'>
                    ExamNotes <span className='text-zinc-400 font-normal'>AI</span>
                </span>
            </div>

            <div className='flex items-center gap-4 relative'>
                <div className='relative'>
                    <button
                        onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
                        className='flex items-center gap-2 px-3 py-1.5 rounded-lg
                            bg-zinc-900 border border-zinc-800 hover:border-zinc-700
                            text-white text-xs font-medium transition-colors cursor-pointer'
                    >
                        <span>💠</span>
                        <span>{credits} Credits</span>
                        <span className='ml-1 text-zinc-400 text-[10px]'>+</span>
                    </button>

                    <AnimatePresence>
                        {showCredits && (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.15 }}
                                className='absolute right-0 mt-2 w-60 rounded-xl
                                    bg-[#0c0c0c] border border-zinc-800
                                    shadow-2xl p-4 text-white z-50'
                            >
                                <h4 className='font-medium text-xs text-white mb-1'>Credit Balance</h4>
                                <p className='text-[11px] text-zinc-400 mb-3'>You have <strong className='text-white'>{credits} credits</strong> remaining.</p>
                                <button
                                    onClick={() => { setShowCredits(false); navigate("/pricing") }}
                                    className='w-full py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer'
                                >
                                    Get More Credits
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className='relative'>
                    <button
                        onClick={() => { setShowProfile(!showProfile); setShowCredits(false) }}
                        className='w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700
                            text-white text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer'
                    >
                        {userData?.name?.slice(0, 1)?.toUpperCase() || "U"}
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.15 }}
                                className='absolute right-0 mt-2 w-48 rounded-xl
                                    bg-[#0c0c0c] border border-zinc-800
                                    shadow-2xl p-1.5 text-white z-50'
                            >
                                <button
                                    onClick={() => { setShowProfile(false); navigate("/history") }}
                                    className='w-full text-left px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer'
                                >
                                    📚 Saved Notes
                                </button>
                                <div className="h-px bg-zinc-800/80 my-1" />
                                <button
                                    onClick={handleSignOut}
                                    className='w-full text-left px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer'
                                >
                                    Sign Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
