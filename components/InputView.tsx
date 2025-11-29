import { PromptInput } from "@/components/PromptInput"
import { FrameworkSelector } from "@/components/FrameworkSelector"
import { FormatSelector, OutputFormat } from "@/components/FormatSelector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"
import { TokenBadge } from "@/components/TokenBadge"

interface InputViewProps {
    prompt: string
    setPrompt: (value: string) => void
    framework: string
    setFramework: (value: string) => void
    selectedFormats: OutputFormat[]
    setSelectedFormats: (formats: OutputFormat[]) => void
    handleEnhance: () => void
    isLoading: boolean
    error: Error | null
}

export function InputView({
    prompt,
    setPrompt,
    framework,
    setFramework,
    selectedFormats,
    setSelectedFormats,
    handleEnhance,
    isLoading,
    error,
}: InputViewProps) {
    // Simple token estimation: 1 token ~= 4 chars
    const inputTokens = Math.ceil(prompt.length / 4)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {/* Left Column: Input & Controls */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="backdrop-blur-sm bg-card/50 border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">⚙️</span>
                            Configuration
                        </CardTitle>
                        <CardDescription>Customize your enhancement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FrameworkSelector value={framework} onChange={setFramework} />
                        <FormatSelector selectedFormats={selectedFormats} onChange={setSelectedFormats} />
                    </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-card/50 border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">📊</span>
                            Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Input Tokens</span>
                            <TokenBadge count={inputTokens} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Prompt Input */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="h-full flex flex-col backdrop-blur-sm bg-card/50 border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">✨</span>
                            Workspace
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-1">
                        <PromptInput value={prompt} onChange={setPrompt} />

                        <Button
                            onClick={handleEnhance}
                            disabled={isLoading || !prompt || selectedFormats.length === 0}
                            className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Enhancing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Enhance Prompt
                                </>
                            )}
                        </Button>

                        {error && (
                            <div className="p-4 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
                                Error: {error.message}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
