import React from "react";

export default function LightningFastSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 xl:py-20 2xl:py-24 bg-[#ebebff]">
      <div className="max-w-7xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-6 xl:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="font-poppins font-light text-gray-900 mb-6 text-4xl sm:text-5xl lg:text-[55.4px] lg:leading-[71.8px] tracking-tight max-w-xl mx-auto lg:mx-0">
              <span className="font-bold animated-gradient-text">Lightning Fast</span><br />Websites
            </h2>
            <p className="font-poppins mt-4 text-base sm:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
              No more waiting, no more frustration our websites load lightning fast so buyers can browse, compare, and buy without delay. DealerTower keeps your website running at peak performance, consistently outperforming our competitors in page-speed tests.
            </p>
          </div>

          {/* Right Content - Video */}
          <div className="flex justify-center w-full mt-8 lg:mt-0">
            <div className="relative overflow-hidden rounded-2xl bg-white w-full max-w-xl md:max-w-2xl lg:max-w-3xl min-w-0">
              <video
                src="/videos/performance-demo.webm"
                poster="/images/posters/performance-demo-poster.webp"
                width={1280}
                height={720}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-2xl aspect-[16/9] lg:aspect-[16/10] max-h-[480px]"
                style={{ backgroundColor: '#ebebff' }}
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