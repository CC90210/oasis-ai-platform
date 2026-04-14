# 🔧 N8N WEBHOOK CONFIGURATION - EXACT SETUP

## YOUR PROBLEM

The webhook receives requests (Status 200) BUT n8n isn't picking up the data.

---

## ✅ EXACT N8N SETUP - STEP BY STEP

### 1. WEBHOOK NODE CONFIGURATION

Open your n8n workflow and find the **Webhook** node. Configure it EXACTLY like this:

**Webhook Node Settings:**
- **HTTP Method:** `POST`
- **Path:** `4d3a63d7-40ee-4ac6-b2b5-3fdef75391f7/chat`
- **Response Mode:** `When Last Node Finishes`
- **Response Code:** `200`

**IMPORTANT:** Under "Options" click:
- ✅ **CORS:** Enabled
- **Allowed Origins:** `https://oasisai.work`

---

### 2. ACCESS THE DATA IN N8N

The frontend sends this JSON:

```json
{
  "sessionId": "session_1732741234_abc123",
  "message": "Hello",
  "conversationHistory": [...],
  "timestamp": "2025-11-27T20:00:00.000Z",
  "page": "/",
  "referrer": "direct"
}
```

**In n8n, access the data like this:**

- User's message: `{{ $json.body.message }}`
- Session ID: `{{ $json.body.sessionId }}`
- History: `{{ $json.body.conversationHistory }}`
- Timestamp: `{{ $json.body.timestamp }}`
- Page: `{{ $json.body.page }}`

---

### 3. COMPLETE WORKFLOW EXAMPLE

```
┌─────────────────────────┐
│   Webhook (Chat)        │
│   POST /...chat         │
│   Receives JSON body    │
└──────────┬──────────────┘
           │
           ↓
┌─────────────────────────┐
│   Set Variable          │
│   userMessage =         │
│   {{ $json.body.message }}│
└──────────┬──────────────┘
           │
           ↓
┌─────────────────────────┐
│   AI Agent (Archer)     │
│   Input:                │
│   {{ $json.userMessage }}│
└──────────┬──────────────┘
           │
           ↓
┌─────────────────────────┐
│   Respond to Webhook    │
│   Body:                 │
│   {{ $json.output }}    │
└─────────────────────────┘
```

---

### 4. AI AGENT NODE SETUP

**In your AI Agent node:**

**Input:**
```
{{ $('Webhook').first().json.body.message }}
```

OR if you used Set node:
```
{{ $json.userMessage }}
```

**System Message (optional):**
```
You are Archer, the AI assistant for OASIS AI. 
Help users understand our automation services.
Be friendly, professional, and concise.
```

---

### 5. RESPOND TO WEBHOOK NODE

**Response Body:**
```json
{
  "output": "{{ $json.output }}"
}
```

OR just:
```
{{ $json.output }}
```

**Response Headers:**
```
Access-Control-Allow-Origin: https://oasisai.work
Content-Type: application/json
```

---

### 6. TEST THE SETUP

**Manual Test in n8n:**

1. Click "Execute Workflow"
2. Send test message from chat widget
3. Check webhook execution
4. Click on each node to see data

**What to look for:**

Node 1 (Webhook):
```json
{
  "body": {
    "message": "Hello",
    "sessionId": "session_...",
    ...
  }
}
```

Node 2 (AI Agent):
```json
{
  "output": "Hi! How can I help..."
}
```

Node 3 (Respond):
- Should show the response being sent

---

### 7. COMMON MISTAKES TO FIX

❌ **Wrong:** Using `$json.message` directly
✅ **Correct:** Using `$json.body.message`

❌ **Wrong:** Webhook set to "Respond Immediately"
✅ **Correct:** "When Last Node Finishes"

❌ **Wrong:** No CORS headers
✅ **Correct:** CORS enabled with origin

❌ **Wrong:** Agent not connected to webhook data
✅ **Correct:** `{{ $('Webhook').first().json.body.message }}`

---

### 8. EXACT NODE CONFIGURATIONS

#### WEBHOOK NODE (Click to edit):

```
HTTP Method: POST
Path: 4d3a63d7-40ee-4ac6-b2b5-3fdef75391f7/chat
Response Mode: When Last Node Finishes
Response Code: 200

OPTIONS (click "Add Option"):
- CORS: true
- Allowed Origins: https://oasisai.work
```

#### SET NODE (optional but recommended):

```javascript
// Click "Add Field" → String

Field Name: userMessage
Value: {{ $json.body.message }}

Field Name: sessionId  
Value: {{ $json.body.sessionId }}
```

#### AI AGENT NODE:

```
Chat Model: (your model)

Input: 
{{ $json.userMessage }}

OR:
{{ $('Webhook').first().json.body.message }}

System Message:
You are Archer from OASIS AI. Help users with automation questions.
```

#### RESPOND TO WEBHOOK NODE:

```
Response Body:
{{ $json.output }}

OR:
{
  "output": "{{ $json.output }}"
}

Response Code: 200

OPTIONS → Add Headers:
Access-Control-Allow-Origin: https://oasisai.work
Content-Type: application/json
```

---

### 9. DEBUGGING CHECKLIST

Test at each step:

1. **Webhook receives data?**
   - Execute workflow
   - Send chat message
   - Check webhook node output
   - Should see `body.message` = "Hello"

2. **Agent gets the message?**
   - Check AI Agent input
   - Should show user's message
   - Should produce output

3. **Response sent back?**
   - Check "Respond to Webhook" execution
   - Should show output being returned

4. **Frontend receives it?**
   - Check browser console
   - Should see response logged
   - Should display in chat

---

### 10. IF STILL NOT WORKING

**Option A: Simplify First**

Create minimal test workflow:

```
Webhook → Code → Respond

Code node:
return [{
  json: {
    output: `You said: ${$input.all()[0].json.body.message}`
  }
}];

Respond node:
{{ $json.output }}
```

This proves data flow works.

**Option B: Check Webhook URL**

Make sure your webhook URL is EXACTLY:
```
https://n8n.srv993801.hstgr.cloud/webhook/4d3a63d7-40ee-4ac6-b2b5-3fdef75391f7/chat
```

No extra slashes or characters.

---

## 📋 COPY-PASTE READY VALUES

**For AI Agent Input:**
```
{{ $('Webhook').first().json.body.message }}
```

**For Respond Body (simple):**
```
{{ $json.output }}
```

**For Respond Body (JSON):**
```json
{"output":"{{ $json.output }}"}
```

**For CORS Header:**
```
https://oasisai.work
```

---

## 🎯 FINAL CHECK

After configuration:

1. ✅ Workflow is ACTIVE (green toggle)
2. ✅ Webhook receives body.message
3. ✅ AI Agent uses `$json.body.message`
4. ✅ Respond node returns `$json.output`
5. ✅ CORS headers are set
6. ✅ Test message works end-to-end

---

**The frontend is sending the data correctly (I tested it - Status 200). The issue is 100% in how n8n is configured to READ and RESPOND to that data. Follow this guide exactly and it will work.**
