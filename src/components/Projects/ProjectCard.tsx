import { FC } from "react";
import { motion } from "framer-motion";
import { GitHubRepo } from "./types";

interface ProjectCardProps {
  repo: GitHubRepo;
}

const ProjectCard: FC<ProjectCardProps> = ({ repo }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        background: '#000000',
        padding: '1.5rem',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        position: 'relative',
        transition: 'all 0.3s ease',
        border: '1px solid #1a1a1a',
      }}
    >
      <h3 style={{
        fontWeight: 600,
        color: '#e5e7eb',
        fontSize: '1.2rem',
        textAlign: 'center',
        margin: 0,
      }}>
        {repo.name}
      </h3>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 1rem',
        background: 'rgba(34,211,238,0.2)',
        borderRadius: '20px',
        fontSize: '0.9rem',
        color: '#22d3ee',
        fontWeight: 600,
        border: '1px solid rgba(34,211,238,0.3)',
      }}>
        <span style={{ fontSize: '1rem' }}>💻</span>
        {repo.language || 'Multiple Languages'}
      </div>
      
      {repo.stargazers_count > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.85rem',
          color: '#fbbf24',
        }}>
          <span>⭐</span>
          {repo.stargazers_count}
        </div>
      )}
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center',
      }}>
        {repo.topics.map((topic) => (
          <span 
            key={topic}
            style={{
              backgroundColor: 'rgba(34,211,238,0.2)',
              padding: '0.2rem 0.6rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              color: '#22d3ee',
            }}
          >
            {topic}
          </span>
        ))}
      </div>
      
      <a
        href={repo.homepage || repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 'auto',
          textAlign: 'center',
          padding: '0.5rem 1rem',
          background: 'rgba(34,211,238,0.2)',
          borderRadius: '10px',
          fontWeight: 600,
          color: '#fff',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        View Project
      </a>
    </motion.div>
  );
};

export default ProjectCard;
