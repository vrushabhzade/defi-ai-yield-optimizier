import { http, createConfig } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// Use environment variable or fallback to public RPC
const bscRpcUrl = import.meta.env.VITE_BNB_RPC_URL || 'https://bsc-dataseed.binance.org/'
const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ''

export const config = createConfig({
    chains: [bsc, bscTestnet],
    connectors: [
        injected({ target: 'metaMask' }),
        ...(walletConnectProjectId ? [
            walletConnect({
                projectId: walletConnectProjectId,
                metadata: {
                    name: 'DeFi AI Yield Optimizer',
                    description: 'AI-powered yield optimization for BNB Chain',
                    url: 'https://defi-ai-optimizer.vercel.app',
                    icons: ['https://defi-ai-optimizer.vercel.app/icon.png']
                },
            })
        ] : []),
    ],
    transports: {
        [bsc.id]: http(bscRpcUrl),
        [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545/'),
    },
})

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}
