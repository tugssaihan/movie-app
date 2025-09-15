import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { WatchlistContext } from "../context/WatchlistContext.jsx";
import toast from "react-hot-toast";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist, clearWatchlist } =
    useContext(WatchlistContext);

  const handleRemove = (id, title) => {
    removeFromWatchlist(id);
    toast.error(`Removed "${title}" from watchlist`);
  };

  const handleClearAll = () => {
    clearWatchlist();
    toast.error("Cleared entire watchlist");
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              My Watchlist
            </h1>
            <p className="text-gray-400 mt-2">
              {watchlist.length === 0
                ? "No movies saved yet"
                : `${watchlist.length} ${
                    watchlist.length === 1 ? "movie" : "movies"
                  } saved`}
            </p>
          </div>

          {watchlist.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={handleClearAll}
                className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500/50 transition-all duration-200 backdrop-blur-sm font-medium"
              >
                Clear All
              </button>
              <Link
                to="/"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-medium"
              >
                Add More Movies
              </Link>
            </div>
          )}
        </div>

        {/* Empty state */}
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-32 h-32 mb-8 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full flex items-center justify-center">
              <div className="text-6xl">🎬</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-300 mb-4">
              Your watchlist is empty
            </h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">
              Start building your movie collection by browsing and adding films
              you want to watch
            </p>
            <Link
              to="/"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-medium"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-slate-800/50 hover:bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50"
              >
                {/* Remove button */}
                <button
                  onClick={() => handleRemove(movie.id, movie.title)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500/90 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                  aria-label={`Remove ${movie.title} from watchlist`}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <Link to={`/movie/${movie.id}`} className="block">
                  {/* Poster */}
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h2 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-2 group-hover:text-purple-300 transition-colors duration-200">
                      {movie.title}
                    </h2>
                    {movie.release_date && (
                      <p className="text-gray-400 text-xs">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                    {movie.vote_average && (
                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          <svg
                            className="w-3 h-3 text-yellow-400 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-300 text-xs">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
