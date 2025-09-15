import { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const stored = localStorage.getItem("watchlist");
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // localStorage-eesee data load hiih
  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing watchlist from localStorage:", error);
        setWatchlist([]);
      }
    }
  }, []);

  // watchlist uurchlugduh uyd localStorage-ruu hiih
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // kino watchlist-d nemeh
  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (!prev.find((m) => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  // kino watchlist-ees hasah
  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  // clear hiih
  const clearWatchlist = () => {
    setWatchlist([]);
  };

  // watchlist-d bgaag shalgah
  const isInWatchlist = (id) => {
    return watchlist.some((movie) => movie.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        clearWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
