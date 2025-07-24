import { Search, Sparkles } from "lucide-react";

export default function AISearchSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 xl:py-20 2xl:py-24" style={{ backgroundColor: '#f9f8ff' }}>
      <div className="max-w-7xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-6 xl:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content - Visual */}
          <div className="flex justify-center w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white w-full max-w-xl md:max-w-2xl lg:max-w-3xl min-w-0">
              <video
                src="/videos/ai-search-demo.webm"
                poster="/images/posters/ai-search-demo-poster.webp"
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

          {/* Right Content - Text */}
          <div className="text-center lg:text-right">
            <h2 className="font-poppins font-light text-gray-900 mb-6 text-4xl sm:text-5xl lg:text-[55.4px] lg:leading-[71.8px] tracking-tight max-w-xl mx-auto lg:ml-auto">
              Built to Win <span className="font-bold text-[#5B4FFF]">AI Search</span>
            </h2>
            <div className="space-y-3 max-w-xl mx-auto lg:ml-auto">
              <div className="font-poppins text-base text-[#2563eb] font-medium">
                We don’t just follow SEO trends we anticipate them.
              </div>
              <p className="font-poppins text-base sm:text-lg text-gray-700">
                Our platform is purpose-built for the future of search, ranking your site where it matters most: at the top of AI-generated results on ChatGPT, Gemini, and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}