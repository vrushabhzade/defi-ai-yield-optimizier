
import { motion } from 'framer-motion'
import { Shield, Zap, TrendingUp, Lock } from 'lucide-react'

export function DeFiMethods() {
    const methods = [
        {
            title: 'Yield Farming',
            description: 'Provide liquidity to DEXs and earn rewards in token pairs alongside trading fees.',
            icon: <Zap className="text-yellow-400" size={32} />,
            apy: '15-120%',
            risk: 'Medium-High'
        },
        {
            title: 'Staking',
            description: 'Lock your tokens to support network security and earn stable passive income.',
            icon: <Shield className="text-green-400" size={32} />,
            apy: '5-15%',
            risk: 'Low'
        },
        {
            title: 'Lending',
            description: 'Supply assets to lending protocols to earn interest from borrowers.',
            icon: <TrendingUp className="text-blue-400" size={32} />,
            apy: '2-10%',
            risk: 'Low-Medium'
        },
        {
            title: 'Real World Assets (RWA)',
            description: 'Invest in tokenized real-world assets like treasury bills and real estate.',
            icon: <Lock className="text-purple-400" size={32} />,
            apy: '4-8%',
            risk: 'Low'
        }
    ]

    return (
        <div className="page-container container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="page-title">DeFi <span className="gradient-text">Methods</span></h1>
                <p className="page-subtitle">Explore various strategies to maximize your crypto yields.</p>

                <div className="methods-grid">
                    {methods.map((method, index) => (
                        <motion.div
                            key={index}
                            className="method-card glass"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="method-icon-wrapper">
                                {method.icon}
                            </div>
                            <h3>{method.title}</h3>
                            <p>{method.description}</p>
                            <div className="method-stats">
                                <div className="stat">
                                    <span className="label">APY</span>
                                    <span className="value positive">{method.apy}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Risk</span>
                                    <span className={`value risk-badge risk-${method.risk.toLowerCase().split('-')[0]}`}>{method.risk}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
