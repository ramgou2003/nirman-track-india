# KHUSHI Homes - Construction Management PWA

A modern, responsive Progressive Web App for construction project management built with React, TypeScript, and Tailwind CSS.

## 🏗️ Features

- **Project Management**: Create, edit, and track construction projects
- **Financial Tracking**: Monitor expenses, payments, and net balance
- **Client Management**: Organize client information and project details
- **Progressive Web App**: Install on any device for native app experience
- **Offline Support**: Core functionality works without internet connection
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with blue theme

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ramgou2003/nirman-track-india.git
   cd nirman-track-india
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Deployment to Vercel

### Quick Deploy

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add PWA features and Vercel config"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically

For detailed deployment instructions, see [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI Components
- **Routing**: React Router DOM
- **State Management**: React Hooks, Local Storage
- **PWA**: Service Worker, Web App Manifest
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📱 PWA Features

- **Installable**: Add to home screen on any device
- **Offline Capable**: Works without internet connection
- **Fast Loading**: Cached resources for instant access
- **Native Feel**: Standalone app window
- **Push Ready**: Foundation for future notifications

## 📁 Project Structure

```
khushi-homes/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── *.svg                  # App icons
├── src/
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── types/                 # TypeScript type definitions
│   └── contexts/              # React contexts
├── vercel.json               # Vercel configuration
└── vite.config.ts           # Vite configuration
```

## 💾 Data Storage

- **Local Storage**: All data stored locally in browser
- **No Backend Required**: Fully client-side application
- **Data Persistence**: Data survives browser restarts
- **Export Ready**: Easy to add data export features

## 📄 Documentation

- [PWA Setup Guide](./PWA-SETUP.md) - Complete PWA implementation details
- [Vercel Deployment Guide](./VERCEL-DEPLOYMENT.md) - Step-by-step deployment instructions

## 🎯 Roadmap

- [ ] Push notifications for project updates
- [ ] Data export/import functionality
- [ ] Advanced reporting and analytics
- [ ] Multi-user support with authentication
- [ ] Cloud data synchronization

---

Built with ❤️ for the construction industry
