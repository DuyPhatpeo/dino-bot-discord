import React from "react";
import { VERSION_HISTORY } from "../data/botData";

const VersionsPage = () => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
            Changelog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Lịch Sử Phiên Bản
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Tổng hợp các đợt phát hành và cập nhật tính năng theo thời gian
          </p>
        </div>

        {/* Timeline List (Từ mới nhất xuống cũ nhất) */}
        <div className="space-y-6">
          {VERSION_HISTORY.map((item) => (
            <div
              key={item.version}
              className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                item.current
                  ? "bg-[#1c2230] border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                  : "bg-[#181c26] border-[#2b3040]"
              }`}
            >
              {/* Header row: Version, Tag, Date, Total Commands */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#2b3040]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-white tracking-tight">
                    v{item.version}
                  </span>
                  {item.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-slate-300">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                  <span>Tháng {item.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span className="text-emerald-400 font-bold">{item.totalCommands} lệnh</span>
                </div>
              </div>

              {/* Bullet list of features */}
              <ul className="space-y-2 text-sm text-slate-300">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold leading-5">•</span>
                    <span className="leading-5">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VersionsPage;
