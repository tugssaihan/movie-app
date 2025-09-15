import { useState } from "react";

export default function Filters({
  genres,
  selectedGenres,
  setSelectedGenres,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
  sortBy,
  setSortBy,
}) {
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  // Toggle genre selection
  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedGenres([]);
    setStartYear("");
    setEndYear("");
    setSortBy("popularity.desc");
  };

  const currentYear = new Date().getFullYear();

  const sortOptions = [
    { value: "popularity.desc", label: "Most Popular", icon: "🔥" },
    { value: "vote_average.desc", label: "Highest Rated", icon: "⭐" },
    { value: "release_date.desc", label: "Latest Releases", icon: "🆕" },
    { value: "release_date.asc", label: "Classic Movies", icon: "📽️" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Genres Filter */}
      <div className="md:col-span-3">
        <div className="relative">
          <button
            onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
            className="w-full flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700/70 rounded-2xl border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Genres</h3>
                <p className="text-sm text-gray-400">
                  {selectedGenres.length === 0
                    ? "Select movie genres"
                    : `${selectedGenres.length} selected`}
                </p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isGenreDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isGenreDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800/95 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-2xl z-20 max-h-80 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {genres.map((genre) => (
                  <label
                    key={genre.id}
                    className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedGenres.includes(genre.id)
                        ? "bg-purple-500/30 border border-purple-500/50 text-purple-100"
                        : "bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 text-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre.id)}
                      onChange={() => toggleGenre(genre.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedGenres.includes(genre.id)
                          ? "bg-purple-500 border-purple-500"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedGenres.includes(genre.id) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium">{genre.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Year Range Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white">Release Year</h3>
            <p className="text-sm text-gray-400">Filter by year range</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              From
            </label>
            <input
              type="number"
              placeholder="1900"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              min="1900"
              max={currentYear}
              className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To
            </label>
            <input
              type="number"
              placeholder={currentYear.toString()}
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              min="1900"
              max={currentYear + 5}
              className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white">Sort By</h3>
            <p className="text-sm text-gray-400">Order movies by preference</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`flex items-center gap-3 p-4 rounded-xl font-medium transition-all duration-200 ${
                sortBy === option.value
                  ? "bg-gradient-to-r from-orange-500/30 to-pink-500/30 border border-orange-500/50 text-white shadow-lg"
                  : "bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 hover:border-slate-500/50 text-gray-300"
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="md:col-span-3 flex justify-center pt-4 border-t border-slate-700/50">
        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500/50 transition-all duration-200 font-medium"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
