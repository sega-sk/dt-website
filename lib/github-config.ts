export const GITHUB_CONFIG = {
  owner: process.env.GITHUB_OWNER || 'your-username', // Replace with your GitHub username
  repo: process.env.GITHUB_REPO || 'your-repo-name',  // Replace with your repository name
  token: process.env.GITHUB_TOKEN,
  branch: process.env.GITHUB_BRANCH || 'main',
  contentPath: 'content/site-content.json', // Path where content will be stored in your repo
};

export interface GitHubFile {
  content: string;
  sha?: string;
  path: string;
  message: string;
}

export interface GitHubResponse {
  content: {
    sha: string;
    download_url: string;
  };
}
