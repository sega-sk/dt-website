import { get, getAll } from '@vercel/edge-config';
import { ContentConfig } from './content-config';

const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID;
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

export class ContentManager {
  static async loadContent(): Promise<ContentConfig> {
    try {
      // Try to get content from Edge Config
      const content = await get<ContentConfig>('site-content');
      
      if (content) {
        return content;
      }
      
      // If no content exists, return default content
      return this.getDefaultContent();
    } catch (error) {
      console.error('Error loading content from Vercel Edge Config:', error);
      // Fallback to default content
      return this.getDefaultContent();
    }
  }

  static async updateContent(updates: Partial<ContentConfig>): Promise<ContentConfig> {
    try {
      // Get current content
      const currentContent = await this.loadContent();
      
      // Merge updates with current content
      const updatedContent = { ...currentContent, ...updates };
      
      // Update Edge Config via Vercel API
      await this.updateEdgeConfig(updatedContent);
      
      return updatedContent;
    } catch (error) {
      console.error('Error updating content in Vercel Edge Config:', error);
      throw new Error('Failed to update content');
    }
  }

  private static async updateEdgeConfig(content: ContentConfig): Promise<void> {
    if (!EDGE_CONFIG_ID || !VERCEL_API_TOKEN) {
      throw new Error('Missing Vercel configuration');
    }

    const response = await fetch(`https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            operation: 'upsert',
            key: 'site-content',
            value: content,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update Edge Config: ${error}`);
    }
  }

  private static getDefaultContent(): ContentConfig {
    return {
      site: {
        title: "DealerTower - Websites Built for Car Shoppers",
        description: "Top-notch car dealership pages, endless logo apps, and talented designers.",
        logo: "/logo.svg",
        favicon: "/favicon.ico"
      },
      header: {
        logo: "/logo.svg"
      },
      hero: {
        title: "Websites Built for",
        highlightedWord: "Car Shoppers",
        subtitle: "Not Programmers",
        description: "Top-notch car dealership pages, endless logo apps, and talented designers. Our platform gives dealers control back, delivering the exact experience they want while our experienced buyers actively work the biggest in today's digital world.",
        videoSrc: "/videos/hero-demo.webm",
        videoPoster: "/images/posters/hero-demo-poster.webp"
      },
      aiSearch: {
        title: "Advanced",
        highlightedText: "AI Search",
        subtitle: "AI-powered search that understands natural language queries and provides instant, relevant results.",
        description: "Our advanced AI search technology transforms how customers find vehicles. Using natural language processing and machine learning, it understands complex queries like 'reliable family SUV under $30k' and instantly delivers precisely matching results. The system learns from user behavior to continuously improve accuracy and relevance.",
        videoSrc: "/videos/ai-search-demo.webm",
        videoPoster: "/images/posters/ai-search-poster.webp"
      },
      lightningFast: {
        title: "Lightning",
        highlightedWord: "Fast",
        subtitle: "Performance & Speed",
        description: "Experience blazing-fast load times and seamless performance across all devices. Our optimized infrastructure ensures your dealership website loads in under 2 seconds, providing customers with an instant, smooth browsing experience that keeps them engaged and drives conversions.",
        videoSrc: "/videos/speed-demo.webm",
        videoPoster: "/images/posters/speed-poster.webp"
      },
      srpCustomizer: {
        title: "SRP Customizer",
        subtitle: "Tailor Your Search Results",
        description: "Customize every aspect of your search results page to match your brand and customer preferences. From layout and filters to sorting options and display styles, create a unique search experience that guides customers to their perfect vehicle while showcasing your inventory in the best possible light.",
        videoSrc: "/videos/srp-demo.webm",
        videoPoster: "/images/posters/srp-poster.webp"
      },
      contact: {
        title: "Ready to Get",
        highlightedText: "Started",
        subtitle: "Transform your dealership's online presence today",
        buttonText: "Contact Us"
      },
      footer: {
        copyrightText: "© 2025 Dealertower. All rights reserved.",
        address: "12725 SW Millikan Way, Suite 300, Beaverton OR 97005"
      },
      legal: {
        privacy: {
          title: "Privacy Notice",
          lastUpdated: "May 31, 2025",
          content: "Welcome to Dealertower. We respect your privacy and are committed to protecting your personal data..."
        },
        terms: {
          title: "Dealertower Terms and Conditions",
          lastUpdated: "May 31, 2025",
          content: "These terms and conditions apply to the design, development, delivery, and hosting of a website..."
        },
        cookies: {
          title: "Cookie Policy",
          lastUpdated: "May 31, 2025",
          content: "As is common practice with almost all professional websites, this site uses cookies..."
        }
      }
    };
  }
}