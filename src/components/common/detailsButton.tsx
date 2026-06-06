import React from "react";

type DetailsButtonProps = {
  text: string;
  Icon: React.ElementType;
};  

const DetailsButton = ({ text, Icon }: DetailsButtonProps) => {
  return (
    <>
      <button
        className="cursor-pointer text-[13px] leading-5 gap-2 flex items-center bg-[#191919] border border-[#343434] text-[#777] leading-5 font-normal px-4.5 py-2.5 font-unbounded rounded-full  transition-transform duration-300 hover:-translate-y-1"
      >
        {Icon && <Icon className="text-secondary text-lg" />}
        {text}
      </button>
    </>
  );
};

export default DetailsButton;
