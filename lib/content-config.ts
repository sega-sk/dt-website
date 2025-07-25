export interface ContentConfig {
  // Site-wide settings
  site: {
    title: string;
    description: string;
    logo: string;
    favicon: string;
  };
  
  // Header/Navigation
  header: {
    logo: string;
  };
  
  // Hero Section
  hero: {
    title: string;
    highlightedWord: string;
    subtitle: string;
    description: string;
    videoSrc: string;
    videoPoster: string;
  };
  
  // AI Search Section
  aiSearch: {
    title: string;
    highlightedText: string;
    subtitle: string;
    description: string;
    videoSrc: string;
    videoPoster: string;
  };
  
  // Lightning Fast Section
  lightningFast: {
    title: string;
    highlightedWord: string;
    subtitle: string;
    description: string;
    videoSrc: string;
    videoPoster: string;
  };
  
  // SRP Customizer Section
  srpCustomizer: {
    title: string;
    subtitle: string;
    description: string;
    videoSrc: string;
    videoPoster: string;
  };

  // Contact Section
  contact: {
    title: string;
    highlightedText: string;
    subtitle: string;
    buttonText: string;
  };

  // Footer Section
  footer: {
    copyrightText: string;
    address: string;
  };

  // Legal Pages
  legal: {
    privacy: {
      title: string;
      lastUpdated: string;
      content: string;
    };
    terms: {
      title: string;
      lastUpdated: string;
      content: string;
    };
    cookies: {
      title: string;
      lastUpdated: string;
      content: string;
    };
  };
}

export const defaultContent: ContentConfig = {
  site: {
    title: 'DealerTower - Websites Built for Car Shoppers',
    description: 'Top-notch car dealership pages, endless logo apps, and talented designers. Our platform gives dealers control back, delivering the exact experience they want.',
    logo: '/logo.svg',
    favicon: '/favicon.ico',
  },
  header: {
    logo: '/dealertower-logo.svg',
  },
  hero: {
    title: 'Websites Built for',
    highlightedWord: 'Car Shoppers',
    subtitle: 'Top-notch car dealership pages, endless logo apps, and talented designers.',
    description: 'Our platform gives dealers control back, delivering the exact experience they want while our experienced buyers actively work the biggest in today\'s digital world.',
    videoSrc: '/videos/hero-demo.webm',
    videoPoster: '/images/posters/hero-demo-poster.webp',
  },
  aiSearch: {
    title: 'Advanced',
    highlightedText: 'AI Search',
    subtitle: 'Smart inventory search powered by artificial intelligence',
    description: 'Our AI-powered search helps customers find exactly what they\'re looking for with natural language queries and intelligent filtering.',
    videoSrc: '/videos/ai-search-demo.webm',
    videoPoster: '/images/posters/ai-search-demo-poster.webp',
  },
  lightningFast: {
    title: 'Lightning',
    highlightedWord: 'Fast',
    subtitle: 'Optimized for speed and performance',
    description: 'Built with cutting-edge technology to deliver blazing fast load times and smooth user experiences across all devices.',
    videoSrc: '/videos/performance-demo.webm',
    videoPoster: '/images/posters/performance-demo-poster.webp',
  },
  srpCustomizer: {
    title: 'SRP Customizer',
    subtitle: 'Customize your search results page',
    description: 'Powerful tools to customize and optimize your search results page for better user engagement and conversion rates.',
    videoSrc: '/videos/srp-customizer-demo.webm',
    videoPoster: '/images/posters/srp-customizer-demo-poster.webp',
  },
  contact: {
    title: 'Experience',
    highlightedText: 'the Platform',
    subtitle: 'Experience the Platform',
    buttonText: 'Contact Us',
  },
  
  footer: {
    copyrightText: '© 2024 Dealertower. All rights reserved.',
    address: '12725 SW Millikan Way, Suite 300, Beaverton OR 97005',
  },
  
  legal: {
    privacy: {
      title: 'Privacy Notice',
      lastUpdated: 'May 31, 2025',
      content: 'Welcome to Dealertower. We respect your privacy and are committed to protecting your personal data...',
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'May 31, 2025',
      content: 'These terms and conditions govern your use of this website...',
    },
    cookies: {
      title: 'Cookie Policy',
      lastUpdated: 'May 31, 2025',
      content: 'As is common practice with almost all professional websites, this site uses cookies...',
    },
  },
};

export const CONTENT_KEY = 'site-content';
