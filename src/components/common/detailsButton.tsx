import React from "react";

const DetailsButton = ({ text }) => {
  return (
    <>
      <button className=" text-[13px] leading-5  bg-[#191919] border border-[#343434] text-[#777] leading-5 font-normal px-4.5 py-2.5 font-unbounded rounded-full">
        {text}
      </button>
    </>
  );
};

export default DetailsButton;
