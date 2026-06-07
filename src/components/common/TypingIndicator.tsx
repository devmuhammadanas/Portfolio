import { portfolioData } from "@/src/locales/constants";

export const TypingIndicator = () => (
  <div className="flex items-end gap-3 animate-fade-in">
    <div className="w-8 h-8 rounded-full bg-[#f5a623]/20 border border-[#f5a623]/40 shrink-0 flex items-center justify-center">
      <span className="text-[#f5a623] text-[10px] font-bold">{portfolioData.shortName}</span>
    </div>
    <div className="bg-[#1e1e1e] border border-white/[0.07] rounded-2xl rounded-bl-none px-5 py-3.5 flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#f5a623]/60 animate-bounce"
          style={{ animationDelay: `${i * 0.18}s`, animationDuration: '0.9s' }}
        />
      ))}
    </div>
  </div>
)