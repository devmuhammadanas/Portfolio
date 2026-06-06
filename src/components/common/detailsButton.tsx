import React from "react";
import { useState } from "react";
import ChatModule from "@/src/components/ui/ChatModule";
import { portfolioData} from "@/src/locales/constants"
type DetailsButtonProps = {
  text: string;
  Icon: React.ElementType;
  sectionType: string;
};

const DetailsButton = ({ text, Icon, sectionType }: DetailsButtonProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<
    keyof typeof portfolioData
  >(sectionType as keyof typeof portfolioData);

  return (
    <>
      <button
        className="cursor-pointer text-[13px] leading-5 gap-2 flex items-center bg-[#191919] border border-[#343434] text-[#777] leading-5 font-normal px-4.5 py-2.5 font-unbounded rounded-full  transition-transform duration-300 hover:-translate-y-1"
        onClick={() => {
          setIsOpen(true);
          setSelectedTopic(sectionType as keyof typeof portfolioData);
        }}
      >
        {Icon && <Icon className="text-secondary text-lg" />}
        {text}
      </button>
      <ChatModule
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedTopic={selectedTopic}
        portfolioData={portfolioData}
      />
    </>
  );
};

export default DetailsButton;
