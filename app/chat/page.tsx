"use client";

import { useState, useCallback } from "react";
import { MessageSquare } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/lib/types";
import {
  createUserMessage, createAssistantMessage,
  getSimulatedResponse, INITIAL_CHAT_MESSAGE,
} from "@/lib/chat-simulator";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_CHAT_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback(async (text: string) => {
    const userMsg = createUserMessage(text);
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const delay = 800 + Math.random() * 1200;
    await new Promise((r) => setTimeout(r, delay));

    const response = getSimulatedResponse(text);
    const assistantMsg = createAssistantMessage(response);
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)] rounded-xl border bg-card overflow-hidden">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">RentEase Assistant</p>
            <p className="text-xs text-green-600 dark:text-green-400">● Online</p>
          </div>
        </div>

        <ChatWindow messages={messages} isTyping={isTyping} />

        <div className="border-t p-4">
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      </div>
    </AppLayout>
  );
}
