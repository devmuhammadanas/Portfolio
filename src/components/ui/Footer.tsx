import { footerContent } from '@/src/locales/constants'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex justify-center items-center my-1">
        <p className="text-info font-geist text-[12px] leading-5 font-normal">
          &copy; {new Date().getFullYear()} {footerContent.text}
        </p>
      </footer>
  )
}

export default Footer
