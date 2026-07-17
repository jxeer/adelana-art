import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, SendHorizontal, Mail, MapPin, Layers, Clock, HelpCircle, ArrowRight } from "lucide-react";
import { ARTWORKS } from "../data";
import { Message, CollectorInquiry } from "../types";

interface ConciergeProps {
  selectedArtworkId: string;
}

export default function Concierge({ selectedArtworkId }: ConciergeProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Welcome to the Adelana private viewing chamber. I am your Studio Concierge. It is my privilege to discuss the concepts, medium details, or archival integrity of the works with you. How may I assist your curation today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArtId, setSelectedArtId] = useState(selectedArtworkId || "i-am");
  
  // Inquiry Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedInquiries, setSubmittedInquiries] = useState<CollectorInquiry[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const activeArtwork = ARTWORKS.find((a) => a.id === selectedArtId) || ARTWORKS[0];

  useEffect(() => {
    if (selectedArtworkId) {
      setSelectedArtId(selectedArtworkId);
    }
  }, [selectedArtworkId]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Suggestions for prompt starters
  const suggestions = [
    { label: "Limited edition limits?", prompt: "Could you explain the difference between the unique originals and the limited editions of 5? How are they signed?" },
    { label: "Gilding durability?", prompt: "How do you ensure the 24k gold leaf and plaster textures do not degrade over time? What UV varnishes are used?" },
    { label: "Bespoke sizing?", prompt: "I have a large double-height concrete wall. Do you accept commissions for custom bespoke sizes?" },
    { label: "White-glove delivery?", prompt: "How are the float-framed canvases crated and shipped internationally? Is assembly required?" }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map message history into standard form expected by server
      const chatHistory = messages.slice(1).map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/collector/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
          artworkContext: {
            title: activeArtwork.title,
            dimensions: activeArtwork.dimensions,
            materials: activeArtwork.materials,
            story: activeArtwork.story,
            meaning: activeArtwork.meaning,
            process: activeArtwork.creationSteps
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with concierge");
      }

      const modelMessage: Message = {
        id: `msg-${Date.now()}-model`,
        role: "model",
        text: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (error: any) {
      console.error("Concierge Error:", error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}-err`,
        role: "model",
        text: "My apologies. Our digital neural uplink is silent. Let me restate our process: our works are fully handcrafted with custom plaster, volcanic sand, gesso pigments, and burnished sheets of 24k gold leaf. Please complete the inquiry form to the side and we will coordinate directly.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    const targetArt = ARTWORKS.find((a) => a.id === selectedArtId) || ARTWORKS[0];

    const newInquiry: CollectorInquiry = {
      artworkId: targetArt.id,
      artworkTitle: targetArt.title,
      name: formName,
      email: formEmail,
      notes: formNotes,
      deliveryCity: formCity,
      isCustomRequest: false
    };

    setSubmittedInquiries((prev) => [newInquiry, ...prev]);
    setFormSubmitted(true);

    // Reset form fields
    setFormName("");
    setFormEmail("");
    setFormCity("");
    setFormNotes("");
  };

  return (
    <section className="min-h-screen bg-black text-white pt-24 pb-20" id="collector-concierge-chamber">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center lg:text-left mb-12">
          <span className="text-amber-500 font-mono text-xs tracking-[0.45em] uppercase mb-3 block">
            Collector Portal
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase font-sans mb-6">
            Chamber of Dialog
          </h2>
          <p className="max-w-2xl text-neutral-400 text-xs md:text-sm leading-relaxed tracking-wider font-light">
            Discuss architectural scaling, custom commissions, or material curing cycles in direct confidence with our studio intelligence, or log a formal acquisition request below.
          </p>
        </div>

        {/* Master Chamber layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="concierge-master-grid">
          
          {/* Left Panel: Gemini-powered chat concierge */}
          <div className="lg:col-span-7 flex flex-col bg-neutral-950 border border-white/5 h-[620px] rounded-[1px] relative" id="chat-concierge-box">
            
            {/* Chat header panel */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-neutral-900/40">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 animate-pulse" />
                <div>
                  <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-white">
                    Studio Concierge
                  </h3>
                  <p className="text-[8px] font-mono tracking-widest uppercase text-neutral-500">
                    Art Advisor • Online
                  </p>
                </div>
              </div>

              {/* Selected Artwork Context badge */}
              <div className="text-[8px] font-mono tracking-widest uppercase bg-neutral-900 border border-white/5 py-1 px-2.5 rounded-[1px] text-amber-200">
                CONTEXT: {activeArtwork.title}
              </div>
            </div>

            {/* Chat Messages Display */}
            <div className="flex-grow overflow-y-auto px-6 py-6 space-y-6" id="messages-scroller">
              {messages.map((msg) => {
                const isModel = msg.role === "model";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isModel ? "justify-start" : "justify-end"}`}
                    id={`chat-bubble-${msg.id}`}
                  >
                    <div className={`max-w-[85%] rounded-[1px] p-4 text-xs tracking-wide leading-relaxed font-light ${
                      isModel
                        ? "bg-neutral-900/50 border border-white/5 text-neutral-200"
                        : "bg-amber-650/15 border border-amber-500/25 text-amber-100"
                    }`}>
                      {/* Message author signet */}
                      <p className={`text-[8px] font-mono tracking-widest uppercase mb-1.5 ${isModel ? "text-amber-500/70" : "text-amber-400"}`}>
                        {isModel ? "Adelana Concierge" : "Collector Inquiry"}
                      </p>
                      
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start" id="chat-loading-indicator">
                  <div className="bg-neutral-900/40 border border-white/5 rounded-[1px] p-4 flex items-center space-x-3">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
                      Formulating response
                    </span>
                    <div className="flex space-x-1 h-2">
                      <span className="bg-amber-500 w-1 h-1 rounded-full animate-bounce" />
                      <span className="bg-amber-500 w-1 h-1 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="bg-amber-500 w-1 h-1 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Starter Suggestions */}
            <div className="px-6 py-3 border-t border-white/5 bg-neutral-950 flex flex-wrap gap-2 overflow-x-auto" id="chat-suggestions-shelf">
              {suggestions.map((sug) => (
                <button
                  key={sug.label}
                  onClick={() => handleSendMessage(sug.prompt)}
                  className="text-[9px] font-mono tracking-widest uppercase bg-neutral-900 hover:bg-neutral-850 hover:text-white text-neutral-400 border border-white/5 py-1.5 px-2.5 rounded-[1px] transition-colors"
                >
                  {sug.label}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <div className="border-t border-white/5 p-4 bg-neutral-900/20">
              <div className="flex items-center bg-neutral-950 border border-white/10 rounded-[1px] p-1.5 focus-within:border-amber-500/50 transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  placeholder="Ask a question about the collection or creation process..."
                  className="flex-grow bg-transparent text-xs tracking-wide text-neutral-200 px-3 py-2.5 focus:outline-none placeholder-neutral-600"
                  id="chat-text-input"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  className="bg-amber-500 hover:bg-amber-400 text-black py-2.5 px-4 text-[10px] font-semibold tracking-widest uppercase rounded-[1px] transition-colors flex items-center justify-center"
                  id="chat-send-btn"
                >
                  <SendHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel: Collector Inquiry Form */}
          <div className="lg:col-span-5 bg-neutral-950 border border-white/5 p-6 md:p-8 flex flex-col justify-between" id="collector-inquiry-box">
            
            <form onSubmit={handleFormSubmit} className="space-y-5 flex-grow">
              <div className="border-b border-white/5 pb-4 mb-4">
                <h3 className="text-sm font-mono tracking-[0.25em] uppercase text-white">
                  Acquire Ledger
                </h3>
                <p className="text-[9px] font-mono tracking-widest uppercase text-neutral-500 mt-1">
                  Log a formal studio request
                </p>
              </div>

              {/* Artwork Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono tracking-widest uppercase text-neutral-400">
                  Target Masterpiece
                </label>
                <select
                  value={selectedArtId}
                  onChange={(e) => setSelectedArtId(e.target.value)}
                  className="bg-neutral-900 border border-white/10 text-xs tracking-wider text-neutral-200 p-3 rounded-[1px] focus:border-amber-500 focus:outline-none uppercase font-sans font-light"
                  id="inquiry-artwork-select"
                >
                  {ARTWORKS.map((a) => (
                    <option key={a.id} value={a.id} className="bg-neutral-950 uppercase">
                      {a.title} ({a.year})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono tracking-widest uppercase text-neutral-400">
                  Collector Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="E.g., Victoria Sterling"
                  className="bg-neutral-900 border border-white/10 text-xs tracking-wider text-neutral-200 p-3 rounded-[1px] focus:border-amber-500 focus:outline-none placeholder-neutral-700"
                  id="inquiry-name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono tracking-widest uppercase text-neutral-400">
                  Email Coordinates
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="collector@residence.com"
                  className="bg-neutral-900 border border-white/10 text-xs tracking-wider text-neutral-200 p-3 rounded-[1px] focus:border-amber-500 focus:outline-none placeholder-neutral-700"
                  id="inquiry-email"
                />
              </div>

              {/* Delivery Destination */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono tracking-widest uppercase text-neutral-400">
                  White-Glove Delivery Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-600" />
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="E.g., Chelsea, London or SoHo, New York"
                    className="bg-neutral-900 border border-white/10 text-xs tracking-wider text-neutral-200 pl-10 pr-4 py-3 rounded-[1px] w-full focus:border-amber-500 focus:outline-none placeholder-neutral-700"
                    id="inquiry-location"
                  />
                </div>
              </div>

              {/* Space specs or custom notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono tracking-widest uppercase text-neutral-400">
                  Space Specifications & Notes
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Describe your lighting setup, wall height, or inquire about custom shadow-gap float frames..."
                  rows={3}
                  className="bg-neutral-900 border border-white/10 text-xs tracking-wider text-neutral-200 p-3 rounded-[1px] w-full focus:border-amber-500 focus:outline-none placeholder-neutral-700 resize-none"
                  id="inquiry-notes"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-center bg-amber-500 hover:bg-amber-400 text-black py-3.5 px-6 text-[10px] font-semibold tracking-[0.3em] uppercase rounded-[1px] transition-colors"
                id="inquiry-submit-btn"
              >
                Log Inquiry with Studio
              </button>
            </form>

            {/* Ledger Submission feedback */}
            <AnimatePresence>
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-amber-600/10 border border-amber-500/20 p-4 text-center rounded-[1px]"
                  id="form-success-plaque"
                >
                  <p className="text-[10px] tracking-widest text-amber-200 font-mono uppercase mb-1">
                    Inquiry Placed in Ledger
                  </p>
                  <p className="text-[9px] text-neutral-400 leading-normal font-light">
                    Your coordinates are registered. Curation specialists from the Adelana brand will reach out to schedule a private phone dialogue within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-[8px] font-mono text-amber-500 underline uppercase tracking-widest mt-2"
                  >
                    Register another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mock Ledger: Registered inquiries shelf */}
        {submittedInquiries.length > 0 && (
          <div className="mt-12 bg-neutral-950 border border-white/5 p-6 md:p-8" id="collector-ledger-shelf">
            <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-amber-500/80 mb-4 uppercase">
              Registered Studio Ledger (Simulated)
            </h3>
            <div className="space-y-3">
              {submittedInquiries.map((inq, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-neutral-900/35 border border-white/5 text-xs text-neutral-300 gap-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-semibold text-white">{inq.name}</span>
                    <span className="text-neutral-600 font-mono">•</span>
                    <span className="text-neutral-400">{inq.email}</span>
                    <span className="text-neutral-600 font-mono">•</span>
                    <span className="text-amber-200 font-mono uppercase">Request: {inq.artworkTitle}</span>
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                    Destination: {inq.deliveryCity || "Studio Crate Pick Up"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
