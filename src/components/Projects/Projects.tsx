import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { GitHubRepo } from "./types";
import { fetchGitHubRepos } from "../../utils/fetchGitHubRepos";

const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await fetchGitHubRepos();
        setRepos(data);
        if (data.length === 0) {
          setError("No public repositories found.");
        }
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading || error || repos.length === 0) {
    return (
      <section
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "1.5rem",
          background: "#0a0a0a",
          borderRadius: "15px",
          margin: "1.5rem auto",
          border: "1px solid #1a1a1a",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            color: "#22d3ee",
            textAlign: "center",
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            marginBottom: "1.5rem",
          }}
        >
          My Projects
        </h2>
        <p style={{ textAlign: "center", color: "#cbd5e1" }}>
          {loading && "⏳ Loading projects..."}
          {error && `⚠️ ${error}`}
          {!loading && !error && "📂 No projects found"}
        </p>
      </section>
    );
  }

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1200px",
        padding: "1.5rem",
        background: "#0a0a0a",
        borderRadius: "15px",
        margin: "1.5rem auto",
        border: "1px solid #1a1a1a",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "#22d3ee",
          textAlign: "center",
          fontSize: "clamp(1.5rem, 5vw, 2rem)",
          marginBottom: "1rem",
        }}
      >
        My Projects
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "1.5rem",
          fontSize: "clamp(0.9rem, 3vw, 1rem)",
        }}
      >
        Found {repos.length} project{repos.length !== 1 ? "s" : ""}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
          gap: "1.25rem",
          width: "100%",
        }}
      >
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
};

export default Projects;