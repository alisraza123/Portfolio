import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import IconGallery from "./components/IconGallery.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Loader from "./components/Loader.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

let App = () => {
  const [loaderFinished, setLoaderFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = !loaderFinished ? "hidden" : "auto";
  }, [loaderFinished]);

  return (
    <div className="bg-white dark:bg-primary selection:bg-[#134f5c] selection:text-white">
      <CustomCursor />

      {!loaderFinished && <Loader setLoaderFinished={setLoaderFinished} />}
      <main
        className={`transition-opacity duration-700 ${
          loaderFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />

        <Hero startAnim={loaderFinished} />

        <IconGallery />
        <AboutMe />
        <Projects />
        <WhyChoose />
        <Contact />
      </main>
    </div>
  );
};

export default App;
