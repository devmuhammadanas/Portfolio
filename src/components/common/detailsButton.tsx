'use client'

import { useState } from 'react'
import ChatModule, { ChatTopic } from '@/src/components/ui/ChatModule'
import { portfolioData } from '@/src/locales/constants'

type DetailsButtonProps = {
  text: string
  Icon: React.ElementType
  sectionType: ChatTopic
}

const DetailsButton = ({ text, Icon, sectionType }: DetailsButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<ChatTopic>(sectionType)

  return (
    <>
      <button
        type="button"
        className="cursor-pointer text-[13px] leading-5 gap-2 flex items-center bg-[#191919] border border-primaryBorder text-info font-normal px-4.5 py-2.5 font-unbounded rounded-full transition-transform duration-300 hover:-translate-y-1"
        onClick={() => {
          setIsOpen(true)
          setSelectedTopic(sectionType)
        }}
      >
        <Icon className="text-secondary text-lg" />
        {text}
      </button>
      <ChatModule
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        portfolioData={portfolioData}
      />
    </>
  )
}

export default DetailsButton
