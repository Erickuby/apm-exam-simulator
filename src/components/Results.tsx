import React, { useState } from 'react';
import { useExam } from '../store/useExamStore';
import { questions } from '../data/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

const Results = () => {
    const { answers, resetExam } = useExam();

    // Calculate Score
    let objectiveScore = 0;
    let objectiveMax = 0;

    const resultsData = questions.map((q) => {
        const userAns = answers[q.id] || '';
        let isCorrect = false;
        let status: 'correct' | 'incorrect' | 'manual' = 'manual';
        let marksAwarded = 0;

        if (q.type === 'long') {
            status = 'manual';
        } else {
            objectiveMax += q.marks;
            if (q.type === 'short') {
                isCorrect = userAns.trim().toLowerCase() === (q.correctAnswer as string).toLowerCase();
            } else {
                isCorrect = userAns === q.correctAnswer;
            }

            if (isCorrect) {
                marksAwarded = q.marks;
                objectiveScore += marksAwarded;
                status = 'correct';
            } else {
                status = 'incorrect';
            }
        }

        return { ...q, userAns, isCorrect, status, marksAwarded };
    });

    const percentage = objectiveMax > 0 ? Math.round((objectiveScore / objectiveMax) * 100) : 0;
    const passed = percentage >= 55;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Score Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative"
                >
                    <div className={clsx(
                        "absolute top-0 left-0 right-0 h-2",
                        passed ? "bg-emerald-500" : "bg-rose-500"
                    )} />

                    <div className="p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Exam Completed</h2>
                        <p className="text-slate-500 mb-8">Here is your performance summary</p>

                        <div className="flex flex-col items-center justify-center mb-8">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {/* Circular Progress (Simple SVG) */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        className="stroke-slate-100"
                                        strokeWidth="12"
                                        fill="none"
                                    />
                                    <motion.circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        className={clsx(passed ? "stroke-emerald-500" : "stroke-rose-500")}
                                        strokeWidth="12"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={2 * Math.PI * 88}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - percentage / 100) }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={clsx("text-5xl font-bold", passed ? "text-emerald-600" : "text-rose-600")}>
                                        {percentage}%
                                    </span>
                                    <span className="text-slate-400 text-sm font-medium mt-1">Objective Score</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-lg font-medium text-slate-700 mb-8">
                            You scored <span className="font-bold">{objectiveScore}</span> out of <span className="font-bold">{objectiveMax}</span> on objective questions.
                            <div className={clsx("mt-2 font-bold text-xl", passed ? "text-emerald-600" : "text-rose-600")}>
                                {passed ? "PASS" : "FAIL"}
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-2xl mx-auto flex gap-3 text-left">
                            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800">
                                <strong>Note:</strong> Long response questions (50 marks) are not included in this score.
                                Please review the model answers below to self-assess your written responses.
                            </p>
                        </div>

                        <button
                            onClick={resetExam}
                            className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all hover:shadow-lg"
                        >
                            <RotateCcw className="w-4 h-4" /> Restart Exam
                        </button>
                    </div>
                </motion.div>

                {/* Detailed Breakdown */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800 px-2">Detailed Breakdown</h3>

                    {resultsData.map((item, index) => (
                        <ResultRow key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ResultRow = ({ item, index }: { item: any, index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left"
            >
                <div className="flex items-center gap-4">
                    <div className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        item.status === 'correct' ? "bg-emerald-100 text-emerald-600" :
                            item.status === 'incorrect' ? "bg-rose-100 text-rose-600" :
                                "bg-slate-100 text-slate-500"
                    )}>
                        {item.status === 'correct' ? <CheckCircle className="w-5 h-5" /> :
                            item.status === 'incorrect' ? <XCircle className="w-5 h-5" /> :
                                <span className="font-bold text-xs">M</span>}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-slate-500 mb-0.5">Question {item.id} • {item.marks} Marks</div>
                        <div className="font-semibold text-slate-900 line-clamp-1">{item.text}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className={clsx(
                        "text-sm font-bold px-3 py-1 rounded-full",
                        item.status === 'correct' ? "bg-emerald-50 text-emerald-700" :
                            item.status === 'incorrect' ? "bg-rose-50 text-rose-700" :
                                "bg-slate-100 text-slate-600"
                    )}>
                        {item.status === 'correct' ? `+${item.marks}` : item.status === 'incorrect' ? '0' : 'Review'}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50">
                            <div className="mt-4 space-y-4">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Answer</div>
                                    <div className={clsx(
                                        "p-4 rounded-lg border text-sm font-medium",
                                        item.status === 'correct' ? "bg-emerald-50 border-emerald-200 text-emerald-900" :
                                            item.status === 'incorrect' ? "bg-rose-50 border-rose-200 text-rose-900" :
                                                "bg-white border-slate-200 text-slate-700"
                                    )}>
                                        {item.userAns || <span className="italic opacity-50">No answer provided</span>}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        {item.type === 'long' ? 'Model Answer / Key Points' : 'Correct Answer'}
                                    </div>
                                    <div className="p-4 rounded-lg bg-white border border-slate-200 text-sm text-slate-700">
                                        {Array.isArray(item.correctAnswer) ? (
                                            <ul className="list-disc list-inside space-y-1">
                                                {item.correctAnswer.map((k: string, i: number) => (
                                                    <li key={i}>{k}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            item.correctAnswer
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Results;
