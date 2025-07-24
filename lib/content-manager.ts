import { get, getAll } from '@vercel/edge-config';
import { defaultContent, ContentConfig } from './content-config';

const CONTENT_KEY = 'site-content';

export class ContentManager {
  static async loadContent(): Promise<ContentConfig> {
    try {
      // Check if Edge Config is available
      if (!process.env.EDGE_CONFIG) {
        console.warn('EDGE_CONFIG environment variable not found, using default content');
        return defaultContent;
      }

      // Try to load from Vercel Edge Config
      const savedContent = await get<ContentConfig>(CONTENT_KEY);
      
      if (savedContent) {
        // Merge with default content to ensure all fields are present
        return this.deepMerge(defaultContent, savedContent);
      }
      
      // Return default content if nothing is saved
      return defaultContent;
    } catch (error) {
      console.error('Error loading content from Edge Config:', error);
      // Fallback to default content if Edge Config fails
      return defaultContent;
    }
  }

  static async updateContent(updates: Partial<ContentConfig>): Promise<ContentConfig> {
    try {
      // Check if required environment variables are available
      if (!process.env.EDGE_CONFIG_ID || !process.env.VERCEL_API_TOKEN) {
        console.error('Missing required environment variables:', {
          EDGE_CONFIG_ID: !!process.env.EDGE_CONFIG_ID,
          VERCEL_API_TOKEN: !!process.env.VERCEL_API_TOKEN,
        });
        throw new Error('Edge Config not properly configured. Missing environment variables.');
      }

      const currentContent = await this.loadContent();
      const newContent = this.deepMerge(currentContent, updates);
      
      // Make API call to update Edge Config
      const response = await fetch('/api/admin/edge-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'upsert',
              key: CONTENT_KEY,
              value: newContent,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Edge Config API response:', response.status, errorText);
        throw new Error(`Failed to update Edge Config: ${response.status} ${errorText}`);
      }
      
      return newContent;
    } catch (error) {
      console.error('Error updating content in Edge Config:', error);
      throw new Error(`Failed to update content: ${error.message}`);
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