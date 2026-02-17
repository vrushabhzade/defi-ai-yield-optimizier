// Transaction Modal Component

import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle, Loader, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { parseUnits } from 'viem'
import { useTokenApproval, useAddLiquidity, CONTRACTS, getTxUrl, formatTxHash } from '../services/transactions'
import './TransactionModal.css'

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    poolName: string
    protocol: string
    apy: number
}

export function TransactionModal({ isOpen, onClose, poolName, protocol, apy }: TransactionModalProps) {
    const { address } = useAccount()
    const [amount, setAmount] = useState('')
    const [step, setStep] = useState<'input' | 'approve' | 'deposit' | 'success'>('input')

    const { approve, isPending: isApproving, isSuccess: isApproved, hash: approveHash } = useTokenApproval()
    const { addLiquidity, isPending: isDepositing, isSuccess: isDeposited, hash: depositHash } = useAddLiquidity()

    const handleApprove = async () => {
        if (!amount || !address) return

        setStep('approve')
        const amountBigInt = parseUnits(amount, 18)

        // Approve BUSD for PancakeSwap Router
        await approve(
            CONTRACTS.BUSD,
            CONTRACTS.PANCAKESWAP_ROUTER,
            amountBigInt
        )
    }

    const handleDeposit = async () => {
        if (!amount || !address) return

        setStep('deposit')

        // Example: Add liquidity to BNB-BUSD pool
        // In production, you'd determine token addresses from the pool
        await addLiquidity(
            CONTRACTS.BNB,
            CONTRACTS.BUSD,
            amount,
            amount, // Simplified - would need price ratio
            0.5, // 0.5% slippage
            address
        )
    }

    // Auto-advance when approval succeeds
    if (isApproved && step === 'approve') {
        setStep('deposit')
    }

    // Auto-advance when deposit succeeds
    if (isDeposited && step === 'deposit') {
        setStep('success')
    }

    const resetModal = () => {
        setStep('input')
        setAmount('')
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetModal}
                    />
                    <motion.div
                        className="transaction-modal glass"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    >
                        <div className="modal-header">
                            <div>
                                <h2>Invest in {poolName}</h2>
                                <p className="modal-subtitle">{protocol} • {apy.toFixed(1)}% APY</p>
                            </div>
                            <button className="btn-close" onClick={resetModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            {step === 'input' && (
                                <div className="input-section">
                                    <label className="input-label">Amount to Invest</label>
                                    <div className="input-wrapper">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="amount-input"
                                        />
                                        <span className="input-currency">BUSD</span>
                                    </div>

                                    <div className="transaction-details">
                                        <div className="detail-row">
                                            <span>Expected APY</span>
                                            <span className="detail-value positive">{apy.toFixed(1)}%</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Est. Annual Return</span>
                                            <span className="detail-value">
                                                ${amount ? (parseFloat(amount) * (apy / 100)).toFixed(2) : '0.00'}
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Network Fee</span>
                                            <span className="detail-value">~$0.50</span>
                                        </div>
                                    </div>

                                    <button
                                        className="btn-primary btn-full"
                                        onClick={handleApprove}
                                        disabled={!amount || parseFloat(amount) <= 0 || !address}
                                    >
                                        Continue
                                    </button>
                                </div>
                            )}

                            {step === 'approve' && (
                                <div className="status-section">
                                    <div className="status-icon">
                                        {isApproving ? (
                                            <Loader className="spinning" size={48} />
                                        ) : isApproved ? (
                                            <CheckCircle size={48} color="#10b981" />
                                        ) : (
                                            <AlertCircle size={48} color="#f59e0b" />
                                        )}
                                    </div>
                                    <h3>{isApproved ? 'Approved!' : 'Approve Token'}</h3>
                                    <p className="status-message">
                                        {isApproving
                                            ? 'Waiting for approval confirmation...'
                                            : isApproved
                                                ? 'Token approved successfully. Ready to deposit.'
                                                : 'Approve BUSD to interact with the pool'}
                                    </p>

                                    {approveHash && (
                                        <a
                                            href={getTxUrl(approveHash)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tx-link"
                                        >
                                            View on BSCScan <ExternalLink size={14} />
                                        </a>
                                    )}

                                    {isApproved && (
                                        <button className="btn-primary btn-full" onClick={handleDeposit}>
                                            Proceed to Deposit
                                        </button>
                                    )}
                                </div>
                            )}

                            {step === 'deposit' && (
                                <div className="status-section">
                                    <div className="status-icon">
                                        {isDepositing ? (
                                            <Loader className="spinning" size={48} />
                                        ) : isDeposited ? (
                                            <CheckCircle size={48} color="#10b981" />
                                        ) : (
                                            <AlertCircle size={48} color="#f59e0b" />
                                        )}
                                    </div>
                                    <h3>{isDeposited ? 'Success!' : 'Depositing'}</h3>
                                    <p className="status-message">
                                        {isDepositing
                                            ? 'Confirming your deposit...'
                                            : isDeposited
                                                ? `Successfully deposited ${amount} BUSD into ${poolName}`
                                                : 'Confirm the transaction in your wallet'}
                                    </p>

                                    {depositHash && (
                                        <a
                                            href={getTxUrl(depositHash)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tx-link"
                                        >
                                            {formatTxHash(depositHash)} <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            )}

                            {step === 'success' && (
                                <div className="status-section">
                                    <div className="status-icon">
                                        <CheckCircle size={48} color="#10b981" />
                                    </div>
                                    <h3>Investment Complete!</h3>
                                    <p className="status-message">
                                        You've successfully invested {amount} BUSD into {poolName}
                                    </p>

                                    <div className="success-details">
                                        <div className="detail-row">
                                            <span>Amount Invested</span>
                                            <span className="detail-value">{amount} BUSD</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Expected APY</span>
                                            <span className="detail-value positive">{apy.toFixed(1)}%</span>
                                        </div>
                                    </div>

                                    {depositHash && (
                                        <a
                                            href={getTxUrl(depositHash)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tx-link"
                                        >
                                            View Transaction <ExternalLink size={14} />
                                        </a>
                                    )}

                                    <button className="btn-primary btn-full" onClick={resetModal}>
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
