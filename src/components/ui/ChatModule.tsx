'use client'

import SearchBar from '@/src/components/ui/SearchBar'

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
  portfolioData: PortfolioData
}

const ChatModule = ({
  isOpen,
  setIsOpen,
  selectedTopic,
  portfolioData,
}: ChatModuleProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-primaryBackground flex justify-center items-center z-50">
      <div className="w-[80%] h-screen bg-[#1e1e1e] rounded-3xl p-6">

        <button
          onClick={() => setIsOpen(false)}
          className="text-white"
        >
          Close Tab
        </button>

        <div className="mt-6">
          <p className="text-white">
            {portfolioData[selectedTopic]}
          </p>
        </div>

        <SearchBar />
      </div>
    </div>
  )
}

export default ChatModule