import { FC } from "react";
import { motion } from "framer-motion";
import { GitHubRepo } from "./types";
import "./projects.css";

interface ProjectCardProps {
  repo: GitHubRepo;
}

const ProjectCard: FC<ProjectCardProps> = ({ repo }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="project-card"
    >
      <h3 className="project-name">{repo.name}</h3>
      <p className="project-description">{repo.description || "No description"}</p>
      <div className="project-tags">
        {repo.topics.map((topic) => (
          <span key={topic} className="project-tag">{topic}</span>
        ))}
      </div>
      <a
        href={repo.homepage || repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="view-btn"
      >
        View Project
      </a>
    </motion.div>
  );
};

export default ProjectCard;


