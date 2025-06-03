import imgVision from "../../assets/vision.png";

function Vision() {
  return (
    <>
      <section id="about" className="mt-4">
        <div className="container mt-5 mb-5">
          <div class="row align-items-center mt-5">
            <div className="col-md-6">
              <h2
                className="fw-bold mb-3 underline2"
                style={{ color: "rgb(28, 108, 44)" }}
              >
                Our Vision
              </h2>
              <p className="text-muted fs-4">
                Our vision is to create a seamless and fair ecosystem that
                connects farmers directly with buyers and transporters. We aim
                to eliminate the gap between food producers and consumers by
                ensuring farmers get the right price for their produce,
                transporters get reliable work opportunities, and buyers receive
                fresh vegetables at fair rates. Through technology, we strive to
                reduce wastage, empower local communities, and make the
                agricultural supply chain more transparent, accessible, and
                sustainable for everyone.
              </p>
              
            </div>
            <div className="col-md-6 text-center">
              <img src={imgVision} style={{ height: "650px" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Vision;
