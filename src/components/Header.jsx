import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { WatchlistContext } from "../context/WatchlistContext.jsx";

export default function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { watchlist } = useContext(WatchlistContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        darkMode
          ? "bg-slate-900/95 border-slate-700/50"
          : "bg-white/95 border-gray-200/50"
      } backdrop-blur-md border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 text-2xl font-bold"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
              <span className="text-white text-lg">🎬</span>
            </div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-200">
              Find Movies
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Home Button (when not on home page) */}
            {!isActive("/") && (
              <Link
                to="/"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm border font-medium transition-all duration-200 shadow-lg ${
                  darkMode
                    ? "bg-slate-800/80 hover:bg-slate-700/80 border-slate-600/50 hover:border-slate-500/50 text-white hover:shadow-purple-500/20"
                    : "bg-white/80 hover:bg-gray-50/80 border-gray-200/50 hover:border-gray-300/50 text-gray-900 hover:shadow-purple-500/10"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-sm">Home</span>
              </Link>
            )}

            {/* Watchlist Button */}
            <Link
              to="/watchlist"
              className={`relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm border font-medium transition-all duration-200 shadow-lg ${
                isActive("/watchlist")
                  ? darkMode
                    ? "bg-purple-600/20 border-purple-500/50 text-purple-300"
                    : "bg-purple-100/80 border-purple-300/50 text-purple-700"
                  : darkMode
                  ? "bg-slate-800/80 hover:bg-slate-700/80 border-slate-600/50 hover:border-slate-500/50 text-white hover:shadow-purple-500/20"
                  : "bg-white/80 hover:bg-gray-50/80 border-gray-200/50 hover:border-gray-300/50 text-gray-900 hover:shadow-purple-500/10"
              }`}
            >
              <div className="relative">
                <svg
                  className={`w-5 h-5 transition-colors ${
                    isActive("/watchlist")
                      ? "text-purple-400"
                      : darkMode
                      ? "text-purple-400 group-hover:text-purple-300"
                      : "text-purple-500 group-hover:text-purple-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                {watchlist.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">
                      {watchlist.length > 99 ? "99+" : watchlist.length}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm">Watchlist</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`group w-10 h-10 rounded-xl backdrop-blur-sm border flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 ${
                darkMode
                  ? "bg-slate-800/80 hover:bg-slate-700/80 border-slate-600/50 hover:border-slate-500/50 hover:shadow-blue-500/20"
                  : "bg-white/80 hover:bg-gray-50/80 border-gray-200/50 hover:border-gray-300/50 hover:shadow-blue-500/10"
              }`}
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
