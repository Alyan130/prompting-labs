"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TokenBadgeProps {
    count: number
    label?: string
}

export function TokenBadge({ count, label = "Tokens" }: TokenBadgeProps) {
    let variant: "default" | "secondary" | "destructive" | "outline" = "default"
    let className = ""

    if (count < 1000) {
        className = "bg-green-500 hover:bg-green-600 border-transparent text-white"
    } else if (count < 4000) {
        className = "bg-yellow-500 hover:bg-yellow-600 border-transparent text-white"
    } else {
        variant = "destructive"
    }

    return (
        <Badge variant={variant} className={cn("gap-1", className)}>
            <span className="font-mono font-bold">{count.toLocaleString()}</span>
            <span>{label}</span>
        </Badge>
    )
}
