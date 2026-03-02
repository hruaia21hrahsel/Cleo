import { ChatMessage } from "./types";
import { generateId } from "./utils";

interface ConversationContext {
  topic?: string;
  lastQuestion?: string;
}

const RESPONSES: Record<string, string[]> = {
  rent: [
    "Rent collection is at the heart of property management. With RentEase, you can track all your payments in the **Payments** section. Set due dates, and the system auto-marks overdue payments.",
    "You can record rent payments manually or share payment links with tenants. Supported methods: UPI, bank transfer, cash, and cheque.",
    "To reduce late payments, set up WhatsApp reminders via the notification settings. Tenants receive automated alerts 3 days before the due date.",
  ],
  tenant: [
    "To add a new tenant, go to **Properties → [Select Property] → Tenants tab → Add Tenant**. Fill in their details and generate an invite link.",
    "Tenants get their own portal at `/tenant/dashboard` where they can view rent history, upcoming dues, and their property details.",
    "You can manage tenant documents, emergency contacts, and ID proofs from the tenant profile. KYC is built-in!",
  ],
  property: [
    "You can manage up to unlimited properties in RentEase. Go to **Properties → Add Property** to create one. Supported types: Apartment, Villa, PG, Commercial.",
    "Each property has its own dashboard with occupancy stats, revenue summary, and tenant list. Click on any property card to explore.",
    "You can add amenities like WiFi, Parking, Security to each property to help when listing vacant rooms.",
  ],
  room: [
    "Rooms are managed inside each property. Go to **Properties → [Property] → Rooms tab** to add, edit, or update room status.",
    "A room can be in 3 states: **Occupied**, **Vacant**, or **Under Maintenance**. The occupancy dashboard updates in real-time.",
    "When a room is vacated, it automatically becomes available and you can assign a new tenant to it.",
  ],
  overdue: [
    "Overdue payments are highlighted in red across the dashboard. You'll see them in **Payments** with filter option `Overdue`.",
    "For overdue tenants, you can send a payment reminder directly from their profile. The system logs all communication.",
    "You can also generate a PDF statement for overdue payments to share with the tenant.",
  ],
  export: [
    "Yes! You can export payment data as CSV from the **Payments** page. Click the **Export CSV** button at the top right.",
    "The CSV export includes all payment records with tenant names, amounts, dates, and methods for easy accounting.",
  ],
  invite: [
    "To invite a tenant: go to the tenant's profile → click **Copy Invite Link** → share via WhatsApp or email. The tenant visits the link to set up their account.",
    "Invite tokens expire in 7 days for security. You can regenerate a new token anytime from the tenant's profile.",
  ],
  occupancy: [
    "Your current occupancy rate is shown on the dashboard. A healthy rate is 80%+. You have some vacant rooms — consider posting them on housing platforms.",
    "The occupancy chart on the dashboard shows per-property breakdown so you can identify which property needs more attention.",
  ],
  maintenance: [
    "For maintenance requests, set a room's status to **Under Maintenance** from the Rooms tab. This removes it from occupancy calculations.",
    "You can track maintenance notes in the room's details section. Once resolved, update the status back to Vacant or Occupied.",
  ],
  help: [
    "Here's what I can help with:\n- 🏠 **Properties & Rooms** — adding, editing, occupancy\n- 👤 **Tenants** — onboarding, invite links, profiles\n- 💰 **Payments** — recording, overdue tracking, CSV export\n- 📊 **Dashboard** — revenue, occupancy, stats\n\nWhat would you like to know more about?",
  ],
  greeting: [
    "Hello! 👋 I'm your RentEase assistant. I can help with properties, tenants, payments, and more. What do you need?",
    "Hi there! Ask me anything about managing your properties or tenants.",
  ],
  thanks: [
    "You're welcome! Let me know if you have more questions.",
    "Happy to help! Feel free to ask anything else.",
    "Glad I could help! Is there anything else about your properties or tenants?",
  ],
  dashboard: [
    "The **Dashboard** gives you a 360° view: total revenue, occupancy rates, overdue payments, and recent activity — all at a glance.",
    "You can see revenue trends in the area chart at the bottom of the dashboard. It shows the last 6 months of expected vs collected rent.",
  ],
  settings: [
    "In **Settings**, you can update your profile, change your password, configure notification preferences, and toggle dark mode.",
  ],
};

const FALLBACK_RESPONSES = [
  "That's a great question! Let me think... For specific property management queries, try asking about tenants, payments, rooms, or properties. I'm here to help!",
  "I'm not sure about that one. Try asking me about rent payments, tenant onboarding, occupancy rates, or dashboard features.",
  "Hmm, I don't have specific info on that. Could you rephrase? I work best with questions about property management topics like rent, tenants, or maintenance.",
];

function matchKeywords(input: string): string[] {
  const lower = input.toLowerCase();
  const matched: string[] = [];

  const keywords: Record<string, string[]> = {
    rent: ["rent", "payment", "pay", "due", "collect", "₹", "money", "rupee"],
    tenant: ["tenant", "renter", "resident", "occupant", "person"],
    property: ["property", "properties", "flat", "apartment", "house", "building", "pg", "hostel"],
    room: ["room", "unit", "space", "floor"],
    overdue: ["overdue", "late", "pending", "unpaid", "missed", "delay"],
    export: ["export", "csv", "download", "report", "statement"],
    invite: ["invite", "link", "onboard", "join", "token"],
    occupancy: ["occupancy", "vacant", "empty", "available", "filled"],
    maintenance: ["maintenance", "repair", "fix", "broken", "issue"],
    help: ["help", "what can", "how do", "guide", "tutorial", "what do"],
    greeting: ["hello", "hi", "hey", "good morning", "good afternoon", "namaste"],
    thanks: ["thanks", "thank you", "thx", "appreciate", "helpful"],
    dashboard: ["dashboard", "overview", "summary", "stats", "statistics"],
    settings: ["settings", "setting", "profile", "account", "preferences", "dark mode", "theme"],
  };

  for (const [topic, words] of Object.entries(keywords)) {
    if (words.some((word) => lower.includes(word))) {
      matched.push(topic);
    }
  }

  return matched;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getSimulatedResponse(
  userMessage: string,
  _context: ConversationContext = {}
): string {
  const matches = matchKeywords(userMessage);

  if (matches.length > 0) {
    // If multiple matches, pick the most specific one
    const topic = matches[0];
    const responses = RESPONSES[topic];
    if (responses && responses.length > 0) {
      return pickRandom(responses);
    }
  }

  return pickRandom(FALLBACK_RESPONSES);
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: generateId(),
    role: "user",
    content,
    timestamp: new Date().toISOString(),
  };
}

export function createAssistantMessage(content: string): ChatMessage {
  return {
    id: generateId(),
    role: "assistant",
    content,
    timestamp: new Date().toISOString(),
  };
}

export const INITIAL_CHAT_MESSAGE: ChatMessage = {
  id: "init-msg",
  role: "assistant",
  content:
    "Hello! 👋 I'm your **RentEase AI Assistant**. I can help you with:\n\n- 🏠 Managing properties and rooms\n- 👤 Tenant onboarding and profiles\n- 💰 Payments and overdue tracking\n- 📊 Dashboard insights\n\nWhat would you like help with today?",
  timestamp: new Date().toISOString(),
};
