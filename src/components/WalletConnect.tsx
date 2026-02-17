import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ChevronDown, ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import './WalletConnect.css'

export function WalletConnect() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [copied, setCopied] = useState(false)

    const { address, isConnected, chain } = useAccount()
    const { connect, connectors, isPending } = useConnect()
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({ address })

    const handleConnect = (connectorId: string) => {
        const connector = connectors.find(c => c.id === connectorId)
        if (connector) {
            connect({ connector })
            setShowDropdown(false)
        }
    }

    const handleDisconnect = () => {
        disconnect()
        setShowDropdown(false)
    }

    const copyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    const formatBalance = (bal: bigint) => {
        return parseFloat(formatEther(bal)).toFixed(4)
    }

    return (
        <div className="wallet-connect">
            {!isConnected ? (
                <motion.button
                    className="btn-wallet"
                    onClick={() => setShowDropdown(!showDropdown)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isPending}
                >
                    <Wallet size={20} />
                    <span>{isPending ? 'Connecting...' : 'Connect Wallet'}</span>
                    <ChevronDown size={16} />
                </motion.button>
            ) : (
                <motion.button
                    className="btn-wallet connected"
                    onClick={() => setShowDropdown(!showDropdown)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="wallet-indicator" />
                    <span>{formatAddress(address!)}</span>
                    <ChevronDown size={16} />
                </motion.button>
            )}

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        className="wallet-dropdown glass"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {!isConnected ? (
                            <>
                                {connectors.map((connector) => (
                                    <button
                                        key={connector.id}
                                        className="wallet-option"
                                        onClick={() => handleConnect(connector.id)}
                                        disabled={isPending}
                                    >
                                        <div className="wallet-icon">
                                            {connector.name === 'MetaMask' && '🦊'}
                                            {connector.name === 'WalletConnect' && '🔗'}
                                            {connector.name === 'Injected' && '💼'}
                                        </div>
                                        <span>{connector.name}</span>
                                    </button>
                                ))}
                            </>
                        ) : (
                            <>
                                <div className="wallet-info">
                                    <div className="wallet-network">
                                        <span className="network-label">Network</span>
                                        <span className="network-value">{chain?.name || 'Unknown'}</span>
                                    </div>

                                    <div className="wallet-balance">
                                        <span className="balance-label">Balance</span>
                                        <span className="balance-value">
                                            {balance ? `${formatBalance(balance.value)} ${balance.symbol}` : '0.0000 BNB'}
                                        </span>
                                    </div>

                                    <div className="wallet-address">
                                        <span>{formatAddress(address!)}</span>
                                        <button
                                            className="btn-copy"
                                            onClick={copyAddress}
                                            title="Copy address"
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                        <a
                                            href={`${chain?.blockExplorers?.default.url}/address/${address}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-explorer"
                                            title="View on explorer"
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>

                                <button
                                    className="wallet-option disconnect"
                                    onClick={handleDisconnect}
                                >
                                    <span>Disconnect</span>
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
