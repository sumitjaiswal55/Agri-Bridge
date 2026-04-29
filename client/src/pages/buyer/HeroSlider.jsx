import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Buyer.css'; // Ensure animations are here

const HeroSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  if (!Array.isArray(slides) || length <= 0) return null;

  return (
    <section className="slider-container">
      <button className="arrow-btn left-arrow" onClick={prevSlide} aria-label="Previous">
        <ChevronLeft size={30} />
      </button>
      <button className="arrow-btn right-arrow" onClick={nextSlide} aria-label="Next">
        <ChevronRight size={30} />
      </button>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={index === current ? 'slide active' : 'slide'}
        >
          {/* YAHAN SE CONDITION HATA DI HAI. 
             Ab saari images load hongi, lekin CSS se sirf 'active' wali dikhegi.
          */}
          <div 
            className="slide-image-box" 
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay">
              <div className="slide-content-box">
                <span className="badge-exclusive">Exclusive Deal</span>
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button className="hero-cta-btn">{slide.cta}</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? 'dot active' : 'dot'}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;