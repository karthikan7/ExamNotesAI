import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup';
import RechartSetUp from './RechartSetUp';
import { downloadPdf } from '../services/api';

const markDownComponent = {
    h1: ({ children }) => (
        <h1 className="text-xl font-bold text-indigo-400 mt-6 mb-3 border-b border-white/[0.1] pb-2">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-lg font-semibold text-violet-300 mt-5 mb-2">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-base font-semibold text-gray-200 mt-4 mb-2">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-gray-300 leading-relaxed text-xs mb-3">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc ml-5 space-y-1 text-xs text-gray-300">
            {children}
        </ul>
    ),
    li: ({ children }) => (
        <li className="marker:text-indigo-400">{children}</li>
    ),
}

function FinalResult({ result }) {
    const [quickRevision, setQuickRevision] = useState(false);
    if (
        !result ||
        !result.subTopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long ||
        !result.revisionPoints
    ) {
        return null;
    }

    return (
        <div className='p-2 space-y-8 text-white'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/[0.08] pb-4'>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent'>
                    📘 Generated AI Notes
                </h2>

                <div className='flex gap-3'>
                    <button
                        onClick={() => setQuickRevision(!quickRevision)}
                        className={`
                            px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer
                            ${quickRevision
                                ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20"
                            }
                        `}
                    >
                        {quickRevision ? "Exit Revision Mode" : "⚡ Quick Revision (5 min)"}
                    </button>

                    <button
                        onClick={() => downloadPdf(result)}
                        className='px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/20 cursor-pointer'
                    >
                        ⬇️ Download PDF
                    </button>
                </div>
            </div>

            {!quickRevision && (
                <section>
                    <SectionHeader icon="⭐" title="Sub Topics" color="indigo" />
                    {Object.entries(result.subTopics).map(([star, topics]) => (
                        <div key={star} className='mb-3'>
                            <p className='font-semibold text-xs text-indigo-400 mb-1'>
                                {star} Priority
                            </p>
                            <ul className='list-disc ml-5 text-xs text-gray-300 space-y-0.5'>
                                {topics.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {!quickRevision && (
                <section>
                    <SectionHeader icon="📝" title="Detailed Notes" color="purple" />
                    <div className='bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5'>
                        <ReactMarkdown components={markDownComponent}>
                            {result.notes}
                        </ReactMarkdown>
                    </div>
                </section>
            )}

            {quickRevision && (
                <section className='rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5'>
                    <h3 className='font-bold text-emerald-400 mb-3 text-sm'>
                        ⚡ Exam Quick Revision Points
                    </h3>
                    <ul className='list-disc ml-5 space-y-1.5 text-xs text-gray-200'>
                        {result.revisionPoints.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </section>
            )}

            {result.diagram?.data && (
                <section>
                    <SectionHeader icon="📊" title="Diagram" color="cyan" />
                    <div className='bg-white/90 rounded-2xl p-4'>
                        <MermaidSetup diagram={result.diagram?.data} />
                    </div>
                    <p className="mt-2 text-[11px] text-gray-500 italic">
                        ℹ️ Take a screenshot to save this diagram for your offline revision.
                    </p>
                </section>
            )}

            {result.charts?.length > 0 && (
                <section>
                    <SectionHeader icon="📈" title="Visual Charts" color="indigo" />
                    <div className='bg-white/90 rounded-2xl p-4'>
                        <RechartSetUp charts={result.charts} />
                    </div>
                    <p className="mt-2 text-[11px] text-gray-500 italic">
                        ℹ️ Take a screenshot to save this chart for future reference.
                    </p>
                </section>
            )}

            {result.charts && result.charts.length === 0 && (
                <p className="text-xs text-gray-500 italic">
                    📉 Charts are not relevant for this topic.
                </p>
            )}

            <section>
                <SectionHeader icon="❓" title="Important Questions" color="rose" />

                <p className='font-semibold text-xs text-gray-300 mb-1'>Short Answer Questions:</p>
                <ul className='list-disc ml-5 text-xs text-gray-400 space-y-1 mb-4'>
                    {result.questions.short.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>

                <p className='font-semibold text-xs text-gray-300 mb-1'>Long Answer Questions:</p>
                <ul className='list-disc ml-5 text-xs text-gray-400 space-y-1 mb-4'>
                    {result.questions.long.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>

                <p className='font-semibold text-xs text-gray-300 mb-1'>Diagram Question:</p>
                <ul className='list-disc ml-5 text-xs text-gray-400'>
                    <li>{result.questions.diagram}</li>
                </ul>
            </section>
        </div>
    )
}

function SectionHeader({ icon, title, color }) {
    const colors = {
        indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
        purple: "bg-purple-500/10 border-purple-500/20 text-purple-300",
        blue: "bg-blue-500/10 border-blue-500/20 text-blue-300",
        green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
        cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
        rose: "bg-rose-500/10 border-rose-500/20 text-rose-300",
    };
    return (
        <div className={`
            mb-4 px-4 py-2 rounded-xl border
            ${colors[color]}
            font-semibold text-xs flex items-center gap-2
        `}>
            <span>{icon}</span>
            <span>{title}</span>
        </div>
    )
}

export default FinalResult
