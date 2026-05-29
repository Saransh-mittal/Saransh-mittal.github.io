# Rapid Recap (V2 Pivot: Quick Clash) — Complete Project Breakdown

## Overview
Rapid Recap V2 represents a full product pivot from a content-based knowledge platform to a **competitive, real-time and asynchronous quiz gaming system** (Quick Clash). The focus shifted from passive consumption to **engagement, retention, and competition-driven learning**.

---

# 1. Core Idea

A multiplayer quiz platform where users:
- Compete in **1v1 and 4v4 battles**
- Participate in **real-time matchmaking** or **asynchronous challenges (24-hour window)**
- Earn scores (RQM), trophies, and rewards
- Engage through **gamified loops and retention systems**

---

# 2. Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- Dynamic game UI components

## Backend
- Node.js
- Express.js

## Database
- MongoDB (game state, users, matches, logs)

## Real-Time Layer
- Socket.io (matchmaking, game events, room management)
- Redis (optional/limited for presence where applicable)

## AI Integration
- OpenAI API (content/quiz generation reused from V1 where needed)

## Deployment & Infra
- Railway (full-stack deployment)
- Cloudflare (CDN, caching, security)

---

# 3. Core Systems

## 3.1 Matchmaking Engine ("Spark Engine")

### Features
- Real-time matchmaking queues
- 1v1 and 4v4 modes
- Trophy/ELO-like matching logic
- Team auto-formation for partial parties
- Room creation and lifecycle management

### Implementation
- Socket.io namespaces/rooms
- Event-driven queue management
- Server-side match orchestration

---

## 3.2 Asynchronous Gameplay System

- 24-hour challenge window
- Independent attempt timing per player
- Result resolution after both parties complete

### Benefits
- Flexibility for users in different time zones
- Increased engagement without strict concurrency

---

## 3.3 Bot Simulation System (Cold-Start Solution)

### Problem
- Low user concurrency → long matchmaking wait times

### Solution
- Injected **human-like bots** after timeout (~10–15 seconds)

### Behavior Simulation
- Delayed join and actions
- Category selection behavior
- Timed quiz completion (~3 minutes)
- Full match participation (1v1 & 4v4)

### Outcome
- Instant matchmaking experience
- Preserved realism and UX quality

---

## 3.4 Game Engine & Scoring

### RQM (Rapid Quiz Mastery)
- Composite score based on accuracy + speed
- Normalized across formats

### 4v4 Logic
- Category-based battles
- Individual matchups per category
- Team aggregation logic
- Tie-breaker via total RQM

---

## 3.5 Retention & Engagement System

### Mechanics
- Streak systems
- Instant rewards (coins/feedback)
- Delayed rewards (match outcomes)
- Daily challenges
- Trophy progression

### Goal
- Improve K-factor (viral coefficient)
- Increase repeat usage and session depth

---

## 3.6 Economy System

- Coins and rewards
- Power-ups (evolved from V1)
- Inventory and usage during gameplay

---

## 3.7 Session-Based Onboarding

### Problem
- Guest users lacked commitment

### Solution
- Graduated onboarding:
  - Limited access preview
  - Feature locking to create FOMO
  - Conversion prompts at key moments

---

## 3.8 Notifications & Background Jobs

- Web push notifications for engagement
- Cron jobs for:
  - Match reminders
  - Result notifications
  - Daily/weekly tasks

---

## 3.9 Performance Optimization

- Fire-and-forget DB writes for non-critical paths
- Reduced latency in match creation and updates
- Efficient socket event handling

---

# 4. Architecture

## Design Style
- Modular monolith (service-based structure)
- Event-driven backend (Socket.io)

## Components
- Matchmaking service
- Game engine service
- User/profile service
- Notification service

---

# 5. Evolution from V1

## Removed / Reduced
- Heavy content browsing
- SEO dependency

## Added / Enhanced
- Real-time systems
- Multiplayer logic
- Retention engineering
- Economy and rewards

---

# 6. Key Challenges

- Low user concurrency
- Balancing real-time vs asynchronous gameplay
- Ensuring fair scoring across formats
- Designing engaging retention loops

---

# 7. Key Innovations

- Human-like bot simulation for matchmaking
- Hybrid real-time + async gameplay system
- Team-based competitive quiz mechanics
- Retention-driven product design

---

# 8. Learnings

- Retention > acquisition
- Multiplayer systems need concurrency solutions
- UX realism is critical in game systems
- Product design and engineering must work together

---

# 9. Summary

Rapid Recap V2 (Quick Clash) transformed the original idea into a **competitive, real-time learning platform**. It demonstrated strong capabilities in **real-time systems, matchmaking, product design, and retention engineering**, forming the foundation for advanced systems later built in DiscipLog.

---

# End of Document

