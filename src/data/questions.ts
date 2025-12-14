export type QuestionType = 'multiple' | 'select' | 'short' | 'long';

export interface Question {
    id: number;
    type: QuestionType;
    text: string;
    options: string[];
    correctAnswer: string | string[];
    marks: number;
}

export const questions: Question[] = [];

// 1. Multiple Response
const multipleChoiceTopics = [
    "Project Lifecycle", "Communication Plan", "Risk Management", "Stakeholder Analysis",
    "Quality Assurance", "Change Control", "Project Management Plan", "Earned Value Management",
    "Conflict Resolution", "Team Development", "Procurement Strategy", "Benefits Management",
    "Project Governance", "Scope Creep", "Critical Path Analysis", "Resource Levelling",
    "Configuration Management", "Health and Safety", "Leadership Styles", "Project Closure"
];

multipleChoiceTopics.forEach((topic, i) => {
    questions.push({
        id: i + 1,
        type: 'multiple',
        text: `Which of the following best describes the purpose of ${topic} in a project?`,
        options: [
            `To ensure ${topic} is ignored`,
            `To effectively manage ${topic} to support project goals`,
            `To delegate ${topic} to external suppliers`,
            `To increase the cost of ${topic}`
        ],
        correctAnswer: `To effectively manage ${topic} to support project goals`,
        marks: 1
    });
});

// 2. Select from List
const selectTopics = [
    "PESTLE Analysis", "SWOT Analysis", "RACI Matrix", "Iron Triangle", "MosCow Prioritisation"
];

selectTopics.forEach((topic, i) => {
    questions.push({
        id: 20 + i + 1,
        type: 'select',
        text: `Select the primary outcome of using ${topic}.`,
        options: [
            "Select an option...",
            "Increased bureaucracy",
            "Strategic insight and structured definition",
            "Immediate project cancellation",
            "Reduction of all project staff"
        ],
        correctAnswer: "Strategic insight and structured definition",
        marks: 2
    });
});

// 3. Short Response
const shortTopics = [
    "Sponsor", "Project Manager", "User", "Steering Group", "Supplier"
];

shortTopics.forEach((topic, i) => {
    questions.push({
        id: 25 + i + 1,
        type: 'short',
        text: `Who is typically responsible for defining the requirements for the ${topic}? (Answer: ${topic})`,
        options: [],
        correctAnswer: topic,
        marks: 2
    });
});

// 4. Long Response
const longTopics = [
    { t: "Risk Process", keys: ["Identify", "Assess", "Plan", "Implement", "Monitor"] },
    { t: "Scope Management", keys: ["Requirements", "WBS", "Definition", "Control", "Verification"] },
    { t: "Quality Planning", keys: ["Standards", "Metrics", "Assurance", "Control", "Audit"] },
    { t: "Communication", keys: ["Stakeholders", "Methods", "Frequency", "Feedback", "Message"] },
    { t: "Leadership", keys: ["Motivation", "Direction", "Support", "Teamwork", "Vision"] },
    { t: "Earned Value", keys: ["PV", "EV", "AC", "CPI", "SPI"] },
    { t: "Change Control", keys: ["Request", "Impact Assessment", "Approval", "Implementation", "Log"] },
    { t: "Procurement", keys: ["Make or Buy", "Specification", "Selection", "Contract", "Closure"] },
    { t: "Business Case", keys: ["Justification", "Options", "Costs", "Benefits", "Risks"] },
    { t: "Handover", keys: ["Acceptance", "Training", "Documentation", "Support", "Transfer"] }
];

longTopics.forEach((item, i) => {
    questions.push({
        id: 30 + i + 1,
        type: 'long',
        text: `Explain the key steps involved in ${item.t}. Include at least 5 key points.`,
        options: [],
        correctAnswer: item.keys,
        marks: 5
    });
});
