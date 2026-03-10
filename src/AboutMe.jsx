import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ali from "./assets/ali.png";    

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      
      gsap.from(".about-image", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 85%", 
          toggleActions: "play none none none"
        }
      });

      
      gsap.from(".reveal-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal-heading",
          start: "top 80%",
        }
      });

      
      gsap.from(".reveal-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 85%",
        }
      });

      
      gsap.from(".reveal-tag", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".tag-container",
          start: "top 90%",
        }
      });

      
      gsap.to(".about-image", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-transparent py-20 md:py-32 overflow-hidden">
      <section ref={sectionRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="about-content flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* LEFT: IMAGE */}
          <div className="w-full md:w-5/12 flex justify-center">
            <div className="relative about-image">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#d9ead3] rounded-2xl -z-10"></div>
              
              <div className="w-64 h-80 md:w-80 md:h-105 overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
                <img 
                  src={ali} 
                  alt="Profile" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-[#134f5c] text-white p-6 rounded-xl hidden md:block shadow-xl">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase">Expertise In</p>
                <p className="text-sm font-bold mt-1 text-[#88ada5]">Flutter & React</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="w-full md:w-7/12 space-y-8">
            <div className="space-y-4 reveal-heading">
              <h4 className="text-[#45818e] text-xs font-black tracking-[0.5em] uppercase flex items-center">
                <span className="w-10 h-0.5 bg-[#d9ead3] mr-4"></span> The Person
              </h4>
              <h2 className="text-4xl md:text-6xl font-bold text-[#134f5c] leading-tight">
                Crafting Digital <br /> 
                <span className="text-[#88ada5]">Experiences.</span>
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-lg">
              <p className="reveal-text">
                I am a developer who sees coding not just as logic, but as a form of creativity. Over the past few years, I have focused on creating high-performance, visually stunning websites.
              </p>
              <p className="reveal-text text-sm border-l-2 border-[#d9ead3] pl-6 italic">
                My goal is to transform every user interaction into a memorable experience.
              </p>
            </div>

            {/* Tech Tags */}
            <div className="tag-container flex flex-wrap gap-3 pt-4">
              {['Design', 'Motion', 'Code', 'Architecture'].map((tag) => (
                <span key={tag} className="reveal-tag px-4 py-2 border border-[#88ada5]/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#134f5c]">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6 reveal-text">
              <button className="group relative px-8 py-4 bg-[#134f5c] text-white text-xs font-bold tracking-widest uppercase rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(19,79,92,0.3)]">
                <span className="relative z-10 group-hover:tracking-[0.2em] transition-all">Download CV</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutMe;