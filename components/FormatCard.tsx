import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TokenBadge } from "@/components/TokenBadge"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface FormatCardProps {
    format: string
    content: string
    className?: string
}

export function FormatCard({ format, content, className }: FormatCardProps) {
    const [copied, setCopied] = useState(false)
    const tokenCount = Math.ceil(content.length / 4)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card className={`flex flex-col h-full backdrop-blur-sm bg-card/50 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{format}</CardTitle>
                <div className="flex items-center space-x-2">
                    <TokenBadge count={tokenCount} />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        className="h-8 w-8 hover:bg-primary/10 transition-colors duration-200"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy {format}</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pt-4">
                <div className="rounded-lg bg-muted/30 backdrop-blur-sm p-4 h-full overflow-auto max-h-[500px] font-mono text-sm whitespace-pre-wrap border border-border/30">
                    {content}
                </div>
            </CardContent>
        </Card>
    )
}
