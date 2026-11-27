import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA, BOT_LINKS } from "../data/botData";
import { ChevronDown, MessageSquare } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
            Hỏi & Đáp
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Câu Hỏi <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Thường Gặp</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Những thông tin cần biết trước khi đưa DinoBot vào máy chủ của bạn.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-md ${
                  isOpen
                    ? "bg-[#202430] border-emerald-500/40 shadow-emerald-950/20"
                    : "bg-[#202430] border-[#2b3040] hover:border-[#3a4055]"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "text-emerald-400 rotate-180 bg-emerald-500/10"
                        : "text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-[#2b3040]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support helper */}
        <div className="mt-8 p-6 rounded-3xl bg-[#202430] border border-[#2b3040] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
          <p className="text-slate-300 text-xs sm:text-sm">
            Cần hỗ trợ thêm về bot? Tham gia máy chủ Discord để được hỗ trợ nhanh nhất.
          </p>
          <a
            href={BOT_LINKS.support}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#171a21] hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-[#2b3040] text-xs font-bold flex items-center gap-2 transition flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tham Gia Hỗ Trợ</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Faq;
