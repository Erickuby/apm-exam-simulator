import React from 'react';
import { ExamProvider, useExam } from './store/useExamStore';
import LandingPage from './components/LandingPage';
import QuizInterface from './components/QuizInterface';
import Results from './components/Results';
import { AnimatePresence, motion } from 'framer-motion';

const ExamApp = () => {
    const { isStarted, isSubmitted } = useExam();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
                {!isStarted ? (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex-1 flex flex-col"
                    >
                        <LandingPage />
                    </motion.div>
                ) : !isSubmitted ? (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col h-screen"
                    >
                        <QuizInterface />
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col overflow-auto"
                    >
                        <Results />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function App() {
    return (
        <ExamProvider>
            <ExamApp />
        </ExamProvider>
    );
}

export default App;
