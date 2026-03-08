import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { FiMenu } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const nameRef = useRef(null);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
  const [scrolled, setScrolled] = useState(false); 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false),
    });

    tl.to(".menu-item", {
      opacity: 0,
      y: 5,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      overwrite: true,
    }).to(menuRef.current, {
      width: "90px",
      height: "45px",
      duration: 0.6,
      ease: "expo.inOut",
      overwrite: true,
    });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    const isMobile = window.innerWidth < 768;

    if (!isOpen) {
      setIsOpen(true);
      const tl = gsap.timeline();

      if (isMobile) {
        tl.to(menuRef.current, {
          height: "380px", 
          width: "90px",
          duration: 0.6,
          ease: "expo.out",
          overwrite: true,
        });
      } else {
        tl.to(menuRef.current, {
          width: "500px",
          height: "45px",
          duration: 0.6,
          ease: "expo.out",
          overwrite: true,
        });
      }

      tl.fromTo(
        ".menu-item",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" },
        "-=0.3",
      );
    } else {
      closeMenu();
    }
  };

  const handleEnter = () => {
    gsap.killTweensOf(nameRef.current.children);
    gsap.to(nameRef.current.children, {
      opacity: 1,
      duration: 0.5,
      stagger: { each: 0.1, from: "end" },
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleLeave = () => {
    gsap.killTweensOf(nameRef.current.children);
    gsap.to(nameRef.current.children, {
      opacity: 0,
      duration: 0.3,
      stagger: { each: 0.05, from: "start" },
      overwrite: true,
    });
  };

  return (
    <div className="font-sans">
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={closeMenu}
        />
      )}

      <nav
        className={`w-full h-16 fixed px-6 md:px-48 flex items-center z-50 transition-all duration-300 ${
          scrolled ? " backdrop-blur-sm" : ""
        }`}
      >
        <div className="flex justify-between w-full h-full items-center">
          <div
            className="flex relative items-center h-full cursor-pointer"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              className="absolute right-full mr-3 transform -rotate-90 flex origin-right -translate-y-px whitespace-nowrap text-xl tracking-wider font-bold"
              ref={nameRef}
              style={{ bottom: "50%", color: "#134f5c" }}
            >
              {["a", "l", "i", "r", "a", "z", "a"].map((char, i) => (
                <div key={i} style={{ opacity: 0 }}>
                  {char}
                </div>
              ))}
            </div>
            <div
              className="text-4xl font-bold leading-none select-none"
              style={{ color: "#134f5c" }}
            >
              A
            </div>
          </div>

          <div className="relative h-11">
            <div
              ref={menuRef}
              className="absolute top-0 right-0 bg-primary dark:bg-(--bg-button) rounded-3xl overflow-hidden shadow-lg  z-50 flex flex-col md:flex-row-reverse"
              style={{ width: "90px", height: "45px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-11.25 min-h-11.25 flex items-center justify-center space-x-2 px-2 shrink-0 self-end">
                <button
                  className="w-8 h-8 flex items-center justify-center bg-[#134f5c] text-white rounded-full cursor-pointer hover:bg-[#1a6677] transition-colors"
                  onClick={toggleMenu}
                >
                  {isOpen ? <IoClose size={20} /> : <FiMenu size={18} />}
                </button>
                <div
                  className="w-8 h-8 flex items-center justify-center bg-[#134f5c] rounded-full cursor-pointer text-white hover:text-[#d9ead3] transition-colors"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? (
                    <MdLightMode size={18} />
                  ) : (
                    <MdLightMode className="opacity-50" size={18} />
                  )}
                </div>
              </div>

              <div
                className={`flex-1 flex items-center justify-center px-6 pb-6 md:pb-0 ${!isOpen ? "invisible" : "visible"}`}
              >
                <ul className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 font-semibold text-white text-sm whitespace-nowrap">
                  <li className="menu-item " onClick={closeMenu}>
                    <a href="#home">Home</a>
                  </li>
                  <li className="menu-item" onClick={closeMenu}>
                    <a href="#work">Work</a>
                  </li>
                  <li className="menu-item" onClick={closeMenu}>
                    <a href="#about">About</a>
                  </li>
                  <li className="menu-item" onClick={closeMenu}>
                    <a href="#project">Project</a>
                  </li>
                  <li className="menu-item" onClick={closeMenu}>
                    <a href="#resume">Resume</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
