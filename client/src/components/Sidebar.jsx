import React from 'react'

function Sidebar({ result }) {
    if (!result ||
        !result.subTopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long) {
        return null;
    }

    return (
        <div className='bg-[#0c0c0c] rounded-xl border border-zinc-800 p-4 space-y-5 text-white'>
            <div className='flex items-center gap-2 border-b border-zinc-800 pb-3'>
                <span className='text-sm'>📌</span>
                <h3 className='text-xs font-bold text-white uppercase tracking-wider font-mono'>
                    Exam Summary
                </h3>
            </div>

            <section>
                <p className='text-xs font-semibold text-zinc-400 mb-2'>
                    Sub Topics (Priority)
                </p>
                {Object.entries(result.subTopics).map(([star, topics]) => (
                    <div key={star} className='mb-2 rounded-lg bg-[#141414] border border-zinc-800 p-2.5'>
                        <p className='text-[11px] font-semibold text-emerald-400 mb-1 font-mono'>
                            {star} Priority
                        </p>
                        <ul className='list-disc ml-4 text-[11px] text-zinc-300 space-y-0.5'>
                            {topics.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section className='rounded-lg bg-[#141414] border border-zinc-800 p-3 space-y-3'>
                <div>
                    <p className='text-xs font-semibold text-zinc-400 mb-1'>
                        Exam Importance
                    </p>
                    <span className='text-emerald-400 font-bold text-xs font-mono'>
                        {result.importance}
                    </span>
                </div>

                <div>
                    <p className='text-xs font-semibold text-zinc-400 mb-2'>
                        Quick Questions
                    </p>

                    <div className='mb-2 rounded-lg bg-[#1a1a1a] border border-zinc-800 p-2'>
                        <p className='text-[10px] font-mono text-zinc-400 mb-1'>SHORT QUESTIONS</p>
                        <ul className='list-disc ml-4 text-[11px] text-zinc-300 space-y-0.5'>
                            {result.questions.short.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='rounded-lg bg-[#1a1a1a] border border-zinc-800 p-2'>
                        <p className='text-[10px] font-mono text-zinc-400 mb-1'>LONG QUESTIONS</p>
                        <ul className='list-disc ml-4 text-[11px] text-zinc-300 space-y-0.5'>
                            {result.questions.long.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sidebar
