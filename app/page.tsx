"use client"

import { useState } from "react"
import { OutputFormat } from "@/components/FormatSelector"
import { InputView } from "@/components/InputView"
import { OutputView } from "@/components/OutputView"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [framework, setFramework] = useState("RACE")
  const [selectedFormats, setSelectedFormats] = useState<OutputFormat[]>(["Markdown"])

  const [results, setResults] = useState<Record<string, any>>({})
  const [view, setView] = useState<"input" | "output">("input")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleEnhance = async () => {
    if (!prompt) return

    setIsLoading(true)
    setError(null)
    setResults({})

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          framework,
          formats: selectedFormats,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API Response:", data)
      setResults(data)
      setView("output")
    } catch (err) {
      console.error("Enhancement error:", err)
      setError(err instanceof Error ? err : new Error("An unknown error occurred"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700">
            Prompting Labs
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-top-6 duration-700 delay-150">
            Enhance your prompts using industry-standard frameworks and convert them into multiple structured formats.
          </p>
        </div>

        {view === "input" ? (
          <InputView
            prompt={prompt}
            setPrompt={setPrompt}
            framework={framework}
            setFramework={setFramework}
            selectedFormats={selectedFormats}
            setSelectedFormats={setSelectedFormats}
            handleEnhance={handleEnhance}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <OutputView
            results={results}
            onBack={() => setView("input")}
          />
        )}
      </div>
    </main>
  )
}
