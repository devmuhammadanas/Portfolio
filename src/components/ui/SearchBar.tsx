"use client";

import { IoIosDocument } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { SiPolymerproject } from "react-icons/si";
import { MdGroups2 } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import DetailsButton from "../common/detailsButton";
import { searchBottonText } from "@/src/locales/constants";

type SectionType = "about" | "skills" | "projects" | "experience" | "contact" | "clients";

type SearchBarProps = {
  onSelectTopic?: (topic: SectionType) => void;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  handleSend?: () => void;
};

const SearchBar = ({
  onSelectTopic,
  inputValue,
  setInputValue,
  handleSend,
}: SearchBarProps & {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSend: () => void;
}) => {
  const searchItems = [
    {
      text: searchBottonText.about,
      icon: IoIosDocument,
      value: "about" as const,
    },
    {
      text: searchBottonText.skills,
      icon: IoMdSettings,
      value: "skills" as const,
    },
    {
      text: searchBottonText.projects,
      icon: SiPolymerproject,
      value: "projects" as const,
    },
    {
      text: "Experience",
      icon: MdGroups2,
      value: "experience" as const,
    },
    {
      text: searchBottonText.contact,
      icon: IoMdMail,
      value: "contact" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-1.5 rounded-3xl border border-primaryBorder px-2.5 pb-5 pt-[15px] bg-sencondaryBackground">
      <div className="flex items-center flex-1 px-2 py-2">
        <input
          type="text"
          value={inputValue || ''}
          onChange={(e) => setInputValue?.(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend?.()}
          placeholder={searchBottonText.placeholder}
          className="w-full bg-transparent px-4 py-2 text-primary font-geist text-sm leading-5 font-normal outline-none border-none"
        />
        <button
          type="button"
          onClick={() => handleSend?.()}
          className="px-2 py-2 bg-secondary rounded-full flex items-center justify-center"
        >
          <FaArrowUp className="text-primary text-lg" />
        </button>
      </div>

      <div className="flex-1 flex flex-wrap gap-5 px-2 py-2">
        {searchItems.map((item) =>
          onSelectTopic ? (
            <button
              key={item.value}
              type="button"
              onClick={() => onSelectTopic(item.value)}
              className="cursor-pointer text-[13px] leading-5 gap-2 flex items-center bg-[#191919] border border-primaryBorder text-info font-normal px-4.5 py-2.5 font-unbounded rounded-full transition-transform duration-300 hover:-translate-y-1 hover:border-secondary"
            >
              <item.icon className="text-secondary text-lg" />
              {item.text}
            </button>
          ) : (
            <div key={item.value}>
              <DetailsButton
                text={item.text}
                Icon={item.icon}
                sectionType={item.value}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default SearchBar;
