
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react'

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
)
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { WalletConnect } from './components/WalletConnect'
import { DeFiMethods } from './components/DeFiMethods'
import { Exchange } from './components/Exchange'
import { NOSPage } from './components/NOS'
import { Pricing } from './components/Pricing'
import { Bridge } from './components/Bridge'
import './App.css'

function App() {
  const [mounted, setMounted] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav glass">
        <div className="container nav-content">
          <Link to="/" className="logo">
            <Sparkles className="logo-icon" />
            <span className="logo-text gradient-text">DeFi AI Optimizer</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/methods" className={location.pathname === '/methods' ? 'active' : ''}>DeFi Methods</Link>
            <Link to="/exchange" className={location.pathname === '/exchange' ? 'active' : ''}>Exchange</Link>
            <Link to="/bridge" className={location.pathname === '/bridge' ? 'active' : ''}>Bridge</Link>
            <Link to="/nos" className={location.pathname === '/nos' ? 'active' : ''}>NOS</Link>
            <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Pricing</Link>
          </div>
          <div className="nav-actions">
            <button className="btn-secondary">Register</button>
            <WalletConnect />
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/bridge" element={
            <PageWrapper>
              <Bridge />
            </PageWrapper>
          } />
          <Route path="/" element={
            /* Hero & Dashboard wrapper */
            <PageWrapper>
              <section className="hero">
                <div className="container">
                  <div className="geometric-shapes">
                    <motion.div
                      className="shape shape-1"
                      animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="shape shape-2"
                      animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="shape shape-3"
                      animate={{ x: [-20, 20, -20], y: [0, -10, 0] }}
                      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      className="hero-badge glass"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.8 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <Zap size={16} />
                      <span>Powered by AI on BNB Chain</span>
                    </motion.div>

                    <h1 className="hero-title">
                      AI-Powered <span className="gradient-text">Yield Optimization</span>
                    </h1>

                    <p className="hero-description">
                      Maximize your DeFi returns with intelligent automated strategies.
                      Our AI analyzes real-time data to find the best opportunities across the BNB Chain ecosystem.
                    </p>

                    <div className="hero-cta">
                      <button className="btn-primary btn-large">
                        Join Us
                        <ArrowRight size={20} />
                      </button>
                      <button className="btn-secondary btn-large">
                        Let's Start Now
                      </button>
                    </div>

                    <motion.div
                      className="hero-stats"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <div className="stat-item glass">
                        <TrendingUp className="stat-icon" />
                        <div>
                          <div className="stat-value">$125M+</div>
                          <div className="stat-label">Total Value Locked</div>
                        </div>
                      </div>
                      <div className="stat-item glass">
                        <Shield className="stat-icon" />
                        <div>
                          <div className="stat-value">98.5%</div>
                          <div className="stat-label">Success Rate</div>
                        </div>
                      </div>
                      <div className="stat-item glass">
                        <Sparkles className="stat-icon" />
                        <div>
                          <div className="stat-value">45K+</div>
                          <div className="stat-label">Active Users</div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <section className="features">
                <div className="container">
                  <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    AI-Powered <span className="gradient-text">Yield Optimization</span>
                  </motion.h2>

                  <div className="features-grid">
                    <motion.div
                      className="feature-card glass"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                    >
                      <div className="feature-icon glow">
                        <TrendingUp size={32} />
                      </div>
                      <h3>Smart Yield Analysis</h3>
                      <p>AI analyzes thousands of DeFi pools in real-time to find the best risk-adjusted returns for your portfolio.</p>
                    </motion.div>

                    <motion.div
                      className="feature-card glass"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                    >
                      <div className="feature-icon glow-purple">
                        <Shield size={32} />
                      </div>
                      <h3>Risk Management</h3>
                      <p>Advanced risk scoring and portfolio diversification to protect your assets while maximizing returns.</p>
                    </motion.div>

                    <motion.div
                      className="feature-card glass"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                    >
                      <div className="feature-icon glow-pink">
                        <Zap size={32} />
                      </div>
                      <h3>Auto-Rebalancing</h3>
                      <p>Automated portfolio rebalancing based on market conditions and AI recommendations for optimal performance.</p>
                    </motion.div>
                  </div>
                </div>
              </section>

              <Dashboard />
            </PageWrapper>
          } />
          <Route path="/methods" element={<PageWrapper><DeFiMethods /></PageWrapper>} />
          <Route path="/exchange" element={<PageWrapper><Exchange /></PageWrapper>} />
          <Route path="/nos" element={<PageWrapper><NOSPage /></PageWrapper>} />
          <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
