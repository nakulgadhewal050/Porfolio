import { useEffect, useRef, useState } from 'react'
import OverlayMenu from './OverlayMenu'
import logo from '../assets/Portfoliowebsite/logo.png'
import { FiMenu } from "react-icons/fi";
import { motion } from 'framer-motion';


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [forceVisible, setForceVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    const lastScrollY = useRef(0);
    const timerId = useRef(null);

    useEffect(() => {
        const homeSection = document.querySelector('#home');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setForceVisible(true);
                    setVisible(true);
                } else {
                    setForceVisible(false);
                }
            }, {threshold: 0.1}
        )
        if(homeSection) observer.observe(homeSection);
        return () => {
            if(homeSection) observer.unobserve(homeSection);
        }
    },[]);
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Update scrolled state for background effect
            setScrolled(currentScrollY > 50);
            
            if(forceVisible){
                setVisible(true);
                return;
            }
            
            // Clear existing timer
            if(timerId.current) clearTimeout(timerId.current);
            
            if(currentScrollY > lastScrollY.current && currentScrollY > 100){
                setVisible(false);
            } else {
                setVisible(true);
                
    
                timerId.current = setTimeout(() => {
                    setVisible(false);
                }, 1000);
            }
            lastScrollY.current = currentScrollY;
        }
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if(timerId.current) clearTimeout(timerId.current);
        }
    },[forceVisible]);

    return (
        <>
            <motion.nav 
                className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-4 z-50 transition-all duration-300 
                ${visible ? 'translate-y-0' : '-translate-y-full'}
                ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg border-b border-white/10' : 'bg-transparent'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}>

                <motion.div 
                    className='flex items-center space-x-3'
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}>
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] rounded-full blur-md opacity-50'/>
                        <img src={logo} alt="logo" className="h-12 w-12 md:h-14 md:w-14 relative z-10 rounded-full" />
                    </div>
                    <div className='text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] hidden sm:block'>
                        Nakul Gadhewal
                    </div>
                </motion.div>

                <div className='block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2'>
                    <motion.button 
                        onClick={() => setMenuOpen(true)}
                        className='relative group text-white text-3xl focus:outline-none p-2'
                        aria-label='open menu'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <div className='absolute inset-0 bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-sm'/>
                        <FiMenu className='relative z-10 cursor-pointer'/>
                    </motion.button>
                </div>

                <div className='hidden lg:block'>
                    <motion.a 
                        href="#contact"
                        className='relative px-6 py-3 rounded-full font-medium text-white overflow-hidden group cursor-pointer'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <div className='absolute inset-0 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] transition-transform duration-300 group-hover:scale-110'/>
                        <span className='relative z-10 flex items-center gap-2'>
                            Reach Out
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}>
                                →
                            </motion.span>
                        </span>
                    </motion.a>
                </div>

            </motion.nav>
            <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}/>
        </>
    )
}

export default Navbar