import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FEATURE_MODULES, BOT_LINKS } from "../data/botData";
import {
  ShieldAlert,
  Gamepad2,
  Sparkles,
  UserCheck,
  Wrench,
  Coins,
  Music,
  ArrowRight,
  UserPlus,
} from "lucide-react";

const iconMap = {
  ShieldAlert,
  Gamepad2,
  Sparkles,
  UserCheck,
  Wrench,
  Coins,
  Music,
};

const FeaturesPage = () => {
  return (
    <div className="pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 block">
            Tính Năng & Tiện Ích
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Mọi Công Cụ Cho Máy Chủ Của Bạn
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            DinoBot tích hợp sẵn các module quản trị, trò chơi nút bấm và tiện ích cộng đồng mà không cần cài đặt nhiều bot phức tạp.
          </p>
        </div>

        {/* Deep Dive Feature Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {FEATURE_MODULES.map((module, idx) => {
            const IconComponent = iconMap[module.iconName] || Sparkles;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="p-7 rounded-3xl bg-[#202430] border border-[#2b3040] hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/20"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      SẴN SÀNG
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3">
                    {module.title}
                  </h2>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {module.desc}
                  </p>

                  <div className="pt-4 border-t border-[#2b3040]">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                      Chi tiết bao gồm:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {module.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Next Steps: Link to Commands & Add to Discord */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#202430] to-[#1a1d26] border border-[#2b3040] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left mb-12 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Xem toàn bộ cú pháp lệnh
            </h3>
            <p className="text-slate-400 text-sm">
              Tìm kiếm và sao chép nhanh hơn 15+ lệnh của DinoBot.
            </p>
          </div>

          <div className="flex items-center gap-3.5 flex-shrink-0">
            <Link
              to="/commands"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#171a21] border border-[#2b3040] hover:border-emerald-500/40 text-white text-sm font-semibold transition"
            >
              <span>Tra cứu lệnh</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>

            <a
              href={BOT_LINKS.invite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-sm font-bold shadow-md hover:scale-105 transition"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              <span>Thêm Bot</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
