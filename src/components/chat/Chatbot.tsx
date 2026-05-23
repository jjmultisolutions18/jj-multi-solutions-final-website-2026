import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  Sparkles, 
  CornerDownLeft, 
  FileText, 
  Cpu, 
  Wifi, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  { text: 'Rapid Prototyping info', icon: Cpu, query: 'What rapid prototyping and 3D printing services do you offer in Upington?' },
  { text: 'LTE & Connectivity bundles', icon: Wifi, query: 'Tell me about your mobile data packages (MTN, Vodafone, Telkom)' },
  { text: 'Draft a quick quote request', icon: FileText, query: 'How does the quote request system work and how do I use the dashboard?' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! 👋 Welcome to JJ Multi Solutions. I am your Digital Innovation Assistant.\n\nHow can we help you translate your idea into digital implementation today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const historyToSend = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: historyToSend })
      });

      if (!res.ok) {
        throw new Error('Our AI core is resting temporarily. Please try again in a few moments.');
      }

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "I encountered an empty output. Could you rephrase your query please?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error executing AI pipeline.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! 👋 Welcome to JJ Multi Solutions. I am your Digital Innovation Assistant.\n\nHow can we help you translate your idea into digital implementation today?',
        timestamp: new Date()
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="bg-card border border-border rounded-2xl w-[350px] sm:w-[390px] h-[520px] shadow-2xl overflow-hidden flex flex-col mb-4"
          >
            {/* Header Block */}
            <div className="bg-primary p-4 text-white flex items-center justify-between relative">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                  <Bot size={20} className="text-secondary animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-xs tracking-wide">JJMS DIGITAL ASSISTANT</h3>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] text-zinc-200">Gemini 3.5 AI Engine • Online</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleResetChat}
                  className="p-1 px-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Reset conversation flow"
                >
                  <RefreshCw size={13} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 px-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Minimize chatbot"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Chat Messages Log Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.role === 'assistant' && (
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/10">
                        <Sparkles size={11} />
                      </div>
                    )}
                    <div 
                      className={`rounded-xl p-3 text-xs leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white font-medium' 
                          : 'bg-card border border-border text-foreground'
                      } whitespace-pre-line`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Sparkles size={11} className="animate-spin text-primary" />
                    </div>
                    <div className="rounded-xl p-3 text-xs bg-card border border-border text-muted-foreground flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                    </div>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-red-500/10 text-red-500 border border-red-500/15 rounded-xl text-center text-[11px] font-mono leading-relaxed">
                  {errorMessage}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Section: Chips + Input Bar */}
            <div className="p-3 border-t bg-card space-y-3">
              {/* Quick Prompts Chips rendering when log is short */}
              {messages.length <= 2 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Frequently Asked Enquiries</span>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_PROMPTS.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip.query)}
                        className="text-left p-1.5 px-2.5 rounded-lg border border-border/80 bg-muted/40 hover:bg-muted font-heading text-[10.5px] font-bold text-foreground transition-all flex items-center gap-2 group pointer"
                      >
                        <chip.icon size={11.5} className="text-secondary group-hover:scale-110 transition-transform" />
                        <span className="flex-1 truncate">{chip.text}</span>
                        <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Writing Input Bar */}
              <form onSubmit={handleFormSubmit} className="flex gap-2 relative">
                <input
                  type="text"
                  placeholder="Ask about 3D printing, internet, web hosting..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-muted/40 border border-border/90 rounded-xl px-3 pr-10 h-10 text-[11.5px] placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-foreground"
                />
                
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary text-white disabled:bg-muted disabled:text-muted-foreground hover:bg-primary/90 transition-all pointer inline-flex items-center justify-center h-7 w-7"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkle Bubble Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-12 w-12 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all relative border border-white/10 cursor-pointer pointer"
        title="Chat with Digital Innovation Assistant"
      >
        <MessageSquare size={20} className="text-white shrink-0" />
        <span className="absolute -top-1.5 -right-1.5 bg-amber-500 rounded-full h-4.5 w-4.5 text-[9px] font-extrabold flex items-center justify-center text-white ring-2 ring-background border-none animate-bounce">
          AI
        </span>
      </motion.button>
    </div>
  );
}
