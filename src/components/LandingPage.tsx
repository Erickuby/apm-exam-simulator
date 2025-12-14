import React from 'react';
import { useExam } from '../store/useExamStore';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Award, Play, CheckCircle2, Zap, Target, TrendingUp } from 'lucide-react';

const LandingPage = () => {
    const { startExam } = useExam();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-y-auto">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full backdrop-blur-sm"
                        >
                            <span className="text-indigo-300 text-sm font-medium flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Professional Practice Assessment
                            </span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent leading-tight">
                            APM PMQ Exam
                            <br />
                            <span className="text-indigo-400">Simulator</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
                            Master your exam with our advanced simulation environment.
                            Real questions, real pressure, real results.
                        </p>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/50 group-hover:shadow-indigo-500/80 transition-all duration-300">
                                        <BookOpen className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">40</div>
                                <div className="text-slate-400 text-sm font-medium">Practice Questions</div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/50 group-hover:shadow-emerald-500/80 transition-all duration-300">
                                        <Target className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">90</div>
                                <div className="text-slate-400 text-sm font-medium">Total Marks</div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg shadow-amber-500/50 group-hover:shadow-amber-500/80 transition-all duration-300">
                                        <Clock className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">150</div>
                                <div className="text-slate-400 text-sm font-medium">Minutes Duration</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative max-w-7xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <FeatureCard
                        icon={<TrendingUp className="w-7 h-7" />}
                        title="Exam Instructions"
                        gradient="from-blue-500 to-cyan-500"
                        items={[
                            "Duration: 150 minutes (2.5 hours)",
                            "Pass mark: 50/90 (55%)",
                            "Question Types: Multiple choice, Matching, Short & Long answer",
                            "Timer counts down automatically"
                        ]}
                        delay={0.7}
                    />
                    <FeatureCard
                        icon={<CheckCircle2 className="w-7 h-7" />}
                        title="What's Included"
                        gradient="from-emerald-500 to-teal-500"
                        items={[
                            "40 high-frequency exam questions",
                            "Covers EVM, Risk, Quality, Change Control",
                            "Detailed explanations for every answer",
                            "Model answers for written questions"
                        ]}
                        delay={0.8}
                    />
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="flex justify-center"
                >
                    <button
                        onClick={startExam}
                        className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-lg text-white overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50"
                    >
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 group-hover:scale-110"></div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                        <span className="relative flex items-center gap-3">
                            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" />
                            Start Exam Now
                        </span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

const FeatureCard = ({
    icon,
    title,
    gradient,
    items,
    delay
}: {
    icon: React.ReactNode,
    title: string,
    gradient: string,
    items: string[],
    delay: number
}) => {
    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 overflow-hidden"
        >
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>

            {/* Icon header */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
                    {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7 text-white" })}
                </div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
            </div>

            {/* Items list */}
            <ul className="space-y-4">
                {items.map((item, i) => (
                    <motion.li
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: delay + 0.1 * i }}
                        className="flex items-start gap-3 text-slate-300 leading-relaxed"
                    >
                        <span className={`mt-2 w-2 h-2 rounded-full bg-gradient-to-r ${gradient} flex-shrink-0`}></span>
                        <span>{item}</span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default LandingPage;
