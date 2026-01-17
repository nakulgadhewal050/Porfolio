import React, { useEffect, useRef, useState } from 'react'
import {  FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFastapi, SiDocker, SiMongodb, SiVite } from "react-icons/si";
import { motion, useMotionValue } from 'framer-motion';
import ParticalsBackground from '../components/ParticalsBackground';

function Skills() {

  const skills = [
    { icon: <IoLogoJavascript />, name: "JavaScript", color: "#F7DF1E" },
    { icon: <FaReact />, name: "React", color: "#61DAFB" },
    { icon: <SiNextdotjs />, name: "Next.js", color: "#FFFFFF" },
    { icon: <SiTypescript />, name: "TypeScript", color: "#3178C6" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "#06B6D4" },
    { icon: <SiFastapi />, name: "FastAPI", color: "#009688" },
    { icon: <SiDocker />, name: "Docker", color: "#2496ED" },
    { icon: <SiVite />, name: "Vite", color: "#646CFF" },
    { icon: <SiMongodb />, name: "MongoDB", color: "#47A248" },
  ];

  const repeated = [...skills, ...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if(!el) return;

    const io = new IntersectionObserver((
      [entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio >= 0.1);
      },
      { threshold: [0.1] }
    )
    io.observe(el);
    return () => io.disconnect();
  },[])

  useEffect(() => {
     if(!active) return;
    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if(touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    }
    window.addEventListener('wheel', onWheel, {passive: true});
    window.addEventListener('touchstart', onTouchStart, {passive: true});
    window.addEventListener('touchmove', onTouchMove, {passive: true});

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  
  },[active]);


  useEffect(() => {
    if(!active) return; // Only animate when section is visible
    
    let id;
    let last = performance.now();
    const speed = 60;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + speed * dt * dir;
      const loop = trackRef.current?.scrollWidth / 3 || 0;

      if (loop) {
        while (next <= -loop) next += loop;
        while (next >= loop) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active, dir, x]);


  return (
    <section id="skills"
      ref={sectionRef}
      className='min-h-screen w-full py-20 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden'>
       <ParticalsBackground/>
      {/* Enhanced background effects */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-20 blur-[150px] animate-pulse'/>
        <div className='absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
        opacity-20 blur-[150px] animate-pulse' style={{animationDelay: '1s'}}/>
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-t from-[#00bf8f] to-transparent
        opacity-10 blur-[100px]'/>
      </div>

      <div className='relative z-10 w-full max-w-7xl mx-auto px-4'>
        <div className='text-center mb-16'>
          <motion.h2 
            className='text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]'
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            My Skills
          </motion.h2>
          <motion.div 
            className='mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] rounded-full'
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p 
            className='mt-6 text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            Technologies I use to bring ideas to life
          </motion.p>
        </div>

        {/* Skills carousel */}
        <div className='relative w-full overflow-hidden py-8'>
          {/* Gradient overlays for fade effect */}
          <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none'/>
          <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none'/>
          
          <motion.div 
            className='flex gap-12 md:gap-16'
            style={{x, whiteSpace: "nowrap", willChange: "transform"}}
            ref={trackRef}>
            {repeated.map((s, i) => (
              <motion.div 
                key={i} 
                className='flex flex-col items-center gap-4 min-w-[140px] md:min-w-[160px] group cursor-pointer'
                aria-label={s.name}
                title={s.name}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <div className='relative'>
                  {/* Glow effect on hover */}
                  <div 
                    className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300'
                    style={{ backgroundColor: s.color }}
                  />
                  <div className='relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl 
                  shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-700 
                  group-hover:border-opacity-50'
                  style={{ borderColor: s.color }}>
                    <span 
                      className='text-6xl md:text-7xl transition-all duration-300 group-hover:scale-110 block'
                      style={{ color: s.color }}>
                      {s.icon}
                    </span>
                  </div>
                </div>
                <p className='text-base md:text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300'>
                  {s.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills