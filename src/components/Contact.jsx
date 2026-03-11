import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", 
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(".bg-line-1", { xPercent: -15, opacity: 0.05 }, 0)
        .to(".bg-line-2", { xPercent: 15, opacity: 0.05 }, 0)
        .to(overlayRef.current, {
          clipPath: "circle(150% at 50% 50%)", 
          duration: 2,
        }, 0)
        .from(".contact-content", {
          y: 50,
          opacity: 0,
          duration: 1,
        }, 0.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-transparent"
    >
      
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 overflow-hidden">
        <div className="bg-line-1 absolute top-[20%] w-full whitespace-nowrap opacity-10 pointer-events-none flex justify-start">
          <h2 className="text-[10vw] font-black text-[#134f5c] italic uppercase leading-none px-4">
            Next Chapter — Next Chapter — Next Chapter —
          </h2>
        </div>
        
        <div className="w-48 h-48 rounded-full border-2 border-[#134f5c] flex items-center justify-center relative z-30 bg-white shadow-sm transition-transform hover:scale-105 duration-500">
          <p className="text-[#134f5c] font-black tracking-widest animate-pulse uppercase text-center text-xs">Get In<br/>Touch</p>
        </div>

        <div className="bg-line-2 absolute bottom-[20%] w-full whitespace-nowrap opacity-10 pointer-events-none flex justify-end">
          <h2 className="text-[10vw] font-black text-[#134f5c] italic uppercase leading-none px-4">
            Let's Talk — Let's Talk — Let's Talk —
          </h2>
        </div>
      </div>

      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-[#134f5c] z-20 flex flex-col justify-center items-center"
        style={{ 
          clipPath: "circle(0% at 50% 50%)",
          willChange: "clip-path",
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="contact-content text-center px-6 relative z-30 max-w-4xl">
          <p className="text-[#88ada5] text-[10px] md:text-xs font-black tracking-[1em] uppercase mb-8">Available for Freelance</p>
          <div className="flex flex-col gap-6 mb-12">
            <a href="mailto:alisraza@gmail.com" className="text-[9vw] md:text-[6vw] font-black text-[#d9ead3] leading-none tracking-tighter hover:text-white transition-all duration-300">
              alisraza@gmail.com
            </a>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mt-4">
               <a href="#" className="flex items-center gap-2 text-[#88ada5] hover:text-[#d9ead3] transition-colors font-bold text-lg md:text-xl"><FaWhatsapp /> WhatsApp</a>
               <a href="#" className="flex items-center gap-2 text-[#88ada5] hover:text-[#d9ead3] transition-colors font-bold text-lg md:text-xl"><FaGithub /> Github</a>
               <a href="#" className="flex items-center gap-2 text-[#88ada5] hover:text-[#d9ead3] transition-colors font-bold text-lg md:text-xl"><FaLinkedinIn /> LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
            <h4 className="text-[25vw] font-black text-white select-none tracking-tighter leading-none">ALI.</h4>
        </div>
      </div>

      <style jsx global>{`
        body {
          overflow-x: hidden !important;
          width: 100% !important;
          position: relative;
        }
        /* GSAP specific spacer fix */
        .pin-spacer {
          pointer-events: none !important;
        }
        .pin-spacer > * {
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
};

export default Contact;