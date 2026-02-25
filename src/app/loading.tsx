"use client"

import React from "react"
import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg font-medium animate-pulse text-muted-foreground">Loading your experience...</p>
            </div>
        </div>
    )
}
