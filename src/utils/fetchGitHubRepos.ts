export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  topics: string[];
}

const GITHUB_USERNAME = "Pradeep479182";
const PORTFOLIO_REPO = "My-Portfolio";

export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    console.log("🔍 Fetching repos for:", GITHUB_USERNAME);
    
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );
    
    console.log("📡 Response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("📦 Total repos found:", data.length);
    console.log("📋 All repos:", data.map((r: any) => r.name));
    
    const filteredRepos = data
      .filter((repo: any) => {
        const isNotPortfolio = repo.name !== PORTFOLIO_REPO;
        const isNotFork = !repo.fork;
        const isPublic = !repo.private;
        
        console.log(`Repo: ${repo.name} - Portfolio: ${!isNotPortfolio}, Fork: ${!isNotFork}, Private: ${!isPublic}`);
        
        return isNotPortfolio && isNotFork && isPublic;
      })
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        homepage: repo.homepage,
        description: repo.description,
        topics: repo.topics || [],
      }));
    
    console.log("✅ Filtered repos to show:", filteredRepos.length);
    console.log("📝 Repos to display:", filteredRepos.map((r: any) => r.name));
    
    return filteredRepos;
  } catch (error) {
    console.error("❌ Error fetching GitHub repos:", error);
    return [];
  }
};