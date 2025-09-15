import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext.jsx";

import Layout from "./components/Layout.jsx";
import Searchbar from "./components/Searchbar.jsx";
import Filters from "./components/Filters.jsx";
import MovieGrid from "./components/MovieGrid.jsx";

export default function App() {
  const { darkMode } = useContext(ThemeContext);
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  // Fetch genres list
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  // Fetch movies
  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = "";

    if (searchTerm.length > 2) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&query=${encodeURIComponent(searchTerm)}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&sort_by=${sortBy}`;
      if (selectedGenres.length > 0) {
        url += `&with_genres=${selectedGenres.join(",")}`;
      }
      if (startYear) url += `&primary_release_date.gte=${startYear}-01-01`;
      if (endYear) url += `&primary_release_date.lte=${endYear}-12-31`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again.");
        setLoading(false);
      });
  }, [searchTerm, selectedGenres, startYear, endYear, sortBy]);

  const getResultsText = () => {
    if (loading) return "Loading...";
    if (error) return "Error";
    if (searchTerm.length > 2) {
      const count = movies?.length || 0;
      return `Search Results ${count > 0 ? `(${count} movies)` : ""}`;
    }

    const filterCount =
      selectedGenres.length + (startYear ? 1 : 0) + (endYear ? 1 : 0);
    if (filterCount > 0) {
      const count = movies?.length || 0;
      return `Filtered Movies ${count > 0 ? `(${count} found)` : ""}`;
    }

    return "Discover Movies";
  };

  const clearAllFilters = () => {
    setSelectedGenres([]);
    setStartYear("");
    setEndYear("");
    setSortBy("popularity.desc");
    setSearchTerm("");
  };

  const hasActiveFilters =
    selectedGenres.length > 0 || startYear || endYear || searchTerm.length > 2;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Discover Movies
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore thousands of movies, create your watchlist, and never miss a
            great film again
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto">
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Filters Section */}
        <div
          className={`rounded-2xl border backdrop-blur-sm p-6 ${
            darkMode
              ? "bg-slate-800/30 border-slate-700/50"
              : "bg-white/30 border-gray-200/50"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3
              className={`text-lg font-semibold flex items-center gap-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </h3>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  darkMode
                    ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500/50"
                    : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300"
                }`}
              >
                Clear All Filters
              </button>
            )}
          </div>

          <Filters
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            startYear={startYear}
            setStartYear={setStartYear}
            endYear={endYear}
            setEndYear={setEndYear}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {getResultsText()}
          </h2>

          {searchTerm.length > 2 && (
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Searching for:{" "}
              <span className="text-purple-400 font-medium">
                "{searchTerm}"
              </span>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {selectedGenres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedGenres.map((genreId) => {
                  const genre = genres.find((g) => g.id === genreId);
                  return (
                    <span
                      key={genreId}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
                        darkMode
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          : "bg-purple-100 text-purple-700 border-purple-200"
                      }`}
                    >
                      {genre?.name}
                      <button
                        onClick={() =>
                          setSelectedGenres((prev) =>
                            prev.filter((id) => id !== genreId)
                          )
                        }
                        className={`ml-1 transition-colors ${
                          darkMode
                            ? "text-purple-400 hover:text-purple-200"
                            : "text-purple-600 hover:text-purple-800"
                        }`}
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            {startYear && (
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
                  darkMode
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    : "bg-blue-100 text-blue-700 border-blue-200"
                }`}
              >
                From: {startYear}
                <button
                  onClick={() => setStartYear("")}
                  className={`ml-1 transition-colors ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-200"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}

            {endYear && (
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
                  darkMode
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    : "bg-blue-100 text-blue-700 border-blue-200"
                }`}
              >
                To: {endYear}
                <button
                  onClick={() => setEndYear("")}
                  className={`ml-1 transition-colors ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-200"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className={`rounded-2xl p-8 text-center ${
              darkMode
                ? "bg-red-500/10 border border-red-500/20"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? "bg-red-500/20" : "bg-red-100"
              }`}
            >
              <svg
                className={`w-8 h-8 ${
                  darkMode ? "text-red-400" : "text-red-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3
              className={`text-lg font-semibold mb-2 ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              Something went wrong
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                darkMode
                  ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500/50"
                  : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300"
              }`}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Movies Grid */}
        {!error && <MovieGrid movies={movies} loading={loading} />}
      </div>
    </Layout>
  );
}
