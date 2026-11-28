# 🦖 DinoBot Discord & Web

<div align="center">

![Version](https://img.shields.io/badge/version-v1.2.0-10b981?style=for-the-badge)
![Discord.js](https://img.shields.io/badge/discord.js-v14.21.0-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Website](https://img.shields.io/badge/Website-dinobotvn.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

**DinoBot** là giải pháp Discord Bot toàn diện dạng **Monorepo** bao gồm Discord Bot thông minh và Website Landing Page tra cứu trực quan. Bot được xây dựng bằng **Node.js** và **Discord.js v14**, tích hợp trọn bộ **34 Slash Commands (/)** hiện đại với giao diện nút bấm tương tác thời gian thực.

[🌐 Trải Nghiệm Website Demo](https://dinobotvn.vercel.app/) • [Tính Năng](#-tính-năng-chính-34-lệnh) • [Lịch Sử Phiên Bản](#-lịch-sử-phiên-bản-changelog) • [Cấu Trúc Monorepo](#-cấu-trúc-monorepo) • [Cài Đặt Cục Bộ](#-hướng-dẫn-cài-đặt-cục-bộ) • [Triển Khai 24/7](#-triển-khai-lên-cloud-247)

</div>

---

## 🚀 Tính Năng Chính (34 Lệnh)

Hệ thống được thiết kế dạng module với **34 Slash Commands (/)** chia thành 5 chuyên mục chính:

### 🎵 Âm Nhạc Đa Nền Tảng (Music - 7 lệnh)
* `/play`: Phát nhạc từ YouTube, Spotify, SoundCloud, Zing MP3, Apple Music hoặc tìm kiếm theo từ khóa.
* `/pause`: Tạm dừng bài hát đang phát trong kênh thoại.
* `/resume`: Tiếp tục phát bài hát đang tạm dừng.
* `/skip`: Bỏ qua bài hát hiện tại và phát bài tiếp theo trong hàng đợi.
* `/stop`: Dừng phát nhạc, xóa toàn bộ hàng đợi và rời phòng thoại.
* `/queue`: Hiển thị danh sách các bài hát đang chờ phát trong hàng đợi.
* `/list`: Xem danh sách phát chi tiết kèm tổng thời lượng bài hát.

### 🛡️ Quản Trị Máy Chủ (Moderation - 14 lệnh)
* `/ban`: Cấm thành viên vi phạm khỏi máy chủ kèm lý do.
* `/unban`: Gỡ cấm (Unban) thành viên bằng User ID.
* `/kick`: Trục xuất thành viên ra khỏi máy chủ.
* `/mute`: Tạm khóa chat (Timeout) thành viên trong khoảng thời gian chỉ định (1m, 1h, 1d,...).
* `/unmute`: Gỡ phạt timeout cho thành viên.
* `/warn`: Cảnh cáo thành viên vi phạm nội quy kèm ghi chú lý do.
* `/clear`: Xóa nhanh số lượng tin nhắn chỉ định trong kênh chat (1 - 100 tin nhắn).
* `/lock`: Khóa kênh chat, ngăn không cho thành viên gửi tin nhắn.
* `/unlock`: Mở khóa lại kênh chat cho thành viên trò chuyện.
* `/slowmode`: Cài đặt thời gian giãn cách gửi tin nhắn cho kênh chat.
* `/addrole`: Gán vai trò mới cho thành viên trong máy chủ.
* `/nickname`: Đổi biệt danh hoặc đặt lại biệt danh gốc cho thành viên.
* `/setwelcome`: Cài đặt kênh tự động gửi tin nhắn chào mừng thành viên mới gia nhập.
* `/settempvoice`: Cài đặt kênh kích hoạt tạo phòng Voice tự động (Join-to-Create).

### 🎲 Mini Games & Giải Trí (Fun - 5 lệnh)
* `/blackjack`: Chơi Xì Dách (Blackjack 21 điểm) đối đầu bot với nút bấm Hit, Stand, Double Down trực quan.
* `/baobuakeo`: Chơi Oẳn Tù Tì (Kéo - Búa - Bao) bằng nút bấm thời gian thực.
* `/giveaway`: Tạo sự kiện tặng quà cộng đồng có đồng hồ đếm ngược và chọn người trúng giải ngẫu nhiên.
* `/roll`: Tung xúc xắc ngẫu nhiên với tùy chọn số lượng xúc xắc và số mặt.
* `/random`: Quay số may mắn hoặc chọn ngẫu nhiên trong khoảng chỉ định.

### 🛠️ Tiện Ích & Thăm Dò (Utility - 6 lệnh)
* `/help`: Hiển thị danh sách toàn bộ 34 lệnh phân theo 5 chuyên mục kèm hướng dẫn chi tiết.
* `/poll`: Tạo cuộc thăm dò ý kiến với các nút bấm bình chọn trực tiếp.
* `/remindme`: Đặt lịch hẹn giờ để bot nhắc nhở công việc quan trọng.
* `/serverinfo`: Xem thông tin chi tiết, số lượng thành viên, kênh và thống kê máy chủ.
* `/userinfo`: Xem hồ sơ người dùng, ngày tạo tài khoản, ngày tham gia và danh sách vai trò.
* `/avatar`: Lấy ảnh đại diện kích thước gốc độ phân giải cao của thành viên hoặc server.

### 💬 Lệnh Cơ Bản (Slash - 2 lệnh)
* `/ping`: Đo độ trễ (latency) WebSocket API của bot.
* `/say`: Gửi thông điệp dưới danh nghĩa DinoBot trong kênh chat.

---

## 🌐 DinoBot Web Landing Page

Thư mục `web/` là trang giới thiệu và tra cứu tương tác của DinoBot, được deploy tại [dinobotvn.vercel.app](https://dinobotvn.vercel.app/):
* **Live Command Explorer:** Tìm kiếm, lọc và xem cú pháp 34 lệnh trực quan theo từng danh mục và quyền hạn.
* **Discord Message Simulator:** Giả lập giao diện Discord phản hồi tương tác (Music Embeds, Game Buttons, Giveaway Card,...).
* **Responsive & Dark Modern UI:** Thiết kế đậm chất Gamer phong cách Discord, hiệu ứng mượt mà với Tailwind CSS v4 và Framer Motion.

---

## 📁 Cấu Trúc Monorepo

```text
dino-bot-discord/
├── bot/                     # Discord Bot Application (Discord.js v14)
│   ├── src/
│   │   ├── commands/        # Toàn bộ 34 Slash Commands
│   │   │   ├── fun/         # Lệnh trò chơi (blackjack, baobuakeo, giveaway, roll, random)
│   │   │   ├── moderation/  # Lệnh quản trị (ban, kick, mute, warn, clear, lock, addRole,...)
│   │   │   ├── music/       # Lệnh âm nhạc (play, pause, resume, skip, stop, queue, list)
│   │   │   ├── slash/       # Lệnh cơ bản (ping, say)
│   │   │   └── utility/     # Lệnh tiện ích (help, avatar, serverinfo, userinfo, poll, remindme)
│   │   ├── events/          # Discord Event listeners (ready, interactionCreate, voiceStateUpdate,...)
│   │   ├── handlers/        # Xử lý command, buttons, select menus
│   │   ├── utils/           # Music Manager, Config Manager
│   │   └── index.js         # Entry point & Express Keep-alive Server
│   ├── clear-commands.js    # Script dọn dẹp Slash Commands trên Discord API
│   ├── deploy-commands.js   # Script đăng ký/cập nhật Slash Commands
│   ├── .env.example         # Mẫu biến môi trường cho Bot
│   └── package.json
├── web/                     # DinoBot Web Landing Page (React 19 + Vite + Tailwind v4)
│   ├── src/
│   │   ├── components/      # UI components (Hero, Features, Commands, Simulator, Navbar, Footer)
│   │   ├── data/            # botData.js (34 lệnh, stats, version v1.0.0, FAQs)
│   │   ├── pages/           # HomePage, FeaturesPage, CommandsPage, FaqPage
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/              # Logo và static assets
│   ├── vite.config.js
│   └── package.json
├── package.json             # Root Monorepo configuration (npm workspaces)
└── README.md
```

---

## 📦 Hướng Dẫn Cài Đặt Cục Bộ

### 1. Yêu cầu hệ thống
* [Node.js](https://nodejs.org/) phiên bản **18.x** trở lên.
* Trình quản lý gói `npm`.

### 2. Clone dự án và cài đặt Dependencies
```bash
# Clone repository
git clone https://github.com/DuyPhatpeo/DinoBotDiscord.git

# Di chuyển vào thư mục dự án
cd DinoBotDiscord

# Cài đặt toàn bộ dependencies cho cả bot và web (Workspaces)
npm install
```

### 3. Cấu hình Biến môi trường (.env)
Tạo file `.env` tại thư mục `bot/` (sao chép từ `bot/.env.example`):

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_discord_application_client_id
GUILD_ID=your_test_guild_server_id
PORT=3000
```

> **Cách lấy thông tin:**
> * `DISCORD_TOKEN` & `CLIENT_ID`: Lấy tại [Discord Developer Portal](https://discord.com/developers/applications) > Chọn Bot của bạn.
> * `GUILD_ID`: ID của server Discord thử nghiệm (Bật Developer Mode trên Discord > Chuột phải vào Icon Server > Copy Server ID).

---

## ⚡ Các Lệnh Quản Trị Monorepo

Từ thư mục gốc dự án, bạn có thể chạy nhanh các tác vụ thông qua npm scripts:

### Quản lý Bot
```bash
# Đăng ký / cập nhật Slash Commands lên Discord API
npm run bot:deploy

# Xóa toàn bộ Slash Commands nếu cần làm mới
npm run bot:clear

# Chạy Bot ở chế độ phát triển (Tự reload bằng nodemon)
npm run bot:dev

# Chạy Bot ở chế độ Production
npm run bot:start
```

### Quản lý Web
```bash
# Chạy Web Landing Page ở chế độ local dev (Vite HMR)
npm run web:dev

# Build phiên bản Web cho Production
npm run web:build

# Preview bản build Web
npm run web:preview
```

---

## 🌐 Triển Khai Lên Cloud 24/7

### 🔹 Triển khai Bot (Render + UptimeRobot)
1. **Render Web Service:** Liên kết repo GitHub và chọn thư mục làm việc hoặc đặt build/start command:
   * **Build Command:** `npm install --prefix bot`
   * **Start Command:** `node bot/deploy-commands.js && node bot/src/index.js`
2. **Environment Variables:** Điền `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`, `PORT=3000`.
3. **UptimeRobot:** Tạo monitor HTTP(s) ping đến URL Render (`https://<ten-bot>.onrender.com`) mỗi 5 phút để giữ server online liên tục.

### 🔹 Triển khai Web (Vercel)
1. Import repository vào [Vercel](https://vercel.com/).
2. Chọn **Root Directory** là `web`.
3. Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`.
4. Nhấn **Deploy** để nhận URL trực tuyến.

---

## 📜 Lịch Sử Phiên Bản (Changelog)

### 🎵 v1.2.0 — Bản Cập Nhật Âm Nhạc & Monorepo (Hiện tại)
* **Hệ thống Phát Nhạc Đa Nền Tảng (Music Player):**
  * Tích hợp `@discordjs/voice`, `@distube/ytdl-core`, `ffmpeg-static` phát nhạc trực tiếp trong kênh thoại voice.
  * Hỗ trợ phát nhạc từ YouTube, Spotify, SoundCloud, Zing MP3, Apple Music qua tìm kiếm từ khóa hoặc đường link.
  * Trọn bộ 7 lệnh điều khiển âm nhạc: `/play`, `/pause`, `/resume`, `/skip`, `/stop`, `/queue`, `/list`.
* **Kiến trúc Monorepo:**
  * Tách biệt rõ ràng thành hai package độc lập `bot/` và `web/` được quản lý tập trung qua npm workspaces.
* **Ra mắt DinoBot Web:**
  * Website chính thức [dinobotvn.vercel.app](https://dinobotvn.vercel.app/) tra cứu tương tác 34 lệnh, Discord Message Simulator trực quan.

### 🛡️ v1.1.1 — Bản Cập Nhật Quản Trị Nâng Cao & Temp Voice
* **Quản trị & Kiểm soát kênh (Moderation Suite):**
  * Bổ sung tính năng tạo phòng thoại tự động (`/settempvoice` Join-to-Create Voice): tự động tạo kênh riêng khi tham gia và tự thu hồi dọn dẹp khi kênh trống.
  * Bổ sung công cụ xử lý sự cố kênh chat: Khóa kênh (`/lock`), mở khóa kênh (`/unlock`) và thời gian giãn cách gửi tin nhắn (`/slowmode`).
  * Bổ sung lệnh tra cứu hồ sơ người dùng (`/userinfo`): ngày tạo tài khoản, ngày gia nhập máy chủ, danh sách vai trò sở hữu.
* **Tối ưu giao diện & hệ thống:**
  * Chuẩn hóa lệnh `/serverinfo`: hiển thị đầy đủ thông số kênh, thành viên, boost tier, chủ sở hữu.
  * Tinh giản giao diện Discord Embeds, loại bỏ icon rườm rà giúp thông điệp hiển thị trang nhã, rõ ràng.

### 🎮 v1.1.0 — Bản Cập Nhật Mini Games Nút Bấm Tương Tác
* **Trò chơi nút bấm thời gian thực (Interactive Mini-Games):**
  * Bổ sung game Xì Dách (`/blackjack` 21 điểm) đối đầu bot với nút bấm Hit, Stand, Double Down tương tác trực tiếp.
  * Nâng cấp toàn diện Oẳn Tù Tì (`/baobuakeo`): tích hợp các nút bấm Búa, Kéo, Bao có emoji trực quan 1-click.
  * Nâng cấp lệnh tung xúc xắc (`/roll`): hỗ trợ tùy chỉnh số lượng xúc xắc và số mặt (D6, D20,...).
  * Nâng cấp hệ thống phát quà cộng đồng (`/giveaway`): công bố người trúng giải qua tin nhắn kênh riêng biệt, tích hợp nút nhận vé chống spam.
* **Sửa lỗi & Ổn định:**
  * Khắc phục triệt để lỗi crash do trùng lặp phản hồi tương tác (duplicate interaction acknowledgements) trong `buttonHandler.js`.

### 🛡️ v1.0.0 — Bản Phát Hành Nền Tảng (Foundation Release)
* Khởi chạy Discord Bot sử dụng Discord.js v14 và Slash Commands (`/`).
* Bộ 14 lệnh quản trị cơ bản: `/ban`, `/unban`, `/kick`, `/mute`, `/unmute`, `/clear`, `/addrole`, `/nickname`, `/setwelcome`,...
* Bộ lệnh mini games và tiện ích ban đầu: `/baobuakeo`, `/giveaway`, `/roll`, `/random`, `/help`, `/ping`, `/say`, `/avatar`, `/poll`, `/remindme`.
* Tích hợp Express keep-alive web server phục vụ việc hosting 24/7 trên Render.

---

## 🛠️ Công Nghệ Sử Dụng

* **Bot:** Node.js, [Discord.js v14](https://discord.js.org/), [@discordjs/voice](https://github.com/discordjs/discord.js/tree/main/packages/voice), Express.js (Keep-alive).
* **Web:** React 19, Vite, [Tailwind CSS v4](https://tailwindcss.com/), Framer Motion, Lucide Icons, React Router v7.
* **Kiến trúc:** Monorepo quản lý tập trung với npm workspaces.

---

<div align="center">

Được phát triển với ❤️ bởi [DuyPhatpeo](https://github.com/DuyPhatpeo)

</div>
