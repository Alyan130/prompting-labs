import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { FormatCard } from "@/components/FormatCard"
import { OutputFormat } from "@/components/FormatSelector"

interface OutputViewProps {
    results: Record<string, any>
    onBack: () => void
}

export function OutputView({ results, onBack }: OutputViewProps) {
    // Get all lowercase keys from API response
    const resultKeys = Object.keys(results)

    // Map to proper Title Case format names for display
    const formatMap: Record<string, OutputFormat> = {
        'markdown': 'Markdown',
        'json': 'JSON',
        'toon': 'TOON'
    }

    // Convert lowercase keys to Title Case format names
    const formats = resultKeys
        .map(key => formatMap[key.toLowerCase()])
        .filter(Boolean) as OutputFormat[]

    // Determine grid columns based on number of formats
    const gridCols =
        formats.length === 1
            ? "grid-cols-1 max-w-3xl mx-auto"
            : formats.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between backdrop-blur-sm bg-card/30 p-4 rounded-lg border border-border/50">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="gap-2 hover:bg-primary/10 transition-colors duration-200"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Edit
                </Button>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Enhanced Results</h2>
                <div className="w-[100px]" /> {/* Spacer for centering */}
            </div>

            <div className={`grid gap-6 ${gridCols}`}>
                {formats.map((format) => {
                    // Get content using lowercase key
                    const content = results[format.toLowerCase()]
                    if (!content) return null

                    // If content is object (JSON), stringify it
                    const displayContent = typeof content === 'object' ? JSON.stringify(content, null, 2) : content

                    return (
                        <FormatCard
                            key={format}
                            format={format}
                            content={displayContent}
                        />
                    )
                })}
            </div>
        </div>
    )
}
