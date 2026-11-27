import React from "react";
import { Link } from "react-router-dom";
const logo = "/logo.png";
import { BOT_LINKS } from "../data/botData";
import { Github, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[#2b3040] bg-[#12141a] text-slate-400 text-xs sm:text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 inline-flex cursor-pointer"
            >
              <img
                src={logo}
                alt="DinoBot Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-black text-white">
                Dino<span className="text-emerald-400">Bot</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Bot Discord hỗ trợ quản trị, trò chơi nút bấm và tiện ích máy chủ.
            </p>
          </div>

          {/* Navigation Pages */}
          <div>
            <h4 className="text-white font-bold text-xs mb-3 tracking-wider uppercase">
              Các Trang
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-emerald-400 transition">
                  Tính Năng
                </Link>
              </li>
              <li>
                <Link to="/commands" className="hover:text-emerald-400 transition">
                  Lệnh Bot
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition">
                  Hỏi Đáp
                </Link>
              </li>
            </ul>
          </div>

          {/* Features direct links */}
          <div>
            <h4 className="text-white font-bold text-xs mb-3 tracking-wider uppercase">
              Tính Năng
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/features" className="hover:text-emerald-400 transition">
                  Kiểm Duyệt Server
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-emerald-400 transition">
                  Oẳn Tù Tì
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-emerald-400 transition">
                  Giveaway Tự Động
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-emerald-400 transition">
                  Quản Lý Role
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="text-white font-bold text-xs mb-3 tracking-wider uppercase">
              Liên Hệ
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={BOT_LINKS.support}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Discord Hỗ Trợ</span>
                </a>
              </li>
              <li>
                <a
                  href={BOT_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
                >
                  <Github className="w-4 h-4 text-emerald-400" />
                  <span>Mã Nguồn GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} DinoBot. Phát triển bởi DuyPhat.
          </p>

          <p className="text-[11px] text-slate-600">
            Dự án độc lập, không liên kết chính thức với Discord Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
