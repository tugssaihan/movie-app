import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { WatchlistContext } from "../context/WatchlistContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import Layout from "../components/Layout.jsx";
import toast from "react-hot-toast";

export default function MovieDetails() {
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(WatchlistContext);

  // Check if already in watchlist
  const inWatchlist = watchlist.some((m) => m.id === parseInt(id));

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&append_to_response=credits`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movie details");
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setError("Failed to load movie details. Please try again.");
        setLoading(false);
      });
  }, [id]);

  // Handle toggle watchlist
  const handleToggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
      toast.error("Removed from watchlist");
    } else {
      addToWatchlist(movie);
      toast.success("Added to watchlist");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Release date unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div
              className={`w-16 h-16 border-4 rounded-full animate-spin ${
                darkMode
                  ? "border-purple-500/30 border-t-purple-500"
                  : "border-purple-300/30 border-t-purple-600"
              }`}
            ></div>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Loading movie details...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
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
            <div className="flex gap-3 justify-center">
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
              <Link
                to="/"
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  darkMode
                    ? "bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 hover:border-slate-500/50 text-white"
                    : "bg-white/80 hover:bg-gray-50/80 border border-gray-200/50 hover:border-gray-300/50 text-gray-900"
                }`}
              >
                Back to Movies
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Movie not found
  if (!movie) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                darkMode ? "bg-slate-700/50" : "bg-gray-100"
              }`}
            >
              <svg
                className={`w-12 h-12 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2
              className={`text-2xl font-bold mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Movie not found
            </h2>
            <p
              className={`mb-6 ${darkMode ? "text-gray-500" : "text-gray-600"}`}
            >
              The movie you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Movies
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm border font-medium transition-all duration-200 ${
              darkMode
                ? "bg-slate-800/80 hover:bg-slate-700/80 border-slate-600/50 hover:border-slate-500/50 text-white"
                : "bg-white/80 hover:bg-gray-50/80 border-gray-200/50 hover:border-gray-300/50 text-gray-900"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Movies
          </Link>
        </div>

        {/* Hero Section with Backdrop */}
        <div className="relative">
          {movie.backdrop_path && (
            <div className="absolute inset-0 h-96 rounded-3xl overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 ${
                  darkMode
                    ? "bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20"
                    : "bg-gradient-to-t from-white via-white/80 to-white/20"
                }`}
              ></div>
            </div>
          )}

          <div className="relative z-10 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="relative group">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            movie.title
                          )}&size=500&background=6366f1&color=white&bold=true`
                    }
                    alt={movie.title}
                    className="w-full rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10"></div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                    {movie.title}
                  </h1>

                  {/* Movie Meta Info */}
                  <div
                    className={`flex flex-wrap items-center gap-4 mb-6 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-yellow-400">
                        {movie.vote_average?.toFixed(1) || "N/A"}
                      </span>
                      <span
                        className={darkMode ? "text-gray-400" : "text-gray-500"}
                      >
                        / 10
                      </span>
                    </span>

                    {movie.runtime && (
                      <span className="flex items-center gap-1">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {formatRuntime(movie.runtime)}
                      </span>
                    )}

                    <span className="flex items-center gap-1">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(movie.release_date)}
                    </span>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className={`px-3 py-1 rounded-full backdrop-blur-sm border text-sm font-medium ${
                          darkMode
                            ? "bg-slate-700/80 border-slate-600/50 text-gray-300"
                            : "bg-white/80 border-gray-200/50 text-gray-700"
                        }`}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Overview */}
                <div className="space-y-4">
                  <h2
                    className={`text-xl font-semibold ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Overview
                  </h2>
                  <p
                    className={`leading-relaxed text-lg ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {movie.overview || "No overview available."}
                  </p>
                </div>

                {/* Watchlist Button */}
                <button
                  onClick={handleToggleWatchlist}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    inWatchlist
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/25 text-white"
                      : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-purple-500/25 text-white"
                  }`}
                >
                  {inWatchlist ? (
                    <>
                      <svg
                        className="w-5 h-5"
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
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add to Watchlist
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Top Cast
          </h2>

          {movie.credits?.cast?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movie.credits.cast.slice(0, 12).map((actor) => (
                <div
                  key={actor.id}
                  className={`group rounded-2xl overflow-hidden border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                      : "bg-white/50 border-gray-200/50 hover:border-gray-300/50"
                  }`}
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              actor.name
                            )}&size=300&background=6366f1&color=white&bold=true`
                      }
                      alt={actor.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4">
                    <h3
                      className={`font-semibold text-sm leading-tight mb-1 group-hover:text-purple-400 transition-colors ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {actor.name}
                    </h3>
                    <p
                      className={`text-xs leading-tight ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? "bg-slate-700/50" : "bg-gray-100"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                No cast information available.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
