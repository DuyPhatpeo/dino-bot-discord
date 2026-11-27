import React from "react";
import { motion } from "framer-motion";
import { BOT_LINKS } from "../data/botData";
const logo = "/logo.png";
import { UserPlus, LifeBuoy, Sparkles } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#202430] to-[#1a1d26] p-8 sm:p-14 text-center backdrop-blur-2xl shadow-2xl shadow-emerald-950/20 overflow-hidden"
        >
          {/* Logo */}
          <div className="mb-6">
            <img
              src={logo}
              alt="DinoBot Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Miễn Phí 100% Cho Mọi Máy Chủ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 max-w-2xl mx-auto leading-tight">
            Sẵn Sàng Nâng Cấp Máy Chủ Cùng{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              DinoBot
            </span>
            ?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            Thêm bot vào máy chủ của bạn chỉ trong 30 giây. Không cần cấu hình phức tạp, bắt đầu quản trị và giải trí ngay lập tức!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <a
              href={BOT_LINKS.invite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all"
            >
              <UserPlus className="w-5 h-5 text-slate-950" />
              <span>Thêm DinoBot Ngay</span>
            </a>

            <a
              href={BOT_LINKS.support}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#171a21] border border-[#2b3040] text-white hover:border-emerald-500/40 font-bold text-sm sm:text-base hover:scale-105 transition-all"
            >
              <LifeBuoy className="w-4 h-4 text-emerald-400" />
              <span>Máy Chủ Hỗ Trợ</span>
            </a>
          </div>

          {/* Guarantees */}
          <div className="text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
            <span className="text-slate-300 font-semibold">✓ Không yêu cầu thẻ tín dụng</span>
            <span>•</span>
            <span className="text-slate-300 font-semibold">✓ Cài đặt trong 30 giây</span>
            <span>•</span>
            <span className="text-slate-300 font-semibold">✓ Hỗ trợ 24/7 nhiệt tình</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
