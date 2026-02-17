
import { motion } from 'framer-motion'
import { Activity, ShieldCheck, Cpu, Globe } from 'lucide-react'

export function NOSPage() {
    const features = [
        {
            title: 'Decentralized Intelligence',
            description: 'Distributed AI nodes processing yield data in real-time across the BNB Chain.',
            icon: <Cpu className="text-blue-400" size={32} />
        },
        {
            title: 'Global State Management',
            description: 'Unified state synchronization for reliable and consistent APY tracking.',
            icon: <Globe className="text-purple-400" size={32} />
        },
        {
            title: 'Secure Validation',
            description: 'Multi-layer transaction validation via independent validator nodes.',
            icon: <ShieldCheck className="text-green-400" size={32} />
        },
        {
            title: 'High-Speed Consensus',
            description: 'Optimized consensus mechanism for sub-second decision making.',
            icon: <Activity className="text-orange-400" size={32} />
        }
    ]

    return (
        <div className="page-container container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="nos-header text-center mb-12">
                    <h1 className="page-title">Network Operating <span className="gradient-text">System</span></h1>
                    <p className="page-subtitle max-w-2xl mx-auto">
                        The underlying infrastructure powering the DeFi AI Yield Optimizer.
                        Secure, scalable, and built for the future of decentralized finance.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card glass p-6 rounded-xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="feature-icon mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="nos-stats mt-16 glass p-8 rounded-xl flex justify-around flex-wrap gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="stat-item text-center">
                        <div className="text-3xl font-bold gradient-text">99.99%</div>
                        <div className="text-gray-400">Uptime</div>
                    </div>
                    <div className="stat-item text-center">
                        <div className="text-3xl font-bold gradient-text">50ms</div>
                        <div className="text-gray-400">Latency</div>
                    </div>
                    <div className="stat-item text-center">
                        <div className="text-3xl font-bold gradient-text">10k+</div>
                        <div className="text-gray-400">Nodes</div>
                    </div>
                    <div className="stat-item text-center">
                        <div className="text-3xl font-bold gradient-text">Zero</div>
                        <div className="text-gray-400">Security Breaches</div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
