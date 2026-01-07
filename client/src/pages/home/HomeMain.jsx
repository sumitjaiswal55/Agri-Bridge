import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Process from "./Process.jsx";

import "./Home.css";
import Vision from "./Vision.jsx";

const HomeMain = () => {
  return (
    <div className="landing-page">
      <Hero />
      <Process />
      <Vision />
    </div>
  );
};

export default HomeMain;