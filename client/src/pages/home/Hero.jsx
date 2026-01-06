import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Home.css"; // Custom styling

import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
   <Slider {...settings} className="custom-slick-slider">
      <div className="slider-item">
        <img className="d-block w-100" src={img1} alt="First slide" />
        <div className="slider-caption">
          <h1 className="fw-bold" style={{color: "rgb(28, 224, 68)", }}>Welcome to AgriBride</h1>
          <p className="fs-4">AgriBridge is the Platform <br/> where we connects Farms to Markets.</p>
          <button className="btn btn1 btn-primary mt-3 fs-5" style={{backgroundColor:"rgb(28, 108, 44)", border:"none", padding:"10px"}}>Get Started</button>
        </div>
      </div>

      <div className="slider-item">
        <img className="d-block w-100" src={img2} alt="Second slide" />
        <div className="slider-caption">
          <h1 className="fw-bold" style={{color: "rgb(28, 224, 68)"}}>Empowering the Hands that Feed Us.</h1>
          <p className="fs-4">Directly connecting farmers to buyers — ensuring fair income, dignity, and growth for those who nourish our nation.</p>
          <button className="btn btn1 btn-primary mt-3 fs-5" style={{backgroundColor:"rgb(28, 108, 44)", border:"none", padding:"10px"}}>Get Started</button>
        </div>
      </div>

      <div className="slider-item">
        <img className="d-block w-100" src={img3} alt="Third slide" />
        <div className="slider-caption">
          <h1 className="fw-bold" style={{color: "rgb(28, 224, 68)"}}>Bridging Agriculture with Opportunity.</h1>
          <p className="fs-4">Connecting farmers directly with bulk buyers, removing middlemen, ensuring fair prices, fresh produce, and building a transparent, efficient supply chain for all.</p>
          <button className="btn btn1 btn-primary mt-3 fs-5" style={{backgroundColor:"rgb(28, 108, 44)", border:"none", padding:"10px"}}>Get Started</button>
        </div>
      </div>
    </Slider>
  );
};

export default Hero;
