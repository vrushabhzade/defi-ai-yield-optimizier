# 🚀 DeFi AI Yield Optimizer

> **An AI-powered DeFi dashboard for optimizing yield farming strategies on BNB Chain with a stunning space-themed UI.**

![DeFi AI Optimizer](https://img.shields.io/badge/DeFi-AI%20Powered-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

---

## 📖 User Workflow

Follow this simple flow to get the most out of the platform:

1.  **🔌 Connect Wallet**
    - Click the "Connect Wallet" button in the top right.
    - Support for MetaMask, WalletConnect, and Trust Wallet.
    - View your real-time BNB balance immediately.

2.  **📊 View Dashboard**
    - Monitor your total portfolio value, average APY, and monthly earnings.
    - See live updates of your asset performance.

3.  **🤖 AI Optimization**
    - Click **"Optimize with Gemini"** to trigger the AI analysis.
    - Receive personalized recommendations based on market conditions.
    - Review risk scores and expected APY improvements.

4.  **💎 Explore Opportunities**
    - Browse the **Yield Opportunities** grid.
    - Filter by Risk Level (Low, Medium, High).
    - hover over cards for detailed APY and TVL stats.

5.  **🚀 Execute Investments**
    - Click "Invest Now" on any pool.
    - Enter your investment amount.
    - Approve and confirm the transaction on the blockchain.

---

## ✨ Key Features

### 🎨 Space-Themed Design
- **Animated starfield background** with twinkling stars.
- **Glassmorphism UI** with frosted glass effects.
- **Deep navy/purple color palette** with electric blue accents.

### 💼 Portfolio Management
- **Real-time portfolio tracking** with live value updates.
- **Interactive charts** showing performance trends.
- **AI-powered recommendations** for portfolio optimization.

### 🔗 Web3 Integration
- **Wagmi & Viem** for robust blockchain interactions.
- **Multi-wallet support** (MetaMask, WalletConnect).
- **Live formatting** of addresses and balances.

### 🌉 Cross-Chain Bridge
- **Integrated Relay Widget** for seamless asset transfers.
- **Bridge to BNB Chain** from Ethereum, Arbitrum, Optimism, etc.
- **Instant yield onboarding** after bridging.

### 🤖 AI Powered
- **Google Gemini Integration** for smart yield analysis.
- **Risk Assessment** with confidence scores.
- **Automated rebalancing suggestions**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Wagmi / Viem** | Web3 hooks and blockchain interaction |
| **Framer Motion** | Smooth animations and transitions |
| **Google Gemini SDK** | AI generation and analysis |
| **Tailwind CSS** | Utility-first styling (if applicable) or Custom CSS |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vrushabhzade/defi-ai-yield-optimizier.git

# 2. Navigate to project directory
cd defi-ai-yield-optimizier

# 3. Install dependencies
npm install

# 4. Set up Environment Variables
# Create a .env file and add your keys (see .env.example)
# VITE_GEMINI_API_KEY=your_key_here

# 5. Start development server
npm run dev
```

The app will be running at **http://localhost:5173/**

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
defi-ai-optimizer/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx      # Main dashboard with AI & Yields
│   │   ├── WalletConnect.tsx  # Wallet connection logic
│   │   ├── Skeleton.tsx       # Loading states
│   │   └── Tooltip.tsx        # Interactive tooltips
│   ├── services/
│   │   ├── geminiAI.ts        # Google Gemini AI integration
│   │   └── defiData.ts        # Mock/Real DeFi data fetcher
│   ├── App.tsx                # Main app layout & routing
│   └── main.tsx               # Entry point & Providers
├── public/                    # Static assets
└── vite.config.ts             # Vite configuration
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vrushabhzade/defi-ai-yield-optimizier/issues).

---

**Built with ❤️ using React, TypeScript, and AI**