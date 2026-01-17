import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react'

function IntroAnimation({ onFinish }) {

  const greetings = useMemo(() => [
    { text: "Hello", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "Hola", lang: "Spanish" },
    { text: "Bonjour", lang: "French" },
    { text: "Olá", lang: "Portuguese" },
    { text: "Ciao", lang: "Italian" },
    { text: "Здравствуйте", lang: "Russian" },
    { text: "Hallo", lang: "German" },
  ], []);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setInterval(() => {
        setIndex((i) => i + 1);
        setProgress(((index + 1) / greetings.length) * 100);
      }, 200);
      return () => clearInterval(id);
    } else {
      setProgress(100);
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [index, greetings.length])

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div 
          className='fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden'
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          }}>
          
          {/* Animated background gradients */}
          <div className='absolute inset-0 pointer-events-none overflow-hidden'>
            <motion.div 
              className='absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] opacity-20 blur-[120px]'
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className='absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#302b63] to-[#00bf8f] opacity-20 blur-[120px]'
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Main content */}
          <div className='relative z-10 text-center px-4'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.1 }}
                transition={{ 
                  duration: 0.15,
                  ease: "easeOut"
                }}>
                <h1 className='text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]'>
                  {greetings[index].text}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-white rounded-full opacity-30'
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 20 
              }}
              animate={{ 
                y: -20,
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroAnimation