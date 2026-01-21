import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useMemo, useState, useRef } from 'react'
import ParticalsBackground from '../components/ParticalsBackground';

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Amdox Technologies",
    duration: "Nov 2025 to Feb 2026",
    description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to design scalable solutions and improve user experience."
  },
  {
    role: "Frontend Developer",
    description: "Implemented responsive UI components and optimized application performance. Worked closely with designers to ensure pixel-perfect designs and seamless user interactions."
  },

  {
    role: "Backend Developer",
    description: "Built and maintained server-side logic, ensuring high performance and responsiveness. Integrated third-party APIs and managed database operations."
  }
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const y = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? 30 : -30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className='relative flex flex-1 justify-center items-center min-w-0'>
        <motion.div className='z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]'
          style={{ scale, opacity }}
        >
        </motion.div>
        <motion.div className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40 `}
          style={{ height: 40, opacity }}
        >
        </motion.div>
        <motion.article className={`absolute ${idx % 2 === 0 ? "bottom-full mb-12" : "top-full mt-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70
        rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity, y }}
        >
          <h3 className='text-xl font-semibold'>
            {exp.role}
          </h3>
          <p className='text-md text-gray-400 mb-4'>
            {exp.company} | {exp.duration}
          </p>
          <p className='text-md text-gray-300 wrap-break-word'>
            {exp.description}
          </p>

        </motion.article>
      </div>
    )
  }

  return (
    <div className='relative flex items-start'>
      <motion.div className='absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]'
        style={{ scale, opacity }}
      >
      </motion.div>
      <motion.article className='bg-gray-900/80 backdrop:blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg'
        style={{ opacity, x }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className='text-lg font-semibold wrap-break-word'>
          {exp.role}
        </h3>
        <p className='text-sm text-gray-400 mb-2 wrap-break-word'>
          {exp.company} | {exp.duration}
        </p>
        <p className='text-sm text-gray-300 wrap-break-word'>
          {exp.description}
        </p>
      </motion.article>
    </div>
  )


}

function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [])

  const SCENE_HEIGHT_VH = isMobile ? 160 * experiences.length : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  const thresholds = useMemo(() => experiences.map((_, i) => (i + 1) / experiences.length), []);
  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`)

  return (
    <section id='experience' className='relative bg-black text-white'>
      <ParticalsBackground />
      <div ref={sceneRef} className='relative'
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: '120vh' }}
      >
        <div className='sticky top-0 h-screen flex flex-col'>
          <h2 className='text-4xl sm:text-5xl font-semibold mt-5 text-center'>
            Experience
          </h2>
          <div className='flex flex-1 items-center justify-center px-6 pb-10'>
            {!isMobile ? (
              <div className='relative w-full max-w-7xl'>
                <div className='relative h-[6px] bg-white/15 rounded'>
                  <motion.div className='absolute left-0 top-0 h-[6px] bg-white rounded origin-left'
                    style={{ width: lineSize }}>
                  </motion.div>
                </div>

                <div className='relative flex justify-between mt-0'>
                  {experiences.map((exp, idx) => (
                    <ExperienceItem key={idx} exp={exp} idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className='relative w-full max-w-2xl'>
                <div className='absolute left-0 top-0 w-[3px] h-full bg-white/15'>
                  <motion.div className='absolute left-0 top-0 w-[3px] bg-white origin-top'
                    style={{ height: lineSize }}>
                  </motion.div>
                </div>

                <div className='relative flex flex-col gap-20 py-8'>
                  {experiences.map((exp, idx) => (
                    <ExperienceItem key={idx} exp={exp} idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience