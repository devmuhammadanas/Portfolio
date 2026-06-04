import DetailsButton from '@/src/components/common/detailsButton'
import HeroButton from '@/src/components/common/HeroButton'
import React from 'react'

const page = () => {
  const searchText = [
    {
      text: 'About Me',
      icon: 'about',
    },
    {
      text: 'Skills',
      icon: 'about',
    },
    {
      text: 'Projects',
      icon: 'about',
    },
    {
      text: 'Experience',
      icon: 'about',
    },
    {
      text: 'Contact',
      icon: 'about',
    },
  ]
  return (
    <main className='grow shrink-0  basis-auto w-[80%] mx-auto'>
      <div className='container px-4 py-8 flex-1 flex flex-col justify-center items-center'>
        <p className='text-[#C6C9CC] font-geist px-4 py-1 font-medium bg-[#232323] rounded-full border border-[#343434]'>Hello!</p>
      <h1 className='text-[4rem] font-unbounded leading-[75px] font-bold text-primary'>I&apos;m <span className='text-secondary'>DevAnas</span></h1>
      <p className='text-[4rem] font-unbounded leading-[75px] font-bold text-primary'>Full-Stack Developer</p>
      </div>

      <div className='flex justify-between'>
        <div className='w-64.5 flex-col gap-4 flex items-start'>
          <p className='text-primary font-geist text-[13px] leading-5 font-normal italic'>David is the secret weapon for any modern SaaS, he transformed our complex ideas into a high performance reality.</p>
          <p className='text-primary font-geist text-[16px] leading-5 font-normal'>Marc Hawkins - Adobe Director</p>
        </div>


      <div className='flex flex-col gap-4 w-64.5 justify-end items-end border-red-500'>
        <HeroButton text='More About Me' backGround='bg-secondary mr-8' textColor='text-primary'/>
        <HeroButton text='See My Work'  textColor='text-secondary' ButtonBorder='border border-secondary'/>
      </div>
      
      </div>


      <div className='flex flex-col mt-20 gap-1.5 rounded-3xl border border-[#343434] px-2.5 pb-5 pt-[15px] bg-[#252525]'>
        <div className='flex items-center flex-1 px-2 py-2'>
          <input type='text' placeholder='Try About, Skills, Experience, Projects' className='w-full bg-transparent   px-4 py-2 text-primary font-geist text-4 leading-5 font-normal outline-none border-none'/>
          <div className='px-4 py-4 bg-secondary rounded-full'></div>
        </div>

        <div className='flex-1 flex gap-5 px-2 py-2'>
          {
            searchText.map((item, index) => (
              <div key={index}>
                <DetailsButton text={item.text}/>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default page
