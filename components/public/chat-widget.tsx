"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Namaste. I am Vraj Online Assistant. Ask about services, documents, fees, processing time, or WhatsApp contact."
    }
  ]);
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isPending, startTransition] = useTransition();

  function sendMessage() {
    if (!question.trim()) return;
    const currentQuestion = question;
    setMessages((items) => [...items, { role: "user", text: currentQuestion }]);
    setQuestion("");

    startTransition(async () => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion, name, mobile })
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      setMessages((items) => [
        ...items,
        { role: "assistant", text: data.answer || data.error || "Please try again." }
      ]);
    });
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <section className="w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-lg border bg-white shadow-soft" aria-label="Vraj Online Assistant chat">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <h2 className="text-sm font-bold">Vraj Online Assistant</h2>
              <p className="text-xs opacity-90">Service guidance and lead capture</p>
            </div>
            <button className="focus-ring p-1" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-md px-3 py-2 text-sm leading-5 ${
                  message.role === "assistant" ? "bg-muted text-slate-800" : "ml-auto bg-accent text-white"
                } max-w-[88%]`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="grid gap-2 border-t p-3">
            <div className="grid grid-cols-2 gap-2">
              <input aria-label="Your name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
              <input aria-label="Mobile number" placeholder="Mobile" value={mobile} onChange={(event) => setMobile(event.target.value)} />
            </div>
            <div className="flex gap-2">
              <input
                aria-label="Ask a question"
                placeholder="Ask about PAN, Aadhaar, PVC..."
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
              />
              <button
                className="focus-ring grid size-11 shrink-0 place-items-center bg-primary text-primary-foreground disabled:opacity-60"
                onClick={sendMessage}
                disabled={isPending}
                aria-label="Send message"
              >
                <Send className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </section>
      ) : (
        <button
          className="focus-ring flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-soft"
          onClick={() => setOpen(true)}
          aria-label="Open Vraj Online Assistant"
        >
          <MessageCircle className="size-5" aria-hidden />
          Assistant
        </button>
      )}
    </div>
  );
}
