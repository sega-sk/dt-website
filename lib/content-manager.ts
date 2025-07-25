import { get, getAll } from '@vercel/edge-config';
import { defaultContent, ContentConfig } from './content-config';

const CONTENT_KEY = 'site-content';

export class ContentManager {
  static async loadContent(): Promise<ContentConfig> {
    try {
      // Check if Edge Config is available in production
      if (!process.env.EDGE_CONFIG && process.env.NODE_ENV === 'production') {
        console.warn('EDGE_CONFIG environment variable not found in production, using default content');
        return defaultContent;
      }

      // In development, use default content if no Edge Config
      if (!process.env.EDGE_CONFIG && process.env.NODE_ENV === 'development') {
        console.warn('EDGE_CONFIG environment variable not found in development, using default content');
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
      const currentContent = await this.loadContent();
      const newContent = this.deepMerge(currentContent, updates);
      
      // Check if we're in production and have the required environment variables
      const isProduction = process.env.NODE_ENV === 'production';
      const hasEdgeConfig = !!(process.env.EDGE_CONFIG_ID && process.env.VERCEL_API_TOKEN);
      
      if (!hasEdgeConfig) {
        if (isProduction) {
          console.error('Missing Edge Config credentials in production');
          throw new Error('Edge Config not properly configured for production environment');
        } else {
          console.warn('Development mode: Content changes will not persist without Edge Config setup');
          return newContent;
        }
      }
      
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
      throw new Error(`Failed to update content: ${error instanceof Error ? error.message : 'Unknown error'}`);
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