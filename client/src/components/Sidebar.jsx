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
        <div className='bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-5 space-y-6 text-white'>
            <div className='flex items-center gap-2 border-b border-white/[0.08] pb-3'>
                <span className='text-lg'>📌</span>
                <h3 className='text-sm font-bold text-indigo-400'>
                    Quick Exam View
                </h3>
            </div>

            <section>
                <p className='text-xs font-semibold text-gray-300 mb-3'>
                    ⭐ Sub Topics (Priority Wise)
                </p>
                {Object.entries(result.subTopics).map(([star, topics]) => (
                    <div key={star} className='mb-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] p-3'>
                        <p className='text-xs font-semibold text-amber-400 mb-1'>
                            {star} Priority
                        </p>
                        <ul className='list-disc ml-4 text-[11px] text-gray-300 space-y-0.5'>
                            {topics.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section className='rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 space-y-3'>
                <div>
                    <p className='text-xs font-semibold text-gray-300 mb-1'>
                        🔥 Exam Importance
                    </p>
                    <span className='text-amber-400 font-bold text-xs'>
                        {result.importance}
                    </span>
                </div>

                <div>
                    <p className='text-xs font-semibold text-gray-300 mb-2'>
                        ❓ Important Questions
                    </p>

                    <div className='mb-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-2.5'>
                        <p className='text-[11px] font-semibold text-indigo-300 mb-1'>
                            Short Questions
                        </p>
                        <ul className='list-disc ml-4 text-[11px] text-gray-300 space-y-0.5'>
                            {result.questions.short.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='mb-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 p-2.5'>
                        <p className='text-[11px] font-semibold text-violet-300 mb-1'>
                            Long Questions
                        </p>
                        <ul className='list-disc ml-4 text-[11px] text-gray-300 space-y-0.5'>
                            {result.questions.long.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-2.5'>
                        <p className='text-[11px] font-semibold text-cyan-300 mb-1'>
                            Diagram Question
                        </p>
                        <ul className='list-disc ml-4 text-[11px] text-gray-300'>
                            <li>{result.questions.diagram}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sidebar
