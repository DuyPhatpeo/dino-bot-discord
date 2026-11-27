import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import CommandsPage from "./pages/CommandsPage";
import FaqPage from "./pages/FaqPage";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#171a21] mee6-ambient-bg text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans flex flex-col justify-between overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
