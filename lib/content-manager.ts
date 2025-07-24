import { promises as fs } from 'fs';
import path from 'path';
import { ContentConfig, defaultContent } from './content-config';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'content-data.json');

export class ContentManager {
  static async loadContent(): Promise<ContentConfig> {
    try {
      const fileExists = await fs.access(CONTENT_FILE_PATH).then(() => true).catch(() => false);
      
      if (!fileExists) {
        // Create file with default content if it doesn't exist
        await this.saveContent(defaultContent);
        return defaultContent;
      }
      
      const fileContent = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
      const parsedContent = JSON.parse(fileContent);
      
      // Merge with default content to ensure all fields exist
      return this.mergeWithDefaults(parsedContent, defaultContent);
    } catch (error) {
      console.error('Error loading content:', error);
      return defaultContent;
    }
  }
  
  static async saveContent(content: ContentConfig): Promise<void> {
    try {
      await fs.writeFile(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving content:', error);
      throw new Error('Failed to save content');
    }
  }
  
  private static mergeWithDefaults(current: any, defaults: any): any {
    const result = { ...defaults };
    
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        if (typeof current[key] === 'object' && current[key] !== null && !Array.isArray(current[key])) {
          result[key] = this.mergeWithDefaults(current[key], defaults[key] || {});
        } else {
          result[key] = current[key];
        }
      }
    }
    
    return result;
  }
  
  static async updateContent(updates: Partial<ContentConfig>): Promise<ContentConfig> {
    const currentContent = await this.loadContent();
    const updatedContent = this.deepMerge(currentContent, updates);
    await this.saveContent(updatedContent);
    return updatedContent;
  }
  
  private static deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
          result[key] = this.deepMerge(target[key] || {}, source[key]);
        } else {
          result[key] = source[key];
        }
      }
    }
    
    return result;
  }
}
