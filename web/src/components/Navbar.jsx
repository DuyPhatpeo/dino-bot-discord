import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
const logo = "/logo.png";
import { BOT_LINKS } from "../data/botData";

const NAV_LINKS = [
  { name: "Trang Chủ", path: "/" },
  { name: "Tính Năng", path: "/features" },
  { name: "Lệnh Bot", path: "/commands" },
  { name: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-[#171a21]/90 border-b border-[#2b3042] shadow-lg shadow-black/25"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left: Logo & Brand */}
        <Link
          to="/"
          onClick={handleScrollToTop}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <img
            src={logo}
            alt="DinoBot Logo"
            className="w-11 h-11 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            Dino<span className="text-emerald-400">Bot</span>
          </span>
        </Link>

        {/* Right: Desktop Navigation Links (All aligned to right, text-only, no buttons - Jockie Music Style) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => {
                if (link.path === "/") {
                  handleScrollToTop();
                }
              }}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-emerald-400"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* External Support link text */}
          <a
            href={BOT_LINKS.support}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors duration-200"
          >
            Hỗ Trợ
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#202430] border border-[#2e3448] text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[#2b3042] bg-[#171a21]/95 backdrop-blur-xl px-6 py-5 space-y-2"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.path === "/") {
                    handleScrollToTop();
                  }
                }}
                className={({ isActive }) =>
                  `block font-bold text-base py-2.5 px-2 transition-colors ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <a
              href={BOT_LINKS.support}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-bold text-base py-2.5 px-2 text-slate-300 hover:text-white transition-colors"
            >
              Hỗ Trợ (Discord)
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
