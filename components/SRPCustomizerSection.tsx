'use client';

import { useEffect, useState } from 'react';
import { ContentConfig, defaultContent } from '@/lib/content-config';

export default function SRPCustomizerSection() {
  const [content, setContent] = useState<ContentConfig['srpCustomizer']>(defaultContent.srpCustomizer);

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => setContent(data.srpCustomizer))
      .catch(() => {
        setContent(defaultContent.srpCustomizer);
      });
  }, []);

  return (
    <section className="py-12 sm:py-20 lg:py-24 xl:py-20 2xl:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-6 xl:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="font-poppins font-light text-gray-900 mb-6 text-4xl sm:text-5xl lg:text-[55.4px] lg:leading-[71.8px] tracking-tight max-w-xl mx-auto lg:mr-auto">
              {content.title}
            </h2>
            <div className="space-y-3 max-w-xl mx-auto lg:mr-auto">
              <div className="font-poppins text-base text-[#2563eb] font-medium">
                {content.subtitle}
              </div>
              <p className="font-poppins text-base sm:text-lg text-gray-700">
                {content.description}
              </p>
            </div>
          </div>

          {/* Video Content */}
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
                style={{ backgroundColor: '#f9f8ff' }}
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