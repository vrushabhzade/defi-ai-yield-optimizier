// Google Gemini AI Service - Intelligent DeFi Recommendations

import { GoogleGenerativeAI } from '@google/generative-ai'
import type { YieldPool } from './defiData'

// Initialize Gemini client
// Note: In production, API calls should go through a backend proxy
// For now, using client-side for demo purposes
const getClient = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY

    if (!apiKey) {
        console.warn('Gemini API key not found. AI features will be disabled.')
        return null
    }

    return new GoogleGenerativeAI(apiKey)
}

export interface AIRecommendation {
    action: string
    reasoning: string
    expectedAPY: number
    riskLevel: 'low' | 'medium' | 'high'
    confidence: number
    pools: string[]
}

export interface PortfolioAnalysis {
    summary: string
    recommendations: AIRecommendation[]
    riskAssessment: string
    diversificationScore: number
}

/**
 * Analyze portfolio and get AI recommendations
 */
export async function getPortfolioRecommendations(
    portfolioValue: number,
    currentAPY: number,
    yieldPools: YieldPool[]
): Promise<PortfolioAnalysis | null> {
    const genAI = getClient()

    if (!genAI) {
        // Return mock data if no API key
        return getMockRecommendation()
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
        const prompt = buildPortfolioPrompt(portfolioValue, currentAPY, yieldPools)

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return parseAIResponse(text)
    } catch (error) {
        console.error('Error getting AI recommendations:', error)
        return getMockRecommendation()
    }
}

/**
 * Build prompt for Gemini
 */
function buildPortfolioPrompt(
    portfolioValue: number,
    currentAPY: number,
    yieldPools: YieldPool[]
): string {
    const topPools = yieldPools.slice(0, 10)

    return `You are a DeFi yield optimization expert. Analyze this portfolio and provide recommendations.

Portfolio Details:
- Total Value: $${portfolioValue.toLocaleString()}
- Current Average APY: ${currentAPY}%

Available Yield Opportunities on BNB Chain:
${topPools.map((pool, i) =>
        `${i + 1}. ${pool.protocol} - ${pool.pool}
   APY: ${pool.apy.toFixed(1)}%
   TVL: ${pool.tvl}
   Risk: ${pool.risk}`
    ).join('\n\n')}

Please provide:
1. A brief portfolio analysis (2-3 sentences)
2. ONE specific recommendation for rebalancing
3. Expected APY improvement
4. Risk assessment
5. Confidence level (0-100%)

Format your response as a valid JSON object ONLY, without any markdown formatting or code blocks. The JSON structure must be:
{
  "summary": "brief analysis",
  "recommendation": {
    "action": "specific action to take",
    "reasoning": "why this is recommended",
    "expectedAPY": number,
    "riskLevel": "low|medium|high",
    "confidence": number,
    "pools": ["pool names"]
  },
  "riskAssessment": "overall risk analysis",
  "diversificationScore": number (0-100)
}`
}

/**
 * Parse Gemini's JSON response
 */
function parseAIResponse(text: string): PortfolioAnalysis {
    try {
        // Clean up text if it contains markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim()

        // Extract JSON from response
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
        if (!jsonMatch) throw new Error('No JSON found in response')

        const data = JSON.parse(jsonMatch[0])

        return {
            summary: data.summary,
            recommendations: [data.recommendation],
            riskAssessment: data.riskAssessment,
            diversificationScore: data.diversificationScore,
        }
    } catch (error) {
        console.error('Error parsing AI response:', error)
        return getMockRecommendation()
    }
}

/**
 * Mock recommendation when API is unavailable
 */
function getMockRecommendation(): PortfolioAnalysis {
    return {
        summary: "Based on current market conditions and your risk profile, your portfolio shows good diversification across major BNB Chain protocols.",
        recommendations: [{
            action: "Rebalance 35% of portfolio into BNB-BUSD pool on PancakeSwap",
            reasoning: "This will improve your risk-adjusted APY by 3.2% while maintaining low impermanent loss exposure due to the stable pairing.",
            expectedAPY: 3.2,
            riskLevel: 'low',
            confidence: 85,
            pools: ['PancakeSwap BNB-BUSD']
        }],
        riskAssessment: "Your current allocation maintains a balanced risk profile with exposure to established protocols.",
        diversificationScore: 78
    }
}

/**
 * Get quick AI insight for a specific pool
 */
export async function getPoolInsight(pool: YieldPool): Promise<string> {
    const genAI = getClient()

    if (!genAI) {
        return `${pool.protocol}'s ${pool.pool} pool offers ${pool.apy.toFixed(1)}% APY with ${pool.risk} risk. Consider your risk tolerance before investing.`
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
        const prompt = `Provide a brief 1-2 sentence insight about this DeFi yield opportunity:
Protocol: ${pool.protocol}
Pool: ${pool.pool}
APY: ${pool.apy.toFixed(1)}%
TVL: ${pool.tvl}
Risk: ${pool.risk}

Focus on key considerations for investors.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
    } catch (error) {
        console.error('Error getting pool insight:', error)
        return `${pool.protocol}'s ${pool.pool} pool offers ${pool.apy.toFixed(1)}% APY with ${pool.risk} risk.`
    }
}
