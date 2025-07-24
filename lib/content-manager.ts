import { defaultContent, ContentConfig } from './content-config';
import { GITHUB_CONFIG } from './github-config';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export class ContentManager {
  private static async fetchFromGitHub(): Promise<ContentConfig> {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.contentPath}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${GITHUB_CONFIG.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // File doesn't exist yet, return default content
          return defaultContent;
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
      
      // Merge with default content to ensure all fields are present
      return { ...defaultContent, ...content };
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      return defaultContent;
    }
  }

  private static async saveToGitHub(content: ContentConfig, currentSha?: string): Promise<boolean> {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.contentPath}`;
    
    try {
      const fileContent = JSON.stringify(content, null, 2);
      const encodedContent = Buffer.from(fileContent, 'utf-8').toString('base64');
      
      const payload: any = {
        message: `Update site content - ${new Date().toISOString()}`,
        content: encodedContent,
        branch: GITHUB_CONFIG.branch,
      };

      // Include SHA if updating existing file
      if (currentSha) {
        payload.sha = currentSha;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_CONFIG.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      return false;
    }
  }

  private static async getCurrentSha(): Promise<string | undefined> {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.contentPath}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${GITHUB_CONFIG.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.sha;
      }
    } catch (error) {
      console.error('Error getting current SHA:', error);
    }
    
    return undefined;
  }

  static async loadContent(): Promise<ContentConfig> {
    if (!GITHUB_CONFIG.token) {
      console.warn('GitHub token not configured, using default content');
      return defaultContent;
    }

    return await this.fetchFromGitHub();
  }

  static async updateContent(updates: Partial<ContentConfig>): Promise<ContentConfig> {
    if (!GITHUB_CONFIG.token) {
      console.error('GitHub token not configured');
      throw new Error('GitHub integration not configured');
    }

    try {
      const currentContent = await this.loadContent();
      const newContent = this.deepMerge(currentContent, updates);
      
      // Get current SHA for the file
      const currentSha = await this.getCurrentSha();
      
      // Save to GitHub
      const success = await this.saveToGitHub(newContent, currentSha);
      
      if (!success) {
        throw new Error('Failed to save content to GitHub');
      }
      
      return newContent;
    } catch (error) {
      console.error('Error updating content:', error);
      throw new Error('Failed to update content');
    }
  }

  private static deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }
}