'use client'

import { portfolioData } from "@/src/locales/constants"
import {
  FaBootstrap,
  FaBriefcase,
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaFigma,
  FaGithub,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaLaptopCode,
  FaLayerGroup,
  FaMagic,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaNodeJs,
  FaReact,
  FaRegHandshake,
  FaServer,
  FaTerminal,
} from "react-icons/fa"
import {
  SiAntdesign,
  SiExpress,
  SiFirebase,
  SiJquery,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiPostman,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import HeroButton from "./HeroButton"
import type { ChatTopic } from "../ui/ChatModule"
import TypeWriter, { TypeWriterSegment } from "../ui/TypeWriter"

type DetailedContent = {
  title?: string
  intro?: string
  detailsTitle?: string
  basicDetails?: string[]
  basicInfoTitle?: string
  basicInfo?: string
}

type SkillContent = {
  sections: {
    title: string
    items: string[]
  }[]
  summary: string
}

type PortfolioData = {
  about: DetailedContent
  skills: SkillContent
  projects: string
  clients: string
  experience: string
  contact: string
  oneAwnser: string
}

type ChatMessage = {
  id: string
  topic: ChatTopic
  label: string
  content: PortfolioData[keyof PortfolioData]
}

const skillIcons: Record<string, React.ReactNode> = {
  "HTML5": <FaHtml5 />,
  "CSS3": <FaCss3Alt />,
  "JavaScript": <FaJs />,
  "TypeScript": <SiTypescript />,
  "React.js": <FaReact />,
  "Next.js": <SiNextdotjs />,
  "React Native": <FaMobileAlt />,
  "Redux": <SiRedux />,
  "Zustand": <FaLayerGroup />,
  "Tailwind CSS": <SiTailwindcss />,
  "Bootstrap": <FaBootstrap />,
  "Material UI": <SiMui />,
  "Ant Design": <SiAntdesign />,
  "jQuery": <SiJquery />,
  "Node.js": <FaNodeJs />,
  "Express.js": <SiExpress />,
  "MongoDB": <SiMongodb />,
  "Firebase": <SiFirebase />,
  "Supabase": <SiSupabase />,
  "REST APIs": <FaServer />,
  "Git": <FaGitAlt />,
  "GitHub": <FaGithub />,
  "VS Code": <FaTerminal />,
  "Cursor AI": <FaMagic />,
  "Postman": <SiPostman />,
  "Responsive Web Development": <FaLaptopCode />,
  "Mobile App Development": <FaMobileAlt />,
  "API Integration": <FaServer />,
  "Performance Optimization": <FaCode />,
  "State Management": <SiRedux />,
  "UI/UX Implementation": <FaFigma />,
  "Full-Stack Development": <FaDatabase />,
  "Clean & Scalable Code": <FaCode />,
}

const skillSectionIcons: Record<string, React.ReactNode> = {
  Frontend: <FaLaptopCode />,
  Backend: <FaServer />,
  Tools: <FaTerminal />,
  "What I Focus On": <FaCode />,
}

const getMessageSegments = (
  content: ChatMessage["content"]
): TypeWriterSegment[] => {
  if (typeof content === "string") {
    return [{ text: content }]
  }

  if ("sections" in content) {
    return [
      ...content.sections.flatMap((section, sectionIndex) => [
        ...(sectionIndex === 0 ? [] : [{ text: "\n" }]),
        {
          text: section.title,
          prefix: (
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f5a623]/15 text-[13px] text-[#f5a623]">
              {skillSectionIcons[section.title] ?? <FaCode />}
            </span>
          ),
          className: "text-[13px] font-semibold uppercase tracking-wider text-white/90",
          wrapperClassName:
            "mb-3 mt-2 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2",
        },
        ...section.items.map((item) => ({
          text: item,
          prefix: (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f5a623]/15 text-[11px] text-[#f5a623]">
              {skillIcons[item] ?? <FaCode />}
            </span>
          ),
          className: "text-[12px] leading-none text-white/75",
          wrapperClassName:
            "mb-2 mr-2 inline-flex items-center gap-2 rounded-full border border-[#f5a623]/15 bg-[#f5a623]/[0.04] px-3 py-2 align-top transition-colors hover:border-[#f5a623]/35 hover:bg-[#f5a623]/10",
        })),
        { text: "\n" },
      ]),
      {
        text: content.summary,
        className: "text-white/70",
        wrapperClassName:
          "mt-3 block rounded-xl border border-[#f5a623]/15 bg-[#f5a623]/[0.05] px-4 py-3 text-[13px] leading-6",
      },
    ]
  }

  const detailIcons = [
    <FaBriefcase key="experience" />,
    <FaLaptopCode key="projects" />,
    <FaCode key="expertise" />,
    <FaRegHandshake key="available" />,
    <FaMapMarkerAlt key="location" />,
  ]

  return [
    {
      text: content.title ? `${content.title}\n` : "",
      className: "font-semibold text-white/90",
    },
    {
      text: content.intro ? `${content.intro}\n` : "",
    },
    {
      text: content.detailsTitle ? `\n${content.detailsTitle}\n` : "",
      className: "font-semibold text-white/90",
    },
    ...(content.basicDetails?.map((item, index) => ({
      text: `${item}\n`,
      prefix: (
        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f5a623]/15 text-[11px] text-[#f5a623]">
          {detailIcons[index]}
        </span>
      ),
      wrapperClassName: "flex items-start gap-2.5",
    })) ?? []),
    {
      text: content.basicInfoTitle ? `\n${content.basicInfoTitle}\n` : "",
      className: "font-semibold text-white/90",
    },
    {
      text: content.basicInfo ? `\n${content.basicInfo}` : "",
    },
  ].filter((segment) => segment.text)
}

export const ChatText = ({
  message,
  avatarUrl,
  onTypingProgress,
  onSelectTopic,
}: {
  message: ChatMessage
  avatarUrl?: string
  onTypingProgress?: () => void
  onSelectTopic?: (topic: ChatTopic) => void
}) => {
  const messageSegments = getMessageSegments(message.content)

  return(
  <div className="flex items-start gap-3 animate-slide-up">
    {/* Avatar */}
    <div className="w-8 h-8 rounded-full bg-[#f5a623]/20 border border-[#f5a623]/40 shrink-0 flex items-center justify-center overflow-hidden mt-0.5">
      {avatarUrl ? (
        <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="text-[#f5a623] text-[10px] font-bold">{portfolioData.shortName}</span>
      )}
    </div>

    {/* Bubble */}
    <div className="flex-1 min-w-0">
      {/* Topic tag */}
      <div className="mb-1.5 flex justify-end items-center gap-2">
        <span className="text-[10px] text-[#f5a623]/70 uppercase tracking-widest font-medium">
          {message.label}
        </span>
       
      </div>
      <div className="bg-[#1e1e1e] border border-white/[0.07] rounded-2xl rounded-tl-none px-5 py-4 text-white/75 text-sm leading-[1.8] font-light">
        <TypeWriter text={messageSegments} speed={10} onProgress={onTypingProgress} />
        {message.topic === "about" && (
          <div className="mt-5 flex flex-wrap gap-3">
            <HeroButton
              text="View Skills"
              sectionType="skills"
              textColor="text-primary"
              ButtonBorder={false}
              onSelectTopic={onSelectTopic}
            />
            <HeroButton
              text="View Projects"
              sectionType="projects"
              backGround={false}
              textColor="text-secondary"
              ButtonBorder={true}
              onSelectTopic={onSelectTopic}
            />
          </div>
        )}
      </div> 
    </div>
  </div>
)}
