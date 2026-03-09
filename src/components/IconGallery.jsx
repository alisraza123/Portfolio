import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

// Assets
import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import reactIcon from "../assets/react.png";
import flutter from "../assets/flutter.png";
import mysql from "../assets/mysql.png";
import cplusplus from "../assets/c++.png";
import node from "../assets/node.png";
import awards from "../assets/awaaards.png";
import vscode from "../assets/vscode.png";
import java from "../assets/java.png";
import jquery from "../assets/jquery.png";
import git from "../assets/git.png";
import github from "../assets/github.png";
import greenSock from "../assets/gsap.png";

const IconGallery = () => {
  const sliderRef = useRef(null);
  const timelineRef = useRef(null);

  const icons = [
    { src: html, alt: "HTML Icon" },
    { src: css, alt: "CSS Icon" },
    { src: js, alt: "JavaScript Icon" },
    { src: jquery, alt: "jQuery" },
    { src: reactIcon, alt: "React Icon" },
    { src: mysql, alt: "MySQL Icon" },
    { src: node, alt: "Node.js Icon" },
    { src: flutter, alt: "Flutter Icon" },
    { src: awards, alt: "Awards" },
    { src: vscode, alt: "VSCode" },
    { src: git, alt: "Git" },
    { src: github, alt: "GitHub" },
    { src: cplusplus, alt: "C++ Icon" },
    { src: java, alt: "Java" },
    { src: greenSock, alt: "GSAP" },
  ];

  // Animation logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsap.to(".icon-track", {
        xPercent: -50,
        ease: "none",
        duration: 50,
        repeat: -1,
        opacity: 1,
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => timelineRef.current?.pause();
  const handleMouseLeave = () => timelineRef.current?.play();

  const handleWheel = (e) => {
    if (timelineRef.current) {
      const scrollSpeed = 0.001;
      let progress = timelineRef.current.progress() + e.deltaY * scrollSpeed;

      if (progress > 1) progress -= 1;
      if (progress < 0) progress += 1;

      timelineRef.current.progress(progress);
    }
  };

  return (
    <div className="py-10 bg-transparent overflow-hidden w-full">
      <div className="space-y-4">
        <h2 className="text-center text-4xl md:text-3xl font-bold text-[#134f5c] leading-tight">
          Tools & Technologies
          <br />
        </h2>
      </div>
      <div
        ref={sliderRef}
        className="relative w-full flex overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      >
        <div className="icon-track flex whitespace-nowrap gap-6 py-4">
         {icons.map((icon, index) => (
  <div
    key={`set1-${index}`}
    className="w-24 h-24 md:w-32 md:h-32 shrink-0 flex items-center justify-center border border-[#88ada5]/20 rounded-full transition-all duration-500 bg-white  shadow-sm group"
  >
    <img
      src={icon.src}
      alt={icon.alt}
      className="w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-300 hover:grayscale-0!"
      style={{ filter: "var(--icon-filter)" }}
    />
  </div>
))}
          {icons.map((icon, index) => (
            <div
              key={`set2-${index}`}
              className="w-24 h-24 md:w-32 md:h-32 shrink-0 flex items-center justify-center border border-[#88ada5]/20 rounded-full transition-all duration-500 bg-white shadow-sm"
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-300 grayscale  dark:grayscale-0  hover:grayscale-0!"
                style={{ filter: "var(--icon-filter)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconGallery;
