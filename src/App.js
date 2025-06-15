import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import Projects_Version4 from "./Projects_Version4"; // <-- Use your new Projects component

const Sidebar = () => (
  <div className="border-end bg-white" id="sidebar-wrapper">
    <div className="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
    <div className="list-group list-group-flush">
      <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/projects">Projects</Link>
      <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/cv">Curriculum Vitae</Link>
    </div>
  </div>
);

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div className="container-fluid">
      <button className="btn btn-primary" id="sidebarToggle">Toggle Menu</button>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

const Home = () => (
  <div className="container-fluid center-content">
      <h1 className="mt-4">Welcome to My Site</h1>
      <p>Select an option from the sidebar to view content.</p>
  </div>
);

const About = () => (
  <div className="container-fluid center-content">
    <h1> About Me</h1>
    <p>I am Simon Liljedahl, a game programmer graduate from Future Games, actively seeking job opportunities to further my career.</p>
    <p>With a background in programming for both Unreal Engine and Unity, I have actively contributed to various game projects.</p>
    <p>Email: <a href="mailto:simon.liljedahl@protonmail.com">simon.liljedahl@protonmail.com</a></p>
  </div>
);

const CurriculumVitae = () => (
  <div className="container-fluid ">
    <div className="container mt-5">
      <div className="row">
        {/* Left column: Profile */}
        <div className="col-md-5 text-center">
          <br />
          <br/>
          <img
            src="/Untitled.png"
            alt="Profile"
            className="img-fluid rounded-sm mb-3 mx-auto d-block"
            style={{ width: '250px', height: '250px', objectFit: 'contain' }}
          />    
          <br/>
          <p>Hi!<br/>
          My name is Simon and i have a high school degree aligned with Computers and ICT and a Higher Vocational degree in Game programming.
          </p>
        </div>
        {/* Right column: Education + Work Experience */}
        <div className="col-md-5 mt-0">
          <br />
          <h2>Education</h2>
          <p>Umeå University
            Jan 2024-May 2024
            Course, Musicproduction 1 (30hp)
          </p>   
          <p>Futuregames, Skellefteå
            2021–2023 Game Programmer <br />
            A higher vocational education providing experience within game programming<br />
            and collaboration at game projects
          </p>
          <p>Jämtlands Gymnasium Wargentin
            2015–2018 
            <br /><br />
            High school education aligned with Computers and ICT that provided basic
            knowledge within: computer and network technology, web-development and
            programming
          </p>
          <h2 className="mt-4">Work Experience</h2>
          <p>Your work experience info here...</p>
        </div>
      </div>
    </div>
  </div>
);

const App = () => (
  <Router>
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects_Version4 />} />
          <Route path="/cv" element={<CurriculumVitae />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;