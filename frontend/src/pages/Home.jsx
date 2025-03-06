import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./about.css";
import "./keyFeatures.css";
import icon1 from "../assets/noc.jpg";
import icon2 from "../assets/tracking.png";
import icon3 from "../assets/inspection.png";
import icon4 from "../assets/risk.png";
import icon5 from "../assets/notifications.png";
import icon6 from "../assets/upload.png";
import aboutImage from "../assets/about-us.webp";
import TestimonialCarousel from "./TestimonialCarousel.jsx";

const SectionHeading = ({ title }) => (
  <h2 className="section-heading">{title}</h2>
);

const HomeButton = ({ to, className, children }) => (
  <Link to={to} className={`home-button ${className}`}>
    {children}
  </Link>
);

const ProcessStep = ({ number, title, description }) => (
  <div className="process-step">
    <span className="step-number">{number}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const features = [
  {
    icon: icon1,
    title: "Automated NOC Issuance",
    description: "No more paperwork, instant approvals",
  },
  {
    icon: icon2,
    title: "Real-Time Tracking",
    description: "Monitor the status of your application live",
  },
  {
    icon: icon3,
    title: "Fire Safety Inspections",
    description: "Easy scheduling & compliance monitoring",
  },
  {
    icon: icon4,
    title: "AI-Based Risk Analysis",
    description: "Prioritizing applications based on risk level",
  },
  {
    icon: icon5,
    title: "Emergency Notifications",
    description: "Instant alerts for pending approvals & inspections",
  },
  {
    icon: icon6,
    title: "Secure Document Upload",
    description: "Aadhaar, PAN & Fire Safety Certificates verified instantly",
  },
];

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Fast & Secure Fire Department NOC Processing</h1>
          <p className="hero-subtext">
            Apply, track, and receive fire safety approvals in real time.
          </p>
          <div className="hero-buttons">
            <HomeButton to="/apply-noc" className="apply-button">
              Apply for NOC
            </HomeButton>
            <HomeButton to="/login" className="track-button">
              Login
            </HomeButton>
          </div>
        </div>
      </section>

      <div className="about-container">
        <div className="about-image">
          <img src={aboutImage} alt="SafeFlame Monitoring" />
        </div>
        <div className="about-content">
          <h2>About <span className="highlight">SafeFlame</span></h2>
          <p>
            SafeFlame is an advanced fire safety monitoring system designed to streamline
            fire NOC applications, enhance real-time tracking, and ensure compliance
            with fire safety regulations. Our platform integrates AI-powered risk assessment,
            automated approvals, and emergency notifications to make fire safety more
            efficient and accessible.
          </p>
          <p>
            With a user-friendly interface and robust security features, SafeFlame simplifies
            fire safety procedures for businesses, residential complexes, and government
            organizations. Whether it's scheduling inspections, uploading necessary documents,
            or receiving real-time alerts, SafeFlame ensures a seamless experience.
          </p>
          <button className="read-more">Read More</button>
        </div>
      </div>

      <div className="features-container">
        <h2 className="features-title">Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <TestimonialCarousel />
      </div>

      <section className="process-section">
        <SectionHeading title="How It Works?" />
        <div className="process-steps">
          <ProcessStep
            number="1"
            title="Submit NOC Application"
            description="Upload required documents."
          />
          <ProcessStep
            number="2"
            title="Review & Inspection"
            description="Admin verifies and schedules an inspection."
          />
          <ProcessStep
            number="3"
            title="Track Progress"
            description="Get real-time status updates."
          />
          <ProcessStep
            number="4"
            title="Approval & Compliance"
            description="Receive the final NOC certificate."
          />
        </div>
      </section>
    </div>
  );
};

export default Home;