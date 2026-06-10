'use client'
import HeroButton from "@/src/components/common/HeroButton";
import { FaQuoteLeft } from "react-icons/fa6";
import SearchBar from "@/src/components/ui/SearchBar";
import Footer from "@/src/components/ui/Footer";
import ChatModule, { ChatTopic } from "@/src/components/ui/ChatModule";
import { heroContent, intro, portfolioData } from "@/src/locales/constants";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";



const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ChatTopic>("about");
  const [initialInput, setInitialInput] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Always pass the input to ChatModule to process
    setInitialInput(inputValue);
    setIsModalOpen(true);
    setInputValue("");
  };

  const handleSelectTopic = (topic: ChatTopic) => {
    setSelectedTopic(topic);
    setInitialInput(""); // Clear initial input for direct button clicks
    setIsModalOpen(true);
  };
  return (
    <div className="w-full md:w-[90%] lg:w-[70%] mx-auto min-h-screen flex flex-col">
      <main className="grow shrink-0 basis-auto">
        <div className="container px-4 pb-2 pt-4 flex-1 flex flex-col justify-center items-center">
          <p className="text-danger font-geist px-4 py-1 font-medium bg-primaryBackGround rounded-full border border-primaryBorder">
            {heroContent.greeting}
          </p>
          <h1 className="text-[4rem] font-unbounded leading-18.75 font-bold text-primary">
            {heroContent.text}{" "}
            <span className="text-secondary">{heroContent.name}</span>
          </h1>
          <p className="text-[4rem] font-unbounded leading-18.75 font-bold text-primary">
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

          <div className=" relative w-50 h-40 flex-col flex-wrap z-20">
            <a href="https://www.facebook.com/dev.muhamadanas/"  
            className="absolute -left-2 -top-1 flex justify-center items-center border bg-cyan-300 rounded-full px-2 py-2 shadow-cyan-300 shadow-md animate-[morph_8s_ease-in-out_infinite]">
            <FaFacebookF className="text-primary text-2xl" />
            </a>
            
            <a href="https://github.com/devmuhammadanas"  
            className="absolute -right-5 top-1/2 border bg-emerald-800 rounded-full px-2 py-2 flex justify-center items-center shadow-emerald-800 shadow-md animate-[morph_8s_ease-in-out_infinite]">
            <FiGithub className="text-primary text-3xl"/>
            </a>
            <a href="https://www.linkedin.com/in/dev-muhammadanas/"  
            className="absolute -left-2 bottom-0 flex justify-center items-center border bg-secondary rounded-full px-2 py-2 shadow-secondary shadow-md animate-[morph_8s_ease-in-out_infinite]">
            <FaLinkedinIn className="text-primary text-2xl"/>
            </a>

          </div>
          <img src="/portfolio_Main.png" alt="" className="z-10 absolute -bottom-15 z-10 w-50 h-70 left-1/2 -translate-x-1/2" />
          {/* <div className="absolute z-0 w-50 h-70 -bottom-15 left-1/2 -translate-x-1/2">
          <img src="/portfolio_Main.png" alt="" className="z-10" />
          </div> */}

          <div className="flex flex-col gap-4 w-64.5 justify-end items-end border-red-500">
            <HeroButton
              text={intro.aboutBotton}
              backGround={true}
              textColor="text-primary mr-8"
              ButtonBorder={false}
              sectionType="about"
              onSelectTopic={handleSelectTopic}
            />
            <HeroButton
              text={intro.workBotton}
              textColor="text-secondary"
              ButtonBorder={true}
              backGround={false}
              sectionType="skills"
              onSelectTopic={handleSelectTopic}
            />
          </div>
        </div>
      </main>
      <SearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
        onSelectTopic={handleSelectTopic}
      />
      <Footer />
      <ChatModule
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        portfolioData={portfolioData}
        initialInput={initialInput}
        setInitialInput={setInitialInput}
        avatarUrl = "/avatar.png"
      />
    </div>
  );
};

export default Home;
