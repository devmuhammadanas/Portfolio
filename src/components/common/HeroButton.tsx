'use client';
import { portfolioData } from "@/src/locales/constants";
import React, { useState } from "react";
import ChatModule from "../ui/ChatModule";

type HeroButtonProps = {
  text: string;
  backGround?: boolean;
  textColor?: string;
  ButtonBorder?: boolean;
  sectionType: string;
  openDetails?: (topic: string) => void;
};

const HeroButton = ({
  text,
  backGround = true,
  textColor,
  ButtonBorder = true,
  sectionType,
}: HeroButtonProps) => {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<keyof typeof portfolioData>(sectionType as keyof typeof portfolioData);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setSelectedTopic(sectionType as keyof typeof portfolioData);
        }}
        className={`${backGround ? "bg-secondary" : "bg-none"} ${textColor} ${ButtonBorder ? "border-secondary border" : "border-none"} group relative overflow-hidden px-7 py-2.5 font-unbounded rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl cursor-pointer text-[14px] leading-5 font-normal`}
      >
        <span className="block transition-transform duration-400 group-hover:-translate-y-10">
          {text}
        </span>

        <span className="absolute inset-0 flex items-center justify-center translate-y-10 transition-transform duration-400 group-hover:translate-y-0">
          {text}
        </span>
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

export default HeroButton;
