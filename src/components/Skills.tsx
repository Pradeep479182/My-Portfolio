import { useEffect, useState } from "react";
import Section from "./Section";
import "../styles/skills.css";

// Icons
import { FaReact, FaJs, FaGithub, FaCss3Alt } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const skillsData = [
  { name: "React", percent: 85, icon: <FaReact /> },
  { name: "TypeScript", percent: 80, icon: <SiTypescript /> },
  { name: "JavaScript", percent: 90, icon: <FaJs /> },
  { name: "CSS", percent: 85, icon: <FaCss3Alt /> },
  { name: "GitHub", percent: 75, icon: <FaGithub /> },
];

export default function Skills() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Section title="Skills">
      <div className="skills-chat">
        {skillsData.map((skill, index) => (
          <div className="skill-bubble" key={index}>
            <span className="skill-icon">{skill.icon}</span>
            <span className="skill-name">{skill.name}</span>
            <div className="bubble-bar">
              <div
                className="bubble-fill"
                style={{
                  width: animate ? `${skill.percent}%` : "0%",
                }}
              />
            </div>
            <span className="skill-percent">{skill.percent}%</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
