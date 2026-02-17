
export function Skeleton({ className = '', height = '20px', width = '100%' }: { className?: string, height?: string, width?: string }) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{ height, width }}
        ></div>
    )
}
