import { useContext } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function Layout({ children }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"
            : "bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"
        }`}
      ></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-1/2 -left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse transition-colors duration-300 ${
            darkMode ? "bg-purple-500/5" : "bg-purple-300/10"
          }`}
        ></div>
        <div
          className={`absolute -bottom-1/2 -right-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse transition-colors duration-300 ${
            darkMode ? "bg-pink-500/5" : "bg-pink-300/10"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
