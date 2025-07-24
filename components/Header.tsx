"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useMobileNav } from "@/hooks/use-mobile-nav";

function MobileNav({ isOpen, overlayRef, headerHeightClass, children }: { isOpen: boolean; overlayRef: React.RefObject<HTMLDivElement>; headerHeightClass: string; children: React.ReactNode }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={`fixed left-0 right-0 z-[9999] bg-white backdrop-blur-md flex flex-col py-8 px-6 overflow-y-auto pointer-events-auto ${headerHeightClass}`}
      style={{ top: undefined, bottom: 0 }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {children}
    </div>,
    document.body
  );
}

export default function Header() {
  const { isOpen, toggle, overlayRef } = useMobileNav();

  const headerHeightClass = "top-14 sm:top-16";

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Left Group */}
          <div className="flex items-center space-x-4 sm:space-x-8 lg:space-x-12">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img src="/dealertower-logo.svg" alt="DealerTower Logo" className="h-10 w-auto" />
            </a>
          </div>

          {/* Centered Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center items-center space-x-6 xl:space-x-8">
            <a href="/" className="font-poppins text-[15.8px] font-normal text-black leading-[20.8px] whitespace-nowrap hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="/support" className="font-poppins text-[15.8px] font-normal text-black leading-[20.8px] whitespace-nowrap hover:text-blue-600 transition-colors">
              Support
            </a>
            <a href="#" className="font-poppins text-[15.8px] font-normal text-black leading-[20.8px] whitespace-nowrap hover:text-blue-600 transition-colors">
              About Us
            </a>
          </nav>

          {/* Right Group */}
          <div className="flex items-center space-x-2">
            {/* CTA Button (visible sm and up) */}
            <div className="hidden sm:block">
              <Button className="font-poppins text-[15px] font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all px-6 py-2 rounded-[20px] shadow-lg">
                Book a Demo
              </Button>
            </div>
            {/* Hamburger (visible up to lg) */}
            <div className="lg:hidden">
              <button
                onClick={toggle}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Full Screen Mobile Navigation Overlay via Portal, below header */}
      <MobileNav isOpen={isOpen} overlayRef={overlayRef} headerHeightClass={headerHeightClass}>
        <nav className="flex flex-col space-y-6 text-lg font-poppins">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-gray-50">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-gray-50">
            Support
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-gray-50">
            About Us
          </a>
          <Button className="font-poppins text-[18px] font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all w-fit mt-4 px-6 py-[10px] rounded-[18px] shadow-md">
            Book a Demo
          </Button>
        </nav>
      </MobileNav>
    </header>
  );
}