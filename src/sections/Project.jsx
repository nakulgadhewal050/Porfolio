import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import img1 from "../assets/Portfolio website/img1.png";
import img2 from "../assets/Portfolio website/img2.png";
import img3 from "../assets/Portfolio website/img3.png";
import photo1 from "../assets/Portfolio website/photo1.png";
import photo2 from "../assets/Portfolio website/photo2.png";
import photo3 from "../assets/Portfolio website/photo3.png";

/* ------------------ Mobile Hook ------------------ */
const useIsMobile = (query = "(max-width: 768px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

function Project() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "Job-Seeker Platform",
        description: "Job search and application management system",
        link: "https://job-listing-portal-frontend-9tvf.onrender.com",
        bgColor: "#8120EA",
        image: isMobile ? photo3 : img3,
        tags: ["Full Stack", "Auth", "Database"],
      },
      {
        title: "Book Your Show",
        description: "Comprehensive travel planning app with itinerary management",
        link: "https://github.com/nakulgadhewal050/Ticket_booking-application.git",
        bgColor: "#02163A",
        image: isMobile ? photo1 : img1,
        tags: ["React", "Node.js", "API"],
      },
      {
        title: "Smart Food Delivery",
        description: "Food delivery platform with real-time tracking",
        link: "https://github.com/nakulgadhewal050/Vingo_Food-Delivery.git",
        bgColor: "#FF5B3D",
        image: isMobile ? photo2 : img2,
        tags: ["React", "Firebase", "Maps"],
      }  
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? projects.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sceneRef}
      id="projects"
      className="relative text-white"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Featured Projects
        </motion.h2>

        {/* Title */}
        <motion.h3
          key={activeProject.title}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(2rem,6vw,4rem)] font-bold italic text-center mb-2"
        >
          {activeProject.title}
        </motion.h3>

        {/* Description */}
        {!isMobile && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/80 text-center max-w-xl mb-6"
          >
            {activeProject.description}
          </motion.p>
        )}

        {/* Image */}
        <motion.div
          className="relative w-full max-w-5xl h-[60vh] rounded-xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <img
            src={activeProject.image}
            alt={activeProject.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Tags */}
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            {activeProject.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-white/20 backdrop-blur rounded-full border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

    
        <motion.a
          href={activeProject.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:scale-105 transition"
        >
          Visit Project
        </motion.a>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-4">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
