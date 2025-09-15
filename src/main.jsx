import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // development only
  <React.StrictMode>
    {/* context provider-uudaar wrap hiisneer child element-uud dotorh state,
    funktsuudad handah erhtei bolno */}
    <WatchlistProvider>
      <ThemeProvider>
        {/* client-side routing */}
        <BrowserRouter>
          <Routes>
            {/* page tus buriig todorhoilno */}
            <Route path="/" element={<App />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </BrowserRouter>
        {/* toast notification uzuuleh component */}
        <Toaster position="bottom-center" />
      </ThemeProvider>
    </WatchlistProvider>
  </React.StrictMode>
);
