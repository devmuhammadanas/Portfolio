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
import SearchBar from './SearchBar'
import Footer from './Footer'
import { TypingIndicator } from '../common/TypingIndicator'
import { ChatText } from '../common/ChatText'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────

type PortfolioData = {
  about: {
    title?: string
    intro?: string
    detailsTitle?: string
    basicDetails?: string[]
    basicInfoTitle?: string
    basicInfo?: string
  }
  skills: {
    sections: {
      title: string
      items: string[]
    }[]
    summary: string
  }
  projects: string
  clients: string
  experience: string
  contact: string
  oneAwnser: string
  name: string
  role: string
  shortName: string
  hideModule: string
}

export type ChatTopic = 'about' | 'skills' | 'projects' | 'clients' | 'experience' | 'contact'

type ChatModuleProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedTopic: ChatTopic
  setSelectedTopic: React.Dispatch<React.SetStateAction<ChatTopic>>
  portfolioData: PortfolioData
  avatarUrl?: string          // optional real avatar image
  initialInput?: string       // optional input to process on open
  setInitialInput?: (value: string) => void // callback to clear initial input
}

type ChatMessage = {
  id: string
  topic: ChatTopic
  label: string
  content: PortfolioData[keyof PortfolioData]
}

// ─── Nav Items ────────────────────────────────────────────────────────────────

const navItems: {
  value: ChatTopic
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
  initialInput,
  setInitialInput,
}: ChatModuleProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Seed the initial message when modal opens
  useEffect(() => {
    if (!isOpen || messages.length !== 0) return

    const seedTimer = setTimeout(() => {
      // If initialInput is provided, process it instead of showing the topic
      if (initialInput && initialInput.trim()) {
        const trimmed = initialInput.trim().toLowerCase()
        const matched = navItems.find(
          (n) =>
            trimmed.includes(n.value) ||
            trimmed.includes(n.label.toLowerCase())
        )

        if (matched) {
          setSelectedTopic(matched.value)
          setIsTyping(true)
          setTimeout(() => {
            const nav = navItems.find((n) => n.value === matched.value)
            setMessages([
              {
                id: crypto.randomUUID(),
                topic: matched.value,
                label: nav?.label ?? matched.value,
                content: portfolioData[matched.value],
              },
            ])
            setIsTyping(false)
            setInitialInput?.('')
          }, 900)
        } else {
          // Show error message for non-matching input
          setIsTyping(true)
          setTimeout(() => {
            setMessages([
              {
                id: crypto.randomUUID(),
                topic: selectedTopic,
                label: 'Info',
                content: portfolioData.oneAwnser,
              },
            ])
            setIsTyping(false)
            setInitialInput?.('')
          }, 700)
        }
      } else {
        // Default behavior - show the selected topic
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
    }, 0)

    return () => clearTimeout(seedTimer)
  }, [
    initialInput,
    isOpen,
    messages.length,
    portfolioData,
    selectedTopic,
    setInitialInput,
    setSelectedTopic,
  ])

  const handleClose = () => {
    setIsOpen(false)
    setMessages([])
    setIsTyping(false)
    setInputValue('')
  }

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping])

  const handleTopicClick = (topic: ChatTopic) => {
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
            content: portfolioData.oneAwnser,
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
        onClick={handleClose}
      />

      {/* Modal — matches the reference image: centered card, rounded, dark */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[9999] flex justify-center"
      >
        <div className="w-[80%] min-h-screen flex flex-col overflow-hidden bg-[#191919] shadow-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
          {/* ── Top bar ── */}
          <div className="flex sticky-top items-center justify-between px-6 pt-5 pb-3 border-b border-[#333]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#f5a623]/20 border border-[#f5a623]/40 overflow-hidden flex items-center justify-center">
                {avatarUrl ? (
                  <Image src={avatarUrl} width={100} height={100} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#f5a623] text-[9px] font-bold">{portfolioData.shortName}</span>
                )}
              </div>
              <span className="text-white/40 text-xs tracking-wide">{portfolioData.name}</span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-white/25 hover:text-white/70 text-xs transition-colors"
            >
              {portfolioData.hideModule}
            </button>
          </div>

          {/* ── Scrollable chat area ── */}
          <div
            ref={scrollRef}
            className="flex-1 px-6 py-5 flex flex-col gap-5 min-h-[350px] max-h-[52vh] overflow-y-auto scrollbar-none scrollbar-thumb-[#333] scrollbar-track-transparent"
          >
            
            {messages.map((msg) => (
              <ChatText
                key={msg.id}
                message={msg}
                avatarUrl={avatarUrl}
                onSelectTopic={handleTopicClick}
                onTypingProgress={() => {
                  scrollRef.current?.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: 'smooth',
                  })
                }}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {/* ── Search bar + buttons ── */}
          <div className="absolute bottom-0 w-[80%] px-6">
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
