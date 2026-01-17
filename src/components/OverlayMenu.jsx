import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { FiX, FiHome, FiUser, FiCode, FiBriefcase, FiAward, FiMail } from 'react-icons/fi'

function OverlayMenu({isOpen, onClose}) {
  const menuItems = [
    { name: "Home", icon: FiHome },
    { name: "About", icon: FiUser },
    { name: "Skills", icon: FiCode },
    { name: "Projects", icon: FiBriefcase },
    { name: "Experience", icon: FiAward },
    { name: "Contact", icon: FiMail },
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  const origin = isMobile ? 'top right' : 'center';

  return (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        className='fixed inset-0 z-50 flex items-center justify-center'
        initial={{clipPath: `circle(0% at ${origin})`}}
        animate={{clipPath: `circle(150% at ${origin})`}}
        exit={{clipPath:`circle(0% at ${origin})`}}
        transition={{duration : 0.7, ease: [0.4, 0, 0.2, 1]}}
        style={{backgroundColor: "rgba(0, 0, 0, 0.95)"}}>
          
          {/* Close Button */}
          <motion.button 
            onClick={onClose}
            className='absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 group'
            aria-label='Close Menu'
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <FiX className='text-2xl group-hover:text-[#1cd8d2] transition-colors cursor-pointer'/>
          </motion.button>

          {/* Background decoration */}
          <div className='absolute inset-0 pointer-events-none overflow-hidden'>
            <motion.div 
              className='absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] opacity-10 blur-[100px]'
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className='absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#302b63] to-[#00bf8f] opacity-10 blur-[100px]'
              animate={{
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Menu Items */}
          <nav className='relative z-10'>
            <ul className='space-y-2'>
              {menuItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ 
                    delay: 0.1 + index * 0.05,
                    duration: 0.3
                  }}>
                  <a 
                    href={`#${item.name.toLowerCase()}`}
                    onClick={onClose}
                    className='group flex items-center gap-4 px-8 py-4 text-3xl md:text-4xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#1cd8d2] hover:via-[#00bf8f] hover:to-[#302b63] transition-all duration-300 rounded-2xl hover:bg-white/5'>
                    <item.icon className='text-2xl text-gray-400 group-hover:text-[#1cd8d2] group-hover:scale-110 transition-all duration-300'/>
                    <span className='relative'>
                      {item.name}
                      <motion.span 
                        className='absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]'
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
    )}
  </AnimatePresence>
  )
}

export default OverlayMenu