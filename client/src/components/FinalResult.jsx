import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup';
import RechartSetUp from './RechartSetUp';
import { downloadPdf } from '../services/api';

const markDownComponent = {
    h1: ({ children }) => (
        <h1 className="text-lg font-bold text-white mt-6 mb-3 border-b border-zinc-800 pb-2">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-base font-semibold text-zinc-200 mt-5 mb-2">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-sm font-semibold text-zinc-300 mt-4 mb-2">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-zinc-300 leading-relaxed text-xs mb-3">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc ml-5 space-y-1 text-xs text-zinc-300">
            {children}
        </ul>
    ),
    li: ({ children }) => (
        <li className="marker:text-zinc-500">{children}</li>
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
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800 pb-4'>
                <h2 className='text-xl font-bold text-white tracking-tight'>
                    📘 Generated Notes
                </h2>

                <div className='flex gap-2.5'>
                    <button
                        onClick={() => setQuickRevision(!quickRevision)}
                        className={`
                            px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer
                            ${quickRevision
                                ? "bg-emerald-500 text-black"
                                : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700"
                            }
                        `}
                    >
                        {quickRevision ? "Exit Revision Mode" : "⚡ 5-Min Revision Mode"}
                    </button>

                    <button
                        onClick={() => downloadPdf(result)}
                        className='px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer'
                    >
                        ⬇️ Download PDF
                    </button>
                </div>
            </div>

            {!quickRevision && (
                <section>
                    <SectionHeader title="Sub Topics (Priority Order)" />
                    {Object.entries(result.subTopics).map(([star, topics]) => (
                        <div key={star} className='mb-3 p-3 rounded-lg bg-[#141414] border border-zinc-800/80'>
                            <p className='font-semibold text-xs text-emerald-400 mb-1 font-mono'>
                                {star} Priority
                            </p>
                            <ul className='list-disc ml-5 text-xs text-zinc-300 space-y-0.5'>
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
                    <SectionHeader title="Detailed Notes" />
                    <div className='bg-[#121212] border border-zinc-800 rounded-xl p-5'>
                        <ReactMarkdown components={markDownComponent}>
                            {result.notes}
                        </ReactMarkdown>
                    </div>
                </section>
            )}

            {quickRevision && (
                <section className='rounded-xl bg-[#121212] border border-emerald-500/30 p-5'>
                    <h3 className='font-semibold text-emerald-400 mb-3 text-xs tracking-wider uppercase font-mono'>
                        ⚡ Exam Quick Revision Points
                    </h3>
                    <ul className='list-disc ml-5 space-y-1.5 text-xs text-zinc-200'>
                        {result.revisionPoints.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </section>
            )}

            {result.diagram?.data && (
                <section>
                    <SectionHeader title="Visual Diagram (Flowchart)" />
                    <div className='bg-white rounded-xl p-4'>
                        <MermaidSetup diagram={result.diagram?.data} />
                    </div>
                </section>
            )}

            {result.charts?.length > 0 && (
                <section>
                    <SectionHeader title="Analytics & Data Charts" />
                    <div className='bg-white rounded-xl p-4'>
                        <RechartSetUp charts={result.charts} />
                    </div>
                </section>
            )}

            <section>
                <SectionHeader title="Important Exam Questions" />

                <p className='font-semibold text-xs text-zinc-400 mb-1 uppercase font-mono'>Short Questions:</p>
                <ul className='list-disc ml-5 text-xs text-zinc-300 space-y-1 mb-4'>
                    {result.questions.short.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>

                <p className='font-semibold text-xs text-zinc-400 mb-1 uppercase font-mono'>Long Questions:</p>
                <ul className='list-disc ml-5 text-xs text-zinc-300 space-y-1 mb-4'>
                    {result.questions.long.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>

                <p className='font-semibold text-xs text-zinc-400 mb-1 uppercase font-mono'>Diagram Question:</p>
                <ul className='list-disc ml-5 text-xs text-zinc-300'>
                    <li>{result.questions.diagram}</li>
                </ul>
            </section>
        </div>
    )
}

function SectionHeader({ title }) {
    return (
        <div className='mb-4 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 font-semibold text-xs text-zinc-300'>
            {title}
        </div>
    )
}

export default FinalResult
