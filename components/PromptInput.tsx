"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
}

export function PromptInput({ value, onChange }: PromptInputProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const maxLength = 10000
  const minLength = 10
  const charCount = value.length
  const isValid = charCount >= minLength || charCount === 0

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="prompt-input" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Your Prompt
      </Label>
      <div className="relative">
        <Textarea
          id="prompt-input"
          placeholder="Enter your prompt here... (e.g., 'Write a product description for a smart water bottle')"
          className={cn(
            "min-h-[120px] max-h-[400px] resize-y pr-4 pb-8",
            !isValid && "border-red-500 focus-visible:ring-red-500"
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className={cn(
          "absolute bottom-2 right-2 text-xs text-muted-foreground",
          !isValid && "text-red-500"
        )}>
          {charCount} / {maxLength}
        </div>
      </div>
      {!isValid && (
        <p className="text-xs text-red-500">
          Prompt must be at least {minLength} characters.
        </p>
      )}
    </div>
  )
}
