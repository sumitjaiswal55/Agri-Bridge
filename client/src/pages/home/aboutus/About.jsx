import video from "../../assets/Sec2.mp4"; 


const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        
        <div className="about-video-wrapper">
          <div className="video-frame">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="about-video"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-accent-box"></div>
          </div>
        </div>

        <div className="about-content">
          {/* <span className="badge">🌱 Who We Are</span> */}
          <h2 className="section-title">
            About <span className="highlight">AgriBridge</span>
          </h2>
          <p className="section-description">
            AgriBridge simplifies agricultural trade by creating a <strong>direct link</strong> between local farmers and bulk buyers.
          </p>
          <p className="section-description">
            We aim to reduce dependency on middlemen, making the process more transparent, fair, and beneficial for both sides. AgriBridge isn’t just a platform — it’s a step toward a smarter, more sustainable agriculture market.
          </p>
          
          <a href="/aboutus" className="btn btn-accent mt-4">
            Read About Us →
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;