import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;

    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();
    let squeezeTimeout;

    const moveCursor = (e) => {
      const currentTime = Date.now();

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      const deltaTime = (currentTime - lastTime) || 1;

      // speed calculate
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;

      const maxSpeed = 1000;
      const intensity = Math.min(speed / maxSpeed, 1);

      // move cursor
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.7,
        ease: "power2.out"
      });

      // squeeze effect
      gsap.to(follower, {
        scaleX: 1 - 0.9 * intensity,
        scaleY: 1 + 0.2 * intensity,
        duration: 0.1,
        ease: "power1.out"
      });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;

      clearTimeout(squeezeTimeout);

      squeezeTimeout = setTimeout(() => {
        gsap.to(follower, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }, 150);
    };

    const handleHover = () => {
      gsap.to(follower, {
        scale: 1.5,
        duration: 0.3
      });
    };

    const handleLeave = () => {
      gsap.to(follower, {
        scale: 1,
        duration: 0.3
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveEl = document.querySelectorAll(
      "a, button, .cursor-pointer, .reveal-h1"
    );

    interactiveEl.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveEl.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
        <div
          ref={followerRef}
          className="absolute top-0 left-0 w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: "white",
            boxShadow:
              "0 0 25px 5px rgba(19,79,92,0.4), inset 0 0 15px rgba(0,0,0,0.2)",
            willChange: "transform",
            mixBlendMode:"difference"
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#134f5c]/10 to-transparent blur-sm -z-10"></div>
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