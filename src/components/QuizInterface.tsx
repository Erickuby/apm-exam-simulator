import React, { useState } from 'react';
import { useExam } from '../store/useExamStore';
import QuestionMap from './QuestionMap';
import QuestionCard from './QuestionCard';
import { Clock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const QuizInterface = () => {
    const { timeLeft, submitExam } = useExam();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const isWarning = timeLeft < 1800; // 30 mins

    return (
        <div className="flex flex-col h-screen bg-slate-100">
            {/* Header */}
            <header className="bg-indigo-900 text-white h-16 flex items-center justify-between px-4 md:px-6 shadow-md z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <h1 className="font-bold text-lg tracking-tight">APM PMQ Simulator</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className={clsx(
                        "flex items-center gap-2 font-mono text-lg font-bold px-3 py-1.5 rounded-md transition-colors",
                        isWarning ? "bg-amber-500/20 text-amber-300" : "bg-white/10 text-white"
                    )}>
                        <Clock className="w-4 h-4" />
                        {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={() => setShowConfirmModal(true)}
                        className="hidden md:block px-4 py-2 bg-white text-indigo-900 text-sm font-bold rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        Finish Exam
                    </button>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar (Desktop) */}
                <div className="hidden md:block h-full">
                    <QuestionMap />
                </div>

                {/* Sidebar (Mobile Overlay) */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="absolute inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="absolute left-0 top-0 bottom-0 w-80 z-40 md:hidden bg-white shadow-2xl"
                            >
                                <QuestionMap />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <QuestionCard />

                    {/* Mobile Finish Button */}
                    <div className="md:hidden mt-8 flex justify-center pb-8">
                        <button
                            onClick={() => setShowConfirmModal(true)}
                            className="w-full max-w-xs px-6 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50"
                        >
                            Finish Exam
                        </button>
                    </div>
                </main>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirmModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowConfirmModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Submit Exam?</h3>
                            <p className="text-slate-600 mb-6">
                                You have <span className="font-bold text-indigo-600">{formatTime(timeLeft)}</span> remaining.
                                You will not be able to change your answers after submitting.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Keep Working
                                </button>
                                <button
                                    onClick={submitExam}
                                    className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                                >
                                    Yes, Submit
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuizInterface;
