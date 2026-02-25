"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CostEstimator } from "@/components/shared/cost-estimator"

export default function NewQuotationPage() {
    const router = useRouter()

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 -ml-2 text-muted-foreground hover:text-foreground"
                            onClick={() => router.back()}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight text-slate-800 italic uppercase">
                            Build New Quotation
                        </h1>
                    </div>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Calculator className="h-4 w-4" /> Professional Price Estimator Engine
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="font-bold border-2" onClick={() => router.back()}>
                        Cancel & Go Back
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200">
                        View Sample Draft
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[80vh]">
                <CostEstimator />
            </div>
        </div>
    )
}
