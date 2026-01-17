import React, { useEffect, useMemo, useState } from 'react'
import ParticalsBackground from '../components/ParticalsBackground'
import { motion } from 'framer-motion'
import { FiGithub, FiInstagram, FiLinkedin, FiDownload, FiArrowRight } from 'react-icons/fi'
import avator from '../assets/Portfolio website/avator.png'

const socials = [
  { Icon: FiGithub, label: "GitHub", url: 'https://github.com/nakulgadhewal050', color: '#333' },
  { Icon: FiLinkedin, label: "LinkedIn", url: 'https://www.linkedin.com/in/nakulgadhewal050/', color: '#0A66C2' },
  { Icon: FiInstagram, label: "Instagram", url: 'https://www.instagram.com/nakul.gadhewal/', color: '#E4405F' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

function Home() {
  const roles = useMemo(() => ['Full Stack Developer', 'Software Developer', 'Problem Solver'], []);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex(v => v + 1);
      } else if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && subIndex > 0) {
        setSubIndex(v => v - 1);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex(p => (p + 1) % roles.length);
      }
    }, deleting ? 50 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section id='home'
      className='w-full min-h-screen relative bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden'>
      <ParticalsBackground />

      {/* Enhanced background effects */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div 
          className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full 
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[150px]'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className='absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full 
          bg-gradient-to-l from-[#1cd8d2] via-[#00bf8f] to-[#302b63] opacity-20 blur-[150px]'
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className='relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen'>
          
          {/* Left Content */}
          <motion.div 
            className='flex flex-col justify-center text-center lg:text-left'
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            
            {/* Typing animation role */}
            <motion.div
              className='mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold min-h-[2.5em] flex items-center justify-center lg:justify-start'
              variants={itemVariants}>
              <span className='bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent'>
                {roles[index].substring(0, subIndex)}
              </span>
              <motion.span 
                className='inline-block w-[3px] h-8 ml-1 bg-gradient-to-b from-[#1cd8d2] to-[#00bf8f]'
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants}>
              <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6'>
                <span className='block text-gray-400 text-3xl sm:text-4xl md:text-5xl mb-2'>
                  Hi, I'm
                </span>
                <span className='block bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent'>
                  Nakul
                </span>
                <span className='block text-white'>
                  Gadhewal
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              className='text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8'
              variants={itemVariants}>
              Crafting <span className='text-[#1cd8d2] font-semibold'>innovative</span> digital experiences through clean code and creative design. 
              Specializing in building <span className='text-[#00bf8f] font-semibold'>scalable web applications</span> that make a difference.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className='flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10'
              variants={itemVariants}>
              <motion.a 
                href="#projects"
                className='group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <div className='absolute inset-0 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]'/>
                <div className='absolute inset-0 bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
                <span className='relative flex items-center gap-2'>
                  View My Work
                  <FiArrowRight className='group-hover:translate-x-1 transition-transform'/>
                </span>
              </motion.a>

              <motion.a 
                href="/Resume.pdf"
                download={true}
                className='group px-8 py-4 rounded-full font-semibold bg-white/10 text-white border-2 border-white/20 
                hover:bg-white/20 hover:border-[#1cd8d2] transition-all duration-300 backdrop-blur-sm'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <span className='flex items-center gap-2'>
                  <FiDownload className='group-hover:animate-bounce'/>
                  Download CV
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className='flex gap-4 justify-center lg:justify-start'
              variants={itemVariants}>
              {socials.map(({ Icon, label, url, color }) => (
                <motion.a
                  href={url} 
                  key={label} 
                  target='_blank' 
                  aria-label={label}
                  rel='noopener noreferrer'
                  className='group relative p-4 bg-white/5 rounded-full border border-white/10 hover:border-[#1cd8d2] transition-all duration-300'
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}>
                  <div className='absolute inset-0 bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity'/>
                  <Icon className='text-2xl text-gray-400 group-hover:text-white transition-colors relative z-10'/>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Avatar */}
          <motion.div 
            className='relative hidden lg:flex justify-center items-center'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}>
            
            {/* Rotating gradient ring */}
            <motion.div
              className='absolute inset-0 flex justify-center items-center'
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <div className='w-[500px] h-[500px] rounded-full'
                style={{
                  background: 'conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)',
                  filter: 'blur(40px)',
                  opacity: 0.4
                }}
              />
            </motion.div>

            {/* Pulsing glow */}
            <motion.div
              className='absolute inset-0 flex justify-center items-center'
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}>
              <div className='w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]'
                style={{ filter: 'blur(60px)' }}
              />
            </motion.div>

            {/* Avatar Image */}
            <motion.img 
              src={avator} 
              alt="Nakul Gadhewal" 
              className='relative z-10 w-full max-w-[600px] h-auto object-contain drop-shadow-2xl'
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

        </div>
      </div>

    </section>
  )
}

export default Home