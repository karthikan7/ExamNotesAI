import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import axios from 'axios';
import { serverUrl } from '../App';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount)
      setPaying(true)
      const result = await axios.post(serverUrl + "/api/credit/order", { amount }, { withCredentials: true })

      if (result.data.url) {
        window.location.href = result.data.url
      }
      setPaying(false)
    } catch (error) {
      setPaying(false)
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-[#080808] text-white px-6 py-10 relative'
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 20%, rgba(99,102,241,0.08) 0%, transparent 60%)`
      }}
    >
      <button
        onClick={() => navigate("/")}
        className='flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors mb-8 cursor-pointer'
      >
        ← Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">Buy Credits</h1>
        <p className="text-gray-400 text-sm mt-2">
          Choose a plan that fits your study & revision needs
        </p>
      </motion.div>

      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          credits="50 Credits"
          description="Perfect for quick revisions"
          features={[
            "Generate AI notes",
            "Exam-focused answers",
            "Diagram & charts support",
            "Fast generation"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          popular
          title="Popular"
          price="₹200"
          amount={200}
          credits="120 Credits"
          description="Best value for students"
          features={[
            "All Starter features",
            "More credits per ₹",
            "Revision mode access",
            "Priority AI response"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Pro Learner"
          price="₹500"
          amount={500}
          credits="300 Credits"
          description="For serious exam preparation"
          features={[
            "Maximum credit value",
            "Unlimited revisions",
            "Charts & diagrams",
            "Ideal for full syllabus"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>
    </div>
  )
}

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;

  return (
    <motion.div
      onClick={() => setSelectedPrice(amount)}
      whileHover={{ y: -4 }}
      className={`
        relative cursor-pointer
        rounded-2xl p-6
        bg-white/[0.03] backdrop-blur-xl
        border transition-all duration-300
        ${isSelected
          ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          : popular
          ? "border-indigo-500/40"
          : "border-white/[0.08] hover:border-white/[0.15]"
        }
      `}
    >
      {popular && !isSelected && (
        <span className='absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'>
          Popular
        </span>
      )}

      {isSelected && (
        <span className='absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-600 text-white'>
          Selected
        </span>
      )}

      <h2 className='text-lg font-bold text-white'>{title}</h2>
      <p className='text-xs text-gray-400 mt-1'>{description}</p>

      <div className='mt-5 mb-6'>
        <p className="text-3xl font-extrabold text-white">{price}</p>
        <p className="text-xs font-semibold text-indigo-400 mt-1">{credits}</p>
      </div>

      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount)
        }}
        className={`
          w-full py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 cursor-pointer
          ${isPayingThisCard
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : isSelected || popular
            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            : "bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.1]"
          }
        `}
      >
        {isPayingThisCard ? "Redirecting to Stripe..." : "Buy Now"}
      </button>

      <ul className='mt-6 space-y-2.5 text-xs text-gray-400'>
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Pricing
