# Rapid Recap AI (V1) — Complete Project Breakdown

## Overview
Rapid Recap AI was an AI-powered knowledge gaming platform designed to convert current affairs into interactive, gamified quizzes. The goal was to improve information retention by combining reading, testing, and competition.

---

# 1. Core Idea

Users could:
- Read summarized current affairs
- Attempt quizzes generated from those articles
- Compete on a global leaderboard

The system focused on **learning + recall + competition**.

---

# 2. Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## Caching & Real-time
- Redis (user presence tracking)
- Socket.io (real-time chat)

## AI Integration
- OpenAI API (summarization + quiz generation)

## Deployment & Infra
- Railway (deployment)
- Cloudflare (CDN + caching + security)
- Hostinger (domain)

---

# 3. Core Systems

## 3.1 AI Content Pipeline
- Fetched articles via APIs and scraping
- Summarized content using AI
- Generated quizzes automatically
- Stored processed data in MongoDB

---

## 3.2 Quiz Engine

### Quiz Formats
- Timed quiz (5 questions, 50 seconds)
- Timeline ordering
- Graph-based matching
- Multi-format selection system

### Scoring System
- RQM (Rapid Quiz Mastery Score)
- Normalized scoring across quiz formats

---

## 3.3 Gamification System

### Leaderboard
- IQ score (Information Quotient)
- Based on bell-curve distribution

### Power-ups
- Inventory system
- Purchase and usage within quizzes

---

## 3.4 Social System (WiseWeb)

- Friend requests
- Real-time chat (Socket.io)
- Article sharing

### Presence System
- Redis used to track online/offline users

---

## 3.5 Search & Recommendation

- Vector-based search using embeddings + cosine similarity
- TF-IDF based recommendation system

---

## 3.6 SEO System (Advanced)

- User-agent detection
- Bot-specific HTML rendering (SSR simulation)
- Cloaking system for improved indexing
- Pre-rendered HTML caching for bots

---

## 3.7 Performance Optimization

### Problems
- High latency due to distributed infra (server + DB in different regions)

### Solutions
- MongoDB query optimization
- Application-level caching
- CDN caching via Cloudflare
- SSR splash screen to improve perceived performance

---

## 3.8 Data Ingestion Pipeline

### Initial
- Third-party news APIs

### Improved
- Python-based web scraping system
- AI processing pipeline for content cleaning and summarization

---

## 3.9 Authentication

- Initially JWT-based authentication
- Later upgraded to access + refresh token architecture

---

## 3.10 Background Systems

- Cron jobs for scheduled tasks
- Web push notifications

---

# 4. Architecture

- Modular monolith architecture
- Service-based backend structure (MVC pattern)
- Separation of concerns via service layers

---

# 5. Growth & Metrics

- Achieved 50–100 daily organic users via SEO
- Faced retention challenges due to UX and content freshness

---

# 6. Key Challenges

- Poor user retention
- Delayed content from APIs
- High latency
- Product-market fit issues

---

# 7. Key Innovations

- AI-driven quiz generation pipeline
- Multi-format quiz system with normalized scoring
- Bot-aware SEO cloaking system
- SSR-based splash screen for UX optimization
- Vector-based semantic search
- Real-time chat and presence system

---

# 8. Learnings

- Retention is more important than acquisition
- UX directly impacts stickiness
- SEO is complex beyond indexing
- System performance affects user trust
- Product-market fit is critical

---

# 9. Summary

Rapid Recap AI (V1) was a full-stack, AI-driven platform combining learning, gaming, and social interaction. It evolved through multiple iterations and laid the foundation for later systems like Quick Clash and DiscipLog.

---

# End of Document

