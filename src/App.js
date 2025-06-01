import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const Sidebar = () => (
  <div className="border-end bg-white" id="sidebar-wrapper">
    <div className="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
    <div className="list-group list-group-flush">
      <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/about">About Me</Link>
      <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/projects">Projects</Link>
      <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/cv">Curriculum Vitae</Link>
      <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/events">Events</Link>
      <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/profile">Profile</Link>
      <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/status">Status</Link>
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
  <div className="container-fluid">
    <h1 className="mt-4">Welcome to My Site</h1>
    <p>Select an option from the sidebar to view content.</p>
  </div>
);

const About = () => (
  <div className="container-fluid">
    <h1>About Me</h1>
    <p>I am Simon Liljedahl, a game programmer graduate from Future Games, actively seeking job opportunities to further my career.</p>
    <p>With a background in programming for both Unreal Engine and Unity, I have actively contributed to various game projects.</p>
    <p>Email: <a href="mailto:simon.liljedahl@protonmail.com">simon.liljedahl@protonmail.com</a></p>
  </div>
);

const Projects = () => (
  <div className="container-fluid">
    <h1>Projects</h1>
    <p>Here are some of my projects:</p>
    <ul>
      <li>Project 1 - Game Engine: Unity</li>
      <li>Project 2 - Game Engine: Unreal</li>
      <li>Project 3 - Personal Web Game</li>
    </ul>
  </div>
);

const CurriculumVitae = () => (
  <div className="container-fluid">
    <h1>Curriculum Vitae</h1>
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Profile</h3>
            <p className="card-text">Hi! My name is Simon, and my educational background includes a high school degree with a technical foundation in Computers and ICT, and a Higher Vocational degree in Game Programming.</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Education</h3>
            <p className="card-text">Umeå University (2024) - Course in Music Production</p>
            <p className="card-text">Future Games (2021–2023) - Higher Vocational Degree in Game Programming</p>
            <p className="card-text">Jämtlands Gymnasium Wargentin (2015–2018) - High School in Computers and ICT</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Work Experience</h3>
            <p className="card-text">Personal Assistant - Humana Assistans AB (2018–2021)</p>
            <p className="card-text">Teaching Assistant - Östersunds Kommun (2021)</p>
            <p className="card-text">Social Media Analyst - Majorel (2020)</p>
            <p className="card-text">Customer Service - Webhelp (2020)</p>
          </div>
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
          <Route path="/projects" element={<Projects />} />
          <Route path="/cv" element={<CurriculumVitae />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
