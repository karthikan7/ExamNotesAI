import React from 'react'
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
    <div className='min-h-screen bg-[#000000] text-white flex flex-col justify-between px-6 py-8'>
      
      {/* Top Brand Bar */}
      <header className='max-w-6xl w-full mx-auto flex items-center justify-between py-2 border-b border-zinc-800/80 pb-4'>
        <div className='flex items-center gap-2.5'>
          <div className='w-6 h-6 rounded bg-white text-black font-bold flex items-center justify-center text-xs'>E</div>
          <span className='text-sm font-semibold tracking-tight text-white'>ExamNotes <span className='text-zinc-400 font-normal'>AI</span></span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className='max-w-md w-full mx-auto py-12 flex flex-col items-center text-center'>
        <div className='w-full bg-[#0c0c0c] border border-zinc-800 rounded-2xl p-8 shadow-2xl'>
          
          <h1 className='text-2xl font-bold text-white tracking-tight mb-2'>Sign in to ExamNotes AI</h1>
          <p className='text-xs text-zinc-400 mb-8 leading-relaxed'>
            Generate exam-focused notes, flowcharts, and PDFs using Google's Gemini AI.
          </p>

          <button
            onClick={handleGoogleAuth}
            className='w-full py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-sm'
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {authError && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-left">
              ⚠️ {authError}
            </div>
          )}

          <div className='mt-8 pt-6 border-t border-zinc-800/80 text-left space-y-3 text-xs text-zinc-400'>
            <div className='flex items-center gap-2'>
              <span className='text-emerald-400 font-bold'>✓</span>
              <span>50 Free credits on signup (No credit card needed)</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-emerald-400 font-bold'>✓</span>
              <span>Instant AI notes generation with formula sheets</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-emerald-400 font-bold'>✓</span>
              <span>Download clean printable PDFs anytime</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className='max-w-6xl w-full mx-auto text-center text-[11px] text-zinc-600 border-t border-zinc-900 pt-4'>
        © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
      </footer>
    </div>
  )
}

export default Auth
