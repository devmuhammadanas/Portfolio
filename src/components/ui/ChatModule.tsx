// 'use client'

// import SearchBar from '@/src/components/ui/SearchBar'

// type PortfolioData = {
//   about: string
//   skills: string
//   projects: string
//   clients: string
//   experience: string
//   contact: string
// }

// type ChatModuleProps = {
//   isOpen: boolean
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
//   selectedTopic: keyof PortfolioData
//   setSelectedTopic: React.Dispatch<React.SetStateAction<keyof PortfolioData>>
//   portfolioData: PortfolioData
// }

// const ChatModule = ({
//   isOpen,
//   setIsOpen,
//   selectedTopic,
//   setSelectedTopic,
//   portfolioData,
// }: ChatModuleProps) => {
//   if (!isOpen) return null

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       onClick={(event) => event.stopPropagation()}
//       className="fixed w-[70%] px-10 py-6 mx-auto min-h-screen flex flex-col inset-0 bg-[#1e1e1e] z-[9999]"
//     >
//       <div className="grow shrink-0 basis-auto rounded-3xl p-6">
//         <button
//           type="button"
//           onClick={() => setIsOpen(false)}
//           className="text-white font-unbounded font-medium"
//         >
//           Close Tab
//         </button>

//         <div className="mt-6 flex gap-2">
//           <div className="w-10 h-10 bg-secondary rounded-full" />
//           <p className="text-white text-sm leading-relaxed">
//             {portfolioData[selectedTopic]}
//           </p>
//         </div>
//       </div>
//       <SearchBar onSelectTopic={setSelectedTopic} />
//     </div>
//   )
// }

// export default ChatModule


'use client'

import { useEffect, useRef, useState } from 'react'
import { IoIosDocument } from 'react-icons/io'
import { IoMdSettings, IoMdMail } from 'react-icons/io'
import { SiPolymerproject } from 'react-icons/si'
import { MdGroups2 } from 'react-icons/md'
import { FaArrowUp } from 'react-icons/fa'
import SearchBar from './SearchBar'
import Footer from './Footer'
import { TypingIndicator } from '../common/TypingIndicator'
import HeroButton from '../common/HeroButton'
import { ChatText } from '../common/ChatText'

// ─── Types ────────────────────────────────────────────────────────────────────

type PortfolioData = {
  about: string
  skills: string
  projects: string
  clients: string
  experience: string
  contact: string
}

type ChatModuleProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedTopic: keyof PortfolioData
  setSelectedTopic: React.Dispatch<React.SetStateAction<keyof PortfolioData>>
  portfolioData: PortfolioData
  avatarUrl?: string          // optional real avatar image
}

type ChatMessage = {
  id: string
  topic: keyof PortfolioData
  label: string
  content: string
}

// ─── Nav Items ────────────────────────────────────────────────────────────────

const navItems: {
  value: keyof PortfolioData
  label: string
  icon: React.ElementType
}[] = [
  { value: 'about',      label: 'About Me',  icon: IoIosDocument   },
  { value: 'skills',     label: 'Skills',    icon: IoMdSettings    },
  { value: 'projects',   label: 'Projects',  icon: SiPolymerproject },
  { value: 'clients',    label: 'Clients',   icon: MdGroups2       },
  { value: 'contact',    label: 'Contact',   icon: IoMdMail        },
]

// ─── Main Component ───────────────────────────────────────────────────────────

const ChatModule = ({
  isOpen,
  setIsOpen,
  selectedTopic,
  setSelectedTopic,
  portfolioData,
  avatarUrl,
}: ChatModuleProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Seed the initial message when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initial = navItems.find((n) => n.value === selectedTopic)
      setMessages([
        {
          id: crypto.randomUUID(),
          topic: selectedTopic,
          label: initial?.label ?? selectedTopic,
          content: portfolioData[selectedTopic],
        },
      ])
    }
  }, [isOpen])

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setMessages([])
      setIsTyping(false)
      setInputValue('')
    }
  }, [isOpen])

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping])

  const handleTopicClick = (topic: keyof PortfolioData) => {
    // Don't re-add the same topic that was just added
    const last = messages[messages.length - 1]
    if (last?.topic === topic && isTyping === false) {
      // Allow re-clicking — remove the guard if you want to allow it
    }

    setSelectedTopic(topic)
    setIsTyping(true)

    setTimeout(() => {
      const nav = navItems.find((n) => n.value === topic)
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          topic,
          label: nav?.label ?? topic,
          content: portfolioData[topic],
        },
      ])
      setIsTyping(false)
    }, 900) // typing delay
  }

  const handleSend = () => {
    const trimmed = inputValue.trim().toLowerCase()
    if (!trimmed) return

    // Simple keyword matcher against topic names
    const matched = navItems.find(
      (n) =>
        trimmed.includes(n.value) ||
        trimmed.includes(n.label.toLowerCase())
    )

    if (matched) {
      handleTopicClick(matched.value)
    } else {
      // Fallback: show a "not found" bubble
      setIsTyping(true)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            topic: selectedTopic,
            label: 'Info',
            content:
              "Sorry, I didn't catch that. Try asking about About Me, Skills, Projects, Clients, or Contact.",
          },
        ])
        setIsTyping(false)
      }, 700)
    }

    setInputValue('')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed  inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal — matches the reference image: centered card, rounded, dark */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[9999] flex justify-center"
      >
        <div className="w-[80%] min-h-screen flex flex-col overflow-hidden bg-[#191919] shadow-2xl overflow-y-auto scroll-m-9 pb-100">
          {/* ── Top bar ── */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 ">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#f5a623]/20 border border-[#f5a623]/40 overflow-hidden flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#f5a623] text-[9px] font-bold">DA</span>
                )}
              </div>
              <span className="text-white/40 text-xs tracking-wide">Muhammad Anas</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/25 hover:text-white/70 text-xs transition-colors"
            >
              ✕ Close
            </button>
          </div>

          {/* ── Scrollable chat area ── */}
          <div
            ref={scrollRef}
            className="flex-1  px-6 py-5 flex flex-col gap-5 min-h-0"
            style={{ minHeight: '260px', maxHeight: '52vh' }}
          >
            
            {messages.map((msg) => (
              <ChatText key={msg.id} message={msg} avatarUrl={avatarUrl} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {/* ── Search bar + buttons ── */}
          <div className="absolute bottom-0 w-[80%] px-6">
            {/* Input row */}
            {/* <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#141414] border border-white/[0.07] mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Try about, skills, or projects…"
                className="flex-1 bg-transparent text-white/60 text-sm placeholder:text-white/20 outline-none border-none py-1.5"
              />
              <button
                type="button"
                onClick={handleSend}
                className="w-8 h-8 rounded-full bg-[#f5a623] flex items-center justify-center shrink-0 hover:bg-[#f5a623]/80 transition-colors"
              >
                <FaArrowUp className="text-black text-sm" />
              </button>
            </div> */}

            {/* Topic buttons */}
            {/* <div className="flex flex-wrap gap-2.5">
              {navItems.map(({ value, label, icon: Icon }) => {
                const isActive = selectedTopic === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleTopicClick(value)}
                    disabled={isTyping}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium
                      border transition-all duration-200 cursor-pointer
                      disabled:opacity-40 disabled:cursor-not-allowed
                      hover:-translate-y-0.5
                      ${
                        isActive
                          ? 'bg-[#f5a623] border-[#f5a623] text-black shadow-md shadow-[#f5a623]/20'
                          : 'bg-[#141414] border-white/[0.1] text-white/50 hover:text-white/80 hover:border-white/20'
                      }
                    `}
                  >
                    <Icon
                      className={`text-sm shrink-0 ${isActive ? 'text-black' : 'text-[#f5a623]'}`}
                    />
                    {label}
                  </button>
                )
              })}
            </div> */}
          <SearchBar inputValue={inputValue} setInputValue={setInputValue} handleSend={handleSend} onSelectTopic={handleTopicClick} />
            {/* Hint */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatModule