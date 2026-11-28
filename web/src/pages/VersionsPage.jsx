import React from "react";
import { VERSION_HISTORY } from "../data/botData";

const VersionsPage = () => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Lịch Sử Phiên Bản
          </h1>
          <p className="text-slate-400 text-sm">
            Chi tiết các bản cập nhật và tính năng của DinoBot
          </p>
        </div>

        {/* Timeline List (Từ mới nhất ở trên, bản cũ nhất sát dưới cùng) */}
        <div className="space-y-5">
          {VERSION_HISTORY.map((item) => (
            <div
              key={item.version}
              className={`p-6 rounded-2xl border ${
                item.current
                  ? "bg-[#1c2230] border-emerald-500/40"
                  : "bg-[#181c26] border-[#2b3040]"
              }`}
            >
              {/* Header: Version cùng hàng với ngày phát hành */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#2b3040]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-black text-white">
                    v{item.version}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({item.date})
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className="text-xs sm:text-sm font-semibold text-slate-300">
                  {item.name}
                </span>
              </div>

              {/* Bullet list of features */}
              <ul className="space-y-1.5 text-sm text-slate-300">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
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
