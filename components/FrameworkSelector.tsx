"use client"

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"

export interface Framework {
    id: string
    name: string
    fullName: string
    description: string
    useCase: string
}

export const frameworks: Framework[] = [
    {
        id: "RACE",
        name: "RACE",
        fullName: "Role, Action, Context, Expectation",
        description: "Defines the persona, the specific action to take, the background context, and the desired outcome.",
        useCase: "General purpose prompts requiring clarity and structure.",
    },
    {
        id: "PAIN",
        name: "PAIN",
        fullName: "Problem, Agitate, Intrigue, Nurture",
        description: "Identifies a pain point, emphasizes it, creates curiosity, and offers a solution.",
        useCase: "Marketing copy, sales emails, and persuasive writing.",
    },
    {
        id: "CARE",
        name: "CARE",
        fullName: "Context, Action, Result, Example",
        description: "Sets the scene, describes the action, specifies the result, and provides an example.",
        useCase: "Storytelling, case studies, and explaining processes.",
    },
    {
        id: "RISE",
        name: "RISE",
        fullName: "Role, Input, Steps, Expectation",
        description: "Specifies the role, provides input data, outlines steps to follow, and defines the output.",
        useCase: "Complex tasks with specific instructions and data processing.",
    },
    {
        id: "STAR",
        name: "STAR",
        fullName: "Situation, Task, Action, Result",
        description: "Describes the situation, the task at hand, the action taken, and the result achieved.",
        useCase: "Behavioral interviews, performance reviews, and incident reports.",
    },
    {
        id: "RTF",
        name: "RTF",
        fullName: "Role, Task, Format",
        description: "A simple framework defining who is acting, what they are doing, and the output format.",
        useCase: "Quick, simple requests where format is key.",
    },
    {
        id: "TAG",
        name: "TAG",
        fullName: "Task, Action, Goal",
        description: "Focuses on the specific task, the action required, and the ultimate goal.",
        useCase: "Goal-oriented tasks and project planning.",
    },
    {
        id: "APE",
        name: "APE",
        fullName: "Action, Purpose, Expectation",
        description: "Directly states the action, the reason for it, and what is expected.",
        useCase: "Concise instructions and delegation.",
    },
    {
        id: "COT",
        name: "COT",
        fullName: "Chain of Thought",
        description: "Breaks down complex problems into intermediate, logical steps before arriving at a final answer. Mimics human problem-solving process.",
        useCase: "Complex reasoning tasks like mathematics, logic puzzles, and multi-step problem solving.",
    },
    {
        id: "TOT",
        name: "TOT",
        fullName: "Tree of Thought",
        description: "Explores multiple reasoning paths (branches) simultaneously, evaluating each path before choosing the best solution. Enables backtracking when needed.",
        useCase: "Problems with multiple solution approaches requiring exploration and comparison of different strategies.",
    },
]

interface FrameworkSelectorProps {
    value: string
    onChange: (value: string) => void
}

export function FrameworkSelector({ value, onChange }: FrameworkSelectorProps) {
    return (
        <div className="grid w-full gap-1.5">
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Enhancement Framework
            </Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a framework" />
                </SelectTrigger>
                <SelectContent>
                    <TooltipProvider delayDuration={0}>
                        {frameworks.map((framework) => (
                            <Tooltip key={framework.id}>
                                <TooltipTrigger asChild>
                                    <div className="w-full">
                                        <SelectItem value={framework.id} className="cursor-pointer">
                                            <span className="font-medium">{framework.name}</span>
                                            <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                                                {framework.fullName}
                                            </span>
                                        </SelectItem>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="max-w-[300px] p-4" align="start">
                                    <div className="space-y-2">
                                        <p className="font-semibold">{framework.fullName}</p>
                                        <p className="text-sm">{framework.description}</p>
                                        <p className="text-xs text-muted-foreground">
                                            <strong>Best for:</strong> {framework.useCase}
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </SelectContent>
            </Select>
        </div>
    )
}
