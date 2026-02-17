// Transaction Service - DeFi Protocol Interactions

import { type Address, parseUnits } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'

// Common ERC20 ABI for token approvals
export const ERC20_ABI = [
    {
        name: 'approve',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
    },
    {
        name: 'allowance',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
        ],
        outputs: [{ name: '', type: 'uint256' }],
    },
    {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
    },
] as const

// PancakeSwap Router ABI (simplified)
export const PANCAKESWAP_ROUTER_ABI = [
    {
        name: 'addLiquidity',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'tokenA', type: 'address' },
            { name: 'tokenB', type: 'address' },
            { name: 'amountADesired', type: 'uint256' },
            { name: 'amountBDesired', type: 'uint256' },
            { name: 'amountAMin', type: 'uint256' },
            { name: 'amountBMin', type: 'uint256' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' },
        ],
        outputs: [
            { name: 'amountA', type: 'uint256' },
            { name: 'amountB', type: 'uint256' },
            { name: 'liquidity', type: 'uint256' },
        ],
    },
    {
        name: 'removeLiquidity',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'tokenA', type: 'address' },
            { name: 'tokenB', type: 'address' },
            { name: 'liquidity', type: 'uint256' },
            { name: 'amountAMin', type: 'uint256' },
            { name: 'amountBMin', type: 'uint256' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' },
        ],
        outputs: [
            { name: 'amountA', type: 'uint256' },
            { name: 'amountB', type: 'uint256' },
        ],
    },
] as const

// Contract addresses on BSC Mainnet
export const CONTRACTS = {
    PANCAKESWAP_ROUTER: '0x10ED43C718714eb63d5aA57B78B54704E256024E' as Address,
    BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' as Address,
    BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' as Address,
    USDT: '0x55d398326f99059fF775485246999027B3197955' as Address,
    CAKE: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' as Address,
}

export interface TransactionStatus {
    isPending: boolean
    isSuccess: boolean
    isError: boolean
    error: Error | null
    hash?: Address
}

/**
 * Hook for token approval
 */
export function useTokenApproval() {
    const { writeContract, data: hash, error, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    const approve = async (
        tokenAddress: Address,
        spenderAddress: Address,
        amount: bigint
    ) => {
        writeContract({
            address: tokenAddress,
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [spenderAddress, amount],
        })
    }

    return {
        approve,
        isPending: isPending || isConfirming,
        isSuccess,
        error,
        hash,
    }
}

/**
 * Hook to check token allowance
 */
export function useTokenAllowance(
    tokenAddress: Address | undefined,
    ownerAddress: Address | undefined,
    spenderAddress: Address
) {
    const { data: allowance } = useReadContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: ownerAddress ? [ownerAddress, spenderAddress] : undefined,
    })

    return allowance as bigint | undefined
}

/**
 * Hook for adding liquidity to PancakeSwap
 */
export function useAddLiquidity() {
    const { writeContract, data: hash, error, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    const addLiquidity = async (
        tokenA: Address,
        tokenB: Address,
        amountA: string,
        amountB: string,
        slippage: number = 0.5, // 0.5% default slippage
        userAddress: Address
    ) => {
        const amountADesired = parseUnits(amountA, 18)
        const amountBDesired = parseUnits(amountB, 18)

        // Calculate minimum amounts with slippage
        const slippageMultiplier = BigInt(Math.floor((100 - slippage) * 100))
        const amountAMin = (amountADesired * slippageMultiplier) / BigInt(10000)
        const amountBMin = (amountBDesired * slippageMultiplier) / BigInt(10000)

        // Deadline: 20 minutes from now
        const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200)

        writeContract({
            address: CONTRACTS.PANCAKESWAP_ROUTER,
            abi: PANCAKESWAP_ROUTER_ABI,
            functionName: 'addLiquidity',
            args: [
                tokenA,
                tokenB,
                amountADesired,
                amountBDesired,
                amountAMin,
                amountBMin,
                userAddress,
                deadline,
            ],
        })
    }

    return {
        addLiquidity,
        isPending: isPending || isConfirming,
        isSuccess,
        error,
        hash,
    }
}

/**
 * Hook for removing liquidity from PancakeSwap
 */
export function useRemoveLiquidity() {
    const { writeContract, data: hash, error, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    const removeLiquidity = async (
        tokenA: Address,
        tokenB: Address,
        liquidityAmount: string,
        userAddress: Address
    ) => {
        const liquidity = parseUnits(liquidityAmount, 18)

        // Minimum amounts (simplified - would need pool reserves for accurate calculation)
        const amountAMin = BigInt(0) // Should calculate based on pool reserves
        const amountBMin = BigInt(0)

        const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200)

        writeContract({
            address: CONTRACTS.PANCAKESWAP_ROUTER,
            abi: PANCAKESWAP_ROUTER_ABI,
            functionName: 'removeLiquidity',
            args: [
                tokenA,
                tokenB,
                liquidity,
                amountAMin,
                amountBMin,
                userAddress,
                deadline,
            ],
        })
    }

    return {
        removeLiquidity,
        isPending: isPending || isConfirming,
        isSuccess,
        error,
        hash,
    }
}

/**
 * Format transaction hash for display
 */
export function formatTxHash(hash: string): string {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}

/**
 * Get BSCScan URL for transaction
 */
export function getTxUrl(hash: string, testnet: boolean = false): string {
    const baseUrl = testnet ? 'https://testnet.bscscan.com' : 'https://bscscan.com'
    return `${baseUrl}/tx/${hash}`
}

/**
 * Calculate slippage amount
 */
export function calculateSlippage(amount: bigint, slippagePercent: number): bigint {
    const slippageMultiplier = BigInt(Math.floor((100 - slippagePercent) * 100))
    return (amount * slippageMultiplier) / BigInt(10000)
}
