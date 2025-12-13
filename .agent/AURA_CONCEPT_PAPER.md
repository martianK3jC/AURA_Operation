# AURA CONCEPT PAPER - OPERATOR DASHBOARD REQUIREMENTS

## The Problem
David, the MCIA Duty Manager, is **constantly reacting** to problems that stem from inefficiencies such as sudden long queues, congestion, inefficient staff placement, unexpected safety incidents, or unattended bags. He has a mountain of data but lacks the tools to **predict issues before they impact operations**.

## Our Solution: AOCC Predictive Layer

### Core Features Required:

#### 1. **PREDICTIVE HEATMAPS** (CRITICAL - Currently Missing!)
- Visual representation of passenger density across the terminal
- Color-coded overlay showing congestion levels
- Based on CCTV Footage analysis via Vertex AI Vision
- Shows BOTH current state AND predicted state (30 min forecast)

**Example Output:**
"Security Checkpoint B: Currently 127% capacity → Predicted 150% in 18 minutes"

#### 2. **Real-Time CCTV Integration**
- Vertex AI Vision analyzes CCTV data in real time
- Monitors: passenger movement, occupancy patterns, unattended baggage, safety incidents, unauthorized access
- Visual indicators showing which cameras are feeding predictions

#### 3. **Predictive Timeline**
- "Next 30 Minutes" forecast panel
- Shows bottlenecks BEFORE they happen
- Allows David to deploy staff proactively

**Example Output:**
"High volume predicted at Domestic Security in 20 mins. Recommendation: Open one additional lane and deploy two staffs."

#### 4. **Actionable Intelligence**
For the Operator: The AOCC dashboard displays predictive suggestions of the airport. It sends simple, clear alerts like:
- ✅ "High volume predicted at Domestic Security in 20 mins. Recommendation: Open one additional lane and deploy two staffs."
- ✅ "Bottleneck forming at Check-in B. Redirect passengers to Check-in A."
- ✅ "Unattended baggage detected at Gate 12. Dispatching security."

#### 5. **Conversational AI Layer**
Staff could interact with AURA naturally, asking questions such as:
- "Does this lounge need more chairs?"
- "Which gates will be congested soon?"
- "My flight is delayed, will I miss my connection?"

And receive actionable recommendations instantly.

## AURA Architecture Components

### Data Sources:
1. **CCTV Footage** (Vertex AI Vision analysis)
2. **Flight Information** (AIDX)
3. **Historical Flow Data**
4. **External APIs** (weather, traffic)

### Intelligence Layer:
- **Gemini Vertex AI Studio**
  - Multimodal Analysis
  - Custom AI Agent
  - Predictive Modeling
  - Generative Recommendations

### Actionable Intel Outputs:
1. **AOCC Predictive Dashboard**
   - Resource Allocation Alerts
   - Bottleneck Warnings
   - **Predictive Heatmaps** ← CRITICAL FEATURE
   
2. **AURA MCIA App** (for travelers)
   - Real-time wait estimates
   - Wayfinding
   - Gate alerts

## UI/UX Requirements for Judges

### Font Sizes (Readable from 4-6 feet):
- **Header titles:** `text-2xl` or larger (24px+)
- **Body text / labels:** `text-base` minimum (16px)
- **Metrics:** `text-lg` to `text-xl` (18-20px)
- **Zone capacity numbers:** `text-3xl` to `text-4xl` (30-36px)
- **Small details only:** `text-sm` (14px) - nothing smaller

### Visual Hierarchy:
1. **Title/Header** - Largest, most prominent
2. **Critical Alerts** - RED, BOLD, ANIMATED
3. **Predictions** - HIGHLIGHTED, DISTINCT from current state
4. **Current Metrics** - Standard display
5. **Legend/Footer** - Smallest but still readable

### Color Coding:
- **Green** - Optimal operations
- **Amber** - Approaching capacity / Warning
- **Red** - Critical / Over capacity
- **Blue** - Predictive information (future state)

### Must-Have Visualizations:
1. ✅ **Terminal Heatmap** with passenger density overlay
2. ✅ **Predictive Timeline** panel (Now → +30 min)
3. ✅ **CCTV Camera Status** indicators
4. ✅ **AI Recommendation Cards** with clear actions
5. ✅ **Trend Arrows** (↑ worsening, ↓ improving, → stable)

## Key Differentiator for Judges

**AURA doesn't just SHOW data - it PREDICTS and RECOMMENDS.**

### Reactive Dashboard (Current):
"SEC-B is at 127%" → Operator reacts

### Proactive Dashboard (AURA):
"SEC-B will hit 150% in 18 minutes. Deploy 3 staff from Check-in NOW to prevent bottleneck." → Operator prevents

This is the game-changer that transforms David from firefighter to conductor.
