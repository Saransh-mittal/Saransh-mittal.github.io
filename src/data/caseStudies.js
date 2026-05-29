// ============================================================
// Long-form case study content — synthesized from /docs.
// Hash-routed by the case-study page (case-study.html#<id>).
// Each project: hero meta, narrative arc, architecture
// sections, numbers, lessons, and the next case to loop to.
// ============================================================

export const caseStudies = {
  'disciplog': {
    id: 'disciplog',
    name: 'DiscipLog',
    nameParts: { pre: 'Discip', it: 'Log', post: '' },
    accent: '#e8b14b',
    tagline: 'Private AI execution coach',
    summary:
      'A coach that learns from the work you actually do — manual logs, focused sprints, IDE telemetry and AI-agent conversations all collapse into one durable execution record, then a coach reasons from it.',
    url: 'disciplog.com',
    meta: [
      { k: 'Year', v: '2026 — Present' },
      { k: 'Role', v: 'Founder · Engineering & Product' },
      { k: 'Status', v: 'In progress' },
      { k: 'Stack', v: 'Next.js · TS · MongoDB · OpenAI' },
    ],
    overview: [
      'DiscipLog is not a habit tracker, time tracker, or IDE-analytics tool — it is a feedback loop for people who are trying to get better at showing up consistently across real areas of their life.',
      'The core loop: capture what actually happened → convert it into a clean log → roll it into memory, knowledge, and patterns → give the user one useful next move → learn whether that advice landed.',
      'The wedge is developers and AI-assisted knowledge workers. They already generate structured signals while working, so the work record can become partially automatic — making the coach much smarter with less logging friction.',
    ],
    pull: {
      quote:
        'DiscipLog turns manual logs, focused sprints, coding activity, and AI-agent collaboration into one private execution record — then uses that record to coach the user on discipline, consistency, and momentum.',
      attribution: 'Product thesis',
    },
    sections: [
      {
        n: '01',
        title: 'One durable object',
        body: 'Everything bends toward creating better logs. Manual quick logs, sprint check-ins, IDE event sessionization, MCP AI-turn events, and WakaTime heartbeats all become the same LogEntry — then flow through embeddings, memory, knowledge, coach cards, debriefs, and nudges.',
        bullets: [
          'Source-agnostic pipeline · manual · sprint · ide · ai_agent',
          'Auto-categorization with user corrections that win',
          'Every save fans out to memory, knowledge, patterns and cards',
        ],
      },
      {
        n: '02',
        title: 'Coach Workspace v2',
        body: 'The Coach tab is no longer a floating drawer. It is a full workspace with six sections — hero, weekly digest, patterns, conversation, reflection and memory, and sustainability. A real fallback chain keeps the hero useful even on quiet accounts.',
        bullets: [
          'Inline streaming chat with tool calls & reasoning',
          'Editable beliefs — coach can infer, user has veto power',
          'Sustainability: pace, variance, burnout risk, hold / push / rest',
          'Persistent ChatSession records with theme extraction',
        ],
      },
      {
        n: '03',
        title: 'Activity Sources',
        body: 'Three first-party producers feed the sessionizer: a VS Code extension for passive capture, a WakaTime-compatible endpoint, and an MCP server that lets AI agents report collaboration quality — prompt summaries, outcomes, self-critique, permission-waits.',
        bullets: [
          'vscode · wakatime · mcp · (browser coming)',
          'Sanitized event allowlists · strict mode redacts paths & branches',
          'Practice Mode opt-in, capped by size, wiped after sessionization',
          'Raw events auto-delete after seven days',
        ],
      },
      {
        n: '04',
        title: 'MCP permission-wait tracking',
        body: 'When an AI agent needs user permission before a gated action, it calls start_ai_blocked_on_user; when permission resolves it calls finish_ai_blocked_on_user. DiscipLog stores an AgentBlock, subtracts blocked time from productive time, and can push after five minutes.',
        bullets: [
          'Coaching-grade signals on how you prompt',
          'Whether the agent shipped or got blocked',
          'Whether you maintained ownership of the work',
        ],
      },
      {
        n: '05',
        title: 'Free / Pro entitlements',
        body: 'Pro maps to expensive, automated or deeply personalized intelligence — not arbitrary lockouts. A 15-day no-card trial unlocks the full surface; server code uses getEffectiveSubscription so a stale plan field can\'t slip through.',
        bullets: [
          'Activity sources, automatic sprints — Pro',
          'Weekly digest, patterns, sustainability — Pro',
          'Manual logs, manual sprints, base chat — Free',
          'Hourly cron expires trials and manual grants',
        ],
      },
    ],
    numbers: [
      { v: '8', label: 'Major MVP surfaces' },
      { v: '14', label: 'Event types ingested' },
      { v: '10', label: 'Cron jobs scheduled' },
      { v: '6', label: 'Coach workspace sections' },
    ],
    lessons: [
      'The coach must stay evidence-grounded — silence is a valid result.',
      'Categories belong to the user. AI can suggest; user correction always wins.',
      'Privacy is a product feature, not a settings footnote.',
      'AI-agent tracking is about collaboration quality, not surveillance.',
    ],
    next: 'quick-clash',
  },

  'quick-clash': {
    id: 'quick-clash',
    name: 'Quick Clash',
    nameParts: { pre: 'Quick ', it: 'Clash', post: '' },
    accent: '#f08a3c',
    tagline: 'Real-time multiplayer quiz battles',
    summary:
      'Competitive 1v1 and 4v4 quiz battles with hybrid real-time + asynchronous matchmaking. A bot-injection system solved the cold-start problem so the lobby never feels empty.',
    url: 'quickclash.io',
    meta: [
      { k: 'Year', v: '2024 — 2026' },
      { k: 'Role', v: 'Solo engineer · Systems & game design' },
      { k: 'Status', v: 'Completed · v2 shipped' },
      { k: 'Stack', v: 'React · Node · Socket.io · Mongo · Redis' },
    ],
    overview: [
      'v1 of Quick Clash was a real-time multiplayer addition layered on top of Rapid Recap. v2 became a full pivot — from content platform to competitive learning system, rebuilt from the ground up with retention as the design constraint.',
      'The hardest problem was cold-start. Real-time multiplayer is fun only when there is someone to play with, and a young product has nobody. The answer was a bot-simulation system that mimicked human pacing closely enough that the lobby felt alive from day one.',
    ],
    pull: {
      quote: 'Retention beats acquisition. Product psychology is the actual engineering problem.',
      attribution: 'Lesson learned',
    },
    sections: [
      {
        n: '01',
        title: 'Forge → Quiz → Reward',
        body: 'v2 designed the entire gameplay loop end to end. Forge is the learning phase. Quiz is the testing phase. Reward is the feedback phase. Each one feeds into the next so a session has a coherent emotional arc.',
        bullets: [
          'Session-based onboarding with progressive feature unlocking',
          'Coins, power-ups, inventory — strategic resource management',
          'Streak mechanics, instant rewards, daily challenges',
          'Viral loops baked into the reward step',
        ],
      },
      {
        n: '02',
        title: 'Spark matchmaking engine',
        body: 'Hybrid real-time + async matchmaking. If two real opponents are queued, the match is live. If not, the system spins an async slot with a 24h response window, then auto-forms teams and falls back to bot-assisted play if needed.',
        bullets: [
          '1v1 and 4v4 team battles',
          'Auto-team-formation by trophy ELO',
          'Bot-assisted fallback for instant play',
          'Async gameplay with a 24-hour window',
        ],
      },
      {
        n: '03',
        title: 'Bot simulation system',
        body: 'Bots are not random number generators. They sim real user behavior — response timing, answer-difficulty curves, occasional wrong-but-plausible answers — so they read as players, not as filler. This is what solved cold-start concurrency in v1.',
        bullets: [
          'Latency-shaped response timing',
          'Skill-tiered answer distributions',
          'Trophy-aware matchmaking weighting',
        ],
      },
      {
        n: '04',
        title: 'Backend craft',
        body: 'v2 ran on a fire-and-forget DB write pattern, with crons sweeping consistency. Push notifications drove return visits. Redis tracked presence and held real-time state. Cloudflare absorbed traffic spikes.',
        bullets: [
          'Fire-and-forget MongoDB writes + reconciler crons',
          'Redis presence + power-up inventory cache',
          'Web push notifications for retention windows',
          'Cloudflare CDN for static + bot traffic shaping',
        ],
      },
    ],
    numbers: [
      { v: '2', label: 'Versions shipped' },
      { v: '4v4', label: 'Max battle size' },
      { v: '24h', label: 'Async window' },
      { v: '0', label: 'Empty lobbies, ever' },
    ],
    lessons: [
      'Cold-start is a product problem before it is an engineering problem.',
      'Retention beats acquisition — a viral loop without a return reason is a leak.',
      'Bots must feel human, not random. The bar is high.',
      'Session-based progressive unlocking outperforms \'show everything\' UX.',
    ],
    next: 'rapid-recap',
  },

  'rapid-recap': {
    id: 'rapid-recap',
    name: 'Rapid Recap AI',
    nameParts: { pre: 'Rapid ', it: 'Recap', post: ' AI' },
    accent: '#5b8def',
    tagline: 'AI knowledge gaming platform',
    summary:
      'News converted into interactive quizzes via a fully automated AI content pipeline. Reached 50–100 daily organic users through advanced SEO infrastructure and bot-cloaked SSR.',
    url: 'rapidrecap.ai',
    meta: [
      { k: 'Year', v: '2024 — 2025' },
      { k: 'Role', v: 'Co-founder · Full-stack & growth' },
      { k: 'Status', v: 'Shipped · 50–100 DAU' },
      { k: 'Stack', v: 'MERN · OpenAI · Redis · Python' },
    ],
    overview: [
      'The thesis: turn current affairs into something you actually play. A daily knowledge platform where the news becomes a quiz, the quiz becomes a competition, and the competition becomes a reason to come back.',
      'Growth was real but small — 50–100 daily organic users, achieved through a custom SEO infrastructure rather than paid acquisition. The lesson under it was bigger than the numbers: traffic without retention is a treadmill.',
    ],
    pull: {
      quote: 'Traffic is not the same as retention. Product-market fit and UX are the actual moats.',
      attribution: 'Lesson learned',
    },
    sections: [
      {
        n: '01',
        title: 'Automated content pipeline',
        body: 'The whole platform sat on top of an automated pipeline: scrape news → summarize with GPT → generate quizzes in four formats → tag and index → publish. The result was thousands of quizzes generated without human authoring.',
        bullets: [
          'OpenAI summarization + automated quiz generation',
          'Four formats: timed · timeline · graph-match · multi-format',
          'Python scraping pipeline as the input layer',
          'Normalised RQM (Rapid Quiz Mastery) scoring across formats',
        ],
      },
      {
        n: '02',
        title: 'SEO engineering',
        body: 'Distribution was the wedge. A custom SEO system — user-agent detection, bot-specific pre-rendered HTML, SSR simulation — got Rapid Recap into a position where Google crawled it like a static site while real users got the SPA.',
        bullets: [
          'User-agent detection + bot-specific HTML',
          'Pre-rendered crawler responses (SSR simulation)',
          'Cloaking system tuned for organic discovery',
          '50–100 daily organic users at peak',
        ],
      },
      {
        n: '03',
        title: 'Performance',
        body: 'Servers were in Singapore, the DB was in India. The latency story was ugly until the perf pass: query tuning, aggregation pipelines, application-level caching, an SSR-based splash for perceived performance, and a CDN layer on top of everything static.',
        bullets: [
          'Cross-region: Singapore servers · India DB',
          'MongoDB query + index + aggregation tuning',
          'Application-level cache + CDN (Cloudflare)',
          'SSR splash screen for perceived performance',
          'TTFB around 300ms',
        ],
      },
      {
        n: '04',
        title: 'WiseWeb — social layer',
        body: 'A friend graph, real-time chat, article sharing, and presence — all built so the gaming layer had social gravity. Socket.io drove chat, Redis tracked who was online, and the article-sharing layer fed the quiz pipeline.',
        bullets: [
          'Friend requests + real-time chat (Socket.io)',
          'Presence tracking in Redis',
          'Article sharing as a social action',
        ],
      },
      {
        n: '05',
        title: 'AI & recommendations',
        body: 'Recommendations started TF-IDF and ended on vector embeddings with cosine similarity — an early version of the search-by-meaning patterns that became central in later projects.',
        bullets: [
          'Embeddings + cosine similarity search',
          'Early TF-IDF recommendation system',
          '10,000+ AI-generated quizzes across the platform\'s life',
        ],
      },
    ],
    numbers: [
      { v: '10k', label: 'AI-generated quizzes' },
      { v: '100', label: 'Peak DAU' },
      { v: '~300', label: 'Milliseconds TTFB' },
      { v: '4', label: 'Quiz formats' },
    ],
    lessons: [
      'Traffic without retention is just a leaky funnel.',
      'Growth is harder than building — and the inverse is never true.',
      'Distribution is a product decision, not a marketing one.',
      'Cross-region latency is a real product constraint, not a perf bug.',
    ],
    next: 'ai-yoga',
  },

  'ai-yoga': {
    id: 'ai-yoga',
    name: 'AI Yoga Guide',
    nameParts: { pre: 'AI ', it: 'Yoga', post: ' Guide' },
    accent: '#5ec99a',
    tagline: 'Multi-agent breathing assistant',
    summary:
      'An AI breathing coach controlled entirely through natural language. A triage agent routes between specialised agents for voice, settings, and guidance; XTTS handles voice synthesis with async generation.',
    url: 'ai-yoga-application.up.railway.app',
    meta: [
      { k: 'Year', v: 'Sep — Oct 2025' },
      { k: 'Role', v: 'Solo engineer · AI & audio' },
      { k: 'Status', v: 'Prototype' },
      { k: 'Stack', v: 'Next.js · FastAPI · XTTS · Web Audio' },
    ],
    overview: [
      'AI Yoga Guide started as a personal mental-health tool. It also became a deliberate experiment: could a multi-agent AI system act as the entire control layer of an app — every setting, every voice cue, every transition driven by chat?',
      'The answer was yes. The chat surface controls the application; the app does not control the chat surface. That inversion is the core lesson.',
    ],
    pull: {
      quote: 'AI can act as the control layer of an application, not just a feature inside it.',
      attribution: 'Lesson learned',
    },
    sections: [
      {
        n: '01',
        title: 'Multi-agent architecture',
        body: 'A triage agent inspects each user turn and routes to one of three specialised agents: a settings agent (changing inhale/exhale ratios, durations, voice picks), a voice agent (synthesizing guidance text), and a guidance agent (deciding what to say next).',
        bullets: [
          'Triage agent → settings · voice · guidance',
          'Each agent has its own toolset and prompt',
          'Chat as the single control surface for the whole app',
        ],
      },
      {
        n: '02',
        title: 'Voice synthesis pipeline',
        body: 'XTTS-based voice generation, async with threading on the FastAPI backend, streamed back over SSE so the frontend can show real progress instead of a fake spinner. Web Audio API on the client gives low-latency playback and oscillator-based breathing cues.',
        bullets: [
          'XTTS voice synthesis with async threading',
          'SSE streaming for real-time progress',
          'Web Audio API for low-latency playback',
          'Oscillator-based breathing tone cues',
        ],
      },
      {
        n: '03',
        title: 'Frontend',
        body: 'Next.js frontend with Framer Motion driving the breathing animation. The interesting UX work was the event-driven feel — every state change comes in over a stream, so the UI is reactive to the AI\'s decisions rather than the user\'s clicks.',
        bullets: [
          'Next.js + Framer Motion',
          'Event-driven UI over SSE',
          'Chat-driven control of every setting',
        ],
      },
    ],
    numbers: [
      { v: '3', label: 'Specialised agents' },
      { v: '1', label: 'Triage router' },
      { v: 'SSE', label: 'Transport' },
      { v: 'XTTS', label: 'Voice model' },
    ],
    lessons: [
      'Chat as a control layer changes what \'using an app\' means.',
      'Event-driven UX feels more alive than request-response UX.',
      'Audio is harder than it looks — buffering, latency, and threading all matter.',
      'Prototypes are how you learn what a category should feel like.',
    ],
    next: 'disciplog',
  },
};
