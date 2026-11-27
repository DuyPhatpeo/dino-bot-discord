import React from "react";
import Navbar from "@components/Navbar";
import Hero from "@components/Hero";
import Stats from "@components/Stats";
import Features from "@components/Features";
import Commands from "@components/Commands";
import Faq from "@components/Faq";
import CtaSection from "@components/CtaSection";
import Footer from "@components/Footer";

const DinoBotPage = () => {
  return (
    <div className="min-h-screen bg-[#171a21] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive Discord Preview */}
        <Hero />

        {/* Live Performance & Server Stats */}
        <Stats />

        {/* 6-Pillar Features Showcase */}
        <Features />

        {/* Interactive Commands Explorer */}
        <Commands />

        {/* FAQ Accordion Section */}
        <Faq />

        {/* High-Conversion Cosmic CTA Banner */}
        <CtaSection />
      </main>

      {/* Modern Multi-Column Footer */}
      <Footer />
    </div>
  );
};

export default DinoBotPage;
