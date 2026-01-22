# AURA Operations - Operator Feedback (David's Perspective)

**Role**: AOCC Manager (Airport Operations Control Center)  
**Experience Level**: 8 years in airport operations  
**Current System**: AURA Operations Dashboard (Current State)  
**Date**: January 22, 2026

---

## Executive Summary

As an AOCC manager responsible for coordinating responses across MCIA, I've been using the current AURA Operations dashboard. While the system shows promise, there are critical gaps that prevent me from being truly proactive rather than reactive. Here's my honest feedback.

---

## ✅ What's Working Well

### 1. **Visual Design & Readability**
- **Glass-morphism UI is beautiful** - The dark theme with amber accents is easy on the eyes during long shifts
- **Large KPI cards are excellent** - I can see total passengers (2,450) and avg wait time (12m) at a glance
- **Color coding is intuitive** - Green = good, yellow = warning, red = critical. Simple and effective.
- **Real-time clock** - Having the current time prominently displayed helps with incident logging

### 2. **Alert System (Basic)**
- **Alerts are visible** - I can see critical issues like "Unattended baggage detected (Cam 04)"
- **Location info is helpful** - Knowing it's in "Security Zone 2" lets me dispatch the right team
- **Resolve button works** - I can mark alerts as handled, which keeps my list clean

### 3. **CCTV Integration**
- **Camera feeds are accessible** - I can click to view specific cameras when needed
- **Modal view is clear** - Full-screen camera view helps me assess situations quickly

### 4. **AI Chatbot**
- **Helpful for quick queries** - When I need to check something specific, the chatbot is responsive
- **Always accessible** - Bottom-right button is easy to find

---

## ❌ Critical Gaps & Pain Points

### 1. **REACTIVE, NOT PROACTIVE** ⚠️ **BIGGEST ISSUE**

**Problem**: The system only shows me what's happening NOW, not what's ABOUT TO happen.

**Real-world scenario**:
- It's 2:00 PM. Security Zone 2 is at 65% capacity (yellow, but manageable)
- I see 4 flights arriving between 2:30-2:45 PM in the flight schedule (if I manually check)
- **What I need**: The system should PREDICT that in 30 minutes, Security Zone 2 will be overwhelmed
- **What I get**: Nothing. I only find out when it hits 85% and turns red
- **Result**: By then, passengers are already frustrated, and it takes 15 minutes to deploy additional staff

**What I wish I had**:
> "⚠️ PREDICTED SURGE: Security Zone 2 will reach 95% capacity in 30 minutes based on incoming flights CX882, PR123, 5J456, Z2789 (650 passengers). Recommend deploying 3 additional officers now."

This is the difference between **preventing** a problem and **reacting** to one.

---

### 2. **NO FLIGHT SCHEDULE INTEGRATION** 🛫

**Problem**: I have to manually check the flight schedule in a separate system, then mentally calculate passenger flow.

**Current workflow** (inefficient):
1. Check AURA dashboard - see Security at 65%
2. Open separate flight info system
3. Count incoming flights in next 30-60 min
4. Estimate passenger counts (200 + 180 + 150 + 120 = 650 pax)
5. Mentally calculate: "650 passengers → Security → probably need 2 more lanes"
6. Radio staff to deploy

**What I need**:
- Flight schedule **integrated into AURA**
- Show me: "4 flights arriving 14:30-14:45, ~650 passengers"
- Automatically predict impact on Security, Check-in, Baggage Claim
- **Let the AI do the math for me**

---

### 3. **NO ACTIONABLE RECOMMENDATIONS** 🤖

**Problem**: The system tells me WHAT is wrong, but not WHAT TO DO about it.

**Current alert**:
> "⚠️ Queue density exceeding threshold (85%) - Check-in Row B"

**What I have to do**:
- Figure out how many staff to send
- Decide which staff are available
- Manually assign them
- Radio them individually

**What I wish I had**:
> "⚠️ Queue density exceeding threshold (85%) - Check-in Row B  
> **RECOMMENDATION**: Deploy 2 customer service officers to Check-in Row B. Officers Maria Santos and John Reyes are available and nearest to the area.  
> [Accept] [Dismiss] [View Details]"

If I click **[Accept]**, the system should:
- Auto-assign Maria and John to Check-in Row B
- Send them notifications
- Update the coverage map
- Log the action

**This is what "AI-powered" should mean** - not just showing data, but giving me **clear, actionable steps**.

---

### 4. **STAFF ALLOCATION IS MANUAL** 👥

**Problem**: I have no visibility into:
- Who is on duty right now?
- Where are they located?
- What are they currently assigned to?
- Who is available for reassignment?
- Which areas are understaffed?

**Current workflow**:
1. Alert appears: "Incident at Gate A12"
2. I radio: "Who's near Gate A12?"
3. Wait for responses
4. Manually coordinate who goes where
5. Hope I didn't pull someone from a critical area

**What I need**:
- **Staff roster with real-time status** (on-duty, break, off-duty)
- **Coverage map** showing where each officer is located
- **Workload visualization** - who's overloaded, who's idle
- **One-click assignment** from recommendations
- **Automatic notifications** to assigned staff

---

### 5. **HEATMAP EXISTS BUT ISN'T INTEGRATED** 🗺️

**Problem**: I know there's a heatmap feature (PredictiveHeatmapVisualization), but:
- It's not easily accessible from the main dashboard
- It doesn't connect to alerts or staff allocation
- I can't use it to make quick decisions

**What I wish I could do**:
1. See heatmap showing congestion at Security Zone 2
2. Click on the hotspot
3. System shows: "High density detected, 3 officers currently assigned, recommend 2 more"
4. Click [Deploy Staff] → system suggests nearest available officers
5. Click [Accept] → done

**Integration is key** - all these features should work together, not in silos.

---

### 6. **NO "BEFORE/AFTER" DATA TRANSFORMATION** 📊

**Problem**: I see raw numbers, but I have to interpret them myself.

**What I see now**:
- Security Zone 2: 65% capacity
- +12% trend
- 4 flights ETA 14:30
- 187 passengers on CX882

**What I have to do**: Mental math to figure out the impact.

**What I wish I saw**:
> **Raw Data** → **AI Insight**  
> "Zone 2: 65%, +12%, 4 flights, 650 pax" → "Security will be crowded in 30 min. Deploy 3 more officers now."

**Gemini should translate data into decisions** - that's the value of AI.

---

### 7. **NAVIGATION IS CLUNKY** 🧭

**Problem**: Everything is on one long scrolling page with snap sections.

**Issues**:
- I have to scroll to find what I need
- Can't quickly jump between Population, Heatmap, Surveillance, Staff
- No persistent navigation menu
- Hard to multitask (e.g., watch cameras while checking staff allocation)

**What I need**:
- **Sidebar navigation** with clear sections:
  - Executive Overview
  - Population Monitoring
  - Heatmap
  - Live Surveillance
  - Staff Allocation
  - Flight Schedule
- **One click** to switch between views
- **Persistent header** with alerts and system status

---

### 8. **NO DEMO MODE FOR PRESENTATIONS** 🎤

**Problem**: When I need to show this system to stakeholders or train new operators:
- Data is random and unpredictable
- Can't demonstrate a specific scenario
- Alerts appear at wrong times
- Hard to show the "ideal workflow"

**What I need**:
- **Demo Mode** toggle
- Pre-scripted sequence of events
- Controlled timing (not random)
- Ability to pause/resume/reset
- Predictable data (Security at 65%, specific flights, etc.)

This would make training and presentations **so much easier**.

---

## 🎯 Top 3 Priorities (If I Could Only Fix 3 Things)

### 1. **PREDICTIVE ALERTS** (30-minute ahead warnings)
Without this, I'm always reacting, never preventing. This is the #1 feature that would change my job.

### 2. **AI RECOMMENDATIONS** (Tell me what to do, not just what's wrong)
I need actionable steps, not just data. "Deploy 3 officers to Security Zone 2" is infinitely more useful than "Security Zone 2 at 85%".

### 3. **STAFF ALLOCATION DASHBOARD** (Who, where, availability)
I can't manage staff effectively if I don't know where they are and what they're doing.

---

## 💡 Feature Requests (Nice-to-Have)

### 1. **Flight Schedule Integration**
Show me incoming/outgoing flights with passenger counts, integrated with population predictions.

### 2. **Sidebar Navigation**
Let me quickly jump between different views without scrolling.

### 3. **Coverage Map**
Visual representation of staff positions on a floor plan, showing coverage gaps.

### 4. **Before/After Data Transformation**
Show me how Gemini turns raw data into clear insights.

### 5. **One-Click Actions**
Accept recommendations with a single click, auto-assign staff, send notifications.

### 6. **Demo Mode**
For training and presentations.

---

## 🚀 What Success Looks Like

**Scenario: Morning Rush (Current System)**
1. 8:00 AM - Security hits 85% capacity (red alert)
2. I see the alert, assess the situation
3. I manually figure out how many staff to send
4. I radio available officers
5. They arrive at 8:15 AM
6. Congestion clears by 8:30 AM
7. **Result**: 30 minutes of passenger frustration

**Scenario: Morning Rush (With Improvements)**
1. 7:30 AM - System predicts surge at 8:00 AM based on flight schedule
2. Alert: "Deploy 3 officers to Security in next 15 min"
3. I click [Accept]
4. System auto-assigns nearest available officers (Maria, John, Carlos)
5. They receive notifications and arrive at 7:50 AM
6. 8:00 AM - Surge happens, but we're ready
7. **Result**: Smooth flow, no congestion, happy passengers

**This is the difference AURA could make.**

---

## 📝 Final Thoughts

The current AURA dashboard is a **good foundation**, but it's not yet a **game-changer**. 

**What it does well**: Shows me current status with a beautiful UI.

**What it's missing**: Helps me **prevent** problems instead of just **reacting** to them.

If AURA can predict surges 30 minutes ahead, give me clear recommendations, and let me deploy staff with one click, it will transform how we operate MCIA.

**I want to feel like I'm 30 minutes ahead, not 5 minutes behind.**

That's the AURA I'm excited to use.

---

**Signed**,  
David Chen  
AOCC Manager, MCIA  
8 years in airport operations  
"Always one step ahead... or trying to be."
