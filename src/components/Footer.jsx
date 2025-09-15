export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8"></div>

      <div className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            {/* Main attribution */}
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <span>Created by</span>
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Tugssaikhan
              </span>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>React</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span>Vite</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span>TailwindCSS</span>
              </div>
            </div>

            {/* API attribution */}
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-gray-400 text-sm">
                Movie data powered by{" "}
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                >
                  <span>TMDB API</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </p>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500 pt-2">
              © {new Date().getFullYear()} Movie App. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
