import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import DiscordPreview from "../components/DiscordPreview";
import Features from "../components/Features";
import CtaSection from "../components/CtaSection";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div>
      {/* Jockie Music style Hero Banner */}
      <Hero />

      {/* Live Server Stats */}
      <Stats />

      {/* Interactive Discord Simulation Section */}
      <section className="py-12 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
            Trải Nghiệm Trực Tiếp
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Thử Nghiệm Lệnh Tương Tác
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Bấm chọn các tab lệnh bên dưới để xem DinoBot phản hồi tức thì với giao diện Discord
          </p>
        </div>
        <DiscordPreview />
      </section>

      {/* Core Features Overview */}
      <div className="relative">
        <Features />
        {/* Link to view full features page */}
        <div className="text-center -mt-8 mb-20 relative z-10">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#202430] border border-[#2b3040] text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/40 text-sm font-bold transition hover:scale-105 shadow-md"
          >
            <span>Khám phá chi tiết các tính năng</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* CTA Invite Banner */}
      <CtaSection />
    </div>
  );
};

export default HomePage;
