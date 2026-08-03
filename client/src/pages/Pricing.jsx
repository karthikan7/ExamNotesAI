import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div className='min-h-screen bg-[#000000] text-white px-6 py-10'>
      <button
        onClick={() => navigate("/")}
        className='flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors mb-8 cursor-pointer'
      >
        ← Back to Home
      </button>

      <div className="text-center mb-12 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white">Simple, Transparent Pricing</h1>
        <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
          Pay only for what you generate. 1 Note Generation = 10 Credits.
        </p>
      </div>

      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          credits="50 Credits"
          description="5 Note Generations"
          features={[
            "Generate AI notes",
            "Exam-focused answers",
            "Diagram & charts support",
            "Instant PDF exports"
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
          description="12 Note Generations"
          features={[
            "All Starter features",
            "Bonus +20 Free credits",
            "5-Min Revision mode",
            "Priority AI generation"
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
          description="30 Note Generations"
          features={[
            "Maximum credit value",
            "Bonus +100 Free credits",
            "Charts & diagrams",
            "Full syllabus coverage"
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
    <div
      onClick={() => setSelectedPrice(amount)}
      className={`
        relative cursor-pointer rounded-xl p-6 bg-[#0c0c0c] border transition-all
        ${isSelected || popular
          ? "border-white shadow-xl"
          : "border-zinc-800 hover:border-zinc-700"
        }
      `}
    >
      {popular && (
        <span className='absolute top-4 right-4 text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-black'>
          Popular
        </span>
      )}

      <h2 className='text-base font-semibold text-white'>{title}</h2>
      <p className='text-xs text-zinc-400 mt-1'>{description}</p>

      <div className='mt-5 mb-6'>
        <p className="text-3xl font-bold text-white">{price}</p>
        <p className="text-xs font-mono font-medium text-emerald-400 mt-1">{credits}</p>
      </div>

      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount)
        }}
        className={`
          w-full py-2.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer
          ${isPayingThisCard
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            : isSelected || popular
            ? "bg-white text-black hover:bg-zinc-200"
            : "bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-700"
          }
        `}
      >
        {isPayingThisCard ? "Redirecting to Stripe..." : "Buy Credits"}
      </button>

      <ul className='mt-6 space-y-2 text-xs text-zinc-400 border-t border-zinc-800/80 pt-4'>
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pricing
