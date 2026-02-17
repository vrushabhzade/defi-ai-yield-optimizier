import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './PortfolioChart.css'

const mockChartData = [
    { date: 'Jan 1', value: 8500 },
    { date: 'Jan 8', value: 9200 },
    { date: 'Jan 15', value: 8900 },
    { date: 'Jan 22', value: 10100 },
    { date: 'Jan 29', value: 10800 },
    { date: 'Feb 5', value: 11500 },
    { date: 'Feb 12', value: 12458 },
]

export function PortfolioChart() {
    return (
        <motion.div
            className="portfolio-chart glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="chart-header">
                <div>
                    <h3 className="chart-title">Portfolio Performance</h3>
                    <p className="chart-subtitle">Last 7 weeks</p>
                </div>
                <div className="chart-stats">
                    <div className="chart-stat">
                        <span className="stat-label">Total Gain</span>
                        <span className="stat-value positive">+$3,958</span>
                    </div>
                    <div className="chart-stat">
                        <span className="stat-label">ROI</span>
                        <span className="stat-value positive">+46.6%</span>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockChartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            stroke="#64748b"
                            style={{ fontSize: '0.875rem' }}
                        />
                        <YAxis
                            stroke="#64748b"
                            style={{ fontSize: '0.875rem' }}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 41, 0.9)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                padding: '12px',
                                backdropFilter: 'blur(10px)',
                            }}
                            labelStyle={{ color: '#cbd5e1', marginBottom: '8px' }}
                            itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
                            formatter={(value) => `$${Number(value).toLocaleString()}`}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}
