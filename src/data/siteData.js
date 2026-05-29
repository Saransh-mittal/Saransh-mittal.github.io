// ============================================================
// ⭐ SINGLE SOURCE OF TRUTH — Edit THIS file to update the site
// ============================================================
// Adding a project:   Push a new object to `projects` array
// Removing a project: Delete the object from `projects` array
// To swap a device-frame placeholder for a real screen recording,
// drop frames into framesPath and set frameCount > 0.
// No HTML or CSS changes needed.
// ============================================================

export const siteData = {
  // ─── Personal Info ────────────────────────────────────────
  personal: {
    name: 'Saransh Mittal',
    nameParts: { pre: 'Saransh', it: 'Mittal.' },
    role: 'Full-Stack & AI Systems Engineer',
    roleLine: 'Full-Stack & AI Systems Engineer — building real-time, AI-augmented products',
    location: 'Kota, Rajasthan · IST',
    coords: '28.45°N · 75.83°E',
    available: 'Available · Jun 2026',
    email: 'saransh5056@gmail.com',
    resumeUrl: '/Saransh_Mittal_Resume.pdf',
    links: {
      github: 'https://github.com/Saransh-mittal',
      linkedin: 'https://linkedin.com/in/saransh-mittal-in',
      leetcode: 'https://leetcode.com/u/Saranshmittal_',
    },
  },

  // ─── Section index (right-edge dot nav) ───────────────────
  nav: [
    { id: 'index', n: '00', label: 'Index' },
    { id: 'work', n: '01', label: 'Selected Work' },
    { id: 'capabilities', n: '02', label: 'Capabilities' },
    { id: 'journey', n: '03', label: 'Journey' },
    { id: 'ledger', n: '04', label: 'Ledger' },
    { id: 'contact', n: '05', label: 'Contact' },
  ],

  // ─── Projects (SSOT — add/remove here) ────────────────────
  projects: [
    {
      id: 'disciplog',
      num: '01',
      name: 'DiscipLog',
      nameParts: { pre: 'Discip', it: 'Log', post: '' },
      year: '2026',
      shortTagline: 'Private AI execution coach',
      shortDesc:
        'Manual logs, focused sprints, IDE telemetry, and AI-agent conversations collapse into one durable record — then a coach reasons from it.',
      stack: ['Next.js', 'TypeScript', 'MongoDB', 'Vercel AI SDK', 'OpenAI', 'MCP', 'Docker'],
      device: 'laptop',
      url: 'disciplog.com',
      accent: '#e8b14b',
      framesPath: '/frames/disciplog/',
      frameCount: 1,
      frameExtension: 'webp',
      links: {
        code: 'https://github.com/Saransh-mittal/disciplog',
        live: 'https://disciplog.com',
      },
    },
    {
      id: 'quick-clash',
      num: '02',
      name: 'Quick Clash',
      nameParts: { pre: 'Quick ', it: 'Clash', post: '' },
      year: '2025',
      shortTagline: 'Real-time quiz battles',
      shortDesc:
        '1v1 and 4v4 competitive battles with hybrid real-time + async matchmaking. Solved cold-start with human-shaped bot injection.',
      stack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis', 'Cloudflare'],
      device: 'phone',
      url: 'rapidrecap.ai',
      accent: '#f08a3c',
      framesPath: '/frames/quick-clash/',
      frameCount: 1,
      frameExtension: 'webp',
      links: {
        code: 'https://github.com/Saransh-mittal/quick-clash',
        live: 'https://rapidrecap.ai',
      },
    },
    {
      id: 'rapid-recap',
      num: '03',
      name: 'Rapid Recap AI',
      nameParts: { pre: 'Rapid ', it: 'Recap', post: ' AI' },
      year: '2024',
      shortTagline: 'AI knowledge gaming platform',
      shortDesc:
        'News converted into interactive quizzes via an automated AI pipeline. Reached 50–100 daily organic users through custom SEO infra.',
      stack: ['React', 'Express', 'MongoDB', 'OpenAI', 'Redis', 'Python'],
      device: 'laptop',
      url: 'rapidrecap.ai',
      accent: '#5b8def',
      framesPath: '/frames/rapid-recap/',
      frameCount: 1,
      frameExtension: 'webp',
      links: {
        code: 'https://github.com/Saransh-mittal/rapid-recap-ai',
      },
    },
    {
      id: 'ai-yoga',
      num: '04',
      name: 'AI Yoga Guide',
      nameParts: { pre: 'AI ', it: 'Yoga', post: ' Guide' },
      year: '2025',
      shortTagline: 'Multi-agent breathing assistant',
      shortDesc:
        'An AI breathing coach controlled entirely through natural language — triage agent routes to specialised agents for voice, settings, and guidance.',
      stack: ['Next.js', 'FastAPI', 'OpenAI', 'XTTS', 'Web Audio', 'SSE'],
      device: 'laptop',
      url: 'ai-yoga-application.up.railway.app',
      accent: '#5ec99a',
      framesPath: '/frames/ai-yoga/',
      frameCount: 1,
      frameExtension: 'webp',
      links: {
        code: 'https://github.com/Saransh-mittal/ai-yoga-guide',
        live: 'https://ai-yoga-application.up.railway.app/',
      },
    },
  ],

  // ─── Capabilities (2×2 matrix) ────────────────────────────
  capabilities: [
    {
      n: 'I',
      title: 'Systems',
      it: 'design',
      items: ['Real-time matchmaking', 'Event-driven pipelines', 'Presence + socket layers', 'Cron orchestration'],
    },
    {
      n: 'II',
      title: 'AI',
      it: 'integration',
      items: ['Multi-agent architectures', 'Tool-calling + RAG', 'Embeddings + cosine recall', 'MCP server / client wiring'],
    },
    {
      n: 'III',
      title: 'Full-stack',
      it: 'engineering',
      items: ['Next.js · React · Vite', 'Node · Express · FastAPI', 'MongoDB · Redis · Vector', 'TypeScript end-to-end'],
    },
    {
      n: 'IV',
      title: 'Product',
      it: '& craft',
      items: ['Retention loops', 'Performance tuning', 'Onboarding experiments', '0→1 solo ownership'],
    },
  ],

  // ─── Journey Timeline ─────────────────────────────────────
  timeline: [
    { yr: '2024', mo: 'May', title: 'B.Tech CS — LNMIIT', desc: 'Graduated with a Computer Science degree. Chose to build a startup instead of a job — wanted to learn how real systems, real users, and real growth actually work.' },
    { yr: '2024', mo: 'May', title: 'Founded Rapid Recap AI', desc: 'Co-founded an AI-powered knowledge gaming platform on the MERN stack. Built the AI content pipeline, vector search, and SEO infra that drove 50–100 daily organic users.' },
    { yr: '2024', mo: 'Nov', title: 'Quick Clash v1', desc: 'Pivoted into real-time multiplayer quiz battles. Built Socket.io matchmaking and a bot simulation system to solve cold-start concurrency.' },
    { yr: '2025', mo: 'Sep', title: 'AI Yoga Guide', desc: 'Built a multi-agent breathing assistant with XTTS voice synthesis, SSE streaming, and Web Audio. Proved AI as a control layer over an entire app.' },
    { yr: '2025', mo: 'Dec', title: 'Quick Clash v2', desc: 'Full redesign with the Spark matchmaking engine, an economy system, and a retention engineering pass. Learned that retention beats acquisition.' },
    { yr: '2026', mo: 'Mar', title: 'DiscipLog', desc: 'Began building a private AI execution coach. Unified logs, sprints, IDE telemetry, and AI-agent conversations into a single durable record.' },
    { yr: '2026', mo: 'Now', title: 'Open to work', desc: 'Looking for engineering roles where systems, AI, and product thinking meet — and where I can own meaningful surface area from day one.' },
  ],

  // ─── Stats / Ledger ───────────────────────────────────────
  // `v` is the displayed value; numeric prefix counts up, `it` is the
  // italic accent suffix. Leading zeros in `v` are preserved (e.g. "04").
  stats: [
    { v: '04', it: '+', label: 'Full-scale apps shipped' },
    { v: '100', it: '+', label: 'Peak daily active users' },
    { v: '10k', it: '+', label: 'AI-generated quizzes' },
    { v: '260', it: '+', label: 'LeetCode problems' },
    { v: '02', it: 'yrs', label: 'Building, solo' },
  ],
};
