
import { useState } from 'react'
import { Info } from 'lucide-react'

interface TooltipProps {
    content: string
    children?: React.ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className="tooltip-container relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children ? children : <Info size={14} className="text-gray-400 cursor-help hover:text-white transition-colors" />}

            {isVisible && (
                <div className="tooltip-content absolute z-50 w-64 p-3 text-sm text-white bg-slate-800 rounded-lg shadow-xl border border-slate-700 -translate-x-1/2 left-1/2 bottom-full mb-2">
                    {content}
                    <div className="tooltip-arrow absolute left-1/2 -ml-1 top-full w-2 h-2 bg-slate-800 border-r border-b border-slate-700 transform rotate-45"></div>
                </div>
            )}
        </div>
    )
}
