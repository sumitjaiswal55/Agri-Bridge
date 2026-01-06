import video from "../../assets/Sec2.mp4";

function About() {
  return (
    <section id="about" class="py-4">
      <div class="container">
        <div class="row align-items-center">

          <div className="col-md-6 text-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="img-fluid rounded"
              style={{ maxWidth: "100%", height: "600px" }}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold underline2 mb-3" style={{ color: "rgb(28, 108, 44)" }}>
              About Agribridge
            </h2>
            <p className="text-muted fs-4">
              Agribridge simplifies agricultural trade by creating a direct link
              between local farmers and bulk buyers. We aim to reduce the
              dependency on middlemen, making the process more transparent,
              fair, and beneficial for both sides. Agribridge isn’t just a
              platform — it’s a step toward smarter, more sustainable
              agriculture market.
            </p>
            <a
              href="/aboutus"
              className="btn btn2 btn-success mt-3 fs-5 fw-semibold"
              style={{
                backgroundColor: "#fb9c24",
                border: "none",
                padding: "10px",
                borderRadius: "30px",
              }}
            >
              Read About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
