'use client';

import { useEffect, useState } from 'react';
import { ContentConfig, defaultContent } from '@/lib/content-config';

export default function HeroSection() {
  const [content, setContent] = useState<ContentConfig['hero']>(defaultContent.hero);

  useEffect(() => {
    // Try to load from API, fall back to default content
    fetch('/api/content')
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => setContent(data.hero))
      .catch(() => {
        // Use default content if API fails
        setContent(defaultContent.hero);
      });
  }, []);

  return (
    <section className="py-12 sm:py-20 lg:py-24 xl:py-32 2xl:py-40 bg-white">
      <div className="max-w-7xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-6 xl:px-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left mt-8 lg:mt-0">
            <h1 className="font-poppins font-light text-gray-900 mb-6 text-4xl sm:text-5xl lg:text-[55.4px] lg:leading-[71.8px] tracking-tight max-w-xl mx-auto lg:mx-0">
              {content.title} <span className="font-bold animated-gradient-text">{content.highlightedWord}</span> {content.subtitle}
            </h1>
            <p className="font-poppins mt-4 text-base sm:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
              {content.description}
            </p>
          </div>

          {/* Right Content - Website Preview */}
          <div className="flex justify-center w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white w-full max-w-xl md:max-w-2xl lg:max-w-3xl min-w-0">
              <video
                src={content.videoSrc}
                poster={content.videoPoster}
                width={1280}
                height={720}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-2xl aspect-[16/9] lg:aspect-[16/10] max-h-[480px]"
              >
                Sorry, your browser does not support embedded videos.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}