"use client"

import React, { useState } from "react"
import {
    Target,
    Printer,
    Plus,
    Trash,
    Calculator,
    Zap,
    BookOpen,
    Maximize,
    Hash,
    Minus,
    Layers,
    Scissors,
    FileText,
    Layout
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function CostEstimator() {
    const [quantity, setQuantity] = useState(1000)
    const [ups, setUps] = useState(2)
    const [wastage, setWastage] = useState(20)
    const [margin, setMargin] = useState(30)

    // Derived values for standard
    const calculatedSheets = Math.ceil(quantity / ups) + wastage
    const paperCost = calculatedSheets * 3.66
    const printCost = calculatedSheets * 1.04
    const postPressCost = 1300
    const baseCost = paperCost + printCost + postPressCost
    const ratePerUnit = (baseCost + (baseCost * margin / 100)) / quantity

    return (
        <div className="bg-white flex flex-col h-full max-h-[85vh]">
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                <Tabs defaultValue="standard" className="w-full">
                    <TabsList className="bg-white border p-1 h-11 mb-6 rounded-xl shadow-sm inline-flex">
                        <TabsTrigger value="standard" className="rounded-xl px-8 font-bold data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-2 transition-all">
                            <Printer className="h-4 w-4" /> Standard Print
                        </TabsTrigger>
                        <TabsTrigger value="book" className="rounded-xl px-8 font-bold data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-2 transition-all">
                            <BookOpen className="h-4 w-4" /> Book Estimation
                        </TabsTrigger>
                        <TabsTrigger value="wide" className="rounded-xl px-8 font-bold data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-2 transition-all">
                            <Maximize className="h-4 w-4" /> Wide Format
                        </TabsTrigger>
                    </TabsList>

                    {/* Standard Print Content */}
                    <TabsContent value="standard" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                            <div className="md:col-span-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Select Paper Stock</Label>
                                        <Select defaultValue="300-art">
                                            <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl shadow-sm">
                                                <SelectValue placeholder="Select Paper" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="300-art">300 GSM Art Card (Gloss)</SelectItem>
                                                <SelectItem value="170-art">170 GSM Art Paper</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Select Machine</Label>
                                        <div className="flex items-center gap-4">
                                            <Select defaultValue="konica">
                                                <SelectTrigger className="h-10 bg-white border-slate-200 rounded-xl shadow-sm flex-1">
                                                    <SelectValue placeholder="Select Machine" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="konica">Konica Minolta AccurioPress C7100</SelectItem>
                                                    <SelectItem value="xerox">Xerox Versant 180</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <RadioGroup defaultValue="bw" className="flex items-center gap-4 px-1">
                                                <div className="flex items-center space-x-1.5">
                                                    <RadioGroupItem value="color" id="color" className="h-3.5 w-3.5 text-blue-600 border-slate-300" />
                                                    <Label htmlFor="color" className="text-[10px] font-bold text-slate-600 cursor-pointer">Color</Label>
                                                </div>
                                                <div className="flex items-center space-x-1.5">
                                                    <RadioGroupItem value="bw" id="bw" className="h-3.5 w-3.5 text-blue-600 border-slate-300" />
                                                    <Label htmlFor="bw" className="text-[10px] font-bold text-slate-600 cursor-pointer">B/W</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Quantity</Label>
                                        <Input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="h-9 font-bold border-slate-100 bg-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Ups</Label>
                                        <Input type="number" value={ups} onChange={e => setUps(Number(e.target.value))} className="h-9 font-bold border-slate-100 bg-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Wastage</Label>
                                        <Input type="number" value={wastage} onChange={e => setWastage(Number(e.target.value))} className="h-9 font-bold border-slate-100 bg-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Sheets</Label>
                                        <div className="h-9 flex items-center px-3 font-black text-blue-600 bg-blue-50/30 rounded-md border border-blue-100/50">
                                            {calculatedSheets}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Post-Press & Finishing</Label>
                                        <Button size="sm" variant="ghost" className="h-7 text-[10px] font-black text-blue-600 uppercase tracking-wider hover:bg-blue-50">
                                            <Plus className="h-3 w-3 mr-1" /> Add Process
                                        </Button>
                                    </div>
                                    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                                        <div className="p-2.5 flex items-center gap-4 bg-white border-b">
                                            <div className="flex-1 space-y-0.5">
                                                <p className="text-[11px] font-bold text-slate-700 uppercase">[Lamination] Gloss Lamination</p>
                                                <p className="text-[9px] text-slate-400 font-bold">₹2.50 / PER SQ FT</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black text-slate-400 uppercase">Cost:</span>
                                                <span className="text-xs font-black text-slate-800 italic">₹1,300.00</span>
                                                <Button size="sm" variant="ghost" className="h-7 w-7 text-slate-300 hover:text-rose-500">
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-3 rounded-xl border bg-white shadow-sm flex flex-col justify-between h-20">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Paper Cost</p>
                                        <div className="flex items-end justify-between">
                                            <p className="text-[10px] font-bold text-slate-300">@ ₹3.66</p>
                                            <p className="text-lg font-black text-blue-600 italic tracking-tighter">₹{paperCost.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl border bg-white shadow-sm flex flex-col justify-between h-20">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Print Cost</p>
                                        <div className="flex items-end justify-between">
                                            <p className="text-[10px] font-bold text-slate-300">@ ₹1.04</p>
                                            <p className="text-lg font-black text-cyan-600 italic tracking-tighter">₹{printCost.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl border bg-white shadow-sm flex flex-col justify-between h-20">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Post-Press</p>
                                        <div className="flex items-end justify-between">
                                            <p className="text-[10px] font-bold text-slate-300">TOTAL</p>
                                            <p className="text-lg font-black text-amber-500 italic tracking-tighter">₹{postPressCost.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Standard Summary Card */}
                            <div className="md:col-span-4 sticky top-0 space-y-6">
                                <Card className="shadow-lg border-none ring-1 ring-slate-100 overflow-hidden rounded-2xl bg-white">
                                    <CardHeader className="bg-slate-900 py-4 px-6 text-white relative">
                                        <div className="absolute top-0 right-0 p-2 opacity-5">
                                            <Calculator className="h-10 w-10" />
                                        </div>
                                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Base Estimation</CardTitle>
                                        <div className="mt-1 flex items-baseline gap-1">
                                            <span className="text-2xl font-black italic tracking-tighter">₹{baseCost.toLocaleString()}</span>
                                            <span className="text-[10px] font-bold text-slate-500">NET</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">Profit Margin %</Label>
                                            <div className="flex items-center gap-2 w-24">
                                                <Input
                                                    type="number"
                                                    value={margin}
                                                    onChange={e => setMargin(Number(e.target.value))}
                                                    className="h-11 text-center font-black border-slate-200 rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <Separator className="opacity-50" />

                                        <div className="bg-emerald-600 p-4 rounded-xl text-white shadow-lg shadow-emerald-200 relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                            <div className="relative z-10 flex flex-col items-center">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Final Rate/Unit</p>
                                                <div className="text-3xl font-black italic tracking-tighter leading-none">₹{ratePerUnit.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Book Estimation Content */}
                    <TabsContent value="book" className="mt-0 outline-none animate-in fade-in slide-in-from-right-10 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                            <div className="md:col-span-8 space-y-10">
                                {/* Cover Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-4 py-1">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">1. Cover Configuration</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Cover Paper</Label>
                                            <Select defaultValue="300">
                                                <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl">
                                                    <SelectValue placeholder="Select Paper" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="300">300 GSM Art Card (Gloss)</SelectItem>
                                                    <SelectItem value="250">250 GSM Art Card</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Special Finishes</Label>
                                            <Select defaultValue="none">
                                                <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl font-bold">
                                                    <SelectValue placeholder="Select Finishes" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">None</SelectItem>
                                                    <SelectItem value="uv">Spot UV (Logo)</SelectItem>
                                                    <SelectItem value="foil">Gold Foiling</SelectItem>
                                                    <SelectItem value="emboss">Embossing</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <p className="text-[9px] text-slate-400 font-bold px-1 italic">Ctrl+Click to select multiple in full version</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Inner Pages Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-4 py-1">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">2. Inner Pages</h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Inner Paper Type</Label>
                                            <Select defaultValue="100">
                                                <SelectTrigger className="h-11 bg-white border-slate-100 rounded-xl font-bold">
                                                    <SelectValue placeholder="Select Paper" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="100">100 GSM Maplitho Paper</SelectItem>
                                                    <SelectItem value="130">130 GSM Art Paper (Matte)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Ups per Sheet</Label>
                                                <Input type="number" defaultValue="4" className="h-11 border-slate-100 font-black rounded-xl" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Wastage (Sheets)</Label>
                                                <Input type="number" defaultValue="50" className="h-11 border-slate-100 font-black rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Print Machine (Inner)</Label>
                                            <Select defaultValue="konica">
                                                <SelectTrigger className="h-11 border-slate-100 rounded-xl font-bold">
                                                    <SelectValue placeholder="Select Machine" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="konica">Konica Minolta AccurioPress C7100</SelectItem>
                                                    <SelectItem value="offset">Offset 4 Color Machine</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Color Mode</Label>
                                                <Select defaultValue="bw">
                                                    <SelectTrigger className="h-11 border-slate-100 rounded-xl font-bold">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="bw">Black & White</SelectItem>
                                                        <SelectItem value="color">Full Color (CMYK)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Binding Style</Label>
                                                <Select defaultValue="perfect">
                                                    <SelectTrigger className="h-11 border-slate-100 rounded-xl font-bold">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="perfect">Perfect Binding</SelectItem>
                                                        <SelectItem value="staple">Center Pin / Staple</SelectItem>
                                                        <SelectItem value="spiral">Spiral / Wire-O</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Book Summary Card */}
                            <div className="md:col-span-4 sticky top-0">
                                <Card className="shadow-2xl border-none ring-1 ring-slate-200 overflow-hidden rounded-[2rem] bg-slate-900 text-white">
                                    <CardHeader className="py-8 px-10 border-b border-slate-800">
                                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Book Summary</CardTitle>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex justify-between items-center text-xs opacity-60">
                                                <span className="font-bold">Cover Total:</span>
                                                <span className="font-black">₹4,250.00</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs opacity-60">
                                                <span className="font-bold">Inners Total:</span>
                                                <span className="font-black">₹18,600.00</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs opacity-60">
                                                <span className="font-bold">Binding Total:</span>
                                                <span className="font-black">₹2,800.00</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10 text-center">
                                        <div className="space-y-2 mb-8">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Total Book Cost</p>
                                            <p className="text-6xl font-black italic tracking-tighter leading-none">₹25,650</p>
                                            <p className="text-xs font-bold opacity-30 tracking-widest mt-2 uppercase">Including Tax Estim.</p>
                                        </div>
                                        <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-blue-600/20">
                                            Generate Proposal
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Wide Format Content */}
                    <TabsContent value="wide" className="mt-0 outline-none animate-in fade-in slide-in-from-bottom-10 duration-600">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                            <div className="md:col-span-8 space-y-8">
                                <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-4 py-1">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Job Details (Wide Format)</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[11px] font-black uppercase text-slate-500 tracking-tighter">Width (Inches)</Label>
                                                <Input placeholder="e.g. 36" className="h-12 border-slate-100 font-bold text-lg rounded-xl" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[11px] font-black uppercase text-slate-500 tracking-tighter">Height (Inches)</Label>
                                                <Input placeholder="e.g. 24" className="h-12 border-slate-100 font-bold text-lg rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[11px] font-black uppercase text-slate-500 tracking-tighter">Quantity</Label>
                                            <Input defaultValue="1" className="h-12 border-slate-100 font-black text-lg rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[11px] font-black uppercase text-slate-500 tracking-tighter">Media Type</Label>
                                            <Select defaultValue="flex">
                                                <SelectTrigger className="h-12 border-slate-100 font-bold rounded-xl">
                                                    <SelectValue placeholder="Select Media" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="flex">Frontlit Flex (Standard)</SelectItem>
                                                    <SelectItem value="vinyl">Star Vinyl (Gloss/Matte)</SelectItem>
                                                    <SelectItem value="backlit">Backlit Media</SelectItem>
                                                    <SelectItem value="canvas">Art Canvas</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[11px] font-black uppercase text-slate-500 tracking-tighter">Machine / Resolution</Label>
                                            <Select defaultValue="eco">
                                                <SelectTrigger className="h-12 border-slate-100 font-bold rounded-xl">
                                                    <SelectValue placeholder="Select Machine" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="eco">Eco-Solvent (High Res)</SelectItem>
                                                    <SelectItem value="solvent">Solvent Printing</SelectItem>
                                                    <SelectItem value="uv">UV Wide Format</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col h-full bg-slate-50/80 rounded-2xl p-6 border border-slate-100 shadow-inner">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 border-b pb-2">Real-time Calculation</p>
                                        <div className="space-y-4 flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-500">Total Area:</span>
                                                <span className="text-lg font-black text-slate-800">6.00 Sq. Ft</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-500">Media Cost:</span>
                                                <span className="text-sm font-black text-slate-600 italic">₹120.00</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-500">Print Cost:</span>
                                                <span className="text-sm font-black text-slate-600 italic">₹300.00</span>
                                            </div>
                                            <Separator className="bg-slate-200" />
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-xs font-black uppercase text-blue-600">Total Estimate:</span>
                                                <span className="text-2xl font-black text-slate-900">₹420.00</span>
                                            </div>
                                        </div>
                                        <div className="mt-8 space-y-4">
                                            <div className="space-y-1.5 px-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <Label className="text-[10px] font-black uppercase text-slate-400">Margin %</Label>
                                                    <span className="text-[10px] font-black text-blue-600">30%</span>
                                                </div>
                                                <Input type="range" defaultValue="30" className="h-2 accent-blue-600" />
                                            </div>
                                            <Button className="w-full h-11 bg-slate-900 hover:bg-black font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-lg">
                                                Calculate Final Price
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Wide Summary (Compact) */}
                            <div className="md:col-span-4 sticky top-0">
                                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-2xl relative overflow-hidden text-center min-h-[300px] flex flex-col justify-center ring-4 ring-white shadow-blue-200">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <Maximize className="h-32 w-32" />
                                    </div>
                                    <div className="relative z-10 space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-4">Wide Format Rate</p>
                                        <div className="flex flex-col gap-1 items-center">
                                            <p className="text-7xl font-black italic tracking-tighter shadow-blue-900/20 drop-shadow-2xl">₹546</p>
                                            <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Calculated Rate</p>
                                        </div>
                                        <div className="pt-8">
                                            <Button className="bg-white text-blue-600 hover:bg-slate-100 font-black h-12 w-full rounded-2xl shadow-lg ring-1 ring-white/50 text-[10px] uppercase tracking-widest uppercase">
                                                Add to Quote Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
