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
        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className='relative z-20 mx-6 mt-6
                rounded-2xl
                bg-white/[0.03] backdrop-blur-xl
                border border-white/[0.08]
                shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                flex items-center justify-between px-8 py-4'
        >
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
                <img src={logo} alt="examnotes" className='w-9 h-9 object-contain' />
                <span className='text-lg hidden md:block font-semibold text-white'>
                    ExamNotes <span className='text-indigo-400'>AI</span>
                </span>
            </div>

            <div className='flex items-center gap-6 relative'>
                <div className='relative'>
                    <motion.div
                        onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className='flex items-center justify-center gap-1.5
                            px-4 py-2 rounded-full
                            bg-white/[0.06]
                            border border-white/[0.12]
                            hover:border-indigo-500/40
                            text-white text-sm
                            shadow-md
                            transition-all duration-200
                            cursor-pointer'
                    >
                        <span className='text-lg'>💠</span>
                        <span className='font-medium'>{credits}</span>
                        <motion.span
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className='ml-1.5 h-5 w-5 flex items-center justify-center
                                rounded-full bg-indigo-600 text-white text-xs font-bold'
                        >
                            +
                        </motion.span>
                    </motion.div>

                    <AnimatePresence>
                        {showCredits && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 10, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className='absolute right-[-50px] mt-4 w-64
                                    rounded-2xl
                                    bg-[#121216] backdrop-blur-xl
                                    border border-white/[0.1]
                                    shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                                    p-4 text-white z-50'
                            >
                                <h4 className='font-semibold text-sm mb-1'>Buy Credits</h4>
                                <p className='text-xs text-gray-400 mb-4'>Use credits to generate AI notes, diagrams & PDFs.</p>
                                <button
                                    onClick={() => { setShowCredits(false); navigate("/pricing") }}
                                    className='w-full py-2 rounded-xl
                                        bg-indigo-600 hover:bg-indigo-500
                                        text-white font-medium text-xs transition-colors'
                                >
                                    Buy More Credits
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className='relative'>
                    <motion.div
                        onClick={() => { setShowProfile(!showProfile); setShowCredits(false) }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className='flex items-center justify-center gap-1
                            w-9 h-9 rounded-full
                            bg-indigo-600/30
                            border border-indigo-500/40
                            text-indigo-200 text-sm font-semibold
                            shadow-md
                            cursor-pointer'
                    >
                        <span>{userData?.name?.slice(0, 1)?.toUpperCase() || "U"}</span>
                    </motion.div>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 10, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className='absolute right-0 mt-4 w-52
                                    rounded-2xl
                                    bg-[#121216] backdrop-blur-xl
                                    border border-white/[0.1]
                                    shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                                    p-3 text-white z-50'
                            >
                                <MenuItem text="History" onClick={() => { setShowProfile(false); navigate("/history") }} />
                                <div className="h-px bg-white/[0.08] my-1" />
                                <MenuItem text="Sign Out" red onClick={handleSignOut} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

function MenuItem({ onClick, text, red }) {
    return (
        <div
            onClick={onClick}
            className={`
                w-full text-left px-4 py-2.5 text-xs font-medium cursor-pointer
                transition-colors rounded-lg
                ${red
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-gray-300 hover:bg-white/[0.06]"
                }
            `}
        >
            {text}
        </div>
    )
}

export default Navbar
