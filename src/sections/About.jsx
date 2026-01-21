
import { motion } from 'framer-motion'
import nakul from '../assets/Portfoliowebsite/nakul.jpeg'
import ParticalsBackground from '../components/ParticalsBackground'
import { FiCode, FiLayers, FiZap, FiAward } from 'react-icons/fi'

function About() {
  const stats = [
    { label: "Experience", value: "1+ Years", icon: FiAward },
    { label: "Projects", value: "10+", icon: FiCode },
    { label: "Tech Stack", value: "Full Stack", icon: FiLayers },
    { label: "Focus", value: "Performance", icon: FiZap },
  ]

  const highlights = [
    { title: "Clean Code", description: "Writing maintainable, scalable code following best practices" },
    { title: "Modern Tech", description: "Using latest frameworks and tools for optimal performance" },
    { title: "User Friendly", description: "Designing intuitive interfaces with exceptional UX" },
    { title: "Fast Learner", description: "Quickly adapting to new technologies and methodologies" },
  ]

  return (
    <section id='about' className='w-full min-h-screen flex items-center justify-center relative bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden py-20'>
      <ParticalsBackground />
      
      {/* Enhanced background effects */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div 
          className='absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[140px]'
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
          className='absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-[#1cd8d2] via-[#00bf8f] to-[#302b63] opacity-20 blur-[140px]'
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

      <div className='relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Section Title */}
        <motion.div 
          className='text-center mb-16'
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <h2 className='text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]'>
            About Me
          </h2>
          <motion.div 
            className='mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] rounded-full'
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          
          {/* Left - Image & Quick Info */}
          <motion.div 
            className='flex flex-col items-center lg:items-start'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            
            {/* Profile Image */}
            <div className='relative group mb-8'>
              <motion.div 
                className='absolute -inset-4 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-300'
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className='relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl'
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <img src={nakul} alt="Nakul Gadhewal" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 gap-4 w-full max-w-md'>
              {stats.map((item, i) => (
                <motion.div 
                  key={i} 
                  className='group relative p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#1cd8d2]/50 transition-all duration-300'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  whileHover={{ y: -5 }}>
                  <div className='absolute inset-0 bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] rounded-2xl opacity-0 group-hover:opacity-10 blur transition-opacity'/>
                  <item.icon className='text-2xl text-[#1cd8d2] mb-2'/>
                  <div className='text-sm text-gray-400 mb-1'>{item.label}</div>
                  <div className='text-xl font-bold text-white'>{item.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div 
            className='space-y-6'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            
            {/* Introduction */}
            <div>
              <h3 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
                Full Stack Developer
              </h3>
              <p className='text-lg text-gray-300 leading-relaxed mb-4'>
                I'm a <span className='text-[#1cd8d2] font-semibold'>passionate developer</span> dedicated to crafting 
                exceptional digital experiences. With expertise in both <span className='text-[#00bf8f] font-semibold'>front-end 
                and back-end technologies</span>, I build scalable, high-performance applications that solve real-world problems.
              </p>
              <p className='text-lg text-gray-300 leading-relaxed'>
                My approach combines <span className='text-[#1cd8d2] font-semibold'>clean code principles</span> with 
                modern design aesthetics to deliver solutions that are not only functional but also delightful to use. 
                I'm constantly learning and exploring new technologies to stay at the forefront of web development.
              </p>
            </div>

            {/* Highlights */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
              {highlights.map((item, i) => (
                <motion.div 
                  key={i}
                  className='group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#1cd8d2]/50 transition-all duration-300'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  whileHover={{ y: -3 }}>
                  <h4 className='text-lg font-semibold text-white mb-2 group-hover:text-[#1cd8d2] transition-colors'>
                    {item.title}
                  </h4>
                  <p className='text-sm text-gray-400'>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className='flex flex-wrap gap-4 pt-6'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}>
              <motion.a 
                href="#projects"
                className='group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <div className='absolute inset-0 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]'/>
                <div className='absolute inset-0 bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
                <span className='relative flex items-center gap-2'>
                  View Projects
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </span>
              </motion.a>

              <motion.a 
                href="#contact"
                className='px-8 py-4 rounded-full font-semibold bg-white/10 text-white border-2 border-white/20 
                hover:bg-white/20 hover:border-[#1cd8d2] transition-all duration-300 backdrop-blur-sm'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About