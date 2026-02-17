// DeFi Data Service - Fetches live data from DeFi protocols

export interface YieldPool {
    id: string
    protocol: string
    pool: string
    apy: number
    tvl: string
    tvlUsd: number
    risk: 'low' | 'medium' | 'high'
    tokens: string[]
    chain: string
    poolMeta?: string
}

/**
 * Fetch top yield pools from DeFiLlama
 * Filters for BNB Chain (Binance) pools
 */
export async function fetchDeFiLlamaPools(): Promise<YieldPool[]> {
    try {
        const response = await fetch('https://yields.llama.fi/pools')
        const data = await response.json()

        // Filter for BNB Chain pools and sort by TVL
        const bscPools = data.data
            .filter((pool: any) =>
                pool.chain === 'Binance' &&
                pool.tvlUsd > 1000000 && // Min $1M TVL
                pool.apy > 0
            )
            .sort((a: any, b: any) => b.tvlUsd - a.tvlUsd)
            .slice(0, 20) // Top 20 pools

        // Transform to our format
        return bscPools.map((pool: any) => ({
            id: pool.pool,
            protocol: pool.project,
            pool: pool.symbol,
            apy: pool.apy,
            tvl: formatTVL(pool.tvlUsd),
            tvlUsd: pool.tvlUsd,
            risk: calculateRisk(pool.apy, pool.tvlUsd),
            tokens: pool.symbol.split('-'),
            chain: pool.chain,
            poolMeta: pool.poolMeta,
        }))
    } catch (error) {
        console.error('Error fetching DeFiLlama pools:', error)
        return []
    }
}

/**
 * Fetch PancakeSwap specific data
 */
export async function fetchPancakeSwapPools(): Promise<YieldPool[]> {
    try {
        // Using PancakeSwap's public API
        const response = await fetch('https://api.pancakeswap.info/api/v2/pairs')
        const data = await response.json()

        // Get top pairs by liquidity
        const topPairs = Object.entries(data.data)
            .map(([id, pair]: [string, any]) => ({
                id,
                protocol: 'PancakeSwap',
                pool: `${pair.base_symbol}-${pair.quote_symbol}`,
                apy: 0, // Would need to calculate from fees
                tvl: formatTVL(parseFloat(pair.liquidity)),
                tvlUsd: parseFloat(pair.liquidity),
                risk: 'low' as const,
                tokens: [pair.base_symbol, pair.quote_symbol],
                chain: 'BSC',
            }))
            .sort((a, b) => b.tvlUsd - a.tvlUsd)
            .slice(0, 10)

        return topPairs
    } catch (error) {
        console.error('Error fetching PancakeSwap pools:', error)
        return []
    }
}

/**
 * Calculate risk level based on APY and TVL
 */
function calculateRisk(apy: number, tvlUsd: number): 'low' | 'medium' | 'high' {
    // High APY with low TVL = high risk
    if (apy > 50 && tvlUsd < 5000000) return 'high'
    if (apy > 30 && tvlUsd < 10000000) return 'medium'
    if (apy > 100) return 'high'
    if (apy > 40) return 'medium'
    return 'low'
}

/**
 * Format TVL to readable string
 */
function formatTVL(tvlUsd: number): string {
    if (tvlUsd >= 1000000000) {
        return `$${(tvlUsd / 1000000000).toFixed(2)}B`
    }
    if (tvlUsd >= 1000000) {
        return `$${(tvlUsd / 1000000).toFixed(2)}M`
    }
    if (tvlUsd >= 1000) {
        return `$${(tvlUsd / 1000).toFixed(2)}K`
    }
    return `$${tvlUsd.toFixed(2)}`
}

/**
 * Fetch protocol stats
 */
export async function fetchProtocolStats() {
    try {
        const response = await fetch('https://api.llama.fi/protocols')
        const data = await response.json()

        // Filter for BNB Chain protocols
        const bscProtocols = data.filter((p: any) =>
            p.chains?.includes('Binance') || p.chain === 'Binance'
        )

        return bscProtocols
    } catch (error) {
        console.error('Error fetching protocol stats:', error)
        return []
    }
}

/**
 * Get BNB price from DeFiLlama
 */
export async function getBNBPrice(): Promise<number> {
    try {
        const response = await fetch('https://coins.llama.fi/prices/current/bsc:0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
        const data = await response.json()
        const bnbData = data.coins['bsc:0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c']
        return bnbData?.price || 0
    } catch (error) {
        console.error('Error fetching BNB price:', error)
        return 0
    }
}

/**
 * Combine data from multiple sources
 */
export async function fetchAllYieldOpportunities(): Promise<YieldPool[]> {
    try {
        // Fetch from DeFiLlama (most comprehensive)
        const llamaPools = await fetchDeFiLlamaPools()

        // Filter for top protocols and diverse opportunities
        const topPools = llamaPools
            .filter(pool =>
                ['pancakeswap', 'venus', 'alpaca', 'biswap', 'thena'].includes(pool.protocol.toLowerCase())
            )
            .slice(0, 8)

        return topPools
    } catch (error) {
        console.error('Error fetching yield opportunities:', error)
        return []
    }
}
