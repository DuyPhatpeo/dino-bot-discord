import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMMANDS_DATA } from "../data/botData";
import { Search, Copy, Check } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "music", label: "Âm nhạc" },
  { id: "moderation", label: "Quản trị" },
  { id: "fun", label: "Mini Games" },
  { id: "utility", label: "Tiện ích" },
];

const Commands = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const filteredCommands = COMMANDS_DATA.filter((cmd) => {
    const matchesCategory =
      activeCategory === "all" || cmd.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      cmd.name.toLowerCase().includes(query) ||
      cmd.desc.toLowerCase().includes(query) ||
      cmd.syntax.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const handleCopy = (syntax, index) => {
    navigator.clipboard.writeText(syntax);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <section id="commands" className="py-12 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
            Danh Sách Lệnh
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Tra Cứu Lệnh <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">DinoBot</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Hỗ trợ đầy đủ Slash Command (/) và Prefix (!). Bấm nút để sao chép cú pháp.
          </p>
        </div>

        {/* Filter Controls: Search Box + Category Pills */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm lệnh (vd: ban, roll, rps)..."
              className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#202430] border border-[#2b3040] text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500/80 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 scale-105"
                      : "bg-[#202430] border border-[#2b3040] text-slate-300 hover:text-white hover:border-[#3a4055]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Commands Grid */}
        {filteredCommands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredCommands.map((cmd, idx) => {
                const isCopied = copiedIndex === idx;
                return (
                  <motion.div
                    key={cmd.name}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="p-6 rounded-3xl bg-[#202430] border border-[#2b3040] hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg shadow-black/20"
                  >
                    <div>
                      {/* Card Header: Command Name & Role Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base font-bold text-emerald-400 font-mono">
                          {cmd.name}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            cmd.role === "Admin"
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/25"
                              : cmd.role === "Moderator"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                              : "bg-[#171a21] border border-[#2b3040] text-slate-300"
                          }`}
                        >
                          {cmd.role}
                        </span>
                      </div>

                      {/* Syntax Box with Copy Action */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#171a21] border border-[#2b3040] mb-3 font-mono text-xs text-slate-200">
                        <span className="truncate pr-2">{cmd.syntax}</span>
                        <button
                          onClick={() => handleCopy(cmd.syntax, idx)}
                          title="Sao chép"
                          className="flex-shrink-0 p-1.5 rounded-lg bg-[#202430] hover:bg-emerald-500 hover:text-slate-950 text-slate-300 transition-all cursor-pointer border border-[#2b3040]"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                        {cmd.desc}
                      </p>
                    </div>

                    {/* Example row */}
                    <div className="pt-3 border-t border-[#2b3040] flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-slate-500">Ví dụ:</span>
                      <span className="font-mono text-emerald-400/90 truncate max-w-[200px]">
                        {cmd.example}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 p-6 rounded-3xl bg-[#202430] border border-[#2b3040] max-w-sm mx-auto shadow-xl">
            <p className="text-white text-sm font-bold mb-1">Không có kết quả</p>
            <p className="text-slate-400 text-xs">Thử tìm kiếm với từ khoá khác</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Commands;
