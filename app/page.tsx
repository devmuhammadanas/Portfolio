import HeroButton from "@/src/components/common/HeroButton";
import { FaQuoteLeft } from "react-icons/fa6";
import SearchBar from "@/src/components/ui/SearchBar";
import Footer from "@/src/components/ui/Footer";
import { heroContent, intro } from "@/src/locales/constants";

const Home = () => {
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

          <div className="flex flex-col gap-4 w-64.5 justify-end items-end border-red-500">
            <HeroButton
              text={intro.aboutBotton}
              backGround={true}
              textColor="text-primary mr-8"
              ButtonBorder={false}
              sectionType="about"
            />
            <HeroButton
              text={intro.workBotton}
              textColor="text-secondary"
              ButtonBorder={true}
              backGround={false}
              sectionType="skills"
            />
          </div>
        </div>
      </main>
      <SearchBar />
      <Footer />
    </div>
  );
};

export default Home;
