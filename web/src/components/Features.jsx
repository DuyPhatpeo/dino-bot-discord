import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FEATURE_MODULES } from "../data/botData";
import {
  ShieldAlert,
  Gamepad2,
  Sparkles,
  UserCheck,
  Wrench,
  Coins,
  Music,
  Check,
  ArrowRight,
  Gift,
  Dice5,
  Sliders,
  CheckCircle2,
} from "lucide-react";

const iconMap = {
  ShieldAlert,
  Gamepad2,
  Sparkles,
  UserCheck,
  Wrench,
  Coins,
  Music,
};

const Features = () => {
  // Interactive state for AutoMod demo toggles
  const [automodToggles, setAutomodToggles] = useState({
    antiSpam: true,
    blockInvites: true,
    badWords: true,
    autoTimeout: true,
  });

  // Interactive state for MiniGame RPS demo
  const [rpsResult, setRpsResult] = useState(null);

  const toggleSwitch = (key) => {
    setAutomodToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const playRps = (choice) => {
    const outcomes = {
      keo: "DinoBot ra Bao ➔ Bạn đã Thắng! 🦖🎉",
      bua: "DinoBot ra Kéo ➔ Bạn đã Thắng! 🦖🎉",
      bao: "DinoBot ra Bao ➔ Hòa nhau rồi! Thử lại nhé! 🦖",
    };
    setRpsResult(outcomes[choice]);
  };

  return (
    <section id="features" className="py-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {/* ========================================================================= */}
        {/* SHOWCASE BLOCK 1: AutoMod & Protection (MEE6 Alternating Z-Block)        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Text Info (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kiểm Duyệt Tự Động</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Giữ Máy Chủ Của Bạn Luôn{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                An Toàn Tuyệt Đối
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Tự động phát hiện và xử lý các hành vi spam tin nhắn liên tục, phát tán liên kết độc hại hoặc từ ngữ thô tục mà không cần người quản trị phải túc trực 24/7.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                "Chặn gửi link máy chủ Discord khác trái phép",
                "Phát hiện và xóa nhanh chuỗi spam tin nhắn",
                "Tự động áp dụng hình phạt Timeout thành viên vi phạm",
                "Ghi log vi phạm rõ ràng vào kênh quản trị",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-200 text-sm sm:text-base font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                to="/commands"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition group"
              >
                <span>Xem danh sách lệnh quản trị</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Realistic MEE6-style AutoMod Control Panel Mockup (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl bg-[#202430] border border-[#2b3040] shadow-2xl p-5 sm:p-7 backdrop-blur-xl">
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#2b3040] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Cấu Hình AutoMod DinoBot</h3>
                    <p className="text-xs text-slate-400">Thiết lập bộ lọc kiểm duyệt trực tiếp</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  ĐANG BẬT
                </span>
              </div>

              {/* Toggles List */}
              <div className="space-y-3.5">
                {[
                  {
                    key: "antiSpam",
                    title: "Chống spam tin nhắn liên tục",
                    desc: "Tự động xóa tin nhắn khi phát hiện gửi quá nhanh",
                  },
                  {
                    key: "blockInvites",
                    title: "Chặn liên kết mời Discord lạ",
                    desc: "Ngăn chặn quảng cáo máy chủ trái phép",
                  },
                  {
                    key: "badWords",
                    title: "Lọc từ ngữ cấm & thô tục",
                    desc: "Ẩn tin nhắn chứa từ khóa nằm trong danh sách đen",
                  },
                  {
                    key: "autoTimeout",
                    title: "Tự động Timeout người vi phạm",
                    desc: "Cách ly tạm thời 10 phút sau 3 lần cảnh cáo",
                  },
                ].map((toggle) => (
                  <div
                    key={toggle.key}
                    onClick={() => toggleSwitch(toggle.key)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#171a21] border border-[#2b3040] hover:border-[#383e54] transition cursor-pointer"
                  >
                    <div className="pr-4">
                      <div className="text-sm font-semibold text-white">{toggle.title}</div>
                      <div className="text-xs text-slate-400">{toggle.desc}</div>
                    </div>

                    {/* MEE6-style Green Toggle Switch */}
                    <div
                      className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 flex-shrink-0 ${
                        automodToggles[toggle.key] ? "bg-emerald-500" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                          automodToggles[toggle.key] ? "translate-x-5" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulated Live Action Log */}
              <div className="mt-5 p-3.5 rounded-2xl bg-[#171a21]/90 border border-emerald-500/20 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-emerald-300 font-mono">
                  [AutoMod] Đã bảo vệ 4 kênh chat khỏi spam hôm nay
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* SHOWCASE BLOCK 2: Mini Games Nút Bấm (Inverted Z-Block)                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Interactive MiniGame Card Mockup (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="rounded-3xl bg-[#202430] border border-[#2b3040] shadow-2xl p-5 sm:p-7 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#2b3040]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Mini Game Tương Tác</h3>
                    <p className="text-xs text-slate-400">Bấm nút trực tiếp trên tin nhắn Discord</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Phản Hồi Tức Thì
                </span>
              </div>

              {/* RPS Game Box */}
              <div className="p-4 rounded-2xl bg-[#171a21] border border-[#2b3040] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Thách Đấu Oẳn Tù Tì
                  </span>
                  <span className="text-xs text-emerald-400">Chọn nước đi của bạn</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => playRps("keo")}
                    className="py-3 px-2 rounded-xl bg-[#202430] hover:bg-emerald-600 hover:text-white border border-[#2b3040] text-sm font-bold text-slate-200 transition shadow-sm active:scale-95 cursor-pointer text-center"
                  >
                    ✌️ Kéo
                  </button>
                  <button
                    onClick={() => playRps("bua")}
                    className="py-3 px-2 rounded-xl bg-[#202430] hover:bg-emerald-600 hover:text-white border border-[#2b3040] text-sm font-bold text-slate-200 transition shadow-sm active:scale-95 cursor-pointer text-center"
                  >
                    ✊ Búa
                  </button>
                  <button
                    onClick={() => playRps("bao")}
                    className="py-3 px-2 rounded-xl bg-[#202430] hover:bg-emerald-600 hover:text-white border border-[#2b3040] text-sm font-bold text-slate-200 transition shadow-sm active:scale-95 cursor-pointer text-center"
                  >
                    ✋ Bao
                  </button>
                </div>

                {rpsResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center"
                  >
                    {rpsResult}
                  </motion.div>
                )}
              </div>

              {/* Dice & Coin Mini Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#171a21] border border-[#2b3040] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <Dice5 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Tung Xúc Xắc</div>
                    <div className="text-sm font-bold text-white">🎲 6 Điểm (Cực Đại)</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#171a21] border border-[#2b3040] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Lật Đồng Xu</div>
                    <div className="text-sm font-bold text-white">🪙 Mặt Ngửa (+50 Xu)</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Info (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Giải Trí & Gắn Kết</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Khuấy Động Không Khí Cùng{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Mini Games Nút Bấm
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Các trò chơi giải trí sử dụng thành phần Discord Buttons hiện đại. Thành viên có thể tham gia ngay lập tức chỉ bằng một cú click chuột mà không cần nhớ cú pháp gõ lệnh.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                "Trò chơi Oẳn Tù Tì với các nút bấm trực quan",
                "Tung xúc xắc ngẫu nhiên xác định kết quả kèo đấu",
                "Tung đồng xu thử vận may với tỷ lệ công bằng",
                "Hệ thống tiền tệ ảo nhận xu thưởng sau mỗi ván chơi",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-200 text-sm sm:text-base font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                to="/features"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition group"
              >
                <span>Xem chi tiết các tính năng giải trí</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* SHOWCASE BLOCK 3: Button Roles & Giveaway (Z-Block)                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Text Info (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tiện Ích & Sự Kiện</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Tự Nhận Vai Trò &{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Giveaway Tự Động
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Tối ưu hóa quy trình chào đón thành viên mới. Cho phép thành viên tự chọn vai trò (Button Roles) theo sở thích và tạo sự kiện Giveaway chỉ trong vài thao tác đơn giản.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                "Bảng chọn vai trò tự động (Reaction / Button Roles)",
                "Tạo sự kiện Giveaway với đồng hồ đếm ngược minh bạch",
                "Tự động chọn ngẫu nhiên người chiến thắng công bằng",
                "Quản lý vai trò bảo mật, tránh xung đột quyền hạn",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-200 text-sm sm:text-base font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                to="/commands"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition group"
              >
                <span>Xem lệnh tạo Giveaway và Roles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Discord Role Picker & Giveaway Embed Mockup (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl bg-[#202430] border border-[#2b3040] shadow-2xl p-5 sm:p-7 backdrop-blur-xl space-y-4">
              {/* Role Selection Embed */}
              <div className="p-4 rounded-2xl bg-[#171a21] border-l-4 border-l-emerald-500 border border-[#2b3040] space-y-3">
                <div>
                  <h4 className="text-white font-bold text-sm">🎯 Tự Chọn Vai Trò Máy Chủ</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Bấm vào các nút dưới đây để nhận vai trò thông báo các kênh tương ứng:
                  </p>
                </div>

                {/* Role Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button className="px-3 py-1.5 rounded-lg bg-[#202430] hover:bg-emerald-600 border border-[#2b3040] text-xs font-semibold text-slate-200 transition">
                    🎮 Game Thủ
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-[#202430] hover:bg-emerald-600 border border-[#2b3040] text-xs font-semibold text-slate-200 transition">
                    🎨 Thiết Kế
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-[#202430] hover:bg-emerald-600 border border-[#2b3040] text-xs font-semibold text-slate-200 transition">
                    🎧 Âm Nhạc
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
                    ✓ Thành Viên VIP
                  </button>
                </div>
              </div>

              {/* Giveaway Box */}
              <div className="p-4 rounded-2xl bg-[#171a21] border-l-4 border-l-teal-400 border border-[#2b3040] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-teal-400 tracking-wider uppercase">
                    🎉 SỰ KIỆN GIVEAWAY
                  </span>
                  <span className="text-[11px] text-slate-400">Còn 2 giờ</span>
                </div>

                <h4 className="text-white font-bold text-sm sm:text-base">
                  1 Tháng Discord Nitro Boost
                </h4>

                <div className="text-xs text-slate-300">
                  Tổ chức bởi: <span className="text-emerald-400 font-semibold">DuyPhat</span> • 1 Người Thắng
                </div>

                <button className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] transition flex items-center justify-center gap-1.5 text-center cursor-pointer">
                  <span>🎉 Tham Gia Ngay (52 vé)</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* PLUGIN BENTO GRID (Tất cả module trong một hệ sinh thái)                    */}
        {/* ========================================================================= */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
              Hệ Sinh Thái Module
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Mọi Thứ Máy Chủ Cần Trong{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Một Bot Duy Nhất
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Không cần cài đặt nhiều bot rườm rà. DinoBot cung cấp đầy đủ các tiện ích cần thiết.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_MODULES.map((module, idx) => {
              const IconComponent = iconMap[module.iconName] || Sparkles;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="p-6 rounded-3xl bg-[#202430] border border-[#2b3040] hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        SẴN SÀNG
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {module.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                      {module.desc}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-[#2b3040] text-xs text-slate-300">
                    {module.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
