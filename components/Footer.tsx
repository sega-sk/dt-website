import FooterLogo from "./FooterLogo";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-500 pt-6 pb-3 border-t border-t-gray-100 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center md:justify-end pt-2 pb-0">
          <a
            href="/login"
            className="h-10 px-5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center z-10 mb-4"
            style={{ minWidth: 0 }}
          >
            Customer Login
          </a>
        </div>
        <hr className="border-gray-200 mb-6" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-6 pt-2">
          {/* Left: Logo and Brand */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
            <FooterLogo className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-gray-900">Dealertower</span>
          </div>

          {/* Center/Right: Links */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6 w-full md:w-auto justify-between md:justify-end space-y-4 md:space-y-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 md:flex md:flex-row md:gap-x-4 md:gap-y-0 mb-2 md:mb-0 w-full max-w-xs md:max-w-none">
              <a href="/" className="hover:text-purple-600 transition-colors">Home</a>
              <a href="/support" className="hover:text-purple-600 transition-colors">Support</a>
              <a href="/privacy" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-purple-600 transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-purple-600 transition-colors col-span-2 md:col-span-1">Cookie Policy</a>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 text-center mt-6 w-full">
          © 2024 Dealertower. All rights reserved. 12725 SW Millikan Way, Suite 300, Beaverton OR 97005
        </div>
      </div>
    </footer>
  );
}