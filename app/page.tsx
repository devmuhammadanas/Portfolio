"use client";
import HeroButton from "@/src/components/common/HeroButton";
import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa6";
import SearchBar from "@/src/components/ui/SearchBar";
import Footer from "@/src/components/ui/Footer";
import { heroContent, intro } from "@/src/locales/constants";

const page = () => {
  const portfolioData = {
  about: "I am a Full Stack Developer with 1.5 years experience...",
  skills: "React, Next.js, Node.js, Express, MongoDB...",
  projects: "E-commerce App, Portfolio Website...",
  clients: "Worked with 10+ clients...",
  experience: "Full Stack Developer at Exeonic...",
  contact: "Email: anas@gmail.com",
}
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleOpen = (topic: string) => {
    setSelectedTopic(topic);
    setIsOpen(true);
  };
  return (
    <div className="w-full md:w-[90%] lg:w-[70%] mx-auto min-h-screen flex flex-col">
      <main className="grow shrink-0 basis-auto">
        <div className="container px-4 pb-2 pt-4 flex-1 flex flex-col justify-center items-center">
          <p className="text-danger font-geist px-4 py-1 font-medium bg-primaryBackGround rounded-full border border-primaryBorder">
            {heroContent.greeting}
          </p>
          <h1 className="text-[4rem] font-unbounded leading-[75px] font-bold text-primary">
            {heroContent.text}{" "}
            <span className="text-secondary">{heroContent.name}</span>
          </h1>
          <p className="text-[4rem] font-unbounded leading-[75px] font-bold text-primary">
            {heroContent.role}
          </p>
        </div>

        <div className="flex justify-between my-2 relative">
          <div className="w-64.5 flex-col gap-4 flex items-start">
            <FaQuoteLeft className="text-secondary text-3xl italic font-geist" />
            <p className="text-primary font-geist text-[13px] leading-5 font-normal italic">
              {intro.introText}
            </p>
            <p className="text-primary font-geist text-[13px] leading-4 font-normal">
              {intro.name} - {intro.role}
            </p>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-[450px] h-[350px] max-w-60.5 max-h-40.5 inset-0 bg-secondary animate-[morph_8s_ease-in-out_infinite]" />

          <div className="flex flex-col gap-4 w-64.5 justify-end items-end border-red-500">
            <HeroButton
              text={intro.aboutBotton}
              backGround={true}
              textColor="text-primary mr-8"
              ButtonBorder={false}
              sectionValue="about"
              openDetails={handleOpen}
            />
            <HeroButton
              text={intro.workBotton}
              textColor="text-secondary"
              ButtonBorder={true}
              backGround={false}
              sectionValue="skillsF"
              openDetails={handleOpen}
            />
            {
  isOpen && (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="w-[800px] h-[600px] bg-[#1e1e1e] rounded-3xl p-6">

        <button
          onClick={() => setIsOpen(false)}
          className="text-white"
        >
          Close
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
          </div>
        </div>
      </main>
      <SearchBar />
      <Footer />
    </div>
  );
};

export default page;
