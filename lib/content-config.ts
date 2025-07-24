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
    navigationItems: Array<{
      label: string;
      href: string;
    }>;
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
    logo: '/logo.svg',
    navigationItems: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/#features' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  hero: {
    title: 'Websites Built for',
    highlightedWord: 'Car Shoppers',
    subtitle: 'AI-Powered Search That Actually Works',
    description: 'Top-notch car dealership pages, endless logo apps, and talented designers. Our platform gives dealers control back, delivering the exact experience they want while our experienced buyers actively work the biggest in today\'s digital world.',
    videoSrc: '/videos/hero-demo.webm',
    videoPoster: '/images/posters/hero-demo-poster.webp',
  },
  aiSearch: {
    title: 'AI Search That',
    highlightedText: 'Actually Works',
    subtitle: 'Advanced search algorithms that understand natural language and deliver precise results for car shoppers.',
    description: 'Our AI-powered search engine goes beyond basic filters. It understands what customers really want and matches them with the perfect vehicles in your inventory.',
    videoSrc: '/videos/ai-search-demo.webm',
    videoPoster: '/images/posters/ai-search-demo-poster.webp',
  },
  lightningFast: {
    title: 'Lightning',
    highlightedWord: 'Fast',
    subtitle: 'Performance That Converts',
    description: 'Every millisecond counts in automotive retail. Our platform is optimized for speed, delivering instant search results and seamless browsing experiences that keep customers engaged and convert more leads into sales.',
    videoSrc: '/videos/performance-demo.webm',
    videoPoster: '/images/posters/performance-demo-poster.webp',
  },
  srpCustomizer: {
    title: 'SRP Customizer',
    subtitle: 'Your Brand, Your Way',
    description: 'Complete control over your search results page design. Customize layouts, colors, branding, and functionality to match your dealership\'s unique identity and business needs.',
    videoSrc: '/videos/srp-customizer-demo.webm',
    videoPoster: '/images/posters/srp-customizer-demo-poster.webp',
  },
  contact: {
    title: 'Ready to',
    highlightedText: 'Get Started?',
    subtitle: 'Let\'s build something amazing together',
    buttonText: 'Contact Us Today',
  },
  footer: {
    copyrightText: '© 2024 DealerTower. All rights reserved.',
    address: '12725 SW Millikan Way, Suite 300, Beaverton OR 97005',
  },
  legal: {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: December 2024',
      content: 'This Privacy Policy describes how DealerTower collects, uses, and protects your information when you use our services.',
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: December 2024',
      content: 'These Terms of Service govern your use of DealerTower\'s website and services.',
    },
    cookies: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: December 2024',
      content: 'This Cookie Policy explains how DealerTower uses cookies and similar technologies.',
    },
  },
};
      phone: { label: 'Phone*', placeholder: 'Enter your phone', required: true },
      comments: { label: 'Comments', placeholder: 'Tell us about your project or ask any questions...', required: false },
    },
  },
  
  footer: {
    links: [
      { label: 'Support', href: '/support' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
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
    support: {
      title: 'Support',
      description: 'Get help with your DealerTower account and services.',
    },
  },
};
