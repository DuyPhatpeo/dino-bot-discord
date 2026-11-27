import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BOT_LINKS } from "../data/botData";
const logo = "/logo.png";
import { UserPlus, LifeBuoy, Zap, Github, Gamepad2, Code, Settings, Plus } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* 1. Jockie Music style Watermark Icon Pattern Wallpaper */}
      <div className="absolute inset-0 dino-watermark-pattern pointer-events-none opacity-40 z-0"></div>

      {/* 2. Soft Ambient Vignette & Center Spotlight */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#171a21]/50 to-[#171a21] pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        {/* ========================================================================= */}
        {/* Left Column: Mascot Illustration with Speed Lines (Jockie Music Style)    */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          {/* Dynamic Speed Lines & Particle Accents */}
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 flex items-center justify-center">
            {/* Speed Lines & Flying Icons */}
            <div className="absolute -left-16 sm:-left-28 top-1/2 -translate-y-1/2 -mt-6 sm:-mt-10 w-72 sm:w-[350px] h-72 sm:h-[350px] pointer-events-none select-none rotate-[15deg] z-0">
              {/* White Speed Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 350 350" stroke="white" fill="none" strokeWidth="3" strokeLinecap="round">
                <line x1="300" y1="60" x2="100" y2="60" strokeOpacity="0.7" strokeDasharray="30 15 50 15" />
                <line x1="330" y1="120" x2="40" y2="120" strokeOpacity="0.9" strokeWidth="4.5" />
                <line x1="280" y1="180" x2="90" y2="180" strokeOpacity="0.5" strokeDasharray="15 20 40 20" />
                <line x1="310" y1="240" x2="60" y2="240" strokeOpacity="0.8" strokeDasharray="50 25" />
                <line x1="270" y1="300" x2="30" y2="300" strokeOpacity="0.6" strokeWidth="3.5" />
              </svg>

              {/* Flying Icons colored like the bot (Placed in the gaps between lines) */}
              <Gamepad2 className="absolute top-[70px] left-[140px] w-10 h-10 text-emerald-400 rotate-[20deg]" strokeWidth={2.5} />
              <Code className="absolute top-[132px] left-[60px] w-9 h-9 text-cyan-400 rotate-[-15deg]" strokeWidth={2.5} />
              <Settings className="absolute top-[190px] left-[130px] w-10 h-10 text-emerald-500 rotate-[45deg]" strokeWidth={2.5} />
              <Plus className="absolute top-[78px] left-[50px] w-6 h-6 text-teal-300" strokeWidth={3} />
              <Plus className="absolute top-[260px] left-[90px] w-5 h-5 text-emerald-400" strokeWidth={3} />
            </div>

            {/* Glowing Backdrop Circle */}
            <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-400/10 blur-2xl pointer-events-none"></div>

            {/* Mascot Image */}
            <div className="relative z-10 -top-2 sm:-top-4">
              <img
                src={logo}
                alt="DinoBot Mascot"
                className="w-56 h-56 sm:w-72 sm:h-72 lg:w-84 lg:h-84 object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* Right Column: Giant Bold Typography & Pill Buttons (Jockie Music Style)   */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Giant Bold Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.12] pb-1">
              DINOBOT
            </h1>
            <div className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent uppercase leading-[1.25] pb-2 sm:pb-3">
              BOT DISCORD TOÀN DIỆN
            </div>
          </div>

          {/* Subtitle / Tagline */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-medium">
            Quản trị tự động, mini games nút bấm giải trí và tiện ích cộng đồng thông minh — tất cả trong một bot duy nhất.
          </p>

          {/* Row of Multi-Colored Pill Buttons (Jockie Music Style) */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5">
            {/* Pill 1: MỜI BOT (Emerald) */}
            <a
              href={BOT_LINKS.invite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              <span>MỜI BOT</span>
            </a>

            {/* Pill 2: HỖ TRỢ (Teal) */}
            <a
              href={BOT_LINKS.support}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 transition-all cursor-pointer"
            >
              <LifeBuoy className="w-4 h-4 text-slate-950" />
              <span>HỖ TRỢ</span>
            </a>

            {/* Pill 3: TÍNH NĂNG (Cyan/Indigo) */}
            <Link
              to="/features"
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>TÍNH NĂNG</span>
            </Link>

            {/* Pill 4: GITHUB (Dark Slate Navy) */}
            <a
              href={BOT_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#202430] hover:bg-[#282d3d] border border-[#2e3448] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4 text-emerald-400" />
              <span>GITHUB</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
