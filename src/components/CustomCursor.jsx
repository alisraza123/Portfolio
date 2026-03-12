import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleHover = () => {
      gsap.to(follower, { 
        scale: 1.5, 
        backgroundColor: "rgba(19, 79, 92, 0.1)", 
        duration: 0.4 
      });
    };
    
    const handleLeave = () => {
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: "transparent", 
        duration: 0.4 
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveEl = document.querySelectorAll('a, button, .cursor-pointer, .reveal-h1');
    interactiveEl.forEach(el => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-9999 overflow-hidden select-none">
        <div 
          ref={followerRef}
          className="absolute top-0 left-0 w-10 h-10 border-2 border-[#134f5c]/60 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{
            boxShadow: `0 0 25px 5px rgba(19, 79, 92, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.2)`,
            willChange: "transform",
          }}
        >
          <div className="w-1.5 h-1.5 bg-[#d9ead3] rounded-full" />
          
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#134f5c]/10 to-transparent blur-sm -z-10" />
        </div>
      </div>

      <style jsx global>{`
       
        * {
          cursor: none !important;
        }

       
        body {
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }

        ::selection {
          background: #134f5c;
          color: #d9ead3;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;