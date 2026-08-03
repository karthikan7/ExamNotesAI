import React from 'react'
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
        <footer className='w-full bg-[#000000] border-t border-zinc-800/80 px-6 py-8 mt-20 text-zinc-400'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <img src={logo} alt="logo" className='h-6 w-6 object-contain' />
                        <span className="text-sm font-semibold text-white">
                            ExamNotes <span className="text-zinc-500 font-normal">AI</span>
                        </span>
                    </div>
                    <p className="text-xs text-zinc-500 max-w-sm leading-relaxed mt-1">
                        ExamNotes AI helps students generate exam-focused notes,
                        revision cheat sheets, diagrams, and printable PDFs using AI.
                    </p>
                </div>

                <div className='text-left'>
                    <h1 className='text-xs font-semibold text-white uppercase tracking-wider mb-2 font-mono'>Quick Links</h1>
                    <ul className='space-y-1.5 text-xs'>
                        <li onClick={() => navigate("/notes")} className='text-zinc-400 hover:text-white transition-colors cursor-pointer'>
                            Generate Notes
                        </li>
                        <li onClick={() => navigate("/history")} className='text-zinc-400 hover:text-white transition-colors cursor-pointer'>
                            Saved Notes
                        </li>
                        <li onClick={() => navigate("/pricing")} className='text-zinc-400 hover:text-white transition-colors cursor-pointer'>
                            Buy Credits
                        </li>
                    </ul>
                </div>

                <div className='text-left'>
                    <h1 className='text-xs font-semibold text-white uppercase tracking-wider mb-2 font-mono'>Account</h1>
                    <ul className='space-y-1.5 text-xs'>
                        <li onClick={handleSignOut} className='text-red-400 hover:text-red-300 transition-colors cursor-pointer'>
                            Sign Out
                        </li>
                        <li className='text-zinc-500'>
                            support@examnotes.ai
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto my-6 h-px bg-zinc-900" />
            <p className='text-center text-[11px] text-zinc-600'>
                © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer
