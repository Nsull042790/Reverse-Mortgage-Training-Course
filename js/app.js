/* Luminate Bank - Reverse Mortgage Training Quiz
   React Application
================================================== */

const { useState, useEffect } = React;

// Luminate Bank brand colors
const colors = {
    navy: '#0D1B3E',
    pink: '#E683AC',
    cyan: '#7DD3FC',
    white: '#FFFFFF',
    lightBg: '#F0F4F8',
    green: '#4ADE80',
    red: '#F87171',
    gold: '#FBBF24',
    purple: '#A78BFA',
    orange: '#FB923C'
};

// Week themes
const weekThemes = {
    1: { color: colors.pink, icon: '🔄', name: 'Reframing Reverse', tagline: '"Reverse = Retirement Mortgage"' },
    2: { color: colors.cyan, icon: '💎', name: 'Mining Your Database', tagline: '"The gold is already in your CRM"' },
    3: { color: colors.green, icon: '💬', name: 'Messaging That Works', tagline: '"It\'s how people hear it"' },
    4: { color: colors.purple, icon: '🤖', name: 'Marketing in the AI Era', tagline: '"Scale without scaling workload"' },
    5: { color: colors.orange, icon: '🚀', name: 'Your Growth Plan', tagline: '"Reverse becomes a habit"' }
};

// ============ QUESTION DATABASE ============
const weekQuestions = {
    1: [
        { type: 'mythfact', question: "The bank takes ownership of your home with a reverse mortgage.", answer: false, explanation: "The borrower ALWAYS retains title to their home. This is one of the most persistent myths we need to bust." },
        { type: 'mythfact', question: "Reverse mortgages are only for desperate seniors with no other options.", answer: false, explanation: "Increasingly used by high-equity, high-credit borrowers as a strategic financial planning tool." },
        { type: 'mythfact', question: "11,000 Americans turn 65 every single day.", answer: true, explanation: "This is true! It represents a massive, growing market opportunity for reverse mortgages." },
        { type: 'mythfact', question: "Seniors hold over $14 trillion in tappable home equity.", answer: true, explanation: "Correct! This is an enormous untapped market for Retirement Mortgages." },
        { type: 'mythfact', question: "Heirs inherit nothing if parents get a reverse mortgage.", answer: false, explanation: "Heirs inherit the home and any remaining equity after the loan is repaid. They can sell or refinance." },
        { type: 'mythfact', question: "The purchase mortgage market is contracting while the senior market expands.", answer: true, explanation: "This is why reverse mortgages represent a growth opportunity when other segments are shrinking." },
        { type: 'multiple', question: "What should we call a 'reverse mortgage' in modern language?", options: ["Senior Loan", "Retirement Mortgage", "Equity Release", "Home Conversion"], answer: 1, explanation: "'Retirement Mortgage' positions it as a financial planning tool tied to a life stage, not a mechanism." },
        { type: 'multiple', question: "What is the PRIMARY reason to reframe reverse mortgage language?", options: ["Legal requirements", "To hide what it really is", "To overcome outdated stigma", "Marketing trends"], answer: 2, explanation: "The term 'reverse mortgage' carries outdated stigma. Reframing helps clients see it as a legitimate planning tool." },
        { type: 'multiple', question: "How should we position a reverse mortgage to clients?", options: ["A last resort option", "A financial planning tool", "A way to cash out", "Emergency funding"], answer: 1, explanation: "Position as a proactive financial planning tool, not a desperate measure." },
        { type: 'multiple', question: "Which is NOT a trust signal seniors look for?", options: ["Professionalism", "Aggressive sales tactics", "Clarity", "Third-party validation"], answer: 1, explanation: "Seniors respond to trust, not tactics. Aggressive selling destroys trust." },
        { type: 'scenario', question: "A client says: 'I heard the bank takes your house.' What's your best response?", options: ["That's not exactly true, let me explain the fine print.", "You always retain full title to your home - that's federally protected. The bank never owns it.", "That only happens if you don't pay your taxes.", "Where did you hear that? That's completely wrong."], answer: 1, explanation: "Address the concern directly and confidently with facts, without being defensive or dismissive." }
    ],
    
    2: [
        { type: 'mythfact', question: "You need new leads to build a reverse mortgage pipeline.", answer: false, explanation: "The gold is already in your CRM! Your existing database likely has many 55+ clients with equity." },
        { type: 'mythfact', question: "Birthday automation can be an effective trigger for reverse mortgage outreach.", answer: true, explanation: "Milestone birthdays (55, 60, 65) are natural conversation starters about retirement planning." },
        { type: 'mythfact', question: "AI tools like ChatGPT can help analyze CRM data patterns.", answer: true, explanation: "AI can identify financial pain points, detect opportunities, and generate personalized messaging." },
        { type: 'mythfact', question: "A good reverse mortgage pitch should take at least 2 minutes to deliver properly.", answer: false, explanation: "You should be able to deliver your pitch in 30 seconds. Tone matters more than technical detail." },
        { type: 'multiple', question: "Which CRM filter is MOST valuable for finding reverse mortgage prospects?", options: ["Income level", "Age 55+", "Email open rates", "Social media followers"], answer: 1, explanation: "Age 55+ is the primary qualifier. Combined with equity, it identifies your best prospects." },
        { type: 'multiple', question: "What triggers should you set up for reverse mortgage opportunities?", options: ["Only birthdays", "Rate changes only", "Birthday, rate maturity, property value changes", "New home purchases only"], answer: 2, explanation: "Multiple triggers catch different life events that create reverse mortgage conversations." },
        { type: 'multiple', question: "How often should you create a 'Reverse Opportunity Report' from your CRM?", options: ["Monthly", "Weekly", "Quarterly", "Annually"], answer: 1, explanation: "Weekly reports keep opportunities fresh and maintain consistent outreach momentum." },
        { type: 'multiple', question: "What's the key principle of the 30-second pitch?", options: ["Include all product details", "Focus on technical accuracy", "Invite curiosity, don't sell", "Overcome all objections upfront"], answer: 2, explanation: "Don't sell - invite curiosity. Focus on benefits first, details second." },
        { type: 'scenario', question: "You find a 62-year-old client who refinanced 15 years ago and now has significant equity. What's your opening?", options: ["I noticed you have a lot of equity - want to cash it out?", "Many of my clients 55+ are exploring ways to strengthen retirement cash flow using their home equity. Would you like a quick estimate?", "You should really consider a reverse mortgage before rates go up.", "Your home is worth a lot now - you should take advantage of that."], answer: 1, explanation: "The equity check-in script is soft, value-focused, and doesn't pressure the client." },
        { type: 'multiple', question: "What should you use ChatGPT for in your reverse mortgage practice?", options: ["Replacing client conversations", "Writing outreach, analyzing CRM notes, personalizing messaging", "Making lending decisions", "Automating loan approvals"], answer: 1, explanation: "AI is a tool for efficiency - writing, analysis, personalization - not replacing human judgment." }
    ],
    
    3: [
        { type: 'mythfact', question: "Seniors respond better to aggressive sales tactics that create urgency.", answer: false, explanation: "Seniors respond to TRUST, not tactics. Patience and clarity beat pressure every time." },
        { type: 'mythfact', question: "Adult children often influence their parents' financial decisions.", answer: true, explanation: "The 'Family Triangle' - seniors, adult children, and advisors - all hear different benefits." },
        { type: 'mythfact', question: "Clarity is more important than complexity when messaging to seniors.", answer: true, explanation: "Seniors want simplicity. If you can't explain it simply, you don't understand it well enough." },
        { type: 'mythfact', question: "All audiences (seniors, adult children, advisors) should receive the same messaging.", answer: false, explanation: "Each audience has different concerns. Tailor your message to what THEY care about." },
        { type: 'multiple', question: "What does CARE stand for in the messaging framework?", options: ["Close, Argue, Resolve, Exit", "Clarify, Align, Reassure, Educate", "Call, Ask, Respond, Engage", "Connect, Analyze, Review, Execute"], answer: 1, explanation: "CARE: Clarify their needs, Align with goals, Reassure them, Educate without pressure." },
        { type: 'multiple', question: "What are seniors' top emotional drivers?", options: ["Excitement, adventure, risk-taking", "Comfort, stability, independence", "Growth, competition, achievement", "Speed, efficiency, profit"], answer: 1, explanation: "Seniors prioritize comfort, stability, and maintaining their independence." },
        { type: 'multiple', question: "In the 3R Value Story, what does the first R stand for?", options: ["Receive payments", "Relax", "Retain home ownership", "Reduce costs"], answer: 2, explanation: "3R: Retain ownership, Receive optional payments/LOC, Relax without forced payments." },
        { type: 'multiple', question: "What do adult children typically care MOST about regarding their parents' reverse mortgage?", options: ["Interest rates", "Protecting inheritance and parents' security", "Loan terms", "Processing speed"], answer: 1, explanation: "Adult children worry about their parents being taken advantage of and about inheritance." },
        { type: 'scenario', question: "A senior says they want to leave their home to their children. How do you respond?", options: ["A reverse mortgage might not be right for you then.", "Your heirs can still inherit the home. They'll have the choice to sell it or refinance to keep it, and they keep any equity above the loan balance.", "You should talk to your kids first before we continue.", "The inheritance concern is overblown - focus on yourself."], answer: 1, explanation: "Address the concern directly with facts. Heirs DO inherit - they have options." }
    ],
    
    4: [
        { type: 'mythfact', question: "ChatGPT can write outreach messages, build scripts, and analyze CRM notes.", answer: true, explanation: "AI tools dramatically increase your efficiency for content creation and analysis." },
        { type: 'mythfact', question: "SimpleApp is only useful after the client has decided to apply.", answer: false, explanation: "SimpleApp is great for quick scenarios WHILE ON THE PHONE to engage curious prospects." },
        { type: 'mythfact', question: "Social media is not effective for reaching seniors.", answer: false, explanation: "Today's seniors are tech-capable. Social media, especially Facebook, reaches this demographic effectively." },
        { type: 'mythfact', question: "Email sequences should include a 'Reply YES to see your numbers' call-to-action.", answer: true, explanation: "Simple CTAs like 'Reply YES' reduce friction and increase response rates." },
        { type: 'multiple', question: "What are the THREE key tools in the AI marketing toolkit?", options: ["Facebook, Instagram, TikTok", "ChatGPT, SimpleApp, Scenario Desk", "Zoom, Slack, Email", "Excel, PowerPoint, Word"], answer: 1, explanation: "ChatGPT for content, SimpleApp for quick scenarios, Scenario Desk for polished results." },
        { type: 'multiple', question: "How many emails are in the recommended 55+ Outreach sequence?", options: ["3 emails", "5 emails", "7 emails", "10 emails"], answer: 1, explanation: "The 55+ Outreach sequence has 5 emails with education, scenarios, and simple CTAs." },
        { type: 'multiple', question: "What's the recommended length for short-form video scripts?", options: ["5-10 seconds", "15-30 seconds", "60-90 seconds", "2-3 minutes"], answer: 1, explanation: "15-30 seconds captures attention without losing the audience." },
        { type: 'multiple', question: "Which professional should receive the 6-email Advisor Partner Sequence?", options: ["Only CPAs", "Only attorneys", "CPAs, Financial Planners, and Attorneys", "Only real estate agents"], answer: 2, explanation: "The advisor sequence targets CPAs, Financial Planners, and Attorneys - all key referral sources." },
        { type: 'scenario', question: "You're on the phone with a curious prospect. Which tool should you use for a quick estimate?", options: ["ChatGPT - have it calculate the numbers", "SimpleApp - fast scenarios with zero friction", "Excel spreadsheet", "Tell them you'll email numbers later"], answer: 1, explanation: "SimpleApp provides fast scenarios while on the phone, keeping engagement high." },
        { type: 'multiple', question: "What type of social media post busts common misconceptions?", options: ["Product feature posts", "'Did you know?' myth-busting posts", "Rate update posts", "Company news posts"], answer: 1, explanation: "'Did you know?' myth-busting posts educate while challenging misconceptions." }
    ],
    
    5: [
        { type: 'mythfact', question: "Your 90-day plan should include identifying 30-50 CRM prospects aged 55+.", answer: true, explanation: "30-50 prospects give you a solid pipeline to work through systematically." },
        { type: 'mythfact', question: "You should only discuss reverse mortgages when clients specifically ask about them.", answer: false, explanation: "Integrate a 'reverse moment' into EVERY loan consultation. Plant seeds proactively." },
        { type: 'mythfact', question: "Realtors who serve downsizers are valuable reverse mortgage partners.", answer: true, explanation: "Downsizing realtors regularly encounter seniors who could benefit from H4P or traditional reverse." },
        { type: 'mythfact', question: "You should submit at least 1-2 reverse scenarios per week.", answer: true, explanation: "Consistent scenario submissions build expertise and keep the pipeline flowing." },
        { type: 'multiple', question: "How many advisor relationships should you build in your 90-day plan?", options: ["1", "3", "10", "25"], answer: 1, explanation: "Start with 3 quality advisor relationships - CPAs, financial planners, or attorneys." },
        { type: 'multiple', question: "How long should your weekly outreach block be?", options: ["15 minutes", "30 minutes", "60 minutes", "Half a day"], answer: 2, explanation: "Commit to one 60-minute weekly outreach block for consistent prospecting." },
        { type: 'multiple', question: "What question should you ALWAYS ask in every loan consultation?", options: ["What's your credit score?", "What are your long-term plans for the home?", "How much do you want to borrow?", "When do you want to close?"], answer: 1, explanation: "'What are your long-term plans for the home?' naturally opens reverse mortgage conversations." },
        { type: 'multiple', question: "What's the H4P strategy for realtors?", options: ["Home for Purchase - using reverse for home buying", "Help 4 People - referral program", "High 4 Priority - lead scoring", "Home Price 4-plex - investment strategy"], answer: 0, explanation: "HECM for Purchase (H4P) lets seniors buy a new home using a reverse mortgage - great for downsizers." },
        { type: 'multiple', question: "Which is NOT a recommended builder strategy?", options: ["New construction for seniors near family", "'One-level living' promotions", "Aggressive cold-calling campaigns", "Senior community developments"], answer: 2, explanation: "Builder partnerships focus on lifestyle marketing, not aggressive sales tactics." },
        { type: 'scenario', question: "It's the end of the 5-week course. What's your FIRST action?", options: ["Wait for the perfect opportunity", "Submit one scenario within 48 hours", "Read more about reverse mortgages", "Ask your manager what to do"], answer: 1, explanation: "Action beats perfection. Submit one scenario within 48 hours to build momentum." },
        { type: 'multiple', question: "What are the three key partner categories for reverse mortgages?", options: ["Banks, credit unions, mortgage companies", "Realtors, Builders, Advisors", "Seniors, families, neighbors", "Social media, email, phone"], answer: 1, explanation: "Realtors (downsizers), Builders (senior housing), Advisors (financial planning) are key partners." }
    ]
};

// ============ STORAGE HELPERS ============
const getProgress = () => {
    try {
        const saved = localStorage.getItem('reverseTrainingProgress');
        return saved ? JSON.parse(saved) : { weekScores: {}, totalQuizzes: 0, streak: 0, lastPlayed: null, achievements: [] };
    } catch {
        return { weekScores: {}, totalQuizzes: 0, streak: 0, lastPlayed: null, achievements: [] };
    }
};

const saveProgress = (progress) => {
    try {
        localStorage.setItem('reverseTrainingProgress', JSON.stringify(progress));
    } catch {}
};

// ============ QUESTION COMPONENTS ============

const MythFactQuestion = ({ q, onAnswer, answered, selectedAnswer }) => {
    return (
        React.createElement('div', null,
            React.createElement('div', { className: 'myth-fact-statement' },
                React.createElement('p', null, `"${q.question}"`)
            ),
            React.createElement('div', { className: 'myth-fact-buttons' },
                React.createElement('button', {
                    onClick: () => !answered && onAnswer(false),
                    disabled: answered,
                    className: 'myth-btn',
                    style: {
                        backgroundColor: answered 
                            ? (!q.answer ? colors.green : selectedAnswer === false ? colors.red : '#eee') 
                            : '#FEE2E2',
                        color: answered && (!q.answer || selectedAnswer === false) ? 'white' : colors.red,
                        transform: answered && selectedAnswer === false ? 'scale(1.02)' : 'scale(1)'
                    }
                }, '🚫 MYTH'),
                React.createElement('button', {
                    onClick: () => !answered && onAnswer(true),
                    disabled: answered,
                    className: 'fact-btn',
                    style: {
                        backgroundColor: answered 
                            ? (q.answer ? colors.green : selectedAnswer === true ? colors.red : '#eee') 
                            : '#D1FAE5',
                        color: answered && (q.answer || selectedAnswer === true) ? 'white' : colors.green,
                        transform: answered && selectedAnswer === true ? 'scale(1.02)' : 'scale(1)'
                    }
                }, '✓ FACT')
            )
        )
    );
};

const MultipleChoiceQuestion = ({ q, onAnswer, answered, selectedAnswer }) => {
    return (
        React.createElement('div', null,
            React.createElement('p', { 
                style: { fontSize: 20, color: colors.navy, marginBottom: 24, lineHeight: 1.5 } 
            }, q.question),
            React.createElement('div', { className: 'multiple-choice-options' },
                q.options.map((opt, i) => {
                    const isCorrect = i === q.answer;
                    const isSelected = selectedAnswer === i;
                    let bgColor = 'white';
                    let borderColor = colors.cyan;
                    
                    if (answered) {
                        if (isCorrect) {
                            bgColor = colors.green;
                            borderColor = colors.green;
                        } else if (isSelected) {
                            bgColor = colors.red;
                            borderColor = colors.red;
                        } else {
                            bgColor = '#f5f5f5';
                            borderColor = '#ddd';
                        }
                    }
                    
                    return React.createElement('button', {
                        key: i,
                        onClick: () => !answered && onAnswer(i),
                        disabled: answered,
                        className: 'choice-btn',
                        style: {
                            backgroundColor: bgColor,
                            borderColor: borderColor,
                            color: answered && (isCorrect || isSelected) ? 'white' : colors.navy
                        }
                    },
                        React.createElement('span', {
                            className: 'choice-letter',
                            style: {
                                backgroundColor: answered && (isCorrect || isSelected) ? 'rgba(255,255,255,0.3)' : 'rgba(13,27,62,0.15)'
                            }
                        }, String.fromCharCode(65 + i)),
                        opt
                    );
                })
            )
        )
    );
};

const ScenarioQuestion = ({ q, onAnswer, answered, selectedAnswer }) => {
    return (
        React.createElement('div', null,
            React.createElement('div', { className: 'scenario-box' },
                React.createElement('p', { className: 'scenario-label' }, '💼 SCENARIO'),
                React.createElement('p', { className: 'scenario-question' }, q.question)
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
                q.options.map((opt, i) => {
                    const isCorrect = i === q.answer;
                    const isSelected = selectedAnswer === i;
                    let bgColor = 'white';
                    
                    if (answered) {
                        if (isCorrect) bgColor = colors.green + '20';
                        else if (isSelected) bgColor = colors.red + '20';
                    }
                    
                    return React.createElement('button', {
                        key: i,
                        onClick: () => !answered && onAnswer(i),
                        disabled: answered,
                        style: {
                            padding: 14,
                            backgroundColor: bgColor,
                            border: `2px solid ${answered ? (isCorrect ? colors.green : isSelected ? colors.red : '#eee') : '#ddd'}`,
                            borderRadius: 8,
                            textAlign: 'left',
                            fontSize: 15,
                            cursor: answered ? 'default' : 'pointer',
                            lineHeight: 1.4,
                            color: colors.navy
                        }
                    }, `${answered && isCorrect ? '✓ ' : ''}${answered && isSelected && !isCorrect ? '✗ ' : ''}${opt}`);
                })
            )
        )
    );
};

// ============ QUIZ COMPONENT ============
const WeekQuiz = ({ week, onBack, onComplete }) => {
    const [questions] = useState(() => {
        const qs = [...weekQuestions[week]];
        for (let i = qs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [qs[i], qs[j]] = [qs[j], qs[i]];
        }
        return qs.slice(0, 10);
    });
    
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    
    const theme = weekThemes[week];
    const q = questions[currentQ];
    
    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        setAnswered(true);
        
        let isCorrect = false;
        if (q.type === 'mythfact') {
            isCorrect = answer === q.answer;
        } else if (q.type === 'multiple' || q.type === 'scenario') {
            isCorrect = answer === q.answer;
        }
        
        if (isCorrect) setScore(score + 1);
        setShowExplanation(true);
    };
    
    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
            setAnswered(false);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            onComplete(score, questions.length);
        }
    };
    
    const getQuestionTypeLabel = (type) => {
        switch(type) {
            case 'mythfact': return '🎯 Myth or Fact';
            case 'multiple': return '📝 Multiple Choice';
            case 'scenario': return '💼 Scenario';
            default: return '❓ Question';
        }
    };
    
    return (
        React.createElement('div', { style: { minHeight: '100vh', backgroundColor: colors.lightBg } },
            // Header
            React.createElement('div', { 
                className: 'quiz-header',
                style: { backgroundColor: theme.color }
            },
                React.createElement('button', { 
                    onClick: onBack, 
                    className: 'quiz-header-btn'
                }, '← Exit'),
                React.createElement('div', { style: { textAlign: 'center' } },
                    React.createElement('p', { style: { color: 'white', fontSize: 14, opacity: 0.9 } }, `Week ${week}`),
                    React.createElement('p', { style: { color: 'white', fontWeight: 'bold' } }, theme.name)
                ),
                React.createElement('div', { className: 'quiz-score-badge' }, `${score}/${currentQ + (answered ? 1 : 0)}`)
            ),
            // Progress bar
            React.createElement('div', { className: 'progress-bar-container' },
                React.createElement('div', { 
                    className: 'progress-bar-fill',
                    style: { 
                        width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%`,
                        backgroundColor: theme.color
                    }
                })
            ),
            // Question
            React.createElement('div', { className: 'quiz-container' },
                React.createElement('div', { className: 'question-card' },
                    React.createElement('div', { 
                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
                    },
                        React.createElement('span', { 
                            className: 'question-type-badge',
                            style: { color: theme.color, backgroundColor: theme.color + '20' }
                        }, getQuestionTypeLabel(q.type)),
                        React.createElement('span', { style: { fontSize: 14, color: '#999' } }, `${currentQ + 1} of ${questions.length}`)
                    ),
                    q.type === 'mythfact' && React.createElement(MythFactQuestion, { q, onAnswer: handleAnswer, answered, selectedAnswer }),
                    q.type === 'multiple' && React.createElement(MultipleChoiceQuestion, { q, onAnswer: handleAnswer, answered, selectedAnswer }),
                    q.type === 'scenario' && React.createElement(ScenarioQuestion, { q, onAnswer: handleAnswer, answered, selectedAnswer }),
                    showExplanation && q.explanation && React.createElement('div', { className: 'explanation-box' },
                        React.createElement('p', { className: 'explanation-label' }, '💡 KEY TAKEAWAY'),
                        React.createElement('p', { className: 'explanation-text' }, q.explanation)
                    ),
                    answered && React.createElement('button', {
                        onClick: nextQuestion,
                        className: 'next-btn'
                    }, currentQ < questions.length - 1 ? 'Next Question →' : 'See Results 🎉')
                )
            )
        )
    );
};

// ============ RESULTS COMPONENT ============
const QuizResults = ({ week, score, total, onRetry, onBack }) => {
    const theme = weekThemes[week];
    const percentage = Math.round((score / total) * 100);
    
    const getMessage = () => {
        if (percentage >= 90) return { emoji: '🏆', text: 'Outstanding!', sub: 'You\'ve mastered this week\'s material!' };
        if (percentage >= 70) return { emoji: '⭐', text: 'Great Job!', sub: 'You\'re well on your way to mastery.' };
        if (percentage >= 50) return { emoji: '💪', text: 'Good Effort!', sub: 'Review the material and try again.' };
        return { emoji: '📚', text: 'Keep Learning!', sub: 'This material takes practice. You\'ve got this!' };
    };
    
    const msg = getMessage();
    
    return (
        React.createElement('div', { className: 'results-container' },
            React.createElement('div', { className: 'results-card' },
                React.createElement('div', { className: 'results-emoji' }, msg.emoji),
                React.createElement('h2', null, msg.text),
                React.createElement('p', { className: 'results-sub' }, msg.sub),
                React.createElement('div', { 
                    className: 'score-display',
                    style: { backgroundColor: theme.color + '15' }
                },
                    React.createElement('p', { 
                        className: 'score-number',
                        style: { color: theme.color }
                    }, `${score}/${total}`),
                    React.createElement('p', { className: 'score-percentage' }, `${percentage}% Correct`),
                    React.createElement('div', { className: 'score-bar' },
                        React.createElement('div', { 
                            className: 'score-bar-fill',
                            style: {
                                width: `${percentage}%`,
                                backgroundColor: percentage >= 70 ? colors.green : percentage >= 50 ? colors.gold : colors.red
                            }
                        })
                    )
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
                    React.createElement('button', {
                        onClick: onRetry,
                        style: {
                            padding: 16,
                            backgroundColor: theme.color,
                            color: 'white',
                            border: 'none',
                            borderRadius: 10,
                            fontSize: 16,
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }
                    }, '🔄 Try Again'),
                    React.createElement('button', {
                        onClick: onBack,
                        style: {
                            padding: 16,
                            backgroundColor: 'transparent',
                            color: colors.navy,
                            border: `2px solid ${colors.navy}`,
                            borderRadius: 10,
                            fontSize: 16,
                            cursor: 'pointer'
                        }
                    }, '← Back to Menu')
                )
            )
        )
    );
};

// ============ MAIN APP ============
function App() {
    const [screen, setScreen] = useState('menu');
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [lastScore, setLastScore] = useState({ score: 0, total: 0 });
    const [progress, setProgress] = useState(getProgress());
    
    const startQuiz = (week) => {
        setSelectedWeek(week);
        setScreen('quiz');
    };
    
    const handleComplete = (score, total) => {
        setLastScore({ score, total });
        
        const newProgress = { ...progress };
        const weekKey = `week${selectedWeek}`;
        if (!newProgress.weekScores[weekKey] || score > newProgress.weekScores[weekKey].score) {
            newProgress.weekScores[weekKey] = { score, total, date: new Date().toISOString() };
        }
        newProgress.totalQuizzes = (newProgress.totalQuizzes || 0) + 1;
        newProgress.lastPlayed = new Date().toISOString();
        
        setProgress(newProgress);
        saveProgress(newProgress);
        
        setScreen('results');
    };
    
    const goToMenu = () => {
        setScreen('menu');
        setSelectedWeek(null);
    };
    
    if (screen === 'quiz' && selectedWeek) {
        return React.createElement(WeekQuiz, { 
            week: selectedWeek, 
            onBack: goToMenu,
            onComplete: handleComplete
        });
    }
    
    if (screen === 'results') {
        return React.createElement(QuizResults, {
            week: selectedWeek,
            score: lastScore.score,
            total: lastScore.total,
            onRetry: () => setScreen('quiz'),
            onBack: goToMenu
        });
    }
    
    // Menu screen
    return (
        React.createElement('div', { style: { minHeight: '100vh', backgroundColor: colors.navy } },
            // Header
            React.createElement('div', { className: 'header-gradient' },
                React.createElement('h1', null, '🏠 Reverse Mortgage Mastery'),
                React.createElement('p', null, '5-Week Training Quiz Hub'),
                React.createElement('div', { className: 'stats-bar' },
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('p', { className: 'stat-value' }, `${Object.keys(progress.weekScores).length}/5`),
                        React.createElement('p', { className: 'stat-label' }, 'Weeks Completed')
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('p', { className: 'stat-value' }, progress.totalQuizzes || 0),
                        React.createElement('p', { className: 'stat-label' }, 'Quizzes Taken')
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('p', { className: 'stat-value' }, Object.values(progress.weekScores).reduce((sum, w) => sum + (w.score || 0), 0)),
                        React.createElement('p', { className: 'stat-label' }, 'Total Points')
                    )
                )
            ),
            // Week selection
            React.createElement('div', { className: 'container' },
                React.createElement('h2', { className: 'text-white mb-16 fs-18' }, 'Choose a Week'),
                React.createElement('div', null,
                    [1, 2, 3, 4, 5].map(week => {
                        const theme = weekThemes[week];
                        const weekScore = progress.weekScores[`week${week}`];
                        const bestScore = weekScore ? Math.round((weekScore.score / weekScore.total) * 100) : null;
                        
                        return React.createElement('button', {
                            key: week,
                            onClick: () => startQuiz(week),
                            className: 'week-card'
                        },
                            React.createElement('div', { 
                                className: 'week-icon',
                                style: { backgroundColor: theme.color }
                            }, theme.icon),
                            React.createElement('div', { style: { flex: 1 } },
                                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                                    React.createElement('span', { 
                                        className: 'week-badge',
                                        style: { color: theme.color, backgroundColor: theme.color + '20' }
                                    }, `WEEK ${week}`),
                                    bestScore !== null && React.createElement('span', {
                                        style: {
                                            fontSize: 11,
                                            color: bestScore >= 70 ? colors.green : colors.gold,
                                            fontWeight: 'bold'
                                        }
                                    }, `${bestScore >= 90 ? '🏆' : bestScore >= 70 ? '⭐' : ''} Best: ${bestScore}%`)
                                ),
                                React.createElement('h3', null, theme.name),
                                React.createElement('p', { className: 'tagline' }, theme.tagline)
                            ),
                            React.createElement('div', { style: { color: theme.color, fontSize: 20 } }, '→')
                        );
                    })
                ),
                // Final Exam button
                React.createElement('button', {
                    onClick: () => alert('🎓 Final Exam coming soon! Complete all 5 weeks first.'),
                    className: 'final-exam-btn'
                },
                    React.createElement('span', null, '🎓'),
                    React.createElement('div', { style: { textAlign: 'left' } },
                        React.createElement('p', { className: 'title' }, 'Final Exam'),
                        React.createElement('p', { className: 'subtitle' }, 'Test your knowledge across all 5 weeks')
                    )
                ),
                // Reset progress
                progress.totalQuizzes > 0 && React.createElement('button', {
                    onClick: () => {
                        if (confirm('Reset all progress? This cannot be undone.')) {
                            setProgress({ weekScores: {}, totalQuizzes: 0, streak: 0, lastPlayed: null, achievements: [] });
                            saveProgress({ weekScores: {}, totalQuizzes: 0, streak: 0, lastPlayed: null, achievements: [] });
                        }
                    },
                    className: 'reset-btn'
                }, 'Reset Progress'),
                // Footer
                React.createElement('p', { className: 'footer' }, 'Luminate Bank | Retirement Mortgage Training')
            )
        )
    );
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));
