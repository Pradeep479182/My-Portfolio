import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { GitHubRepo } from "./types";
import { fetchGitHubRepos } from "../../utils/fetchGitHubRepos";
import "./projects.css";

const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await fetchGitHubRepos();
        setRepos(data);
      } catch (error) {
        console.error("Failed to fetch repos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <section className="projects-section">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
