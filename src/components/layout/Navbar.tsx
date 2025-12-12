"use client";

import { Search, Github, Contrast } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App Name */}
          <div className="shrink-0">
            <a
              href="/"
              className="text-xl text-gray-700 hover:text-gray-900 transition-colors"
            >
              Blog
            </a>
          </div>

          {/* Right Side: Search, About, Github */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <Contrast className="w-5 h-5 text-gray-700 hover:text-gray-900" />

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* About Link */}
            <a
              href="/about"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </a>

            {/* Github Icon */}
          </div>
        </div>
      </div>
    </nav>
  );
}
