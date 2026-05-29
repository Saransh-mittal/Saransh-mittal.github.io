# AI Yoga Guide — Complete Project Breakdown

## Overview
AI Yoga Guide is an AI-powered breathing and mindfulness assistant designed to guide users through practices like Anulom Vilom using real-time visuals, audio feedback, and conversational control. The goal was to create a **calm, intelligent, and interactive wellness experience** powered by modern AI systems.

---

# 1. Core Idea

The application allows users to:
- Perform guided breathing exercises
- Control the experience using natural language
- Receive personalized audio and pacing guidance

It combines **AI + real-time UX + audio systems** to deliver a smooth mindfulness experience.

---

# 2. Tech Stack

## Frontend
- Next.js (App Router)
- Tailwind CSS
- Framer Motion (animations)
- Web Audio API

## Backend
- Python (FastAPI for AI/audio services)

## AI Integration
- OpenAI APIs (agents, control logic)

## Audio
- XTTS (voice cloning / TTS system)

## Real-Time Communication
- Server-Sent Events (SSE)

## Deployment
- Railway (deployment platform)

---

# 3. Core Systems

## 3.1 Multi-Agent AI System

### Components
- **Triage Agent**: Classifies user intent
- **Specialized Agents**:
  - Breathing control
  - Voice customization
  - Settings management

### Features
- Tool-based execution
- Context-aware responses
- Dynamic routing of requests

### Pattern
- Agent Factory Pattern for model selection (cost vs performance)

---

## 3.2 Conversational Control System

- Users control the app via chat instead of buttons
- Example:
  - "Make breathing slower"
  - "Change voice"

### Implementation
- Natural language → state updates
- Agent-driven UI control

---

## 3.3 Audio Generation System

### Features
- Custom voice packs
- Voice cloning via XTTS
- Dynamic audio generation

### Backend
- FastAPI
- Background processing using threading

---

## 3.4 Real-Time Streaming System

- Implemented using **Server-Sent Events (SSE)**

### Purpose
- Stream progress updates
- Handle long-running audio generation

### Benefits
- Non-blocking UI
- Smooth user experience

---

## 3.5 Audio Playback System

### Frontend
- Web Audio API

### Features
- Audio buffering
- Low-latency playback
- Oscillator-based cues for breathing timing

---

## 3.6 Breathing Engine

- Timed inhale/exhale cycles
- Visual guidance
- Synchronization with audio cues

---

## 3.7 UI/UX System

- Smooth animations (Framer Motion)
- Minimal and calming interface
- Guided onboarding experience

---

# 4. Architecture

## Design Style
- Hybrid frontend-backend architecture
- AI services separated via FastAPI

## Components
- Next.js frontend
- AI orchestration layer
- Audio processing backend

---

# 5. Key Challenges

- Synchronizing audio with UI animations
- Handling long-running AI/audio tasks
- Maintaining low-latency playback
- Designing intuitive conversational controls

---

# 6. Key Innovations

- Multi-agent AI system for app control
- Chat-driven UI instead of traditional controls
- Real-time audio + visual synchronization
- SSE-based streaming architecture

---

# 7. Learnings

- AI can act as a control layer for applications
- Event-driven systems improve UX significantly
- Audio systems require careful latency handling
- Conversational interfaces can replace traditional UI patterns

---

# 8. Summary

AI Yoga Guide is an advanced AI-integrated application combining **multi-agent systems, real-time streaming, and audio engineering** to create an interactive mindfulness experience. It demonstrates strong capabilities in **AI orchestration, async systems, and UX design**.

---

# End of Document

