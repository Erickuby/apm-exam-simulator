import React from 'react';
import { useExam } from '../store/useExamStore';
import { questions } from '../data/questions';
import clsx from 'clsx';

const QuestionMap = () => {
    const { currentQuestionIndex, answers, flagged, goToQuestion } = useExam();

    return (
        <div className="bg-white border-r border-slate-200 w-full md:w-80 flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Question Map</h3>
            </div>

            <div className="p-4 flex gap-4 text-xs text-slate-500 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Current
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-100 border border-emerald-500" /> Answered
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-100 border border-amber-500" /> Flagged
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, index) => {
                        const isCurrent = index === currentQuestionIndex;
                        const isAnswered = !!answers[q.id];
                        const isFlagged = !!flagged[q.id];

                        return (
                            <button
                                key={q.id}
                                onClick={() => goToQuestion(index)}
                                className={clsx(
                                    "aspect-square rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center border",
                                    isCurrent
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105 ring-2 ring-indigo-200"
                                        : isFlagged
                                            ? "bg-amber-50 text-amber-700 border-amber-400"
                                            : isAnswered
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-400"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                                )}
                            >
                                {q.id}
                                {isFlagged && (
                                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuestionMap;
