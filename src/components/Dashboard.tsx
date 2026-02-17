import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Activity, RefreshCw, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PortfolioChart } from './PortfolioChart'
import { TransactionModal } from './TransactionModal'
import { Skeleton } from './Skeleton'
import { Tooltip } from './Tooltip'
import { fetchAllYieldOpportunities, type YieldPool } from '../services/defiData'
import { getPortfolioRecommendations, type PortfolioAnalysis } from '../services/geminiAI'
import './Dashboard.css'

export function Dashboard() {
    const [opportunities, setOpportunities] = useState<YieldPool[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
    const [aiAnalysis, setAiAnalysis] = useState<PortfolioAnalysis | null>(null)
    const [aiLoading, setAiLoading] = useState(false)
    const [selectedPool, setSelectedPool] = useState<YieldPool | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleInvest = (pool: YieldPool) => {
        setSelectedPool(pool)
        setIsModalOpen(true)
    }

    const loadYieldData = async () => {
        setLoading(true)
        try {
            const data = await fetchAllYieldOpportunities()
            setOpportunities(data)
            setLastUpdated(new Date())
        } catch (error) {
            console.error('Failed to load yield data:', error)
        } finally {
            setLoading(false)
        }
    }

    const runAIAnalysis = async () => {
        if (opportunities.length === 0) return

        setAiLoading(true)
        try {
            const analysis = await getPortfolioRecommendations(
                12458.32, // Mock portfolio value
                28.3,     // Mock current APY
                opportunities
            )
            setAiAnalysis(analysis)
        } catch (error) {
            console.error('Failed to load AI recommendations:', error)
        } finally {
            setAiLoading(false)
        }
    }

    useEffect(() => {
        loadYieldData()

        // Refresh data every 5 minutes
        const interval = setInterval(loadYieldData, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    // Load AI recommendations when opportunities are loaded
    useEffect(() => {
        if (opportunities.length > 0 && !aiAnalysis) {
            runAIAnalysis()
        }
    }, [opportunities])

    return (
        <div className="dashboard">
            <div className="container">
                {/* Portfolio Overview */}
                <motion.div
                    className="portfolio-overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="dashboard-title">
                        Your <span className="gradient-text">Portfolio</span>
                    </h2>

                    <div className="portfolio-grid">
                        <div className="portfolio-card glass">
                            <div className="card-header">
                                <DollarSign className="card-icon" />
                                <span className="card-label">Total Value</span>
                            </div>
                            <div className="card-value">$12,458.32</div>
                            <div className="card-change positive">
                                <TrendingUp size={16} />
                                <span>+8.5% (24h)</span>
                            </div>
                        </div>

                        <div className="portfolio-card glass">
                            <div className="card-header">
                                <Activity className="card-icon" />
                                <div className="flex items-center gap-2">
                                    <span className="card-label">Average APY</span>
                                    <Tooltip content="Annual Percentage Yield: The real rate of return earned on an investment, taking into account the effect of compounding interest." />
                                </div>
                            </div>
                            <div className="card-value">28.3%</div>
                            <div className="card-change positive">
                                <TrendingUp size={16} />
                                <span>+2.1%</span>
                            </div>
                        </div>

                        <div className="portfolio-card glass">
                            <div className="card-header">
                                <TrendingUp className="card-icon" />
                                <span className="card-label">Monthly Earnings</span>
                            </div>
                            <div className="card-value">$293.45</div>
                            <div className="card-change positive">
                                <TrendingUp size={16} />
                                <span>+12.3%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Portfolio Performance Chart */}
                <PortfolioChart />

                {/* AI Recommendations */}
                <motion.div
                    className="ai-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="section-header">
                        <h2 className="dashboard-title">
                            Gemini AI <span className="gradient-text">Recommendations</span>
                        </h2>
                        <div className="flex items-center gap-4">
                            <Tooltip content="Gemini AI analyzes market volatility, liquidity depth, and historical performance to generate personalized yield strategies." />
                            <button
                                className="btn-primary"
                                onClick={runAIAnalysis}
                                disabled={aiLoading || opportunities.length === 0}
                            >
                                <Sparkles size={16} className={aiLoading ? 'spinning' : ''} />
                                <span>{aiLoading ? 'Analyzing...' : 'Optimize with Gemini'}</span>
                            </button>
                        </div>
                    </div>

                    {aiLoading ? (
                        <div className="ai-insight glass">
                            <div className="ai-badge">
                                <span className="ai-badge-icon">🤖</span>
                                <span>Gemini AI Analysis</span>
                            </div>
                            <Skeleton height="20px" width="80%" className="mb-4" />
                            <Skeleton height="20px" width="90%" className="mb-4" />
                            <Skeleton height="20px" width="60%" className="mb-8" />

                            <div className="ai-recommendation space-y-4">
                                <Skeleton height="80px" className="mb-4" />
                                <Skeleton height="80px" className="mb-4" />
                            </div>
                        </div>
                    ) : aiAnalysis ? (
                        <div className="ai-insight glass">
                            <div className="ai-badge">
                                <span className="ai-badge-icon">🤖</span>
                                <span>Gemini AI Analysis</span>
                            </div>

                            <p className="ai-summary">{aiAnalysis.summary}</p>

                            {aiAnalysis.recommendations.map((rec, index) => (
                                <div key={index} className="ai-recommendation">
                                    <p className="ai-message">
                                        <strong>Recommendation:</strong> {rec.action}
                                    </p>
                                    <p className="ai-reasoning">{rec.reasoning}</p>

                                    <div className="ai-stats">
                                        <div className="ai-stat">
                                            <span className="ai-stat-label">Expected APY Increase</span>
                                            <span className="ai-stat-value positive">+{rec.expectedAPY.toFixed(1)}%</span>
                                        </div>
                                        <div className="ai-stat">
                                            <span className="ai-stat-label">Risk Level</span>
                                            <span className={`ai-stat-value risk-${rec.riskLevel}`}>
                                                {rec.riskLevel.charAt(0).toUpperCase() + rec.riskLevel.slice(1)}
                                            </span>
                                        </div>
                                        <div className="ai-stat">
                                            <span className="ai-stat-label">Confidence</span>
                                            <span className="ai-stat-value">{rec.confidence}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="ai-footer">
                                <p className="ai-risk-note">
                                    <strong>Risk Assessment:</strong> {aiAnalysis.riskAssessment}
                                </p>
                                <p className="ai-diversification">
                                    Diversification Score: <strong>{aiAnalysis.diversificationScore}/100</strong>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="ai-insight glass text-center py-12">
                            <Sparkles size={48} className="mx-auto mb-4 text-blue-400 opacity-50" />
                            <p className="text-xl text-gray-400">
                                Click "Optimize with Gemini" to get AI-powered recommendations
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Yield Opportunities */}
                <motion.div
                    className="opportunities-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="section-header">
                        <h2 className="dashboard-title">
                            Top <span className="gradient-text">Yield Opportunities</span>
                        </h2>
                        <button
                            className="btn-refresh"
                            onClick={loadYieldData}
                            disabled={loading}
                        >
                            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
                            <span>{loading ? 'Loading...' : 'Refresh'}</span>
                        </button>
                    </div>

                    {lastUpdated && !loading && (
                        <p className="last-updated">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </p>
                    )}

                    <div className="opportunities-grid">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="portfolio-card glass h-64 p-6">
                                    <div className="flex justify-between mb-4">
                                        <Skeleton height="24px" width="40%" />
                                        <Skeleton height="24px" width="20%" />
                                    </div>
                                    <div className="flex justify-center my-6">
                                        <Skeleton height="40px" width="50%" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton height="16px" width="100%" />
                                        <Skeleton height="16px" width="80%" />
                                    </div>
                                    <Skeleton height="40px" width="100%" className="mt-6" />
                                </div>
                            ))
                        ) : (
                            opportunities.map((opp, index) => (
                                <motion.div
                                    key={opp.id}
                                    className="opportunity-card glass"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                                >
                                    <div className="opp-header">
                                        <div>
                                            <div className="opp-protocol">{opp.protocol}</div>
                                            <div className="opp-pool">{opp.pool}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`risk-badge risk-${opp.risk}`}>
                                                {opp.risk}
                                            </div>
                                            <Tooltip content="Risk Score based on contract audit, time-lock, and liquidity depth." />
                                        </div>
                                    </div>

                                    <div className="opp-apy">
                                        <span className="apy-value">{opp.apy.toFixed(1)}%</span>
                                        <span className="apy-label">APY</span>
                                    </div>

                                    <div className="opp-details">
                                        <div className="opp-detail">
                                            <div className="flex items-center gap-2">
                                                <span className="detail-label">TVL</span>
                                                <Tooltip content="Total Value Locked: The total amount of assets currently staked in this pool." />
                                            </div>
                                            <span className="detail-value">{opp.tvl}</span>
                                        </div>
                                        <div className="opp-tokens">
                                            {opp.tokens.map((token, i) => (
                                                <span key={i} className="token-badge">{token}</span>
                                            ))}
                                        </div>

                                        <button
                                            className="btn-invest"
                                            onClick={() => handleInvest(opp)}
                                        >
                                            Invest Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Transaction Modal */}
                {selectedPool && (
                    <TransactionModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        poolName={selectedPool.pool}
                        protocol={selectedPool.protocol}
                        apy={selectedPool.apy}
                    />
                )}
            </div>
        </div>
    )
}
