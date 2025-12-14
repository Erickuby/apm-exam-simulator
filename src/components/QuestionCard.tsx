import React from 'react';
import { useExam } from '../store/useExamStore';
import { questions } from '../data/questions';
import { motion } from 'framer-motion';
import { Flag, ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const QuestionCard = () => {
    const {
        currentQuestionIndex,
        answers,
        setAnswer,
        flagged,
        toggleFlag,
        nextQuestion,
        prevQuestion
    } = useExam();

    const question = questions[currentQuestionIndex];
    const currentAnswer = answers[question.id] || '';
    const isFlagged = !!flagged[question.id];
    const isLast = currentQuestionIndex === questions.length - 1;
    const isFirst = currentQuestionIndex === 0;

    return (
        <div className="max-w-3xl mx-auto w-full">
            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
                {/* Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                            Question {question.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-xs font-medium">
                            {question.marks} Mark{question.marks > 1 ? 's' : ''}
                        </span>
                    </div>
                    <button
                        onClick={() => toggleFlag(question.id)}
                        className={clsx(
                            "flex items-center gap-2 text-sm font-medium transition-colors px-3 py-1.5 rounded-md",
                            isFlagged
                                ? "bg-amber-100 text-amber-700"
                                : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        )}
                    >
                        <Flag className={clsx("w-4 h-4", isFlagged && "fill-current")} />
                        {isFlagged ? 'Flagged' : 'Flag for Review'}
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    <h2 className="text-xl font-semibold text-slate-900 mb-8 leading-relaxed">
                        {question.text}
                    </h2>

                    <div className="space-y-4">
                        {question.type === 'multiple' && (
                            <div className="flex flex-col gap-3">
                                {question.options.map((opt) => (
                                    <label
                                        key={opt}
                                        className={clsx(
                                            "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 group",
                                            currentAnswer === opt
                                                ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500"
                                                : "bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors",
                                            currentAnswer === opt
                                                ? "border-indigo-600 bg-indigo-600"
                                                : "border-slate-300 group-hover:border-indigo-400"
                                        )}>
                                            {currentAnswer === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name={`q-${question.id}`}
                                            value={opt}
                                            checked={currentAnswer === opt}
                                            onChange={(e) => setAnswer(question.id, e.target.value)}
                                            className="hidden"
                                        />
                                        <span className={clsx(
                                            "text-base",
                                            currentAnswer === opt ? "text-indigo-900 font-medium" : "text-slate-700"
                                        )}>
                                            {opt}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {question.type === 'select' && (
                            <div className="relative">
                                <select
                                    value={currentAnswer}
                                    onChange={(e) => setAnswer(question.id, e.target.value)}
                                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                                >
                                    {question.options.map((opt) => (
                                        <option key={opt} value={opt} disabled={opt === "Select an option..."}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        )}

                        {question.type === 'short' && (
                            <input
                                type="text"
                                value={currentAnswer}
                                onChange={(e) => setAnswer(question.id, e.target.value)}
                                placeholder="Type your answer here..."
                                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
                            />
                        )}

                        {question.type === 'long' && (
                            <textarea
                                value={currentAnswer}
                                onChange={(e) => setAnswer(question.id, e.target.value)}
                                placeholder="Type your detailed answer here..."
                                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-[200px] resize-y text-slate-900 placeholder:text-slate-400 font-sans"
                            />
                        )}
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-between items-center">
                    <button
                        onClick={prevQuestion}
                        disabled={isFirst}
                        className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:text-indigo-600 disabled:opacity-50 disabled:hover:text-slate-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Previous
                    </button>

                    <button
                        onClick={nextQuestion}
                        disabled={isLast}
                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-sm hover:shadow-md"
                    >
                        Next Question <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default QuestionCard;
