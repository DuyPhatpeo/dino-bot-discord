# 🦖 DinoBot Discord

<div align="center">

![Discord.js](https://img.shields.io/badge/discord.js-v14.21.0-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

**DinoBot** là một Discord Bot đa năng được xây dựng bằng **Node.js** và **Discord.js v14**, hỗ trợ quản lý server (Moderation), giải trí (Fun), tiện ích (Utility) hoàn toàn thông qua hệ thống **Slash Commands (/)** hiện đại.

[Tính Năng](#-tính-năng-chính) • [Cài Đặt](#-cài-đặt-cục-bộ) • [Deploy Commands](#-đăng-ký-slash-commands) • [Triển Khai 24/7](#-triển-khai-lên-cloud-247) • [Cấu Trúc](#-cấu-trúc-thư-mục)

</div>

---

## 🚀 Tính Năng Chính

### 🛡️ Quản trị Server (Moderation)
* `/ban`: Cấm thành viên vi phạm khỏi server.
* `/unban`: Gỡ cấm (Unban) người dùng bằng User ID.
* `/kick`: Trục xuất thành viên khỏi server.
* `/mute`: Tạm khóa chat (Timeout) thành viên trong thời gian nhất định.
* `/unmute`: Gỡ phạt timeout cho thành viên.
* `/warn`: Cảnh cáo thành viên vi phạm.
* `/clear`: Xóa tin nhắn hàng loạt theo số lượng yêu cầu.
* `/lock`: Khóa kênh chat (chặn gửi tin nhắn) khi có sự cố.
* `/unlock`: Mở khóa lại kênh chat cho thành viên.
* `/slowmode`: Cài đặt thời gian làm chậm (giãn cách gửi tin nhắn) cho kênh.
* `/addrole`: Thêm hoặc gỡ Role cho thành viên.
* `/setwelcome`: Cài đặt kênh gửi thông báo chào đón thành viên mới.
* `/settempvoice`: Cài đặt kênh kích hoạt tạo phòng Voice tự động (Join-to-Create).
* `/nickname`: Đổi biệt danh của thành viên trong server.

### 🎲 Giải trí & Trò chơi (Fun)
* `/blackjack`: Chơi Xì Dách (21 điểm) đối đầu trực tiếp với DinoBot với giao diện nút bấm tương tác.
* `/baobuakeo`: Chơi Kéo - Búa - Bao với bot hoặc bạn bè.
* `/giveaway`: Tạo sự kiện phát quà/giveaway ngẫu nhiên cho thành viên.
* `/roll`: Lắc xúc xắc may mắn hoặc quay số ngẫu nhiên.
* `/random`: Chọn ngẫu nhiên một con số hoặc lựa chọn trong danh sách.

### 🛠️ Tiện ích & Thông tin (Utility)
* `/userinfo`: Xem thông tin chi tiết về người dùng (ngày tạo tài khoản, ngày join server, roles,...).
* `/poll`: Tạo cuộc bình chọn với các nút bấm tương tác trực tiếp.
* `/remindme`: Đặt lịch hẹn giờ để bot gửi thông báo nhắc nhở công việc.
* `/serverinfo`: Hiển thị thông tin chi tiết về server (thành viên, kênh, roles, ngày tạo,...).
* `/avatar`: Xem và tải ảnh đại diện chất lượng cao của thành viên hoặc server.
* `/help`: Hiển thị danh sách toàn bộ các lệnh và hướng dẫn sử dụng.
* `/ping`: Kiểm tra độ trễ (latency) của bot và Discord WebSocket API.
* `/say`: Gửi tin nhắn ẩn danh qua bot.

---

## 📁 Cấu Trúc Thư Mục

```text
dino-bot-discord/
├── src/
│   ├── commands/
│   │   ├── fun/             # Các lệnh trò chơi & giải trí (baobuakeo, giveaway, roll, random)
│   │   ├── moderation/      # Các lệnh quản trị (ban, kick, mute, warn, clear, addRole, nickname)
│   │   ├── slash/           # Các lệnh cơ bản (ping, say)
│   │   └── utility/         # Các lệnh tiện ích (help, avatar, serverinfo)
│   ├── events/              # Lắng nghe sự kiện Discord (ready, interactionCreate)
│   ├── handlers/            # Xử lý tương tác (commandHandler, buttonHandler, selectMenuHandler)
│   └── index.js             # File khởi chạy chính của Bot & Express Keep-alive Server
├── clear-commands.js        # Script xóa toàn bộ Slash Commands trên Discord API
├── deploy-commands.js       # Script đăng ký/cập nhật Slash Commands lên Discord API
├── example.env              # Mẫu biến môi trường
├── package.json
└── README.md
```

---

## 📦 Hướng Dẫn Cài Đặt Cục Bộ

### 1. Yêu cầu hệ thống
* [Node.js](https://nodejs.org/) phiên bản **18.x** trở lên.
* Trình quản lý gói `npm` hoặc `yarn`.

### 2. Clone dự án và cài đặt Dependencies
```bash
# Clone repository
git clone https://github.com/DuyPhatpeo/DinoBotDiscord.git

# Di chuyển vào thư mục dự án
cd DinoBotDiscord

# Cài đặt các thư viện cần thiết
npm install
```

### 3. Cấu hình Biến môi trường (.env)
Tạo file `.env` tại thư mục gốc của dự án (sao chép từ `example.env`):

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_discord_application_client_id
GUILD_ID=your_test_guild_server_id
PORT=3000
```

> **Cách lấy thông tin:**
> * `DISCORD_TOKEN` & `CLIENT_ID`: Lấy tại [Discord Developer Portal](https://discord.com/developers/applications) > Chọn Bot của bạn.
> * `GUILD_ID`: ID của server Discord bạn muốn test (Bật Developer Mode trên Discord > Chuột phải vào Icon Server > Copy Server ID).

---

## ⚡ Đăng Ký Slash Commands

Mỗi khi bạn thêm mới hoặc chỉnh sửa lệnh trong thư mục `src/commands/`, hãy chạy lệnh deploy để đồng bộ lên Discord:

```bash
# Đăng ký Slash Commands cho Guild (áp dụng tức thì)
npm run deploy

# Xóa toàn bộ Slash Commands nếu cần dọn dẹp
npm run clear
```

---

## ▶️ Khởi Chạy Bot

```bash
# Chạy ở chế độ phát triển (Tự reload khi sửa code bằng nodemon)
npm run dev

# Chạy ở chế độ Production
npm start
```

---

## 🌐 Triển Khai Lên Cloud 24/7

DinoBot đã được tích hợp sẵn một **Express Web Server** nhẹ ở cổng `PORT` (mặc định 3000) phục vụ việc keep-alive trên các nền tảng hosting miễn phí.

### 🔹 Bước 1: Deploy lên Render
1. Truy cập [Render Dashboard](https://dashboard.render.com/).
2. Chọn **New +** > **Web Service** và liên kết với repo GitHub của bạn.
3. Cấu hình thông số:
   * **Runtime:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `node deploy-commands.js && node src/index.js`
4. Trong mục **Environment Variables**, thêm đầy đủ các biến môi trường:
   * `DISCORD_TOKEN`
   * `CLIENT_ID`
   * `GUILD_ID` (nếu deploy guild)
   * `PORT` = `3000`
5. Nhấn **Create Web Service**. Sau khi deploy xong, Render sẽ cấp cho bạn một URL dạng `https://<ten-bot>.onrender.com`.

### 🔹 Bước 2: Giữ Bot Online 24/7 với UptimeRobot
1. Truy cập [UptimeRobot](https://dashboard.uptimerobot.com/) và đăng ký tài khoản.
2. Chọn **Add New Monitor**:
   * **Monitor Type:** `HTTP(s)`
   * **Friendly Name:** `DinoBot Keep Alive`
   * **URL (or IP):** Điền URL Render của bot (`https://<ten-bot>.onrender.com`)
   * **Monitoring Interval:** `5 minutes`
3. Nhấn **Create Monitor**. UptimeRobot sẽ tự động gửi request mỗi 5 phút để server Render không bị sleep.

---

## 🛠️ Công Nghệ Sử Dụng

* **[Node.js](https://nodejs.org/)** - Nền tảng thực thi JavaScript phía máy chủ.
* **[Discord.js v14](https://discord.js.org/)** - Thư viện chính thức tương tác với Discord API.
* **[Express.js](https://expressjs.com/)** - Web server phục vụ health check & keep-alive ping.
* **[Dotenv](https://www.npmjs.com/package/dotenv)** - Quản lý biến môi trường bảo mật.

---

## 🤝 Đóng Góp (Contributing)

Mọi đóng góp nhằm cải thiện tính năng cho **DinoBot** đều được hoan nghênh!
1. Fork dự án
2. Tạo branch tính năng mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi của bạn (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở một **Pull Request**

---

<div align="center">

Được phát triển với ❤️ bởi [DuyPhatpeo](https://github.com/DuyPhatpeo)

</div>
