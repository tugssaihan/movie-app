import { useState } from "react";

export default function Searchbar({ searchTerm, setSearchTerm }) {
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search container */}
      <div
        className={`relative transition-all duration-300 ${
          isFocused
            ? "transform scale-[1.02] shadow-2xl shadow-purple-500/20"
            : "shadow-lg"
        }`}
      >
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isFocused ? "text-purple-400" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input field */}
        <input
          type="text"
          placeholder="Search for movies, actors, or genres..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-800/80 backdrop-blur-sm border transition-all duration-200 text-white placeholder-gray-400 focus:outline-none ${
            isFocused
              ? "border-purple-500/50 ring-2 ring-purple-500/20 bg-slate-800/90"
              : "border-slate-600/50 hover:border-slate-500/50"
          }`}
        />

        {/* Clear button */}
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-6 h-6 bg-slate-600/80 hover:bg-slate-500/80 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Clear search"
          >
            <svg
              className="w-3 h-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search suggestions/hints */}
      {isFocused && !searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800/95 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-2xl z-20">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300 mb-3">
              Try searching for:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Marvel",
                "Action",
                "Comedy",
                "Horror",
                "Sci-Fi",
                "Drama",
                "Tom Hanks",
                "2024",
                "Top Rated",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchTerm(suggestion)}
                  className="px-3 py-1 rounded-full bg-slate-700/50 hover:bg-purple-500/30 text-gray-300 hover:text-purple-200 text-sm transition-all duration-200 border border-slate-600/30 hover:border-purple-500/50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search stats */}
      {searchTerm && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-400">
            Press Enter to search or continue typing...
          </p>
        </div>
      )}
    </div>
  );
}
