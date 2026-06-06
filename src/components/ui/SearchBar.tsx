'use client'
import React from 'react'
import { IoIosDocument } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { SiPolymerproject } from "react-icons/si";
import { MdGroups2 } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import DetailsButton from '../common/detailsButton';
import { searchBottonText } from '@/src/locales/constants';

const SearchBar = () => {
    const searchText = [
        {
          text: searchBottonText.about,
          icon: IoIosDocument ,
          value: 'about'
        },
        {
          text: searchBottonText.skills,
          icon: IoMdSettings,
          value: 'skills'
        },
        {
          text: searchBottonText.projects,
          icon: SiPolymerproject,
          value: 'projects'
        },
        {
          text: searchBottonText.experience,
          icon: MdGroups2,
          value: 'experience'
        },
        {
          text: searchBottonText.contact,
          icon: IoMdMail,
          value: 'contact'
        },
      ];
  return (
    <div className="flex flex-col gap-1.5 rounded-3xl border border-primaryBorder px-2.5 pb-5 pt-[15px] bg-sencondaryBackground">
        <div className="flex items-center flex-1 px-2 py-2">
          <input
            type="text"
            placeholder={searchBottonText.placeholder}
            className="w-full bg-transparent   px-4 py-2 text-primary font-geist text-4 leading-5 font-normal outline-none border-none"
          />
          <div className="px-2 py-2 bg-secondary rounded-full flex items-center justify-center">
            <FaArrowUp className="text-primary text-lg" />
          </div>
        </div>

        <div className="flex-1 flex flex-wrap gap-5 px-2 py-2">
          {searchText.map((item, index) => 
          {
             return(
            <div key={index}>
              <DetailsButton text={item.text} Icon={item.icon} sectionType={item.value} />
            </div>
          )})}
        </div>
      </div>
  )
}

export default SearchBar
