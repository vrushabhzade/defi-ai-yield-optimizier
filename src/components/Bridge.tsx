// import { SwapWidget, RelayKitProvider } from '@relayprotocol/relay-kit-ui'
import { motion } from 'framer-motion'
// import '@relayprotocol/relay-kit-ui/styles.css' 

export function Bridge() {
    /*
    const relayOptions = {
        appName: 'DeFi AI Optimizer',
    }
    */

    return (
        <div className="container py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Cross-Chain <span className="gradient-text">Bridge</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Seamlessly transfer assets from other networks to BNB Chain to start earning yield instantly.
                        Powered by Relay.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="glass p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10 max-w-md w-full text-center">
                        {/* Relay Provider Logic - Disabled due to build conflicts */}
                        {/* 
                 <RelayKitProvider options={relayOptions} theme={{ ... }}>
                    <SwapWidget ... />
                 </RelayKitProvider>
                 */}
                        <div className="p-6 border border-white/5 rounded-xl bg-white/5">
                            <h3 className="text-xl font-bold mb-2">Bridge Maintenance</h3>
                            <p className="text-gray-400 mb-4">
                                The cross-chain bridge is currently undergoing maintenance.
                                Please check back later or use an external bridge.
                            </p>
                            <a
                                href="https://relay.link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                Visit Relay.link
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-400 text-xl font-bold">1</div>
                        <h3 className="text-lg font-bold mb-2">Connect Wallet</h3>
                        <p className="text-gray-400 text-sm">Connect your wallet containing assets on other networks.</p>
                    </div>
                    <div className="glass p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 text-purple-400 text-xl font-bold">2</div>
                        <h3 className="text-lg font-bold mb-2">Bridge Assets</h3>
                        <p className="text-gray-400 text-sm">Move assets to BNB Chain quickly and securely.</p>
                    </div>
                    <div className="glass p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-4 text-pink-400 text-xl font-bold">3</div>
                        <h3 className="text-lg font-bold mb-2">Start Earning</h3>
                        <p className="text-gray-400 text-sm">Deposit bridged assets into yield pools instantly.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

