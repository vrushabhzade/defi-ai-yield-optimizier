// Serverless function for Gemini AI recommendations
// This protects your API key by keeping it server-side

import { GoogleGenerativeAI } from '@google/generative-ai'

export const config = {
    runtime: 'edge',
}

interface RequestBody {
    portfolioValue: number
    currentAPY: number
    opportunities: Array<{
        pool: string
        protocol: string
        apy: number
        tvl: string
        tokens: string[]
    }>
}

export default async function handler(req: Request) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    try {
        const body: RequestBody = await req.json()
        const { portfolioValue, currentAPY, opportunities } = body

        // Check for API key
        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return new Response(
                JSON.stringify({
                    error: 'API key not configured',
                    recommendations: getMockRecommendations(),
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }

        // Initialize Gemini client
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

        // Create prompt for Gemini
        const prompt = `You are a DeFi yield optimization expert. Analyze this portfolio and provide recommendations.

Portfolio:
- Total Value: $${portfolioValue.toLocaleString()}
- Current APY: ${currentAPY.toFixed(2)}%

Available Yield Opportunities:
${opportunities.map((opp, i) => `${i + 1}. ${opp.pool} (${opp.protocol})
   - APY: ${opp.apy.toFixed(2)}%
   - TVL: ${opp.tvl}
   - Tokens: ${opp.tokens.join(', ')}`).join('\n')}

Provide a JSON response with:
1. "recommendations": array of 3-5 specific actions to take
2. "riskLevel": "Low", "Medium", or "High"
3. "expectedAPY": number (expected APY after rebalancing)
4. "confidence": number 0-100 (your confidence in this recommendation)
5. "diversificationScore": number 0-100 (portfolio diversification rating)

Focus on actionable, specific recommendations. Be concise.
IMPORTANT: Return ONLY valid JSON, no markdown formatting.`

        // Call Gemini API
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        // Clean up text if it contains markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim()

        // Parse JSON from response
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error('Could not parse JSON from Gemini response')
        }

        const analysis = JSON.parse(jsonMatch[0])

        return new Response(JSON.stringify(analysis), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Error in AI recommendations:', error)

        // Return mock recommendations on error
        return new Response(
            JSON.stringify({
                error: 'Failed to get AI recommendations',
                recommendations: getMockRecommendations(),
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
}

function getMockRecommendations() {
    return {
        recommendations: [
            'Consider diversifying into stable coin pools for lower risk',
            'Increase exposure to high-APY opportunities gradually',
            'Monitor gas fees and execute during low-traffic periods',
        ],
        riskLevel: 'Medium',
        expectedAPY: 12.5,
        confidence: 75,
        diversificationScore: 65,
    }
}
