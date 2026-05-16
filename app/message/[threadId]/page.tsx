"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getConversation, type ChatBubble } from "@/lib/conversations";

function Avatar({
  hasPhoto,
  photoColor,
  initial,
}: {
  hasPhoto: boolean;
  photoColor?: string;
  initial: string;
}) {
  return (
    <div
      className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ${
        hasPhoto ? `bg-gradient-to-br ${photoColor}` : "bg-gray-200"
      }`}
    >
      {hasPhoto ? (
        <span className="text-white font-bold text-sm">{initial}</span>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </div>
  );
}

function ChatBubbleItem({ message }: { message: ChatBubble }) {
  const isMe = message.sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <BubbleContent message={message} isMe={isMe} />
    </div>
  );
}

function BubbleContent({
  message,
  isMe,
}: {
  message: ChatBubble;
  isMe: boolean;
}) {
  return (
    <div
      className={`max-w-[80%] flex flex-col gap-1 ${
        isMe ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isMe
            ? "bg-[#1A3BAE] text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md"
        }`}
      >
        {message.text}
      </div>
      <span className="text-[10px] text-gray-400 px-1">{message.time}</span>
    </div>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const threadId = params.threadId as string;
  const thread = getConversation(threadId);

  const [messages, setMessages] = useState<ChatBubble[]>(
    () => thread?.messages ?? []
  );
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  if (!thread) {
    return (
      <div className="min-h-screen bg-[#EEF2FF] flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-sm text-gray-500">대화를 찾을 수 없습니다.</p>
        <button
          type="button"
          onClick={() => router.push("/message")}
          className="text-sm font-semibold text-[#1A3BAE]"
        >
          메시지 목록으로
        </button>
      </div>
    );
  }

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        sender: "me",
        text: trimmed,
        time,
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col max-w-sm mx-auto w-full">
      <header className="bg-white px-4 pt-5 pb-3 flex items-center gap-3 border-b border-gray-100 flex-shrink-0">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-1 -ml-1"
          aria-label="뒤로"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <Avatar
          hasPhoto={thread.hasPhoto}
          photoColor={thread.photoColor}
          initial={thread.initial}
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-extrabold text-gray-900 truncate">
            {thread.name}
          </h1>
          <p className="text-xs text-gray-500">{thread.role}</p>
        </div>
      </header>

      {thread.linkedTask && (
        <LinkedTaskChip title={thread.linkedTask} />
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0"
      >
        {messages.map((msg) => (
          <ChatBubbleItem key={msg.id} message={msg} />
        ))}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
}

function LinkedTaskChip({ title }: { title: string }) {
  return (
    <div className="mx-4 mt-3 bg-white border border-blue-100 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <span className="text-sm font-semibold text-[#1A3BAE] truncate">{title}</span>
    </div>
  );
}

function ChatInput({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-end gap-2 flex-shrink-0">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder="메시지를 입력하세요"
        rows={1}
        className="flex-1 resize-none bg-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A3BAE]/30 max-h-24"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!value.trim()}
        className="w-11 h-11 bg-[#1A3BAE] disabled:bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
        aria-label="전송"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}
