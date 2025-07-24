import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { defaultContent, ContentConfig } from './content-config';

const CONTENT_FILE_PATH = join(process.cwd(), 'content.json');

export class ContentManager {
  static async loadContent(): Promise<ContentConfig> {
    try {
      const fileContent = await readFile(CONTENT_FILE_PATH, 'utf-8');
      const savedContent = JSON.parse(fileContent);
      // Merge with default content to ensure all fields are present
      return { ...defaultContent, ...savedContent };
    } catch (error) {
      // Return default content if file doesn't exist or can't be read
      return defaultContent;
    }
  }

  static async updateContent(updates: Partial<ContentConfig>): Promise<ContentConfig> {
    try {
      const currentContent = await this.loadContent();
      const newContent = this.deepMerge(currentContent, updates);
      
      await writeFile(CONTENT_FILE_PATH, JSON.stringify(newContent, null, 2));
      return newContent;
    } catch (error) {
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