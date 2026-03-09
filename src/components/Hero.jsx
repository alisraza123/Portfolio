import React, { useEffect, useRef } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import { gsap } from "gsap";

const Hero = ({ startAnim }) => {
  const containerRef = useRef(null);
  const arrowRef = useRef(null);
  const rotatingTextRef = useRef(null);

  useEffect(() => {
    if (!startAnim) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".reveal-h1", {
        y: 200,
        skewY: 10,
        duration: 1.5,
        delay: 0.5,
        ease: "expo.out",
        stagger: 0.1,
      }).from(
        ".reveal-p",
        {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      );

      gsap.to(rotatingTextRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      const handleMouseMove = (e) => {
        if (!arrowRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } =
          arrowRef.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.3;
        const y = (clientY - (top + height / 2)) * 0.3;
        gsap.to(arrowRef.current, { x, y, duration: 0.6, ease: "power2.out" });
      };

      const resetArrow = () => {
        if (!arrowRef.current) return;
        gsap.to(arrowRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
      };

      arrowRef.current?.addEventListener("mousemove", handleMouseMove);
      arrowRef.current?.addEventListener("mouseleave", resetArrow);
    }, containerRef);

    return () => ctx.revert();
  }, [startAnim]);

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-transparent transition-colors duration-500 flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      <div className="text-center">
        <div className="overflow-hidden mb-2">
          <h1 className="reveal-h1 text-[12vw] md:text-[8vw] font-black text-primary dark:text-light leading-none tracking-tighter uppercase transition-colors duration-500">
            Code that
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="reveal-h1 text-[12vw] md:text-[8vw] font-black text-secondary leading-none tracking-tighter uppercase italic text-[#008080]">
            Connects
          </h1>
        </div>

        <div className="reveal-p mt-8 max-w-lg mx-auto">
          <p className="text-lg md:text-xl dark:text-(--text-main)   font-medium leading-relaxed transition-colors">
            Freelance Developer creating bold digital experiences through clean
            code and modern aesthetics.
          </p>
        </div>
      </div>

      <div className="reveal-p absolute bottom-12 flex flex-col items-center gap-4 ">
        <div
          ref={arrowRef}
          onClick={scrollToNext}
          className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center cursor-pointer group "
        >
          <div
            ref={rotatingTextRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="none"
              />
              <text className="fill-gray-400 dark:fill-[#88ada5] text-[8px] font-black tracking-[3px] uppercase">
                <textPath xlinkHref="#circlePath">
                  • SCROLL DOWN • DISCOVER MORE • KEEP GOING •
                </textPath>
              </text>
            </svg>
          </div>

          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-light dark:border-secondary flex items-center justify-center text-primary dark:text-light bg-white hover:bg-[#008080] transition-all duration-500 shadow-xl z-10">
            <IoIosArrowRoundDown className="text-4xl group-hover:scale-110 transition-transform text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
