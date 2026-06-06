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
    <div className="fixed w-[70%] px-10 py-6 mx-auto min-h-screen flex flex-col inset-0 bg-[#1e1e1e] z-50">
      <div className=" grow shrink-0 basis-auto rounded-3xl p-6">

        <button
          onClick={() => setIsOpen(false)}
          className="text-white"
        >
          Close Tab
        </button>

        <div className="mt-6 flex gap-2">
            <div className='w-10 h-10 bg-secondary rounded-full'></div>
          <p className="text-white">
            {portfolioData[selectedTopic]}
          </p>
        </div>

      </div>
        <SearchBar />
    </div>
  )
}

export default ChatModule