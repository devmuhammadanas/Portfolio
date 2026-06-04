import React from "react";

const HeroButton = ({ text, backGround, textColor, ButtonBorder }) => {
  return (
    <>
      <button className={`${backGround} ${textColor} ${ButtonBorder} text-[14px] leading-5 font-normal px-7 py-2.5 font-unbounded rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl `}>
        {text}
      </button>
    </>
  );
};

export default HeroButton;
