export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  topics: string[];
}

const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME";
const PORTFOLIO_REPO = "YOUR_PORTFOLIO_REPO";

export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
  const data = await response.json();

  return data
    .filter((repo: any) => repo.name !== PORTFOLIO_REPO)
    .map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      homepage: repo.homepage,
      description: repo.description,
      topics: repo.topics || [],
    }));
};
