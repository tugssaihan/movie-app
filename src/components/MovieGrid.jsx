import { Link } from "react-router-dom";
import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext.jsx";

export default function MovieGrid({ movies, loading }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(WatchlistContext);

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 animate-pulse"
          >
            <div className="aspect-[2/3] bg-slate-700/50"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-slate-700/50 rounded"></div>
              <div className="h-3 bg-slate-700/50 rounded w-3/4"></div>
              <div className="h-3 bg-slate-700/50 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-32 h-32 mb-8 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-full flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-2 16H8a2 2 0 01-2-2V6h12v12a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-300 mb-4">
          No movies found
        </h2>
        <p className="text-gray-500 text-center max-w-md">
          Try adjusting your search terms or filters to find what you're looking
          for
        </p>
      </div>
    );
  }

  // watchlist-d baigaag shalgah
  const isInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  // watchlist toggle hiih
  const handleWatchlistToggle = (movie, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  // Movie grid
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="group relative bg-slate-800/50 hover:bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50"
        >
          {/* Watchlist button */}
          <button
            onClick={(e) => handleWatchlistToggle(movie, e)}
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm ${
              isInWatchlist(movie.id)
                ? "bg-green-500/90 hover:bg-green-500 text-white"
                : "bg-purple-500/90 hover:bg-purple-500 text-white"
            }`}
            aria-label={`${
              isInWatchlist(movie.id) ? "Remove from" : "Add to"
            } watchlist`}
          >
            {isInWatchlist(movie.id) ? (
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
          </button>

          <Link to={`/movie/${movie.id}`} className="block">
            {/* Poster */}
            <div className="aspect-[2/3] relative overflow-hidden">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        movie.title
                      )}&size=500&background=6366f1&color=white&bold=true`
                }
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Rating badge */}
              {movie.vote_average > 0 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                  <svg
                    className="w-3 h-3 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-xs font-medium">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-2 group-hover:text-purple-300 transition-colors duration-200">
                {movie.title}
              </h2>

              <div className="space-y-1">
                {movie.release_date && (
                  <p className="text-gray-400 text-xs">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                )}

                {/* Popularity indicator */}
                <div className="flex items-center">
                  <div className="flex-1 bg-slate-700/50 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          (movie.popularity / 100) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">Popular</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
