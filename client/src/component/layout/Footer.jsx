import logo from "../../assets/logo.png";

function Footer() {
  return (
    <>
      
        {/* Card 1 */}
        <footer
          style={{
            backgroundColor: "#e6fce7",
            padding: "30px 0",
            marginTop: "50px"
          }}
        >
          <div className="container text-center fs-5">
            <img src={logo} />
            <p className="mb-2 fw-bold">
              Empowering Farmers. Connecting Markets. Growing Together.
            </p>

            <div className="mb-3 fw-semibold">
              <a href="#" className="me-3 text-dark text-decoration-none">
                About Us
              </a>
              <a href="#" className="me-3 text-dark text-decoration-none">
                Our Services
              </a>
              <a href="#" className="text-dark text-decoration-none">
                Contact Us
              </a>
            </div>

            <p style={{ fontSize: "14px", color: "#555" }}>
              © {new Date().getFullYear()} AgriBridge. Made with ❤️ by Sumit
              | BCA Project
            </p>
          </div>
        </footer>
      
    </>
  );
}

export default Footer;
