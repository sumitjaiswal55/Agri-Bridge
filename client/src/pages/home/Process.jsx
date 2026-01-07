import img1 from "../../assets/Process1.png";
import img2 from "../../assets/Process2.png";
import img3 from "../../assets/Process3.png";
import img4 from "../../assets/Process4.png";

function Process() {
  return (
    <>
        <div
          className="d-flex gap-5 row px-0 justify-content-center align-items-center mb-5"
          style={{  width: "100%", backgroundColor: "rgb(236, 255, 235)", margin:"0px", padding: "0px"}}
        >
            <h1 className="fw-bold text-center mt-3" style={{ color: "rgb(28, 108, 44)" }}>Our 4-Step Journey</h1>
          <div className="col-2 text-center" style={{ color: "rgb(28, 108, 44)" }}>
            <img src={img1} />
            <h3>Cultivate</h3>
          </div>
          <div className="col-2 text-center" style={{ color: "rgb(28, 108, 44)" }}>
            <img src={img2} />
            <h3>Transport</h3>
          </div>
          <div className="col-2 text-center" style={{ color: "rgb(28, 108, 44)" }}>
            <img src={img3} />
            <h3>Market</h3>
          </div>
          <div className="col-2 text-center mt-1" style={{ color: "rgb(28, 108, 44)" }}>
            <img src={img4} />
            <h3 className="mt-2">Earn</h3>
          </div>
        </div>
    </>
  );
}

export default Process;
