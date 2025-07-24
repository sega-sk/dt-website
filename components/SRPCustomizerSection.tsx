export default function SRPCustomizerSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 xl:py-20 2xl:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-6 xl:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content - Video */}
          <div className="flex justify-center w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white w-full max-w-xl md:max-w-2xl lg:max-w-3xl min-w-0 p-6">
              <video
                src="/videos/srp-customizer-demo.webm"
                poster="/images/posters/srp-customizer-demo-poster.webp"
                width={1280}
                height={720}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain rounded-2xl aspect-[16/9] lg:aspect-[16/10] max-h-[480px]"
              >
                Sorry, your browser does not support embedded videos.
              </video>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="text-center lg:text-left">
            <h2 className="font-poppins font-light text-gray-900 mb-6 text-4xl sm:text-5xl lg:text-[55.4px] lg:leading-[71.8px] tracking-tight max-w-xl mx-auto lg:mx-0">
              <span className="font-bold animated-gradient-text">SRP Customizer</span><br />+ Bulk Rules
            </h2>
            <p className="font-poppins mt-4 text-base sm:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
              Take full control of your inventory pages—no support tickets, no waiting. Our SRP customizer lets you instantly add, remove, or tweak CTAs, and apply bulk rules to update pricing rules & assets across vehicles using powerful filters. It’s flexibility you won’t find anywhere else.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}