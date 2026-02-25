"use client"

import React, { useState } from "react"
import {
    Target,
    Printer,
    Plus,
    Trash,
    Calculator
} from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function CostEstimator() {
    const [quantity, setQuantity] = useState(1000)
    const [ups, setUps] = useState(4)
    const [wastage, setWastage] = useState(20)
    const [margin, setMargin] = useState(30)

    const [paperCostPerSheet, setPaperCostPerSheet] = useState(5.5)
    const [printingRate, setPrintingRate] = useState(2.5)

    const [postPress, setPostPress] = useState([
        { name: "Lamination (Matte)", cost: 1.5, type: "SqFt" },
        { name: "Trimming & Packing", cost: 2.0, type: "Job" }
    ])

    const sheetsNeeded = Math.ceil(quantity / ups) + wastage
    const totalPaperCost = sheetsNeeded * paperCostPerSheet
    const totalPrintingCost = sheetsNeeded * printingRate
    const totalPostPressCost = postPress.reduce((acc, curr) => acc + (curr.cost * (curr.type === 'Job' ? 1 : quantity)), 0)

    const baseCost = totalPaperCost + totalPrintingCost + totalPostPressCost
    const profitAmount = (baseCost * margin) / 100
    const grandTotal = baseCost + profitAmount
    const ratePerUnit = grandTotal / quantity

    return (
        <div className="p-8 bg-slate-50 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-[1600px] mx-auto">
                {/* Left side: Input Forms */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Quantity Card */}
                        <Card className="shadow-sm border h-full">
                            <CardHeader className="py-3 px-4 bg-muted/30 border-b">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <Target className="h-4 w-4 text-primary" /> Quantity & Layout
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] font-bold uppercase text-muted-foreground">Final Quantity</Label>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="h-10 font-bold"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[11px] font-bold uppercase text-muted-foreground">Ups / Sheet</Label>
                                        <Input
                                            type="number"
                                            value={ups}
                                            onChange={(e) => setUps(Number(e.target.value))}
                                            className="h-10"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[11px] font-bold uppercase text-muted-foreground">Wastage (Sheets)</Label>
                                        <Input
                                            type="number"
                                            value={wastage}
                                            onChange={(e) => setWastage(Number(e.target.value))}
                                            className="h-10"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Material Card */}
                        <Card className="shadow-sm border h-full">
                            <CardHeader className="py-3 px-4 bg-muted/30 border-b">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <Printer className="h-4 w-4 text-primary" /> Material & Print
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] font-bold uppercase text-muted-foreground">Paper Type</Label>
                                    <Select defaultValue="170-art" onValueChange={(v) => setPaperCostPerSheet(v === '170-art' ? 5.5 : 12)}>
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select paper" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="170-art">170 GSM Art Paper (₹5.5)</SelectItem>
                                            <SelectItem value="300-art">300 GSM Art Card (₹12)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] font-bold uppercase text-muted-foreground">Print Process</Label>
                                    <Select defaultValue="digital" onValueChange={(v) => setPrintingRate(v === 'digital' ? 2.5 : 0.5)}>
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select process" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="digital">Digital Press (₹2.5)</SelectItem>
                                            <SelectItem value="offset">Offset Press (₹0.5)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Post Press Card */}
                    <Card className="shadow-sm border">
                        <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between bg-white">
                            <div className="space-y-0.5">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-500">Finishing & Post-Press Processes</CardTitle>
                            </div>
                            <Button size="sm" variant="outline" className="h-9 text-[11px] font-bold uppercase gap-2 px-4 border-slate-200">
                                <Plus className="h-4 w-4 text-blue-600" /> Add New Process
                            </Button>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {postPress.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-bold uppercase">{item.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase opacity-60">
                                                {item.type === 'Job' ? 'Per Job' : `₹${item.cost} / Unit`}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black font-mono text-muted-foreground uppercase">Rate</span>
                                                <Input
                                                    className="w-20 h-8 font-bold text-center"
                                                    type="number"
                                                    value={item.cost}
                                                    onChange={(e) => {
                                                        const newArr = [...postPress]
                                                        newArr[index].cost = Number(e.target.value)
                                                        setPostPress(newArr)
                                                    }}
                                                />
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right side: Final Cost Summary */}
                <div className="lg:col-span-4 lg:sticky lg:top-0">
                    <Card className="shadow-2xl border-none overflow-hidden bg-white ring-1 ring-slate-200">
                        <CardHeader className="py-5 px-6 bg-slate-900 text-white">
                            <CardTitle className="text-xs font-black flex items-center gap-2 uppercase tracking-[0.2em]">
                                <Calculator className="h-5 w-5 text-blue-400" /> Professional Costing Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground font-medium">Total Sheets Needed</span>
                                    <span className="font-black text-slate-800 underline decoration-slate-200 decoration-2 underline-offset-4">{sheetsNeeded} Sheets</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground font-medium">Total Paper Cost</span>
                                    <span className="font-bold text-slate-800">₹{totalPaperCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground font-medium">Total Print Cost</span>
                                    <span className="font-bold text-slate-800">₹{totalPrintingCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground font-medium">Post-Press Total</span>
                                    <span className="font-bold text-slate-800">₹{totalPostPressCost.toLocaleString()}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Profit Margin (%)</Label>
                                    <div className="flex items-center gap-2 w-24">
                                        <Input
                                            className="h-9 font-bold text-center border-slate-300"
                                            type="number"
                                            value={margin}
                                            onChange={(e) => setMargin(Number(e.target.value))}
                                        />
                                        <span className="text-xs font-bold text-slate-500">%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <div className="p-5 rounded-xl bg-slate-900 text-white text-center shadow-inner relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12">
                                        <Calculator className="h-12 w-12" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">Final Rate Per Unit</p>
                                    <p className="text-5xl font-black italic tracking-tighter">₹{ratePerUnit.toFixed(2)}</p>
                                </div>

                                <div className="flex justify-between items-end mt-6 bg-muted/30 p-4 rounded-lg">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Grand Total</p>
                                        <p className="text-2xl font-black text-slate-800 tracking-tight">₹{grandTotal.toLocaleString()}</p>
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 text-[10px] font-black h-6">NET TOTAL</Badge>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/20">
                                Save & Generate Quote
                            </Button>
                            <Button variant="outline" className="w-full h-11 border-2 border-slate-200 font-bold uppercase tracking-widest text-[10px]">
                                Convert to Job Card
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
