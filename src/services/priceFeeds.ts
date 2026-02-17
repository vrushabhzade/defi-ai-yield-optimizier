// Price Feed Service - Real-time crypto prices

export interface TokenPrice {
    symbol: string
    price: number
    change24h: number
    lastUpdated: number
}

/**
 * Fetch multiple token prices from DeFiLlama
 */
export async function getTokenPrices(tokens: string[]): Promise<Map<string, TokenPrice>> {
    try {
        // Map common symbols to their contract addresses on BSC
        const tokenAddresses: Record<string, string> = {
            'BNB': 'bsc:0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
            'BUSD': 'bsc:0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
            'USDT': 'bsc:0x55d398326f99059fF775485246999027B3197955',
            'CAKE': 'bsc:0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
            'BSW': 'bsc:0x965F527D9159dCe6288a2219DB51fc6Eef120dD1',
            'BTCB': 'bsc:0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
            'ETH': 'bsc:0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        }

        // Build query string
        const addresses = tokens
            .map(t => tokenAddresses[t.toUpperCase()])
            .filter(Boolean)
            .join(',')

        if (!addresses) return new Map()

        const response = await fetch(`https://coins.llama.fi/prices/current/${addresses}`)
        const data = await response.json()

        const priceMap = new Map<string, TokenPrice>()

        Object.entries(data.coins || {}).forEach(([address, info]: [string, any]) => {
            const symbol = Object.entries(tokenAddresses).find(([_, addr]) => addr === address)?.[0]
            if (symbol) {
                priceMap.set(symbol, {
                    symbol,
                    price: info.price,
                    change24h: info.confidence || 0,
                    lastUpdated: Date.now(),
                })
            }
        })

        return priceMap
    } catch (error) {
        console.error('Error fetching token prices:', error)
        return new Map()
    }
}

/**
 * Get single token price
 */
export async function getTokenPrice(symbol: string): Promise<number> {
    const prices = await getTokenPrices([symbol])
    return prices.get(symbol.toUpperCase())?.price || 0
}

/**
 * Calculate portfolio value in USD
 */
export async function calculatePortfolioValue(holdings: Record<string, number>): Promise<number> {
    const tokens = Object.keys(holdings)
    const prices = await getTokenPrices(tokens)

    let totalValue = 0
    Object.entries(holdings).forEach(([token, amount]) => {
        const price = prices.get(token.toUpperCase())?.price || 0
        totalValue += amount * price
    })

    return totalValue
}

/**
 * Get historical price data (simplified - using current price)
 * In production, you'd use a service like CoinGecko for historical data
 */
export async function getHistoricalPrices(symbol: string, days: number = 7): Promise<Array<{ date: string, value: number }>> {
    // For now, return mock data based on current price
    // In production, integrate with CoinGecko or similar
    const currentPrice = await getTokenPrice(symbol)

    const data = []
    const now = Date.now()

    for (let i = days; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000)
        const variance = (Math.random() - 0.5) * 0.1 // ±5% variance
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: currentPrice * (1 + variance),
        })
    }

    return data
}
