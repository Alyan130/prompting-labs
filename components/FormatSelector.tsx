"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export type OutputFormat = "Markdown" | "JSON" | "TOON"

interface FormatSelectorProps {
    selectedFormats: OutputFormat[]
    onChange: (formats: OutputFormat[]) => void
}

export function FormatSelector({ selectedFormats, onChange }: FormatSelectorProps) {
    const formats: OutputFormat[] = ["Markdown", "JSON", "TOON"]

    const handleCheckedChange = (format: OutputFormat, checked: boolean) => {
        if (checked) {
            onChange([...selectedFormats, format])
        } else {
            // Prevent deselecting the last format if desired, or allow empty.
            // Requirement says "At least one format must be selected"
            if (selectedFormats.length === 1 && selectedFormats.includes(format)) {
                return // Don't allow deselecting the last one
            }
            onChange(selectedFormats.filter((f) => f !== format))
        }
    }

    return (
        <div className="grid w-full gap-3">
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Output Formats
            </Label>
            <div className="flex flex-wrap gap-4">
                {formats.map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                        <Checkbox
                            id={`format-${format}`}
                            checked={selectedFormats.includes(format)}
                            onCheckedChange={(checked) => handleCheckedChange(format, checked as boolean)}
                        />
                        <Label
                            htmlFor={`format-${format}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            {format}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    )
}
