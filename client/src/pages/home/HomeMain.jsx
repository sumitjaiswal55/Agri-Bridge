import Hero from "./Hero.jsx";
import About from "./aboutus/About.jsx";
import Process from "./Process.jsx";
import Navbar from "../../component/layout/Navbar.jsx";
import Footer from "../../component/layout/Footer.jsx";
import "./Home.css";
import Vision from "./Vision.jsx";

const HomeMain = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Process />
      <About />
      <Vision />
      <Footer />
    </div>
  );
};

export default HomeMain;