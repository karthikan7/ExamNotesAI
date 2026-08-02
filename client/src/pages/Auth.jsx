import React from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth() {
  const dispatch = useDispatch()
  const [authError, setAuthError] = React.useState("")

  const handleGoogleAuth = async () => {
    setAuthError("")
    try {
      const response = await signInWithPopup(auth, provider)
      const User = response.user
      const name = User.displayName || User.email.split("@")[0]
      const email = User.email
      const result = await axios.post(serverUrl + "/api/auth/google", { name, email }, {
        withCredentials: true
      })
      dispatch(setUserData(result.data))
    } catch (error) {
      console.error("Google Auth Error:", error)
      if (error.code === "auth/popup-closed-by-user") {
        setAuthError("Sign-in popup was closed before completing.")
      } else if (error.code === "auth/popup-blocked") {
        setAuthError("Sign-in popup was blocked by your browser. Please allow popups for localhost.")
      } else if (error.code === "auth/unauthorized-domain") {
        setAuthError("Domain not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains.")
      } else {
        const serverMsg = error.response?.data?.message || error.response?.data?.error || (typeof error.response?.data === 'string' ? error.response.data : null);
        setAuthError(serverMsg || error.message || "Failed to sign in with Google.");
      }
    }
  }

  return (
    <div className='min-h-screen overflow-hidden bg-[#080808] text-white px-8'
      style={{
        backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%),
                          radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%)`
      }}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-7xl mx-auto mt-8 rounded-2xl
          bg-white/[0.03] backdrop-blur-xl
          border border-white/[0.08]
          px-8 py-5
          shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold'>N</div>
          <h1 className='text-xl font-bold text-white'>NoteFlow <span className='text-indigo-400'>AI</span></h1>
        </div>
      </motion.header>

      <main className='max-w-7xl mx-auto py-14 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6'
          >
            <span className='w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse'></span>
            AI-Powered Study Platform
          </motion.div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className='text-white'>Unlock </span>
            <span className='bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent'>
              Smart
            </span>
            <br />
            <span className='text-white'>AI Notes</span>
          </h1>

          <p className='mt-6 max-w-xl text-base text-gray-400 leading-relaxed'>
            Generate exam-focused notes, project documentation,
            flow diagrams and revision-ready content using AI —
            faster, cleaner and smarter.
          </p>

          <motion.button
            onClick={handleGoogleAuth}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className='mt-10 px-8 py-3.5 rounded-xl
              flex items-center gap-3
              bg-white text-black font-semibold text-base
              shadow-[0_0_40px_rgba(255,255,255,0.1)]
              hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]
              transition-shadow duration-300'
          >
            <FcGoogle size={22} />
            Continue with Google
          </motion.button>

          {authError && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-md">
              ⚠️ {authError}
            </div>
          )}

          <p className='mt-6 max-w-xl text-sm text-gray-500'>
            Start with <span className="text-indigo-400 font-semibold">50 FREE credits</span> — no card required. Upgrade anytime.
          </p>
        </motion.div>

        {/* RIGHT CONTENT — Feature Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <Feature icon="🎁" title="50 Free Credits" des="Start with 50 credits to generate notes without paying." />
          <Feature icon="📘" title="Exam Notes" des="High-yield, revision-ready exam-oriented notes." />
          <Feature icon="📂" title="Project Notes" des="Well-structured documentation for assignments & projects." />
          <Feature icon="📊" title="Charts & Graphs" des="Auto-generated diagrams, charts and flow graphs." />
          <Feature icon="⬇️" title="PDF Download" des="Download clean, printable PDFs instantly." />
        </div>
      </main>
    </div>
  )
}

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className='rounded-2xl p-5
        bg-white/[0.03]
        border border-white/[0.07]
        hover:border-indigo-500/30
        hover:bg-white/[0.05]
        transition-all duration-300
        text-white'
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{des}</p>
    </motion.div>
  )
}

export default Auth
