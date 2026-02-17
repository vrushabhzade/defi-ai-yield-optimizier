
import { motion } from 'framer-motion'
import { ArrowLeftRight, Settings } from 'lucide-react'
import { useState } from 'react'

export function Exchange() {
    const [amount, setAmount] = useState('')
    const [fromToken, setFromToken] = useState('BNB')
    const [toToken, setToToken] = useState('BUSD')

    return (
        <div className="page-container container flex-center">
            <motion.div
                className="exchange-card glass"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="exchange-header">
                    <h2>Swap Tokens</h2>
                    <Settings size={20} className="cursor-pointer hover:text-blue-400" />
                </div>

                <div className="swap-section">
                    <div className="token-input-container">
                        <div className="label-row">
                            <span>From</span>
                            <span>Balance: 2.45</span>
                        </div>
                        <div className="input-row">
                            <input
                                type="number"
                                placeholder="0.0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <button className="token-select">
                                <img src={`https://pancakeswap.finance/images/tokens/${fromToken === 'BNB' ? '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' : ''}.png`} alt="" className="token-icon" />
                                {fromToken}
                            </button>
                        </div>
                    </div>

                    <div className="swap-divider">
                        <button className="swap-button" onClick={() => {
                            const temp = fromToken
                            setFromToken(toToken)
                            setToToken(temp)
                        }}>
                            <ArrowLeftRight size={20} />
                        </button>
                    </div>

                    <div className="token-input-container">
                        <div className="label-row">
                            <span>To (Estimated)</span>
                            <span>Balance: 0.00</span>
                        </div>
                        <div className="input-row">
                            <input
                                type="number"
                                placeholder="0.0"
                                readOnly
                                value={amount ? (parseFloat(amount) * 320).toString() : ''}
                            />
                            <button className="token-select">
                                {toToken}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="exchange-info">
                    <div className="info-row">
                        <span>Slippage Tolerance</span>
                        <span>0.5%</span>
                    </div>
                    <div className="info-row">
                        <span>Price Impact</span>
                        <span className="positive">&lt;0.01%</span>
                    </div>
                    <div className="info-row">
                        <span>Route</span>
                        <span>BNB &gt; BUSD</span>
                    </div>
                </div>

                <button className="btn-primary full-width mt-4">Connect Wallet to Swap</button>
            </motion.div>
        </div>
    )
}
