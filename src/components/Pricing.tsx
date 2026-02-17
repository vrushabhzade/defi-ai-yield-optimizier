
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function Pricing() {
    const plans = [
        {
            name: 'Starter',
            price: 'Free',
            features: [
                'Basic Yield Analytics',
                'Manual Rebalancing',
                '5 Portfolio Assets',
                'Standard Support'
            ],
            recommended: false
        },
        {
            name: 'Pro',
            price: '$29/mo',
            features: [
                'Advanced AI Predictions',
                'Auto-Rebalancing',
                'Unlimited Assets',
                'Priority Support',
                'Gas Fee Optimization'
            ],
            recommended: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            features: [
                'Dedicated API Access',
                'Custom Risk Models',
                'Institutional Tools',
                '24/7 Dedicated Support',
                'On-Premise Deployment'
            ],
            recommended: false
        }
    ]

    return (
        <div className="page-container container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="pricing-header text-center mb-12">
                    <h1 className="page-title">Simple <span className="gradient-text">Pricing</span></h1>
                    <p className="page-subtitle">Choose the plan that fits your investing needs.</p>
                </div>

                <div className="pricing-grid grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`pricing-card glass p-8 rounded-xl relative ${plan.recommended ? 'border-2 border-blue-500' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    Recommended
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="text-4xl font-bold gradient-text mb-6">{plan.price}</div>

                            <ul className="features-list space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <Check className="text-green-400 mr-2" size={18} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'} w-full`}>
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
