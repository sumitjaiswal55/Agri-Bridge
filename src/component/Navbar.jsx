import logo from '../assets/logo.png';

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#EAF5E9', color: 'black', height: "80px" }}>
        <div className="container d-flex justify-content-between align-items-center">

          {/* Left: Logo */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="Logo" height="34" />
          </a>

          {/* Center: Links */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav" style={{color: "blue"}}>
            <ul className="navbar-nav d-flex flex-row gap-4">
              <li className="nav-item">
                <a className="nav-link" href="/aboutus" style={{color: "black"}}>About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/services" style={{color: "black"}}>Our Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact" style={{color: "black"}}>Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Right: Placeholder (Future: login icons) */}
          <div className="d-flex align-items-center" style={{ minWidth: '80px'}}>
            {/* Placeholder for future items */}
            <button className= "mx-3 btn1 btn btn-primary" style={{backgroundColor: "#1c6c2c", border: "none"}}>Login</button>
            <button className= "mx-2  btn1 btn btn-primary" style={{backgroundColor: "#1c6c2c", border: "none"}}>Register</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
