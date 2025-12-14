import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { questions } from '../data/questions';

interface ExamState {
    currentQuestionIndex: number;
    answers: Record<number, string>;
    flagged: Record<number, boolean>;
    timeLeft: number;
    isSubmitted: boolean;
    isStarted: boolean;
}

interface ExamContextType extends ExamState {
    startExam: () => void;
    submitExam: () => void;
    setAnswer: (questionId: number, answer: string) => void;
    toggleFlag: (questionId: number) => void;
    goToQuestion: (index: number) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    resetExam: () => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider = ({ children }: { children: ReactNode }) => {
    const [isStarted, setIsStarted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [flagged, setFlagged] = useState<Record<number, boolean>>({});
    const [timeLeft, setTimeLeft] = useState(150 * 60); // 150 minutes

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isStarted && !isSubmitted && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        submitExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isStarted, isSubmitted, timeLeft]);

    const startExam = () => setIsStarted(true);

    const submitExam = () => setIsSubmitted(true);

    const setAnswer = (questionId: number, answer: string) => {
        if (isSubmitted) return;
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const toggleFlag = (questionId: number) => {
        setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    };

    const goToQuestion = (index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestionIndex(index);
        }
    };

    const nextQuestion = () => goToQuestion(currentQuestionIndex + 1);
    const prevQuestion = () => goToQuestion(currentQuestionIndex - 1);

    const resetExam = () => {
        setIsStarted(false);
        setIsSubmitted(false);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setFlagged({});
        setTimeLeft(150 * 60);
    };

    return (
        <ExamContext.Provider
            value={{
                isStarted,
                isSubmitted,
                currentQuestionIndex,
                answers,
                flagged,
                timeLeft,
                startExam,
                submitExam,
                setAnswer,
                toggleFlag,
                goToQuestion,
                nextQuestion,
                prevQuestion,
                resetExam,
            }}
        >
            {children}
        </ExamContext.Provider>
    );
};

export const useExam = () => {
    const context = useContext(ExamContext);
    if (!context) throw new Error('useExam must be used within an ExamProvider');
    return context;
};
