"use client";

import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RefreshCw, Bot, User } from "lucide-react";
import {
  ChatMessage,
  LifeGPSState,
  INITIAL_PROMPTS,
  INITIAL_LIFE_GPS,
  getPatriciaResponse,
} from "./patriciaDialogEngine";
import { LifeGPSWidget } from "./LifeGPSWidget";

interface PatriciaChatExperienceProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const PatriciaChatExperience = memo(function PatriciaChatExperience({
  initialPrompt,
  onClearInitialPrompt,
}: PatriciaChatExperienceProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "patricia",
      text: "Hi! I'm Patricia, your AI Life GPS. Let's figure out where you are, where you want to go, and your next best step.",
      timestamp: "Just now",
      suggestedQuestions: INITIAL_PROMPTS,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [gpsState, setGpsState] = useState<LifeGPSState>(INITIAL_LIFE_GPS);
  const [mobileTab, setMobileTab] = useState<"chat" | "gps">("chat");

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSendMessage = useCallback(
    (textToSend: string) => {
      const trimmed = textToSend.trim();
      if (!trimmed || isTyping) return;

      const userMsgId = `user-${Date.now()}`;
      const newMssgList: ChatMessage[] = [
        ...messages,
        {
          id: userMsgId,
          sender: "user",
          text: trimmed,
          timestamp: "Just now",
        },
      ];

      setMessages(newMssgList);
      setInput("");
      setIsTyping(true);

      // Simulate fast, responsive response from Patricia
      setTimeout(() => {
        const patriciaReply = getPatriciaResponse(trimmed);

        if (patriciaReply.gpsUpdate) {
          setGpsState((prev) => ({
            ...prev,
            ...patriciaReply.gpsUpdate,
          }));
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `patricia-${Date.now()}`,
            sender: "patricia",
            text: patriciaReply.replyText,
            timestamp: "Just now",
            suggestedQuestions: patriciaReply.suggestedQuestions,
            gpsUpdate: patriciaReply.gpsUpdate,
          },
        ]);

        setIsTyping(false);
      }, 550);
    },
    [messages, isTyping],
  );

  // Auto-send if initialPrompt was passed from the Opening Hero
  const handledPromptRef = useRef<string | null>(null);
  useEffect(() => {
    if (initialPrompt && initialPrompt !== handledPromptRef.current) {
      handledPromptRef.current = initialPrompt;
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, handleSendMessage, onClearInitialPrompt]);

  const handleReset = useCallback(() => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: "patricia",
        text: "Hi! I'm Patricia, your AI Life GPS. Let's figure out where you are, where you want to go, and your next best step.",
        timestamp: "Just now",
        suggestedQuestions: INITIAL_PROMPTS,
      },
    ]);
    setGpsState(INITIAL_LIFE_GPS);
  }, []);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      {/* Mobile Tab Toggle (visible on small screens) */}
      <div className="lg:hidden flex mb-6 p-1 rounded-xl bg-white/5 border border-white/10">
        <button
          onClick={() => setMobileTab("chat")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            mobileTab === "chat"
              ? "bg-orange-500 text-white shadow"
              : "text-white/60 hover:text-white"
          }`}
        >
          Patricia Chatbot
        </button>
        <button
          onClick={() => setMobileTab("gps")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            mobileTab === "gps"
              ? "bg-orange-500 text-white shadow"
              : "text-white/60 hover:text-white"
          }`}
        >
          Your Life GPS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-stretch">
        {/* Main Patricia Chat Column */}
        <div
          className={`rounded-2xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-[650px] ${
            mobileTab === "chat" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-rose-500 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center text-orange-400">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white font-sans">
                    Patricia
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-500/10 border border-orange-400/30 text-orange-300">
                    AI Life GPS
                  </span>
                </div>
                <p className="text-xs text-white/50">
                  Responds quickly, simply, & directly
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "patricia" && (
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400 shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className="max-w-[85%] sm:max-w-[75%] space-y-3">
                    {/* Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-tr-none font-medium shadow-md"
                          : "bg-white/[0.05] border border-white/10 text-slate-100 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Suggested Question Chips (Prompt examples) */}
                    {msg.suggestedQuestions &&
                      msg.suggestedQuestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {msg.suggestedQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(q)}
                              className="text-left text-xs font-medium px-3.5 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-400/30 text-orange-200 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white/50 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse [animation-delay:0.4s]" />
                  <span className="ml-1 text-white/40">
                    Patricia is thinking...
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Chat Input Footer */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Patricia anything (e.g. What should I learn next?)..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-orange-400/60 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:hover:bg-orange-500 text-white font-bold px-4 py-3 rounded-xl transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Life GPS Panel Column - Exactly matching Chat height (650px) */}
        <div
          className={`h-[650px] ${
            mobileTab === "gps" ? "flex flex-col" : "hidden lg:flex flex-col"
          }`}
        >
          <LifeGPSWidget gpsState={gpsState} className="h-full" />
        </div>
      </div>
    </section>
  );
});
