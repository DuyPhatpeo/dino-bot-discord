import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SIMULATOR_TABS } from "../data/botData";
const logo = "/logo.png";
import { Hash, CheckCircle2 } from "lucide-react";

const DiscordPreview = () => {
  const [activeTab, setActiveTab] = useState(SIMULATOR_TABS[0]);
  const [buttonFeedback, setButtonFeedback] = useState(null);

  const handleInteractiveButtonClick = (btnLabel) => {
    if (activeTab.id === "baobuakeo") {
      const outcomes = ["Hòa rồi! Cả 2 cùng chọn nước đi!", "Bạn đã Thắng! DinoBot chịu thua 🦖", "DinoBot đã Thắng! Thử lại vận may nhé!"];
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      setButtonFeedback(`Bạn chọn [${btnLabel}] ➔ ${randomOutcome}`);
    } else if (activeTab.id === "giveaway") {
      setButtonFeedback("Đã nhận vé tham gia Giveaway!");
    } else if (activeTab.id === "play") {
      setButtonFeedback(`Đang điều khiển phát nhạc: [${btnLabel}] 🎵`);
    } else {
      setButtonFeedback(`Đã thực thi: ${btnLabel}`);
    }

    setTimeout(() => {
      setButtonFeedback(null);
    }, 3000);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Command tabs */}
      <div className="flex items-center gap-1.5 p-1 mb-3 rounded-2xl bg-[#202430] border border-[#2b3040] backdrop-blur-md overflow-x-auto text-xs">
        {SIMULATOR_TABS.map((tab) => {
          const isSelected = activeTab.id === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab);
                setButtonFeedback(null);
              }}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Discord Client Window */}
      <div className="rounded-3xl border border-slate-800/90 bg-[#1E1F22] shadow-2xl shadow-emerald-950/30 overflow-hidden text-slate-200 font-sans">
        {/* Discord Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#2B2D31] border-b border-black/20 select-none">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-400" />
            <span className="font-bold text-sm text-white">dinobot</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
        </div>

        {/* Discord Chat Area */}
        <div className="p-4 sm:p-5 space-y-4 min-h-[340px] flex flex-col justify-start">
          {/* User Prompt */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center font-bold text-xs text-white shadow-md flex-shrink-0">
              DP
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs sm:text-sm text-white">DuyPhat</span>
                <span className="text-[10px] text-slate-400">Hôm nay lúc 09:30</span>
              </div>
              <div className="mt-0.5 inline-flex items-center px-2 py-0.5 rounded-md bg-[#2B2D31] text-xs font-mono text-emerald-400 border border-slate-700/50">
                {activeTab.userPrompt}
              </div>
            </div>
          </div>

          {/* Bot Response */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3"
            >
              {/* Bot Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={logo}
                  alt="DinoBot"
                  className="w-9 h-9 rounded-full object-cover p-0.5 bg-emerald-950 border border-emerald-500/40"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1E1F22]"></span>
              </div>

              {/* Bot Message Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-xs sm:text-sm text-emerald-400">DinoBot</span>
                  <span className="bg-[#5865F2] text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-2.5 h-2.5" /> BOT
                  </span>
                  <span className="text-[10px] text-slate-400">Hôm nay lúc 09:30</span>
                </div>

                {/* Discord Rich Embed */}
                <div
                  className="rounded-xl bg-[#2B2D31] border-l-4 p-4 shadow-lg space-y-3"
                  style={{ borderLeftColor: activeTab.response.color }}
                >
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide block">
                    {activeTab.response.author}
                  </span>

                  <h5 className="font-bold text-sm sm:text-base text-white">
                    {activeTab.response.title}
                  </h5>

                  {/* Embed Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {activeTab.response.fields.map((field, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg bg-black/20 ${
                          field.inline ? "col-span-1" : "col-span-1 sm:col-span-2"
                        }`}
                      >
                        <div className="text-[11px] font-semibold text-slate-400 mb-0.5">
                          {field.name}
                        </div>
                        <div className="text-slate-100 font-medium">{field.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Embed Footer */}
                  <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
                    <span>{activeTab.response.footer}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {activeTab.response.buttons && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {activeTab.response.buttons.map((btn, bIdx) => (
                      <button
                        key={bIdx}
                        onClick={() => handleInteractiveButtonClick(btn)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#4E5058] hover:bg-emerald-600 text-xs font-semibold text-white transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                )}

                {/* Toast feedback */}
                {buttonFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium inline-block"
                  >
                    {buttonFeedback}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <div className="px-4 py-2.5 bg-[#383A40] mx-3 mb-3 rounded-xl flex items-center justify-between text-xs text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-slate-600/70 flex items-center justify-center text-white text-[10px] font-bold">
              +
            </span>
            <span>Gửi tin nhắn vào #dinobot...</span>
          </div>
          <span className="text-slate-500 text-xs">😊</span>
        </div>
      </div>
    </div>
  );
};

export default DiscordPreview;
