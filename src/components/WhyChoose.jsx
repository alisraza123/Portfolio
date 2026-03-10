import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoDiamondSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";
import { IoIosHeartDislike } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const WhyChoose = () => {
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);
  const itemsRef = useRef([]);

  const data = [
    { title: "PREMIUM QUALITY", desc: "Pixel-perfect frontend architecture.", icon: <IoDiamondSharp />, color: "#134f5c" },
    { title: "FAST DELIVERY", desc: "Optimized for lightning speed.", icon: <FaRegClock />, color: "#45818e" },
    { title: "USER FOCUS", desc: "Interactions that drive results.", icon: <MdAdsClick />, color: "#88ada5" },
    { title: "CLEAN CODE", desc: "Zero-error modern standards.", icon: <IoIosHeartDislike />, color: "#97a393" },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.to(orbitRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      
      itemsRef.current.forEach((el, i) => {
        const icon = el.querySelector(".icon-sphere");
        const text = el.querySelector(".text-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "end 80%",
            scrub: 1,
          }
        });

        tl.fromTo(icon, 
          { scale: 0, rotation: -180, x: -50 }, 
          { scale: 1, rotation: 0, x: 0, ease: "back.out(2)" }
        )
        .fromTo(text, 
          { opacity: 0, filter: "blur(10px)", x: 30 }, 
          { opacity: 1, filter: "blur(0px)", x: 0 }, "-=0.3"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen dark:bg-primary py-24 flex items-center justify-center overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#134f5c]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="relative flex justify-center order-2 lg:order-1">
          <div ref={orbitRef} className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-linear-to-br from-[#134f5c] to-[#45818e] shadow-[0_0_80px_rgba(19,79,92,0.5)] flex items-center justify-center z-10 border border-white/10">
              <h2 className="text-white text-3xl md:text-5xl font-black tracking-tighter leading-none text-center italic">
                WHY<br/>US?
              </h2>
            </div>
            
            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-5 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </div>
        </div>
        <div className="flex flex-col gap-10 order-1 lg:order-2">
          {data.map((item, i) => (
            <div 
              key={i} 
              ref={el => itemsRef.current[i] = el}
              className="flex items-center gap-6 group cursor-default"
            >
              <div 
                className="icon-sphere w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl shadow-2xl transition-all duration-500 group-hover:scale-110"
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: `0 10px 30px ${item.color}44` 
                }}
              >
                {item.icon}
              </div>

              <div className="text-content">
                <div className="flex items-center gap-3 mb-1">
                   <span className="text-[10px] font-black tracking-[0.4em] dark:text-(--description-color)
                text-(--description-color) uppercase">Core 0{i+1}</span>
                   <div className="h-px w-8 dark:bg-(--description-color) " />
                </div>
                <h3 className="text-2xl md:text-4xl font-black dark:text-(--text-main) 
                text-(--text-main) 
                tracking-tighter uppercase leading-none mb-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-lg 
                dark:text-(--description-color)
                text-(--description-color)
                font-medium leading-tight max-w-70">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;