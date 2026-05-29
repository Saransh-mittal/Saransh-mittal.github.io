# DiscipLog Current Idea And MVP

Status: current codebase snapshot, May 17, 2026

## The Idea

DiscipLog is a private AI execution coach.

It is not primarily a habit tracker, time tracker, task manager, IDE analytics
tool, or journal. It is a feedback loop for people who are trying to get better
at showing up consistently across real areas of their life: coding, studying,
fitness, writing, career work, creative work, and other deliberate practice.

The core loop is:

1. Capture what actually happened.
2. Convert it into a clean log.
3. Roll that log into memory, knowledge, patterns, and coaching.
4. Give the user one useful next move.
5. Learn whether that advice landed.

The current product thesis is strongest when stated plainly:

> DiscipLog turns manual logs, focused sprints, coding activity, and AI-agent
> collaboration into one private execution record, then uses that record to
> coach the user on discipline, consistency, momentum, and how they work with
> AI.

The important difference from generic productivity software is evidence.
DiscipLog is not asking the user to maintain an idealized plan and then feel bad
when life does not match it. The app collects traces of real work, turns those
traces into durable narrative logs, and lets the coach reason from that history.

## The Wedge

The broad product is an AI discipline coach for anyone serious about deliberate
practice. The wedge is developers and AI-assisted knowledge workers.

Developers are the best first audience because they already generate structured
signals while working:

- IDE events: focus, saves, edits, diagnostics, tests, terminal commands,
  commits, and language/project context.
- AI-agent turns: prompt summaries, response summaries, tools used, task
  outcome, prompt-quality tags, self-critique, timing, and acceptance mode.
- Permission waits: moments where the AI agent is blocked on the user before a
  permission-gated action.
- Sprint sessions: planned time, active time, pause/resume state, completion
  state, and attached activity.

That gives DiscipLog something most coaching products do not have: the work
record can become partially automatic. The user still gets a broader life coach,
but Developer Mode makes the coach much smarter with less logging friction.

The positioning is:

> DiscipLog is an AI productivity coach for your whole life, with optional
> developer superpowers that automatically capture coding and AI-agent sessions.

This avoids a full pivot into a developer-only analytics tool. A non-developer
can still use DiscipLog through manual logs, sprints, coach cards, categories,
reflections, chat, and streak worlds. A developer gets the same product plus
automatic work capture.

## The Current MVP

The current codebase is a working Next.js web app plus first-party activity
ingestion packages and a first-pass Free/Pro entitlement layer.

The app uses Next.js App Router, NextAuth, MongoDB/Mongoose, the Vercel AI SDK,
OpenAI models, Tailwind/shadcn-style primitives, push notifications, SSE, and a
PWA/service-worker layer. The repo also contains a VS Code extension, an
`@disciplog/mcp` package for AI-agent instrumentation, and a small external cron
runner.

The user-facing MVP has eight major pieces.

### 1. Authentication And Onboarding

Users sign in with Google through NextAuth. The dashboard layout requires an
authenticated session and redirects incomplete users to onboarding.

Current onboarding is intentionally light:

- The user chooses an AI coach persona.
- The user can create a first log before entering the dashboard.
- Categories are not required up front. They can be inferred from logs and
  edited later in Settings.

This is different from older pitch docs that describe a full AI-generated
category plan during onboarding. The present flow favors immediate activation:
pick the coach, log one thing, start from evidence.

### 2. Manual Logging

The Today and Logs surfaces include quick logging:

- User writes what they just did.
- User enters hours/minutes.
- The app calls `/api/summarize`.
- The AI produces a concise markdown summary and category inference.
- The app posts to `/api/logs` with `category: "__auto__"`.
- The result becomes a permanent `LogEntry`.

Auto-categorization is core MVP behavior. The system tries to match existing
categories, uses corrections and compiled knowledge where available, creates new
AI-inferred categories when appropriate, and falls back to a system bucket when
confidence is poor.

Every saved log fans out into the intelligence layer:

- coach embedding refresh
- implicit memory refresh
- knowledge compilation
- usage-pattern recalculation
- coach-card refresh
- target nudge checks
- category evolution

The architectural center of gravity is still simple: every capture surface
eventually becomes the same durable log.

### 3. Today, Daily Plan, And Journal

The dashboard is organized around tabs:

- Today
- Logs
- Coach
- Worlds
- Settings
- Archive

The Today tab is the active working surface:

- hero quote
- quick log strip
- today's plan grid
- recent logs
- today totals ring
- weekly progress
- sprint timer

The daily plan layer lets users decide which categories are in play today and
set per-category hour overrides. Today totals now respect the saved daily plan
when it exists, so the progress view tracks the user's actual plan instead of
only static category defaults.

The Logs tab is the durable journal:

- day-grouped log entries
- category filter pills
- time, duration, category, summary, and source label
- load-more pagination
- log editor dialog for corrections

`/api/logs` returns both paginated items and a summary packet containing today's
totals, weekly totals, per-category totals, daily totals, and latest-log marker.

### 4. Sprint Timer

The sprint timer makes DiscipLog useful during work, not only after work.

The current sprint system supports:

- starting a manual sprint from the web app
- starting an activity-backed automatic sprint from the web app, VS Code, or MCP
  host when the user has Pro access
- preset or custom duration
- category selection or Auto category inference
- pause, resume, finish, cancel, and extend
- browser countdown and page-title countdown
- optional completion tone and browser notification
- post-sprint check-in dialog
- dictation through speech recognition
- server-backed state with SSE updates and polling fallback
- migration from older localStorage sprint state

Sprints are represented by `SprintSession`, with statuses such as `running`,
`paused`, `awaiting_checkin`, `completed`, and `canceled`. A completed sprint can
produce a `LogEntry` with `source: "sprint"` and fields for planned minutes,
actual minutes, origin, tracking mode, and completion status.

Manual app sprints remain part of the base product. Automatic sprints are now a
Pro feature because they depend on Activity Sources and attached IDE/AI-agent
events. Sprint logs join the same downstream pipeline as manual logs: memory,
knowledge, coach cards, progress, and debriefs.

### 5. Coach Workspace

The Coach tab has changed materially. It is no longer a proactive card plus a
floating chat drawer. The floating drawer is gone. The coach now lives inline on
the Coach tab as a full workspace.

The current Coach v2 surface has six sections:

- Coach hero
- Weekly digest
- Patterns
- Conversation
- Reflection and Memory
- Sustainability

The Coach hero has a real fallback chain:

1. live coach card from the SSE-backed notification provider
2. latest persisted coach card from the last seven days
3. explicit quiet-account empty state

Coach CTAs route into `/dashboard/coach` through `openCoach`, using URL params
such as `seed`, `autosend`, and `sid`. The old browser event bus for opening a
floating drawer has been removed.

The Weekly Digest section uses the cached coach analytics snapshot to show:

- seven annotated days
- total logged hours
- target hit rate
- longest deep-work block from sprint sessions
- delivered/actioned coach cards
- dated win/risk/pattern annotations

The Patterns section uses the same snapshot to show:

- a 7 by 12 hour-of-day heatmap for the last 28 days
- best/risk weekday archetypes
- deterministic cause-effect chains, such as exercise days affecting coding
  hours or late first logs predicting low-output days

The Conversation section contains the new inline coach chat. It streams through
`/api/ai-chat`, supports suggested prompts, model selection, mic input, reasoning
accordions, tool accordions, a pending message queue, scroll-pause behavior, and
a compact session rail.

Coach conversations are now persistent `ChatSession` records. A session can be
opened by URL, revisited from the rail, deleted, and included in future coach
context. Finished conversations extract themes and schedule a refresh of the
`coach_dialogue` knowledge node.

The Reflection and Memory section adds two user-owned feedback channels:

- `Reflection`: the user can answer end-of-day prompts, save recent reflections,
  and delete them. Creating a reflection schedules knowledge compilation.
- `CoachBelief`: the coach can hold editable beliefs about the user. The user
  can confirm, edit, or retire them. Retired beliefs are not re-promoted by the
  memory extractor.

The Sustainability section turns weekly load into a coaching surface:

- season progress
- pace
- variance
- burnout-risk proxy
- eight-week load bars
- healthy band
- Hold/Push/Rest recommendations

This is the most important product update: the coach is now an evidence-backed
workspace with analytics, chat memory, reflective input, editable memory, and
load guidance.

The May 17 entitlement pass adds an explicit Free/Pro boundary to the Coach tab:

- Coach hero, latest card, and inline chat remain available as the main coach
  entry point.
- Weekly digest, Patterns, Reflection and Memory, and Sustainability are wrapped
  in `ProGate` with realistic preview data for Free users.
- `/api/coach/page`, reflections, beliefs, timing, knowledge, AI-coding profile,
  scalability profile, and coach journal endpoints enforce Pro on the server.
- Free chat still works, but advanced coach tools such as domain analysis,
  AI-coding profile, session replay, weekly digest, day archetypes,
  sustainability snapshot, and coach-card history are removed from the tool set
  for non-Pro users.
- Coach-card reasoning is only returned to Pro users; the card itself can still
  exist without exposing the private reasoning packet.

### 6. Settings v2

Settings has also moved from a basic configuration screen to a structured
control room. The v2 Settings page has a hero, sticky left rail, and seven
sections:

- Goals
- Categories
- Coach profile
- Coach behavior
- Activity sources
- Notifications
- Billing

Goals supports Free Flow vs Targeted mode and daily/weekly targets.

Categories supports add, edit, archive, restore, AI-generated notes, tracked vs
free-flow behavior, and main vs side category grouping. The active category
limit remains intentionally small so the product stays focused.

Coach profile covers persona, core why, custom instructions, implicit memory
readout, and the Pro model picker.

Coach behavior covers intensity, toast/push permissions for cards, domain
playbook override, and card cooldown. Advanced coach behavior controls are now
Pro-gated.

Activity sources exposes Developer Mode, install links, keys/devices, privacy
mode, AI-agent tracking, Practice Mode, export, and delete flows. Activity
Sources are now Pro-gated in both UI and API.

Notifications currently exposes the push subscription toggle that is actually
backed by schema. Richer notification preferences are not presented as if they
are shipped.

Billing shows the current effective plan, source, expiry, trial state, manual
grant state, and provider status placeholder. It supports starting a no-card
15-day Pro trial. Payment provider checkout is intentionally not wired yet.

### 7. Billing And Entitlements

The app now has a first-pass billing/entitlement system.

The subscription model supports:

- `free` and `pro` plan states
- source tracking: manual, trial, or provider
- 15-day no-card Pro trial
- trial start/end/expiry timestamps
- manual Pro grants with optional expiry and reason
- provider fields for future checkout integrations
- effective-plan calculation that can expire stale trials before returning data

The current billing surface includes:

- `BillingProvider` wrapping the dashboard shell
- `/api/billing/status`
- `/api/billing/trial/start`
- Settings Billing section
- reusable `ProGate` previews and trial CTAs
- `scripts/grant-pro.ts` and `npm run grant-pro` for manual grants/revokes
- hourly `/api/cron/subscriptions` to expire trial and manual entitlements

The important product decision is that Pro is not only cosmetic. The server also
enforces Pro on sensitive or expensive surfaces:

- Activity Sources and ingest-key creation
- IDE/WakaTime/MCP event ingestion
- MCP agent-block tracking
- ingest-backed sprint controls
- automatic app sprints
- weekly debrief latest/history/acknowledge APIs
- advanced Coach v2 analytics and memory APIs
- model selection
- advanced coach behavior settings

Provider checkout is scaffolded, not shipped. Current live paths are Free,
no-card trial, and manual grants.

### 8. Momentum Worlds

The current UI treats consistency as an environment, not just a number.

`WorldRenderer` and `WorldsGallery` define visual worlds that unlock with streak
progress. The app theme changes based on the user's tier: background, borders,
accent colors, surfaces, motion, and material feel. The Worlds tab lets users
preview unlocked tiers without changing the real unlock state.

This is not the data engine, but it is part of the emotional loop. DiscipLog
wants consistency to feel earned and visible.

## Activity Sources MVP

Activity Sources is the developer-mode wedge and is now a Pro feature.

The current codebase includes:

- global auto-logging settings
- Developer source card
- VS Code extension install path
- WakaTime-compatible endpoint for other editors
- MCP server install path for AI agents
- standard vs strict privacy mode
- idle-timeout configuration
- AI-agent activity toggle
- Practice Mode toggle for personal/DSA code only
- connected ingest keys and device pause/resume
- export activity data
- delete raw activity data and generated IDE/AI logs
- Browser source placeholder marked coming soon

Free users can see the Activity Sources setup surface as a locked preview and
start the no-card trial. Actual key creation, settings updates, event ingestion,
WakaTime heartbeats, MCP agent-block ingestion, and ingest-backed sprint control
now require an effective Pro subscription.

### Ingest Keys

External tools authenticate with `dlog_live_...` ingest keys. Keys are hashed
server-side and scoped:

- `ingest:events`
- `ingest:sprints`

Settings exposes connected devices/keys and supports device pause/resume and key
management flows. New key creation is Pro-gated server-side.

### Raw Events

Raw tool activity lands in `ActivityEvent`.

Supported producers:

- `vscode`
- `wakatime`
- `mcp`
- `browser`

Supported event types:

- `focus`
- `edit_batch`
- `save`
- `diagnostic`
- `debug`
- `test_run`
- `terminal_cmd`
- `git_commit`
- `ai_turn`
- `ai_session_end`
- `ai_suggestion_outcome`
- `ai_block_start`
- `ai_block_end`

Raw events are intentionally temporary. The long-lived artifact is the generated
`LogEntry`, not the raw telemetry stream. Raw events auto-delete after seven
days. Event ingestion also checks the user's effective subscription before
accepting developer activity.

### Privacy Boundary

The privacy posture is central to the product:

- The VS Code extension does not read document text, edit text, or diagnostic
  messages by default.
- It captures metadata such as file paths, language, line deltas, save counts,
  diagnostic counts, command names, and inline-AI outcomes.
- Server ingest sanitizes events again with allowlists, caps, and redaction.
- Strict mode drops file paths, function names, branch names, project names, and
  user prompt text.
- Practice Mode is opt-in, disabled in strict mode, limited to allowlisted file
  extensions, capped by size, and intended only for personal projects and
  learning.
- Practice Mode file content is consumed during sessionization and wiped when
  the session becomes a log.
- Users can export or delete activity-source data.

The product claim is not "send us everything." It is "send just enough
structured signal for coaching."

### Sessionizer

The sessionizer is the heart of automatic capture.

It takes unsessionized `ActivityEvent`s, groups them into windows, aggregates
metadata, builds a narrative, creates a `LogEntry`, links events to that log, and
triggers the same downstream jobs manual logs trigger.

Important behavior:

- default idle break is 10 minutes
- AI-turn-heavy windows can use a longer AI continuity window
- hard cap is 4 hours
- tiny non-AI windows are skipped
- dotfile/config-only noise is skipped
- code snapshots from Practice Mode are consumed and wiped
- chat-only AI sessions use turn-timing totals so they do not become fake
  zero-minute logs
- open permission waits hold the window open until an end or expiry event arrives
- `source` becomes `ai_agent` when AI turns dominate, otherwise `ide`

This creates the source-agnostic pipeline:

> manual log, sprint, IDE session, and AI-agent session all become `LogEntry`,
> then flow through memory, knowledge, coach cards, progress, and debriefs.

### VS Code, WakaTime, And MCP

The VS Code extension is the first-party passive capture client. It can connect
with an API key, buffer and flush events, survive restarts, pause/resume
tracking, track editor metadata, manage sprints, show status-bar sprint state,
and install AI-agent integrations.

The WakaTime-compatible endpoint lets users in JetBrains, Neovim, Emacs,
Sublime, Xcode, and other editors point WakaTime heartbeats at DiscipLog:

`https://disciplog.com/api/ingest/wakatime/v1`

The MCP server lets AI hosts report the user's collaboration with AI. The
package supports:

- `npx @disciplog/mcp install`
- `npx @disciplog/mcp install --all --yes`
- `npx @disciplog/mcp install --client ...`
- `npx @disciplog/mcp doctor`
- `npx @disciplog/mcp uninstall`
- `npx @disciplog/mcp uninstall --all --purge --yes`

The installer detects supported clients, writes managed config entries, and does
not remove user-authored MCP servers during uninstall. Current docs and install
copy mention Claude Code, Cursor, Claude Desktop, Codex, Antigravity, VS
Code-family IDEs, and other MCP-compatible agents.

The MCP server exposes tools for:

- `start_ai_turn`
- `log_ai_turn`
- `log_ai_session_end`
- sprint control
- `start_ai_blocked_on_user`
- `finish_ai_blocked_on_user`

The important AI-turn fields include prompt summary, prompt characteristics,
agent summary, agent outcome, agent self-critique, tools used, output stats,
token counts, timing fields, input mode, and project.

The timing-resolution ladder is:

- IDE-injected timestamps
- MCP handshake through `start_ai_turn`
- Claude Code hook state
- MCP self-measurement fallback

Permission-wait tracking is new and important. When an AI agent needs user
permission before a gated action, it can call `start_ai_blocked_on_user`; when
permission resolves, it calls `finish_ai_blocked_on_user`. DiscipLog stores an
`AgentBlock`, emits `ai_block_start` and `ai_block_end`, subtracts blocked time
from productive time, can push after five minutes, and expires abandoned waits.
Because this data depends on Activity Sources, the agent-block ingest endpoints
now require Pro.

This is the novel part of the MVP: DiscipLog is not just tracking that an AI
tool was used. It is collecting coaching-grade signals about how the user
prompted, how clear the request was, whether the agent shipped or got blocked,
and whether the user maintained ownership of the work.

## The Intelligence Layer

The MVP is not just a dashboard on top of logs. Several background systems turn
activity into coaching context.

### Effective Subscription

The entitlement layer is now part of the intelligence boundary. Server code uses
`getEffectiveSubscription`, `getUserEffectiveSubscription`, and
`expireTrialIfNeeded` to avoid trusting stale `subscription.plan` fields.

This means a user can have:

- stored plan: what is persisted on `User.subscription`
- effective plan: what the app should honor right now
- source: trial, manual, provider, or none
- trial status and remaining days
- optional Pro expiry

NextAuth session enrichment exposes the effective plan and trial state to the
frontend, while protected APIs recompute the effective plan server-side.

### Category Inference And Correction

Category inference tries to use the user's existing taxonomy first. When the
model suggests a category:

- exact matches win
- fuzzy matches are allowed
- synonym groups can merge obvious equivalents
- new categories can be created when the user has room
- otherwise the system uses a fallback bucket

When the user corrects a category, that correction is stored and later used by
summarization/sessionization. This gives the user authority over the taxonomy
while still letting AI reduce setup work.

### Coach Analytics Snapshot

`CoachAnalyticsSnapshot` is the cached daily payload behind the Coach v2 page.
It is one document per user/date and powers `/api/coach/page`.

The snapshot contains:

- `digest`: seven days, logged hours, targets, target hit rate, longest deep
  work, coach-card delivery/action counts, and range label
- `patterns`: hour-of-day heatmap, day archetypes, peak window, and cause-effect
  chains
- `sustainability`: pace, variance, burnout risk, healthy band, eight-week load
  bars, season phase, and Hold/Push/Rest recommendations
- suggested chat prompts
- reflection prompts

Most of the analytics layer is deterministic and cheap at read time. A daily
cron can enrich recommendation copy and cause-effect narratives through a single
LLM pass, but the page does not depend on an LLM call to load.

Coach analytics snapshots are now generated and served only for Pro users. The
Coach page shows locked previews to Free users instead of fetching private
analytics payloads.

### Coach Cards And Advice Queue

Coach cards are generated by `coach-engine.ts`. The engine builds an
evidence-only payload from recent logs, category health, knowledge nodes,
capacity signals, sprint behavior, domain playbooks, scalability signals, and
the coaching journal. It then decides whether to show a card or stay quiet.
Silence is a valid result.

`CoachAdviceQueue` adds timing control. Advice can be queued for an appropriate
delivery window, delivered, expired, or superseded. This keeps coaching from
becoming a noisy real-time alert stream.

Current card types include domain, struggle, ai_workflow, rhythm, recovery,
milestone, weekly_focus, decision, and scalability.

### Compiled Knowledge

`CoachKnowledgeNode` stores condensed knowledge by category, user overview, and
coach dialogue.

Category and overview nodes turn recent logs into:

- body markdown
- evidence snippets
- activity register entries
- goal models
- mistake patterns
- causal insights
- progress narrative
- cross-category tradeoffs
- capacity and identity trajectory fields

The new `coach_dialogue:overview` node synthesizes activity that happens on the
Coach screen but is not itself a log:

- active coach beliefs
- recent reflection answers
- chat session themes
- coach advice the user acted on
- coach advice the user ignored

This lets the coach remember how the user responds to coaching, not only what
the user logged.

### Chat Tools And Recall

The inline coach chat is grounded through a shared context builder and an
expanded tool set.

Important tools include:

- historical log search
- coach stats
- domain analysis
- AI coding profile
- session replay
- belief recall
- reflection recall
- prior chat-session recall
- sustainability snapshot
- weekly digest
- day archetypes
- coach-card history
- knowledge-node search
- reflection-prompt proposal
- belief confirmation

The chat route accepts `sessionId`, persists user/assistant turns into
`ChatSession`, updates tool-call summaries, extracts themes after completion,
and schedules `coach_dialogue` compilation.

The chat experience is plan-aware. Free users keep the core conversational coach,
while Pro users get the expanded tool surface, visible tool accordions, deeper
analytics recall, and preferred-model selection.

### Reflections And Coach Beliefs

Reflections give the user a direct way to add subjective context that raw logs
cannot know. Beliefs give the coach a durable but user-editable memory layer.

The belief extractor can promote repeated coaching-journal patterns into
`CoachBelief` records, but the user can confirm, edit, or retire them. This is
an important trust boundary: the coach can infer, but the user gets veto power.

### Embeddings And Search

Logs can have coach embeddings. The coach context layer supports historical log
retrieval through vector search and fallbacks. This lets the coach answer
"when have I done this before?" with evidence instead of vibes.

### Weekly Debriefs And Nudges

The codebase includes cron routes for:

- subscription expiry
- coach analytics
- coach-card delivery
- category evolution
- daily nudges
- sprint finalization
- sessionization
- weekly debriefs
- weekly patterns
- stale agent blocks

Weekly debriefs summarize total hours, log counts, best day, consistency,
streak, category breakdown, coach note, MVP category, hardest day, challenge,
weekly focus, and growth highlights.

Nudges use usage patterns and push subscriptions to reach the user near likely
logging windows.

The external `cron/` runner now schedules 10 jobs, including the new hourly
subscriptions job. Expired trials and time-bounded manual grants are downgraded
back to Free by `/api/cron/subscriptions`.

### Scalability Coaching

The codebase now contains a scalability-coaching layer for AI-assisted builders.
It derives project-health metadata from IDE/AI sessions, stores
`ProjectHealthSnapshot`, creates `AhaLearningInsight` records, exposes
`/api/coach/scalability`, and lets coach cards use the `scalability` card type.

This is best described as an emerging current feature rather than the main
surface. The strongest current MVP story is still logs, sprints, Coach v2,
Settings v2, and activity-source ingestion.

## What The MVP Is Not Yet

Some product directions are present in docs, models, or scaffolding but should
not be described as fully shipped.

Browser Mode is not shipped. It exists as a settings placeholder and as a future
producer in the event model, but the UI marks it "Coming soon."

The older full onboarding flow is not the active UX. The current onboarding does
not force users through category-plan review, core why, custom instructions, and
world preview before dashboard.

Native mobile is not present. The app is web/PWA-oriented.

Payment provider checkout is not shipped. The schema has provider fields and the
Billing section references future checkout adapters, but the live monetization
paths today are Free, 15-day trial, and manual Pro grant.

Team, accountability partner, human coach, calendar, meetings, and mobile-source
modes are not in the current MVP.

The category-correction feedback loop is practical but still early. Corrections
influence summarization and deterministic overrides, but this is not a full
personalized classifier training loop.

Scalability coaching exists in the backend and coach-card vocabulary, but it is
not yet the primary product narrative.

## Why This MVP Is Coherent

The MVP works because it has one durable object: the `LogEntry`.

Everything bends toward creating better logs:

- manual quick logs create logs from user text
- sprint check-ins create logs from focused work blocks
- IDE events sessionize into logs
- MCP AI-turn events sessionize into logs
- WakaTime heartbeats can sessionize into logs
- logs create embeddings
- logs update memory
- logs compile into knowledge
- logs drive progress
- logs drive coach cards
- logs feed debriefs and nudges

The update is that DiscipLog now also has a stronger second memory loop:
Coach-screen activity becomes durable coach context through reflections, beliefs,
chat sessions, and the `coach_dialogue` knowledge node. The user can now teach
the coach directly, not only by logging hours.

The newest update adds a business-model boundary without changing the core loop:
Free keeps the manual evidence loop accessible, while Pro unlocks the expensive
and high-signal automation surfaces that make the coach much deeper.

## Current Product Narrative

DiscipLog should be described as:

> A private AI execution coach that learns from the work you actually do. Log
> manually, run focused sprints, or start a Pro trial to unlock reflection,
> deeper coach analytics, weekly debriefs, and Developer Mode capture for coding
> and AI-agent sessions. DiscipLog turns all of that into one durable record,
> then gives you coaching grounded in your own patterns.

The MVP promise is:

> You can start with one sentence. DiscipLog summarizes it, categorizes it,
> tracks your momentum, remembers the pattern, and gives your coach evidence to
> work from. If you want the deeper loop, Pro adds automatic coding capture,
> AI-agent collaboration tracking, weekly debriefs, coach memory controls, and
> analytics without sending code content by default.

## Current North Star

The north star is not "track more data."

The north star is:

> Make the user better at showing up, choosing the next useful action, and
> working with AI without losing ownership of their own thinking.

Data sources are only useful if they serve that loop.

## Product Bets To Preserve

1. The coach must stay evidence-grounded.
2. The log remains the permanent unit of memory.
3. Coach-screen activity should become memory only through user-visible,
   user-editable channels.
4. The Free product should still let someone start the execution loop with
   manual logs and manual sprints.
5. Pro should map to expensive, automated, or deeply personalized intelligence,
   not arbitrary lockouts.
6. Developer Mode stays optional.
7. Privacy remains a product feature, not a settings footnote.
8. AI-agent tracking focuses on collaboration quality, not surveillance.
9. The UI should feel like a serious working environment, not a generic
   analytics dashboard.
10. Momentum worlds should reward consistency without turning the product into a
   toy.
11. Categories belong to the user; AI can suggest, infer, and clean up, but user
   correction wins.

## Strongest MVP Demo Flow

The cleanest demo sequence today is:

1. Sign in.
2. Choose a coach persona.
3. Create a first log.
4. Land on Today and see the log reflected in totals/recent activity.
5. Set today's plan across a few categories.
6. Start a manual sprint.
7. Finish it and save a check-in.
8. Open Logs and show the permanent journal.
9. Open Coach and show the hero plus inline chat as the base coach loop.
10. Open a locked Coach analytics section and start the no-card 15-day Pro
    trial.
11. Show weekly digest, patterns, reflections, coach beliefs, and sustainability
    once Pro is active.
12. Open Settings and show goals, categories, coach profile, Pro-gated coach
    behavior, Activity Sources, privacy mode, ingest keys, and Billing.
13. Show VS Code/WakaTime/MCP as the developer wedge: automatic metadata capture
    and AI-turn coaching feed the same log pipeline.
14. Show the MCP permission-wait flow as the proof that DiscipLog understands
    AI collaboration, not just AI usage.

That flow demonstrates the full thesis without needing future Browser Mode,
mobile, or team features.

## One-Sentence Version

DiscipLog is a private AI coach that turns what you actually did - manual logs,
sprints, reflections, coding activity, and AI-agent conversations - into a
durable execution record, then uses that record to help you become more
consistent, more deliberate, and less passive in how you work, with Pro
unlocking the deeper analytics and automatic capture loop.
