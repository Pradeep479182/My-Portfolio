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
        console.log("Starting to fetch repos...");
        const data = await fetchGitHubRepos();
        console.log("Repos received:", data);
        setRepos(data);
        
        if (data.length === 0) {
          setError("No public repositories found. Make sure your repos are public!");
        }
      } catch (error) {
        console.error("Failed to fetch repos", error);
        setError("Failed to load projects. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section style={{
        padding: '2rem',
        background: '#020617',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        margin: '2rem auto',
        maxWidth: '1200px',
      }}>
        <h2 style={{
          color: '#22d3ee',
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '2rem',
        }}>
          My Projects
        </h2>
        <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '1.1rem' }}>
          ⏳ Loading projects from GitHub...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{
        padding: '2rem',
        background: '#020617',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        margin: '2rem auto',
        maxWidth: '1200px',
      }}>
        <h2 style={{
          color: '#22d3ee',
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '2rem',
        }}>
          My Projects
        </h2>
        <p style={{ textAlign: 'center', color: '#ef4444', fontSize: '1.1rem' }}>
          ⚠️ {error}
        </p>
        <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '0.9rem', marginTop: '1rem' }}>
          Open browser console (F12) to see detailed error messages
        </p>
      </section>
    );
  }

  if (repos.length === 0) {
    return (
      <section style={{
        padding: '2rem',
        background: '#020617',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        margin: '2rem auto',
        maxWidth: '1200px',
      }}>
        <h2 style={{
          color: '#22d3ee',
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '2rem',
        }}>
          My Projects
        </h2>
        <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '1.1rem' }}>
          📂 No projects found yet. Push some projects to GitHub!
        </p>
      </section>
    );
  }

  return (
    <section style={{
      padding: '2rem',
      background: '#020617',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      margin: '2rem auto',
      maxWidth: '1200px',
    }}>
      <h2 style={{
        color: '#22d3ee',
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '2rem',
      }}>
        My Projects
      </h2>
      
      <p style={{ textAlign: 'center', color: '#cbd5e1', marginBottom: '1.5rem' }}>
        Found {repos.length} project{repos.length !== 1 ? 's' : ''}
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
};

export default Projects;