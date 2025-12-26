import Section from "./Section";
import Profile from "../assets/Profile.avif";
import CV from "../assets/Pradeepan Rakavi CV.pdf"; // Import the PDF
import "../styles/hero.css";

export default function Hero() {
  return (
    <Section title="Hello, It's Me">
      <div className="hero-wrapper">
        {/* LEFT CONTENT */}
        <div className="hero-text">
          <h1 className="hero-name">Pradeepan Rakavi</h1>

          <h3 className="hero-role">Frontend Developer</h3>

          <p className="hero-desc">
            I build modern, responsive, and interactive web applications using React and TypeScript,
            focusing on creating seamless user experiences, clean and maintainable code, 
            and visually appealing interfaces. I enjoy turning creative ideas into real-world 
            solutions while continuously exploring new technologies and best practices to improve
            performance and usability.
          </p>

          {/* Download CV button */}
          <a className="btn" href={CV} download="Pradeepan_Rakavi_CV.pdf">
            Download CV
          </a>
        </div>

        {/* RIGHT PROFILE IMAGE */}
        <div className="hero-image">
          <img src={Profile} alt="Profile" />
        </div>
      </div>
    </Section>
  );
}
