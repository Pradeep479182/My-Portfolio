export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
}