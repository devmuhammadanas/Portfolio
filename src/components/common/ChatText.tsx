import { portfolioData } from "@/src/locales/constants"

type PortfolioData = {
  about: string
  skills: string
  projects: string
  clients: string
  experience: string
  contact: string
}

type ChatMessage = {
  id: string
  topic: keyof PortfolioData
  label: string
  content: string
}

export const ChatText = ({
  message,
  avatarUrl,
}: {
  message: ChatMessage
  avatarUrl?: string
}) => (
  <div className="flex items-start gap-3 animate-slide-up">
    {/* Avatar */}
    <div className="w-8 h-8 rounded-full bg-[#f5a623]/20 border border-[#f5a623]/40 shrink-0 flex items-center justify-center overflow-hidden mt-0.5">
      {avatarUrl ? (
        <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="text-[#f5a623] text-[10px] font-bold">{portfolioData.shortName}</span>
      )}
    </div>

    {/* Bubble */}
    <div className="flex-1 min-w-0">
      {/* Topic tag */}
      <div className="mb-1.5 flex justify-end items-center gap-2">
        <span className="text-[10px] text-[#f5a623]/70 uppercase tracking-widest font-medium">
          {message.label}
        </span>
       
      </div>
      <div className="bg-[#1e1e1e] border border-white/[0.07] rounded-2xl rounded-tl-none px-5 py-4 text-white/75 text-sm leading-[1.8] font-light">
        {message.content}
      </div>
    </div>
  </div>
)