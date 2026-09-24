# ✝ The JCRGM Community

> **Official Church Community, Prayer Altar & Digital Fellowship Platform for Jesus Christ Reigns Gospel Ministry (JCRGM)**

An interactive, responsive WhatsApp-inspired church community application built with React, Vite, Tailwind CSS, Lucide Icons, and Capacitor for Android/iOS/Web cross-platform deployment.

---

## 🌟 Key Features

- **WhatsApp-Style Fellowship Layout**: Clean, familiar UI with dark/light themes, active room counters, and verified leadership badges.
- **Dedicated Ministry Channels**:
  - `📢 General Announcements`: Pinned pastoral bulletins and official church secretarial notices.
  - `🕊️ Sunday Live Service`: Liturgy discussion, choir lyrics, and live amens.
  - `🙏 Prayer Warriors & Altar Requests`: Interactive prayer requests with "Stand in Agreement" prayer counters.
  - `🌅 Daily Rhema & Scripture`: Morning manna and guided scripture devotionals.
  - `⚡ Youth & Young Adults (Ignite)`: Young professionals and campus fellowship.
  - `🌸 Daughters of Zion` & `🦁 Men of Valour`: Targeted departmental ministries.
  - `🌟 Praise Reports & Testimonies`: Sharing miracles and answered prayers.
  - `✉️ Pastoral Office`: Direct, confidential guidance desk with Pastor David.
- **Status & Rhema Stories**: 24-hour spiritual statuses with scripture anchors and one-tap "Reply Amen".
- **Built-in Holy Scripture (NKJV Bible Reader)**: Read, bookmark, copy, and send Bible passages directly into fellowship chats.
- **Audio Pulpit & Online Radio**: High-definition sermon podcast player with audio waveforms and 24/7 radio live stream.
- **Kingdom Giving & Tithes**: Malachi 3:10 compliant seed portal supporting Mobile Money (MTN, Airtel, M-Pesa), Card, and Bank deposits with instant receipts.
- **Live Prayer Line & Video Fellowship**: Audio and video intercession room with mute, video, and "Raise Hand" controls.

---

## 🚀 Quick Start (Local Development)

```bash
# Clone repository
git clone https://github.com/<YOUR-USERNAME>/jcrgm-community.git

# Enter project directory
cd jcrgm-community

# Install dependencies
npm install

# Start local development server
npm run dev
```

App runs at `http://localhost:5173`.

---

## 📱 Mobile App Generation (Capacitor Android)

### Run on Android Device / Emulator:
```bash
# Build the production assets
npm run build

# Sync with native Android code
npx cap sync android

# Open in Android Studio
npx cap open android
```

### Build APK via CLI:
```bash
cd android
./gradlew assembleDebug
```
Output APK is located at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## ☁️ Automated GitHub Actions Included

This repository comes with pre-configured CI/CD workflows:
1. **GitHub Pages Deployment** (`.github/workflows/deploy.yml`): Automatically builds and hosts the web app for free on GitHub Pages whenever you push to `main`.
2. **Android APK Builder** (`.github/workflows/build-apk.yml`): Automatically compiles your downloadable Android APK in GitHub's cloud so you don't even need Android Studio installed locally!

---

## 📜 License
Jesus Christ Reigns Gospel Ministry (JCRGM) &copy; 2026. All rights reserved.
