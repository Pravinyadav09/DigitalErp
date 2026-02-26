"use client"

import React, { useState } from "react"
import {
    Plus,
    Search,
    Package,
    Droplets,
    Layers,
    Maximize,
    History,
    TrendingDown,
    Monitor,
    AlertTriangle,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    Weight,
    Boxes,
    Settings2,
    Download,
    Filter,
    ChevronRight,
    Activity,
    AlertCircle
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const paperStock = [
    {
        name: "170 GSM Art Paper",
        qty: "4,500 Sheets",
        packets: "18 Boxes",
        weight: "250 Kg",
        cost: "₹5.50 / sheet",
        status: "Normal",
        lastUsed: "2h ago",
        trend: "up"
    },
    {
        name: "300 GSM Art Card",
        qty: "850 Sheets",
        packets: "3 Boxes",
        weight: "65 Kg",
        cost: "₹12.00 / sheet",
        status: "Low Stock",
        lastUsed: "5h ago",
        trend: "down"
    },
    {
        name: "Standard Bond (70 GSM)",
        qty: "12,000 Sheets",
        packets: "24 Boxes",
        weight: "480 Kg",
        cost: "₹1.20 / sheet",
        status: "Normal",
        lastUsed: "1d ago",
        trend: "up"
    },
]

const inkStock = [
    { name: "Cyan Toner", machine: "Konica C3070", level: 15, expectedYield: "2,500 prints", status: "Critical" },
    { name: "Magenta Toner", machine: "Konica C3070", level: 42, expectedYield: "2,500 prints", status: "Medium" },
    { name: "Yellow Toner", machine: "Xerox C60", level: 8, expectedYield: "2,500 prints", status: "Critical" },
    { name: "Black Toner", machine: "Heidelberg OSR", level: 65, expectedYield: "2,500 prints", status: "Healthy" },
]

export default function InventoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-1">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">Stock & Inventory</h1>
                    <p className="text-muted-foreground font-medium">
                        Monitor paper stock, ink levels, and consumable inventory.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 border-slate-200">
                        <History className="h-4 w-4" /> Usage History
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="gap-2 h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all">
                                <Plus className="h-4 w-4" /> Add Stock
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
                            <DialogHeader className="px-10 pt-10 pb-6 text-left border-b">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Register New Stock</DialogTitle>
                                </div>
                                <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                                    Add new paper, ink or media to warehouse inventory
                                </DialogDescription>
                            </DialogHeader>

                            <div className="px-10 py-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                                {/* 01: Item Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">01</span>
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Item Details</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Item / Paper Name <span className="text-rose-500">*</span></Label>
                                            <Input className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20" placeholder="e.g. 170 GSM Art Paper" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Stock Category</Label>
                                            <Select>
                                                <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="paper">Paper Stock</SelectItem>
                                                    <SelectItem value="ink">Inks & Toners</SelectItem>
                                                    <SelectItem value="media">Wide Format Media</SelectItem>
                                                    <SelectItem value="others">Other Consumables</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Initial Quantity</Label>
                                            <Input type="number" className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4" placeholder="0" />
                                        </div>
                                    </div>
                                </div>

                                {/* 02: Specifications */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">02</span>
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Specifications</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Cost Per Unit (₹)</Label>
                                            <Input type="number" step="0.01" className="h-12 rounded-xl border-none bg-emerald-50 font-black text-emerald-700 px-4 shadow-sm" placeholder="0.00" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-rose-500 tracking-widest pl-1">Low Stock Alert</Label>
                                            <Input type="number" className="h-12 rounded-xl border-none bg-rose-50 font-black text-rose-700 px-4 shadow-sm" placeholder="10" />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Storage Location / Internal Notes</Label>
                                            <Textarea className="min-h-[80px] rounded-xl border-slate-100 bg-white font-medium text-slate-600 p-4 resize-none focus-visible:ring-blue-500/20" placeholder="e.g. Warehouse Section B, Shelf 4..." />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                                <Button
                                    variant="ghost"
                                    className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all font-bold"
                                >
                                    Register Stock
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Paper Value</CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹12,45,000</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            Current warehouse valuation
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">08 Items</div>
                        <p className="text-xs text-rose-500 font-medium italic">Requires replenishment</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Consumption</CardTitle>
                        <Weight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">240 Kg</div>
                        <p className="text-xs text-muted-foreground">Avg. daily paper weight</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ink/Toner Health</CardTitle>
                        <Droplets className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">82%</div>
                        <p className="text-xs text-muted-foreground">Global machine levels</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="paper" className="w-full">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <TabsList>
                        <TabsTrigger value="paper" className="gap-2">Paper Stock</TabsTrigger>
                        <TabsTrigger value="ink" className="gap-2">Inks & Toners</TabsTrigger>
                        <TabsTrigger value="wide" className="gap-2">Wide Format Media</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search stock..." className="pl-8 h-9 w-[200px]" />
                        </div>
                        <Button variant="outline" size="sm" className="h-9"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                    </div>
                </div>

                <TabsContent value="paper" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {paperStock.map((paper) => (
                            <Card key={paper.name} className="shadow-sm">
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{paper.name}</CardTitle>
                                            <CardDescription>{paper.cost}</CardDescription>
                                        </div>
                                        <Badge
                                            variant={paper.status === 'Normal' ? 'secondary' : 'destructive'}
                                            className="text-[10px] uppercase font-bold"
                                        >
                                            {paper.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1 p-3 rounded-lg bg-muted/50 border">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Current Qty</p>
                                            <p className="text-lg font-bold">{paper.qty}</p>
                                            <p className="text-[10px] text-muted-foreground">{paper.packets}</p>
                                        </div>
                                        <div className="space-y-1 p-3 rounded-lg bg-muted/50 border">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Approx. Weight</p>
                                            <p className="text-lg font-bold">{paper.weight}</p>
                                            <p className="text-[10px] text-muted-foreground">Stored in Section-B</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1"><History className="h-3 w-3" /> Last used {paper.lastUsed}</span>
                                        <div className={`flex items-center gap-0.5 ${paper.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {paper.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                            <span className="font-bold">Trend</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/30 p-3 pt-3 flex gap-2">
                                    <Button variant="outline" className="flex-1 text-xs">View Ledger</Button>
                                    <Button className="flex-1 text-xs">Update</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="ink">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ink & Toner Monitoring</CardTitle>
                            <CardDescription>Live levels and yield estimates for all active machines.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {inkStock.map((ink) => (
                                    <div key={ink.name} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <h4 className="text-sm font-bold">{ink.name}</h4>
                                                <p className="text-[10px] text-muted-foreground">{ink.machine}</p>
                                            </div>
                                            <div className={`text-xl font-bold ${ink.level < 20 ? 'text-rose-600' : 'text-foreground'}`}>
                                                {ink.level}%
                                            </div>
                                        </div>
                                        <Progress
                                            value={ink.level}
                                            className="h-2"
                                        />
                                        <div className="flex items-center justify-between text-[10px]">
                                            <span className="text-muted-foreground font-medium">Est. Yield:</span>
                                            <span className="font-bold">{ink.expectedYield}</span>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full text-[10px] font-bold h-8">Log Replacement</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
