import React from 'react'
import { motion } from "motion/react"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

function Footer() {
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='z-10 mx-6 mb-6 mt-24
                rounded-2xl
                bg-white/[0.02] backdrop-blur-xl
                border border-white/[0.07]
                px-8 py-8
                shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
        >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                        <img src={logo} alt="logo" className='h-8 w-8 object-contain' />
                        <span className="text-lg font-semibold text-white">
                            ExamNotes <span className="text-indigo-400">AI</span>
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                        ExamNotes AI helps students generate exam-focused notes,
                        revision material, diagrams, and printable PDFs using AI.
                    </p>
                </div>

                <div className='text-center md:text-left'>
                    <h1 className='text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3'>Quick Links</h1>
                    <ul className='space-y-2 text-xs'>
                        <li onClick={() => navigate("/notes")} className='text-gray-400 hover:text-white transition-colors cursor-pointer'>
                            Generate Notes
                        </li>
                        <li onClick={() => navigate("/history")} className='text-gray-400 hover:text-white transition-colors cursor-pointer'>
                            History
                        </li>
                        <li onClick={() => navigate("/pricing")} className='text-gray-400 hover:text-white transition-colors cursor-pointer'>
                            Buy Credits
                        </li>
                    </ul>
                </div>

                <div className='text-center md:text-left'>
                    <h1 className='text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3'>Account & Support</h1>
                    <ul className='space-y-2 text-xs'>
                        <li onClick={handleSignOut} className='text-red-400 hover:text-red-300 transition-colors cursor-pointer'>
                            Sign Out
                        </li>
                        <li className='text-gray-400 hover:text-white transition-colors'>
                            support@examnotes.ai
                        </li>
                    </ul>
                </div>
            </div>

            <div className="my-6 h-px bg-white/[0.06]" />
            <p className='text-center text-xs text-gray-500'>
                © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
            </p>
        </motion.div>
    )
}

export default Footer
