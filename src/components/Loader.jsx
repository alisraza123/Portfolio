import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const Loader = ({ setLoaderFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 15) + 5;

      if (start >= 100) {
        start = 100;
        clearInterval(interval);
      }

      setProgress(start);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => setLoaderFinished(true),
      });

      tl.to(".loader-info", {
        opacity: 0,
        y: 20,
        duration: 0.4,
      })
        .to(".slat-bar", {
          height: 0,
          duration: 1.2,
          stagger: {
            each: 0.08,
            from: "end",
          },
          ease: "expo.inOut",
        })
        .to(".loader-main", {
          opacity: 0,
          duration: 0.4,
        });
    }
  }, [progress, setLoaderFinished]);

  return (
    <div className="loader-main fixed inset-0 z-99999 w-full h-full overflow-hidden flex items-end pointer-events-none">

    
      <div className="absolute inset-0 flex w-full h-full">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="slat-bar flex-1 h-full bg-[#134f5c]"
            style={{
              borderLeft:
                i !== 0 ? "1px solid rgba(255,255,255,0.03)" : "none",
            }}
          ></div>
        ))}
      </div>

      <div className="loader-info relative z-100 ml-auto mb-12 mr-12 text-right">
        <p className="text-[#88ada5] text-[10px] font-bold tracking-[0.5em] uppercase mb-2">
          Loading System
        </p>

        <h1 className="text-8xl font-black text-[#d9ead3] tracking-tighter italic tabular-nums leading-none">
          {progress}
          <span className="text-sm not-italic opacity-30 ml-2">
            INDEX
          </span>
        </h1>

        <div className="w-full h-0.5 bg-[#d9ead3]/10 mt-4 overflow-hidden">
          <div
            className="h-full bg-[#88ada5] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;