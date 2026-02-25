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
                    <h1 className="text-3xl font-bold tracking-tight">Stock & Inventory</h1>
                    <p className="text-muted-foreground font-medium">
                        Monitor paper stock, ink levels, and consumable inventory.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <History className="h-4 w-4" /> Usage History
                    </Button>
                    <Button className="gap-2 bg-primary">
                        <Plus className="h-4 w-4" /> Add Stock
                    </Button>
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
