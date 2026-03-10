import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  const projects = [
    { title: "TIMELESS", cat: "BRANDING", img: p1, bg: "#E9E9E0", link: "https://fancy-timeless.netlify.app" },
    { title: "UNIVERSITY", cat: "EDUCATION", img: p2, bg: "#dfeef5", link: "https://fancy-universityweb.netlify.app" },
    { title: "SWIGGY", cat: "FOOD TECH", img: p3, bg: "#e8f0ef", link: "https://fancy-swiggy.netlify.app" },
    { title: "WORKS", cat: "STUDIOS", img: p4, bg: "#fcfcfc", link: "https://worksstudio.netlify.app" },
  ];

useEffect(() => {
  let ctx = gsap.context(() => {

    const cards = gsap.utils.toArray(".project-card");

    cards.forEach((card) => {
      gsap.to(card, {
        scale: 0.95,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 20%",
          scrub: 2
        }
      });
    });

  }, containerRef);

  return () => ctx.revert();
}, []);

  return (
    <div ref={containerRef} className="bg-transparent w-full h-aut">
      
      <div className="intro-header w-full flex flex-col justify-end px-6 md:px-24 pt-10 pb-12  border-b border-gray-50">
        <h4 className="text-[#45818e] text-[10px] font-black tracking-[0.8em] uppercase mb-4 flex items-center">
          <span className="w-8 h-px bg-[#134f5c] mr-4"></span> Archive / 2026
        </h4>
        <h1 className="text-[12vw] md:text-[3vw] font-black text-[#134f5c] leading-[0.8] tracking-tighter">
          MY <br /> <span className="text-[#88ada5]">WORKS.</span>
        </h1>
      </div>

      <div className="flex flex-col">
        {projects.map((p, i) => (
          <section
            key={i}
            className="project-card sticky top-0 min-h-[80vh] md:min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-24 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0px_-20px_40px_rgba(0,0,0,0.03)] overflow-hidden"
            style={{ backgroundColor: p.bg }}
          >
            <div className="w-full md:w-1/2 pt-16 md:pt-0 z-10">
              <span className="text-[#45818e] text-[10px] font-black mb-2 block tracking-[0.3em] uppercase">
                PROJECT // 0{i + 1}
              </span>
              <h2 className="text-5xl md:text-[6vw] font-black text-[#134f5c] tracking-tighter leading-none mb-6">
                {p.title}
              </h2>
              <p className="text-[10px] md:text-xs font-bold text-[#88ada5] tracking-[0.3em] uppercase">
                {p.cat}
              </p>
              
              <button 
                onClick={() => window.open(p.link, "_blank")}
                className="mt-8 px-8 py-3 bg-[#134f5c] text-white text-[9px] font-black tracking-widest uppercase rounded-full hover:bg-[#45818e] transition-all shadow-lg cursor-pointer"
              >
                View Project
              </button>
            </div>

            <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center py-10">
              <div className="relative w-full h-full flex items-center justify-center">
                 <img 
                   src={p.img} 
                   alt={p.title} 
                   className="w-[85%] md:w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-1000 rounded-xl"
                 />
                 <span className="absolute inset-0 flex items-center justify-center text-[40vw] md:text-[25vw] font-black text-[#134f5c]/5 pointer-events-none -z-10">
                    {i + 1}
                 </span>
              </div>
            </div>
          </section>
        ))}
      </div>


    </div>
  );
};

export default Projects;