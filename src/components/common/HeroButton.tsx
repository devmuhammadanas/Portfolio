import React from "react";

type HeroButtonProps = {
  text: string;
  backGround?: boolean;
  textColor?: string;
  ButtonBorder?: boolean;
  sectionValue: string;
  openDetails?: (topic: string) => void;
};

const HeroButton = ({
  text,
  backGround = true,
  textColor,
  ButtonBorder = true,
  openDetails,
  sectionValue,
}: HeroButtonProps) => {
  return (
    <>
      <button
        onClick={() => openDetails?.(sectionValue)}
        className={`${backGround ? "bg-secondary" : "bg-none"} ${textColor} ${ButtonBorder ? "border-secondary border" : "border-none"}
        group relative overflow-hidden
        px-7 py-2.5
        font-unbounded
        rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl
        cursor-pointer text-[14px] leading-5 font-normal`}
      >
        <span className="block transition-transform duration-400 group-hover:-translate-y-10">
          {text}
        </span>

        <span className="absolute inset-0 flex items-center justify-center translate-y-10 transition-transform duration-400 group-hover:translate-y-0">
          {text}
        </span>
      </button>
    </>
  );
};

export default HeroButton;
