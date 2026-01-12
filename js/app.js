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

// ============ LEADERBOARD DATA ============
// This will be replaced with SharePoint/Excel connection
// Structure: { id, name, department, weeksCompleted, totalScore, lastActive }
const LEADERBOARD_CONFIG = {
    // Set to true when SharePoint is connected
    useSharePoint: false,
    // SharePoint Excel file URL (update when connecting)
    sharepointUrl: '',
    // Refresh interval in milliseconds (30 seconds)
    refreshInterval: 30000
};

// Placeholder leaderboard data - replace with SharePoint fetch
const getLeaderboardData = async () => {
    // TODO: Replace with SharePoint/Excel API call
    // Example: const response = await fetch(LEADERBOARD_CONFIG.sharepointUrl);
    // return await response.json();

    // Placeholder data for UI development
    return [
        { id: 1, name: 'Sarah Johnson', department: 'Retail Lending', weeksCompleted: 5, totalScore: 92, lastActive: '2 hours ago', avatar: 'SJ' },
        { id: 2, name: 'Mike Chen', department: 'Branch Sales', weeksCompleted: 5, totalScore: 88, lastActive: '1 hour ago', avatar: 'MC' },
        { id: 3, name: 'Emily Rodriguez', department: 'Mortgage Ops', weeksCompleted: 4, totalScore: 85, lastActive: '3 hours ago', avatar: 'ER' },
        { id: 4, name: 'David Kim', department: 'Retail Lending', weeksCompleted: 4, totalScore: 82, lastActive: '5 hours ago', avatar: 'DK' },
        { id: 5, name: 'Lisa Thompson', department: 'Branch Sales', weeksCompleted: 3, totalScore: 78, lastActive: '1 day ago', avatar: 'LT' },
        { id: 6, name: 'James Wilson', department: 'Mortgage Ops', weeksCompleted: 3, totalScore: 75, lastActive: '2 days ago', avatar: 'JW' },
        { id: 7, name: 'Amanda Foster', department: 'Retail Lending', weeksCompleted: 2, totalScore: 70, lastActive: '3 days ago', avatar: 'AF' },
        { id: 8, name: 'Robert Martinez', department: 'Branch Sales', weeksCompleted: 2, totalScore: 68, lastActive: '1 week ago', avatar: 'RM' },
        { id: 9, name: 'Jennifer Lee', department: 'Mortgage Ops', weeksCompleted: 1, totalScore: 45, lastActive: '1 week ago', avatar: 'JL' },
        { id: 10, name: 'Chris Brown', department: 'Branch Sales', weeksCompleted: 1, totalScore: 40, lastActive: '2 weeks ago', avatar: 'CB' }
    ];
};

// ============ LEADERBOARD COMPONENT ============
const Leaderboard = ({ currentUserScore }) => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, week, department

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            const data = await getLeaderboardData();
            setLeaders(data);
            setLoading(false);
        };

        fetchLeaderboard();

        // Set up refresh interval for live updates
        const interval = setInterval(fetchLeaderboard, LEADERBOARD_CONFIG.refreshInterval);
        return () => clearInterval(interval);
    }, []);

    const getRankBadge = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    const getProgressColor = (weeksCompleted) => {
        if (weeksCompleted === 5) return colors.green;
        if (weeksCompleted >= 3) return colors.cyan;
        if (weeksCompleted >= 1) return colors.gold;
        return '#ddd';
    };

    return React.createElement('div', { className: 'leaderboard-sidebar' },
        // Header
        React.createElement('div', { className: 'leaderboard-header' },
            React.createElement('h3', null, '🏆 Leaderboard'),
            React.createElement('p', { className: 'leaderboard-subtitle' }, 'Live Training Progress')
        ),

        // Filter tabs
        React.createElement('div', { className: 'leaderboard-filters' },
            React.createElement('button', {
                className: `filter-btn ${filter === 'all' ? 'active' : ''}`,
                onClick: () => setFilter('all')
            }, 'All'),
            React.createElement('button', {
                className: `filter-btn ${filter === 'week' ? 'active' : ''}`,
                onClick: () => setFilter('week')
            }, 'This Week'),
            React.createElement('button', {
                className: `filter-btn ${filter === 'department' ? 'active' : ''}`,
                onClick: () => setFilter('department')
            }, 'Dept')
        ),

        // Stats summary
        React.createElement('div', { className: 'leaderboard-stats' },
            React.createElement('div', { className: 'lb-stat' },
                React.createElement('span', { className: 'lb-stat-value' }, leaders.length),
                React.createElement('span', { className: 'lb-stat-label' }, 'Enrolled')
            ),
            React.createElement('div', { className: 'lb-stat' },
                React.createElement('span', { className: 'lb-stat-value' }, leaders.filter(l => l.weeksCompleted === 5).length),
                React.createElement('span', { className: 'lb-stat-label' }, 'Completed')
            ),
            React.createElement('div', { className: 'lb-stat' },
                React.createElement('span', { className: 'lb-stat-value' }, `${Math.round(leaders.reduce((sum, l) => sum + l.totalScore, 0) / leaders.length || 0)}%`),
                React.createElement('span', { className: 'lb-stat-label' }, 'Avg Score')
            )
        ),

        // Leaders list
        React.createElement('div', { className: 'leaderboard-list' },
            loading
                ? React.createElement('div', { className: 'leaderboard-loading' }, 'Loading...')
                : leaders.map((leader, index) =>
                    React.createElement('div', {
                        key: leader.id,
                        className: `leaderboard-item ${index < 3 ? 'top-three' : ''}`
                    },
                        React.createElement('div', { className: 'lb-rank' }, getRankBadge(index + 1)),
                        React.createElement('div', {
                            className: 'lb-avatar',
                            style: { backgroundColor: getProgressColor(leader.weeksCompleted) }
                        }, leader.avatar),
                        React.createElement('div', { className: 'lb-info' },
                            React.createElement('p', { className: 'lb-name' }, leader.name),
                            React.createElement('p', { className: 'lb-dept' }, leader.department),
                            React.createElement('div', { className: 'lb-progress-bar' },
                                React.createElement('div', {
                                    className: 'lb-progress-fill',
                                    style: {
                                        width: `${(leader.weeksCompleted / 5) * 100}%`,
                                        backgroundColor: getProgressColor(leader.weeksCompleted)
                                    }
                                })
                            )
                        ),
                        React.createElement('div', { className: 'lb-score' },
                            React.createElement('span', { className: 'lb-score-value' }, `${leader.totalScore}%`),
                            React.createElement('span', { className: 'lb-weeks' }, `${leader.weeksCompleted}/5 wks`)
                        )
                    )
                )
        ),

        // SharePoint connection status
        React.createElement('div', { className: 'leaderboard-footer' },
            React.createElement('div', {
                className: 'connection-status',
                style: { color: LEADERBOARD_CONFIG.useSharePoint ? colors.green : colors.gold }
            },
                LEADERBOARD_CONFIG.useSharePoint
                    ? '🟢 Live - SharePoint Connected'
                    : '🟡 Demo Mode - Connect SharePoint'
            ),
            React.createElement('p', { className: 'last-updated' }, 'Updates every 30s')
        )
    );
};

// Week themes
const weekThemes = {
    1: { color: colors.pink, icon: '🚀', name: 'The New Era of Reverse', tagline: '"What\'s Changed & Why It Matters"' },
    2: { color: colors.cyan, icon: '💬', name: 'New Messaging', tagline: '"Say It Differently. Sell It Differently."' },
    3: { color: colors.green, icon: '🎯', name: 'Target Markets', tagline: '"Go Beyond the Obvious"' },
    4: { color: colors.purple, icon: '🛠️', name: 'New Tools', tagline: '"AI Scenarios, Micro-Videos & Software"' },
    5: { color: colors.orange, icon: '🤖', name: 'AI Professional Prompts', tagline: '"Get Started with AI"' }
};

// ============ FLASHCARD LESSON DATABASE ============
const weekLessons = {
    1: [
        { front: "The AI-Driven Consumer Shift", back: "Homeowners no longer start with lenders — they start with AI tools (ChatGPT, Google AI, voice assistants) asking life-planning questions, not product questions.", icon: "🤖" },
        { front: "What questions are consumers asking AI?", back: "\"Can I retire if my house is paid off?\" \"How do I eliminate my mortgage payment without selling?\" \"How can I use my equity without downsizing?\"", icon: "❓" },
        { front: "Needs-based vs Rate-based", back: "Today's questions are NEEDS-BASED, not rate-based — and they naturally lead to solutions that leverage home equity. Reverse shows up organically in these searches.", icon: "🎯" },
        { front: "The New Retirement Reality", back: "Cash-flow STRESS vs. net-worth wealth. Early retirement, inflation, and rising fixed expenses are creating new challenges traditional products can't solve.", icon: "💰" },
        { front: "Why traditional strategies fail", back: "Traditional refi and HELOC strategies are FAILING the 55+ demographic. They don't address cash-flow needs or eliminate payment obligations.", icon: "❌" },
        { front: "Reverse Repositioned", back: "Reverse is now a CASH-FLOW PLANNING TOOL. It supports longevity, flexibility, and independence — not a last resort.", icon: "🔄" },
        { front: "Why 'last-resort' language hurts", back: "\"Last-resort loan\" language is OUTDATED and DAMAGING. It prevents clients from seeing reverse as a legitimate retirement planning strategy.", icon: "🚫" },
        { front: "Why Forward LOs must adapt", back: "Consumers are already being educated BEFORE they talk to you. If you can't speak to reverse options, they'll find someone who can — or assume you're not modern.", icon: "⚠️" },
        { front: "Three reasons to learn reverse", back: "1) Protects referral relationships 2) Keeps you relevant as clients age 3) Unlocks conversations competitors are missing.", icon: "🔑" },
        { front: "The key question for every LO", back: "\"The question isn't WHETHER your clients will learn about reverse — it's whether they'll learn about it WITH you or WITHOUT you.\"", icon: "💡" }
    ],
    2: [
        { front: "Why messaging matters now", back: "In an AI-driven world, consumers are pre-educated. Your messaging must RESONATE emotionally, not just inform technically.", icon: "💬" },
        { front: "Say it differently means...", back: "Stop using industry jargon. Speak in terms of OUTCOMES: independence, flexibility, peace of mind — not loan terms.", icon: "🔄" },
        { front: "Sell it differently means...", back: "Lead with empathy and understanding. Position yourself as a GUIDE, not a salesperson pushing a product.", icon: "🤝" },
        { front: "Personality messaging", back: "Your unique voice and story matter. Authenticity builds trust faster than polished scripts.", icon: "✨" },
        { front: "Emotional archetypes: The Protector", back: "\"I want to make sure my family is secure.\" Appeal to their desire to protect loved ones and leave a legacy.", icon: "🛡️" },
        { front: "Emotional archetypes: The Freedom Seeker", back: "\"I want to enjoy retirement without money stress.\" Appeal to independence, travel, and living life fully.", icon: "🦅" },
        { front: "Emotional archetypes: The Planner", back: "\"I want to be smart about my finances.\" Appeal to strategy, control, and making informed decisions.", icon: "📊" },
        { front: "Reframing 'reverse mortgage'", back: "Call it a 'Retirement Mortgage' or 'Home Equity Solution' — language that connects to life goals, not loan mechanics.", icon: "🏷️" },
        { front: "The power of stories", back: "Share real scenarios: \"A client used their equity to eliminate payments and now travels 3 months a year.\" Stories stick.", icon: "📖" },
        { front: "Key messaging shift", back: "From: \"Here's how a reverse mortgage works\" → To: \"Here's how clients like you are solving retirement cash-flow challenges.\"", icon: "💡" }
    ],
    3: [
        { front: "Go beyond the obvious", back: "Everyone targets \"seniors who need money.\" The hidden markets are SEGMENTS with specific life situations that create reverse opportunities.", icon: "🎯" },
        { front: "Hidden Market: Divorcing couples 55+", back: "Home equity is often the largest asset. Reverse can help one spouse stay in the home while buying out the other.", icon: "💔" },
        { front: "Hidden Market: Sandwich generation", back: "Adults 55+ supporting aging parents AND adult children. Reverse frees cash flow for caregiving costs.", icon: "🥪" },
        { front: "Hidden Market: Early retirees", back: "People who retired at 55-62 before Social Security kicks in. They need bridge income — reverse provides it.", icon: "🌉" },
        { front: "Hidden Market: Self-employed without pensions", back: "Business owners with equity but no traditional retirement. Their home IS their retirement plan.", icon: "💼" },
        { front: "Hidden Market: Surviving spouses", back: "After a spouse passes, income often drops but expenses don't. Reverse restores financial stability.", icon: "🕊️" },
        { front: "Hidden Market: Medical expense management", back: "Long-term care, home modifications, ongoing treatments. Reverse provides funds without monthly payment burden.", icon: "🏥" },
        { front: "Hidden Market: Investment portfolio protection", back: "Retirees can use reverse LOC to avoid selling investments during market downturns. It's a strategic buffer.", icon: "📈" },
        { front: "Hidden Market: Homeowners helping adult children", back: "Parents wanting to help kids with down payments or education without depleting retirement savings.", icon: "👨‍👩‍👧" },
        { front: "Finding hidden markets", back: "Ask referral partners: CPAs, divorce attorneys, elder care advisors, financial planners. They see these situations daily.", icon: "🔍" }
    ],
    4: [
        { front: "Modern tools = faster conversations", back: "AI scenarios, micro-videos, and reverse software let you deliver VALUE in seconds, not minutes. Speed builds trust.", icon: "⚡" },
        { front: "30-second reverse simulations", back: "Create quick \"what if\" scenarios: \"Based on your home value, here's what eliminating your payment could look like.\" Instant engagement.", icon: "🎬" },
        { front: "Micro-videos that convert", back: "15-30 second videos answering ONE question: \"Did you know you can stay in your home AND access equity?\" Short, shareable, memorable.", icon: "📱" },
        { front: "AI scenario tools", back: "Use AI to quickly generate personalized scenarios based on client data. Show, don't just tell.", icon: "🤖" },
        { front: "Building your digital presence", back: "Consistent social content positions you as THE reverse expert. Post 2-3x weekly with educational content.", icon: "🌐" },
        { front: "Video topics that work", back: "Myth-busting, client success stories, \"what would happen if\" scenarios, quick tips. Keep it human and helpful.", icon: "🎥" },
        { front: "Reverse software demos", back: "Use screen recordings to walk through real scenarios. Visual proof is more powerful than verbal explanation.", icon: "💻" },
        { front: "SimpleApp while on calls", back: "Pull up scenarios IN REAL TIME while talking to clients. \"Let me show you exactly what this could look like for you.\"", icon: "📊" },
        { front: "Content repurposing", back: "One scenario becomes: a video, a social post, an email, a talking point. Create once, use everywhere.", icon: "♻️" },
        { front: "The new efficiency", back: "Tools don't replace relationships — they ACCELERATE them. More value delivered faster means more conversations, more conversions.", icon: "🚀" }
    ],
    5: [
        { front: "AI Prompt: Retirement Planning Assistant", back: "\"Act as a retirement planning assistant for a homeowner age 55+. What options should be considered to reduce or eliminate monthly mortgage payments without selling the home?\"", icon: "🤖" },
        { front: "AI Prompt: LO Question Guide", back: "\"What questions should a loan officer ask a homeowner age 55+ to determine whether a reverse mortgage should be part of a broader retirement strategy?\"", icon: "❓" },
        { front: "AI Prompt: Market Downturn Buffer", back: "\"Explain how a reverse mortgage line of credit can be used as a buffer during market downturns for a retiree relying on investment accounts for income.\"", icon: "📉" },
        { front: "AI Prompt: Soft-Touch Outreach", back: "\"Create a soft-touch outreach message to past mortgage clients now age 55+ that opens a conversation about retirement planning and home equity — without mentioning reverse mortgages upfront.\"", icon: "✉️" },
        { front: "AI Prompt: Objection Handling", back: "\"List the top 5 objections to reverse mortgages and provide empathetic, educational responses for each.\"", icon: "🛡️" },
        { front: "AI Prompt: Social Media Content", back: "\"Create 5 short social media posts that educate homeowners 55+ about using home equity in retirement without using the term 'reverse mortgage.'\"", icon: "📱" },
        { front: "AI Prompt: Referral Partner Email", back: "\"Write an email to a CPA explaining how reverse mortgages can help their clients with retirement cash-flow planning.\"", icon: "📧" },
        { front: "AI Prompt: Client Scenario", back: "\"Create a realistic scenario of a 67-year-old widow who could benefit from a reverse mortgage, including her situation, concerns, and how the product helps.\"", icon: "📝" },
        { front: "AI Prompt: Comparison Content", back: "\"Compare the pros and cons of a HELOC vs. a reverse mortgage line of credit for a homeowner age 62+ with significant equity.\"", icon: "⚖️" },
        { front: "Getting started with AI", back: "Start simple: Use ONE prompt daily. Refine it based on results. AI gets better as YOU get better at asking the right questions.", icon: "🚀" }
    ]
};

// ============ QUESTION DATABASE ============
const weekQuestions = {
    1: [
        { type: 'mythfact', question: "Homeowners today typically start their mortgage research by calling a lender directly.", answer: false, explanation: "Homeowners now start with AI tools (ChatGPT, Google AI, voice assistants) asking life-planning questions before ever contacting a lender." },
        { type: 'mythfact', question: "Consumers are asking AI needs-based questions, not rate-based questions.", answer: true, explanation: "Questions like 'Can I retire if my house is paid off?' and 'How can I use my equity without downsizing?' naturally lead to reverse mortgage solutions." },
        { type: 'mythfact', question: "Traditional refi and HELOC strategies are effectively serving the 55+ demographic.", answer: false, explanation: "Traditional strategies are FAILING this demographic — they don't address cash-flow needs or eliminate payment obligations." },
        { type: 'mythfact', question: "Reverse mortgages are now showing up organically in AI search results for retirement planning.", answer: true, explanation: "Because consumers ask needs-based questions, AI naturally surfaces reverse mortgages as solutions for home equity and cash-flow planning." },
        { type: 'mythfact', question: "Calling reverse mortgages a 'last-resort loan' is an effective positioning strategy.", answer: false, explanation: "'Last-resort loan' language is OUTDATED and DAMAGING. It prevents clients from seeing reverse as a legitimate retirement planning tool." },
        { type: 'mythfact', question: "Reverse mortgages now sit at the center of retirement planning, not the fringe.", answer: true, explanation: "Consumer behavior has shifted — reverse is becoming part of the standard financial dialogue for 55+ homeowners." },
        { type: 'multiple', question: "Where are homeowners starting their research today?", options: ["Calling their bank", "Visiting lender websites", "Using AI tools like ChatGPT and Google AI", "Reading newspaper ads"], answer: 2, explanation: "The AI-driven consumer shift means homeowners start with AI tools asking life-planning questions, not product-specific questions." },
        { type: 'multiple', question: "What is the 'New Retirement Reality' challenging seniors?", options: ["Too much savings", "Cash-flow stress vs. net-worth wealth", "Low home values", "Easy access to credit"], answer: 1, explanation: "Early retirement, inflation, and rising fixed expenses create cash-flow stress even for seniors with high net worth." },
        { type: 'multiple', question: "How should reverse mortgages be repositioned today?", options: ["As emergency funding only", "As a cash-flow planning tool", "As a last resort", "As a way to give up your home"], answer: 1, explanation: "Reverse is now a cash-flow planning tool that supports longevity, flexibility, and independence." },
        { type: 'multiple', question: "What happens if an LO can't confidently discuss reverse options?", options: ["Nothing, clients don't care", "Borrowers will seek someone who can or assume the LO isn't modern", "Clients will wait indefinitely", "It doesn't matter for referrals"], answer: 1, explanation: "Consumers are already educated before talking to lenders. If you can't speak to reverse, they'll find someone who can." },
        { type: 'scenario', question: "A 60-year-old client asks: 'How can I lower my mortgage payment without selling my home?' What does this signal?", options: ["They want a rate quote for a traditional refinance", "They're asking a needs-based question that could lead to a reverse mortgage conversation", "They're not a good prospect", "They should just sell their home"], answer: 1, explanation: "This is exactly the type of needs-based, life-planning question that AI tools are surfacing — and reverse mortgages answer it directly." }
    ],
    
    2: [
        { type: 'mythfact', question: "In an AI-driven world, technical product knowledge is more important than emotional messaging.", answer: false, explanation: "Consumers are pre-educated by AI. Your messaging must RESONATE emotionally, not just inform technically." },
        { type: 'mythfact', question: "Using industry jargon helps establish credibility with clients.", answer: false, explanation: "Stop using jargon. Speak in terms of OUTCOMES: independence, flexibility, peace of mind — not loan terms." },
        { type: 'mythfact', question: "Authenticity and personality in messaging builds trust faster than polished scripts.", answer: true, explanation: "Your unique voice and story matter. Authenticity builds trust faster than corporate-sounding scripts." },
        { type: 'mythfact', question: "The same message works for all client types.", answer: false, explanation: "Different emotional archetypes (Protector, Freedom Seeker, Planner) need different messaging approaches." },
        { type: 'multiple', question: "What does 'say it differently' mean?", options: ["Use more technical terms", "Speak in terms of outcomes like independence and peace of mind", "Talk faster", "Use industry acronyms"], answer: 1, explanation: "Stop using jargon. Speak in terms of OUTCOMES that matter to clients' lives." },
        { type: 'multiple', question: "What does 'sell it differently' mean?", options: ["Use harder closes", "Position yourself as a guide, not a salesperson", "Offer discounts", "Make more calls"], answer: 1, explanation: "Lead with empathy. Position yourself as a GUIDE helping them navigate options." },
        { type: 'multiple', question: "The 'Freedom Seeker' archetype cares most about:", options: ["Protecting family legacy", "Independence, travel, and living life fully", "Making smart financial decisions", "Getting the best rate"], answer: 1, explanation: "Freedom Seekers want to enjoy retirement without money stress — appeal to independence and experiences." },
        { type: 'multiple', question: "What language should replace 'reverse mortgage'?", options: ["Senior loan", "Retirement Mortgage or Home Equity Solution", "Old person loan", "Bank product"], answer: 1, explanation: "Use language that connects to life goals, not loan mechanics." },
        { type: 'scenario', question: "A client says 'I want to make sure my family is taken care of.' Which archetype is this?", options: ["The Freedom Seeker", "The Planner", "The Protector", "The Risk Taker"], answer: 2, explanation: "The Protector archetype wants to secure their family and leave a legacy. Appeal to protection and security." },
        { type: 'multiple', question: "Why do stories work better than features?", options: ["They're shorter", "They create emotional connection and are memorable", "They hide the product details", "They're required by law"], answer: 1, explanation: "Stories stick. 'A client eliminated payments and now travels 3 months a year' is more powerful than product specs." }
    ],
    
    3: [
        { type: 'mythfact', question: "The only target market for reverse mortgages is 'seniors who need money.'", answer: false, explanation: "Go beyond the obvious! Hidden markets include divorcing couples, sandwich generation, early retirees, and many more." },
        { type: 'mythfact', question: "Divorcing couples 55+ represent a hidden opportunity for reverse mortgages.", answer: true, explanation: "Home equity is often the largest asset. Reverse can help one spouse stay in the home while buying out the other." },
        { type: 'mythfact', question: "Early retirees (55-62) don't qualify for reverse mortgages.", answer: false, explanation: "While HECM requires 62+, this market needs bridge income. They're future clients AND can benefit from planning conversations now." },
        { type: 'mythfact', question: "A reverse mortgage line of credit can protect investment portfolios during market downturns.", answer: true, explanation: "Retirees can use reverse LOC to avoid selling investments at a loss during downturns. It's a strategic buffer." },
        { type: 'multiple', question: "The 'sandwich generation' refers to:", options: ["People who eat lunch at their desk", "Adults 55+ supporting aging parents AND adult children", "Seniors living in multi-generational homes", "First-time homebuyers"], answer: 1, explanation: "Sandwich generation adults face dual caregiving costs. Reverse frees cash flow for these expenses." },
        { type: 'multiple', question: "Which hidden market involves income dropping after a life event?", options: ["Early retirees", "Divorcing couples", "Surviving spouses", "Self-employed"], answer: 2, explanation: "After a spouse passes, income often drops but expenses don't. Reverse restores financial stability." },
        { type: 'multiple', question: "Self-employed people without pensions are a hidden market because:", options: ["They have bad credit", "Their home IS their retirement plan", "They don't trust banks", "They move frequently"], answer: 1, explanation: "Business owners with equity but no traditional retirement often rely on their home as their primary retirement asset." },
        { type: 'multiple', question: "Who are the best referral sources for hidden markets?", options: ["Random cold calls", "CPAs, divorce attorneys, elder care advisors", "Newspaper ads", "Door-to-door visits"], answer: 1, explanation: "Professional advisors see these life situations daily. They can identify perfect reverse candidates." },
        { type: 'scenario', question: "A 58-year-old tells you they retired early and are worried about income before Social Security kicks in at 62. What do you say?", options: ["Sorry, you're too young for a reverse mortgage.", "Let's discuss how a reverse mortgage at 62 could provide bridge income, and plan for that now.", "You should go back to work.", "Sell your home and downsize."], answer: 1, explanation: "Early retirees need bridge income. Position reverse as a future solution and start the planning conversation." },
        { type: 'multiple', question: "Parents helping adult children with down payments is a hidden market because:", options: ["It's illegal", "They can access equity without depleting retirement savings", "Their kids have bad credit", "Banks require it"], answer: 1, explanation: "Reverse lets parents help kids financially without sacrificing their own retirement security." }
    ],
    
    4: [
        { type: 'mythfact', question: "Modern AI tools allow you to deliver value in seconds, not minutes.", answer: true, explanation: "AI scenarios, micro-videos, and reverse software let you deliver VALUE instantly. Speed builds trust." },
        { type: 'mythfact', question: "Long-form videos (5+ minutes) are more effective than short videos for reverse mortgage marketing.", answer: false, explanation: "15-30 second micro-videos capture attention without losing your audience. Short, shareable, memorable." },
        { type: 'mythfact', question: "You should create scenarios in real-time while on calls with prospects.", answer: true, explanation: "Pull up scenarios IN REAL TIME. 'Let me show you exactly what this could look like for you' keeps engagement high." },
        { type: 'mythfact', question: "One piece of content can only be used once.", answer: false, explanation: "Content repurposing: One scenario becomes a video, social post, email, and talking point. Create once, use everywhere." },
        { type: 'multiple', question: "What is a '30-second reverse simulation'?", options: ["A quick nap", "A 'what if' scenario showing potential payment elimination", "A timed sales pitch", "A compliance requirement"], answer: 1, explanation: "Quick 'what if' scenarios: 'Based on your home value, here's what eliminating your payment could look like.'" },
        { type: 'multiple', question: "How long should micro-videos be?", options: ["5-10 minutes", "2-3 minutes", "15-30 seconds", "1 hour"], answer: 2, explanation: "15-30 seconds answers ONE question. Short, shareable, and memorable content wins." },
        { type: 'multiple', question: "How often should you post educational content on social media?", options: ["Once a month", "2-3 times weekly", "Once a year", "Never"], answer: 1, explanation: "Consistent posting (2-3x weekly) positions you as THE reverse expert in your market." },
        { type: 'multiple', question: "What video topics work best?", options: ["Rate announcements only", "Myth-busting, success stories, 'what if' scenarios", "Company news", "Industry regulations"], answer: 1, explanation: "Myth-busting, client success stories, and 'what would happen if' scenarios keep content human and helpful." },
        { type: 'scenario', question: "You're on a call and the client is curious but hesitant. What's your best move?", options: ["Send them a brochure to read later", "Pull up a quick scenario in real-time to show them their potential numbers", "End the call and follow up next week", "Transfer them to someone else"], answer: 1, explanation: "Show, don't just tell. Real-time scenarios create immediate engagement and demonstrate value." },
        { type: 'multiple', question: "Tools don't replace relationships — they:", options: ["Make them unnecessary", "ACCELERATE them", "Complicate them", "Replace them entirely"], answer: 1, explanation: "More value delivered faster means more conversations, more conversions. Tools accelerate relationships." }
    ],
    
    5: [
        { type: 'mythfact', question: "AI prompts work best when they're specific about the audience and desired outcome.", answer: true, explanation: "Specific prompts like 'Act as a retirement planning assistant for a homeowner age 55+' get better results than vague requests." },
        { type: 'mythfact', question: "You should use AI to make lending decisions.", answer: false, explanation: "AI is a tool for content, analysis, and efficiency — NOT for making lending decisions. Human judgment is still essential." },
        { type: 'mythfact', question: "AI can help create soft-touch outreach that doesn't mention reverse mortgages upfront.", answer: true, explanation: "AI excels at creating gentle, value-focused messages that open retirement planning conversations naturally." },
        { type: 'mythfact', question: "You need to be an AI expert to use prompts effectively.", answer: false, explanation: "Start simple: Use ONE prompt daily. Refine it based on results. AI gets better as YOU get better at asking." },
        { type: 'multiple', question: "What's a good AI prompt for retirement planning?", options: ["Tell me about mortgages", "Act as a retirement planning assistant for homeowners 55+ — what options reduce payments without selling?", "Give me leads", "Write a contract"], answer: 1, explanation: "Specific, role-based prompts with clear context get the best AI responses." },
        { type: 'multiple', question: "AI can help explain how a reverse LOC acts as:", options: ["A credit card", "A buffer during market downturns for retirees", "A checking account", "A savings bond"], answer: 1, explanation: "AI can explain complex concepts like using reverse LOC to avoid selling investments during market dips." },
        { type: 'multiple', question: "What should you ask AI to create for referral partners?", options: ["Legal contracts", "Emails explaining how reverse helps their clients' retirement planning", "Loan applications", "Credit reports"], answer: 1, explanation: "AI can write professional emails to CPAs, attorneys, and planners explaining the reverse value proposition." },
        { type: 'multiple', question: "How should you start using AI in your practice?", options: ["Use 50 prompts on day one", "Start with ONE prompt daily and refine based on results", "Wait until it's perfect", "Only use it for personal tasks"], answer: 1, explanation: "Start simple and iterate. AI gets better as you get better at asking the right questions." },
        { type: 'scenario', question: "You want to reach out to past clients now 55+ without being salesy. What AI prompt helps?", options: ["Write a sales pitch for reverse mortgages", "Create a soft-touch message about retirement planning and home equity without mentioning reverse upfront", "Generate a list of interest rates", "Write a legal disclaimer"], answer: 1, explanation: "AI excels at creating soft, value-focused outreach that opens conversations naturally." },
        { type: 'multiple', question: "Which AI prompt helps with objection handling?", options: ["List mortgage rates", "List top 5 objections to reverse mortgages with empathetic, educational responses", "Write a complaint letter", "Generate random numbers"], answer: 1, explanation: "AI can help you prepare for common objections with thoughtful, educational responses." }
    ]
};

// ============ STORAGE HELPERS ============
const getProgress = () => {
    try {
        const saved = localStorage.getItem('reverseTrainingProgress');
        const defaultProgress = {
            weekScores: {},
            totalQuizzes: 0,
            streak: 0,
            lastPlayed: null,
            achievements: [],
            completedWeeks: [],
            allUnlocked: false
        };
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...defaultProgress, ...parsed };
        }
        return defaultProgress;
    } catch {
        return { weekScores: {}, totalQuizzes: 0, streak: 0, lastPlayed: null, achievements: [], completedWeeks: [], allUnlocked: false };
    }
};

const saveProgress = (progress) => {
    try {
        localStorage.setItem('reverseTrainingProgress', JSON.stringify(progress));
    } catch {}
};

// Check if a week is unlocked
const isWeekUnlocked = (week, progress) => {
    if (progress.allUnlocked) return true;
    if (week === 1) return true;
    return progress.completedWeeks.includes(week - 1);
};

// Mark a week as completed (requires passing score of 70%)
const markWeekCompleted = (week, score, total, progress) => {
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 70 && !progress.completedWeeks.includes(week)) {
        progress.completedWeeks.push(week);
    }
    return progress;
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

// ============ FLASHCARD LESSON COMPONENT ============
const WeekLesson = ({ week, onBack, onStartQuiz }) => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [viewedCards, setViewedCards] = useState(new Set());
    const [lessonComplete, setLessonComplete] = useState(false);

    const theme = weekThemes[week];
    const cards = weekLessons[week];
    const card = cards[currentCard];

    const flipCard = () => {
        if (!isFlipped) {
            const newViewed = new Set(viewedCards);
            newViewed.add(currentCard);
            setViewedCards(newViewed);
        }
        setIsFlipped(!isFlipped);
    };

    const nextCard = () => {
        if (currentCard < cards.length - 1) {
            setCurrentCard(currentCard + 1);
            setIsFlipped(false);
        } else if (viewedCards.size === cards.length) {
            setLessonComplete(true);
        }
    };

    const prevCard = () => {
        if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
            setIsFlipped(false);
        }
    };

    const progress = Math.round((viewedCards.size / cards.length) * 100);

    if (lessonComplete) {
        return (
            React.createElement('div', { className: 'results-container' },
                React.createElement('div', { className: 'results-card' },
                    React.createElement('div', { className: 'results-emoji' }, '🎉'),
                    React.createElement('h2', null, 'Lesson Complete!'),
                    React.createElement('p', { className: 'results-sub' }, `You've reviewed all ${cards.length} flashcards for Week ${week}.`),
                    React.createElement('div', {
                        className: 'score-display',
                        style: { backgroundColor: theme.color + '15' }
                    },
                        React.createElement('p', {
                            className: 'score-number',
                            style: { color: theme.color }
                        }, `${cards.length}/${cards.length}`),
                        React.createElement('p', { className: 'score-percentage' }, 'Cards Reviewed')
                    ),
                    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
                        React.createElement('button', {
                            onClick: onStartQuiz,
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
                        }, '📝 Take the Quiz'),
                        React.createElement('button', {
                            onClick: () => { setCurrentCard(0); setIsFlipped(false); setViewedCards(new Set()); setLessonComplete(false); },
                            style: {
                                padding: 16,
                                backgroundColor: 'transparent',
                                color: colors.navy,
                                border: `2px solid ${colors.navy}`,
                                borderRadius: 10,
                                fontSize: 16,
                                cursor: 'pointer'
                            }
                        }, '🔄 Review Again'),
                        React.createElement('button', {
                            onClick: onBack,
                            style: {
                                padding: 12,
                                backgroundColor: 'transparent',
                                color: '#666',
                                border: 'none',
                                fontSize: 14,
                                cursor: 'pointer'
                            }
                        }, '← Back to Menu')
                    )
                )
            )
        );
    }

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
                    React.createElement('p', { style: { color: 'white', fontSize: 14, opacity: 0.9 } }, `Week ${week} Lesson`),
                    React.createElement('p', { style: { color: 'white', fontWeight: 'bold' } }, theme.name)
                ),
                React.createElement('div', { className: 'quiz-score-badge' }, `${viewedCards.size}/${cards.length}`)
            ),
            // Progress bar
            React.createElement('div', { className: 'progress-bar-container' },
                React.createElement('div', {
                    className: 'progress-bar-fill',
                    style: {
                        width: `${progress}%`,
                        backgroundColor: theme.color
                    }
                })
            ),
            // Flashcard area
            React.createElement('div', { className: 'quiz-container' },
                // Card counter
                React.createElement('div', {
                    style: {
                        textAlign: 'center',
                        marginBottom: 16,
                        color: '#666',
                        fontSize: 14
                    }
                }, `Card ${currentCard + 1} of ${cards.length}`),

                // Flashcard
                React.createElement('div', {
                    className: 'flashcard-container',
                    onClick: flipCard
                },
                    React.createElement('div', {
                        className: `flashcard ${isFlipped ? 'flipped' : ''}`,
                        style: { '--card-color': theme.color }
                    },
                        // Front of card
                        React.createElement('div', { className: 'flashcard-front' },
                            React.createElement('div', {
                                className: 'flashcard-icon',
                                style: { backgroundColor: theme.color + '20' }
                            }, card.icon),
                            React.createElement('p', { className: 'flashcard-question' }, card.front),
                            React.createElement('p', { className: 'flashcard-hint' }, 'Tap to reveal answer')
                        ),
                        // Back of card
                        React.createElement('div', {
                            className: 'flashcard-back',
                            style: { backgroundColor: theme.color }
                        },
                            React.createElement('div', { className: 'flashcard-icon flashcard-icon-back' }, '💡'),
                            React.createElement('p', { className: 'flashcard-answer' }, card.back),
                            React.createElement('p', { className: 'flashcard-hint-back' }, 'Tap to see question')
                        )
                    )
                ),

                // Navigation buttons
                React.createElement('div', { className: 'flashcard-nav' },
                    React.createElement('button', {
                        onClick: prevCard,
                        disabled: currentCard === 0,
                        className: 'flashcard-nav-btn',
                        style: { opacity: currentCard === 0 ? 0.3 : 1 }
                    }, '← Previous'),
                    React.createElement('div', { className: 'flashcard-dots' },
                        cards.map((_, i) =>
                            React.createElement('div', {
                                key: i,
                                className: 'flashcard-dot',
                                style: {
                                    backgroundColor: i === currentCard ? theme.color : viewedCards.has(i) ? theme.color + '50' : '#ddd'
                                },
                                onClick: (e) => { e.stopPropagation(); setCurrentCard(i); setIsFlipped(false); }
                            })
                        )
                    ),
                    React.createElement('button', {
                        onClick: nextCard,
                        className: 'flashcard-nav-btn',
                        style: {
                            backgroundColor: isFlipped ? theme.color : 'transparent',
                            color: isFlipped ? 'white' : colors.navy,
                            border: isFlipped ? 'none' : `2px solid ${colors.navy}`
                        }
                    }, currentCard === cards.length - 1 && viewedCards.size === cards.length ? 'Complete ✓' : 'Next →')
                ),

                // Skip to quiz option
                React.createElement('button', {
                    onClick: onStartQuiz,
                    style: {
                        width: '100%',
                        marginTop: 24,
                        padding: 12,
                        backgroundColor: 'transparent',
                        border: `1px solid ${theme.color}`,
                        borderRadius: 8,
                        color: theme.color,
                        fontSize: 14,
                        cursor: 'pointer'
                    }
                }, 'Skip to Quiz →')
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

    const startLesson = (week) => {
        setSelectedWeek(week);
        setScreen('lesson');
    };
    
    const handleComplete = (score, total) => {
        setLastScore({ score, total });

        let newProgress = { ...progress };
        const weekKey = `week${selectedWeek}`;
        if (!newProgress.weekScores[weekKey] || score > newProgress.weekScores[weekKey].score) {
            newProgress.weekScores[weekKey] = { score, total, date: new Date().toISOString() };
        }
        newProgress.totalQuizzes = (newProgress.totalQuizzes || 0) + 1;
        newProgress.lastPlayed = new Date().toISOString();

        // Mark week as completed if passed (70%+)
        newProgress = markWeekCompleted(selectedWeek, score, total, newProgress);

        setProgress(newProgress);
        saveProgress(newProgress);

        setScreen('results');
    };

    const toggleUnlockAll = () => {
        const newProgress = { ...progress, allUnlocked: !progress.allUnlocked };
        setProgress(newProgress);
        saveProgress(newProgress);
    };
    
    const goToMenu = () => {
        setScreen('menu');
        setSelectedWeek(null);
    };
    
    if (screen === 'lesson' && selectedWeek) {
        return React.createElement(WeekLesson, {
            week: selectedWeek,
            onBack: goToMenu,
            onStartQuiz: () => setScreen('quiz')
        });
    }

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
        React.createElement('div', { className: 'app-layout' },
            // Leaderboard Sidebar
            React.createElement(Leaderboard, { currentUserScore: progress }),

            // Main Content
            React.createElement('div', { className: 'main-content' },
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
                        const unlocked = isWeekUnlocked(week, progress);
                        const isCompleted = progress.completedWeeks.includes(week);

                        return React.createElement('div', {
                            key: week,
                            className: `week-card-container ${!unlocked ? 'locked' : ''}`
                        },
                            React.createElement('div', { className: 'week-card-info' },
                                React.createElement('div', {
                                    className: 'week-icon',
                                    style: { backgroundColor: unlocked ? theme.color : '#9CA3AF' }
                                }, unlocked ? theme.icon : '🔒'),
                                React.createElement('div', { style: { flex: 1 } },
                                    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' } },
                                        React.createElement('span', {
                                            className: 'week-badge',
                                            style: {
                                                color: unlocked ? theme.color : '#9CA3AF',
                                                backgroundColor: unlocked ? theme.color + '20' : '#E5E7EB'
                                            }
                                        }, `WEEK ${week}`),
                                        isCompleted && React.createElement('span', {
                                            style: {
                                                fontSize: 11,
                                                color: colors.green,
                                                fontWeight: 'bold'
                                            }
                                        }, '✓ Completed'),
                                        bestScore !== null && React.createElement('span', {
                                            style: {
                                                fontSize: 11,
                                                color: bestScore >= 70 ? colors.green : colors.gold,
                                                fontWeight: 'bold'
                                            }
                                        }, `${bestScore >= 90 ? '🏆' : bestScore >= 70 ? '⭐' : ''} Best: ${bestScore}%`)
                                    ),
                                    React.createElement('h3', { style: { color: unlocked ? colors.navy : '#9CA3AF' } }, theme.name),
                                    React.createElement('p', { className: 'tagline' }, unlocked ? theme.tagline : `Complete Week ${week - 1} to unlock`)
                                )
                            ),
                            unlocked ? React.createElement('div', { className: 'week-card-actions' },
                                React.createElement('button', {
                                    onClick: () => startLesson(week),
                                    className: 'week-action-btn learn-btn',
                                    style: { borderColor: theme.color, color: theme.color }
                                }, '📚 Learn'),
                                React.createElement('button', {
                                    onClick: () => startQuiz(week),
                                    className: 'week-action-btn quiz-btn',
                                    style: { backgroundColor: theme.color }
                                }, '📝 Quiz')
                            ) : React.createElement('div', { className: 'week-card-locked' },
                                React.createElement('span', null, `🔒 Complete Week ${week - 1} first (70%+ to pass)`)
                            )
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
                // Admin: Unlock All Weeks button
                React.createElement('button', {
                    onClick: toggleUnlockAll,
                    className: 'unlock-all-btn',
                    style: {
                        backgroundColor: progress.allUnlocked ? colors.green : 'transparent',
                        color: progress.allUnlocked ? 'white' : 'rgba(255,255,255,0.7)',
                        border: progress.allUnlocked ? 'none' : '1px solid rgba(255,255,255,0.3)'
                    }
                }, progress.allUnlocked ? '🔓 All Weeks Unlocked (Click to Lock)' : '🔑 Admin: Unlock All Weeks'),
                // Reset progress
                progress.totalQuizzes > 0 && React.createElement('button', {
                    onClick: () => {
                        if (confirm('Reset all progress? This cannot be undone.')) {
                            const resetProgress = { weekScores: {}, totalQuizzes: 0, streak: 0, lastPlayed: null, achievements: [], completedWeeks: [], allUnlocked: false };
                            setProgress(resetProgress);
                            saveProgress(resetProgress);
                        }
                    },
                    className: 'reset-btn'
                }, 'Reset Progress'),
                    // Footer
                    React.createElement('p', { className: 'footer' }, 'Luminate Bank | Retirement Mortgage Training')
                )
                )
            )
        )
    );
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));
