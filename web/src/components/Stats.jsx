import React from "react";
import { motion } from "framer-motion";
import { BOT_STATS } from "../data/botData";
import { Server, Users, Terminal, Activity } from "lucide-react";

const iconMap = {
  Server,
  Users,
  Terminal,
  Activity,
};

const Stats = () => {
  return (
    <section id="stats" className="py-8 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#202430]/80 border border-[#2b3040] p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-black/20">
          <div className="text-center mb-6">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Được tin cậy bởi các cộng đồng Discord
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {BOT_STATS.map((stat, idx) => {
              const IconComponent = iconMap[stat.iconName] || Terminal;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-[#171a21]/70 border border-[#2b3040] hover:border-emerald-500/40 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400">
                      {stat.label}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
