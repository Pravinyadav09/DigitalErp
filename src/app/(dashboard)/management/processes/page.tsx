"use client"

import React, { useState } from "react"
import {
    Search, Plus, Settings, Trash2, Edit,
    Download, ChevronDown, CheckCircle,
    ArrowLeft, Save, X, Cog
} from "lucide-react"
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ─── Types ──────────────────────────────────────────────────────────────────
type ProcessMaster = {
    id: string
    name: string
    type: "Binding" | "Finishing" | "Lamination" | "Printing" | "Others"
    rateConfig: string
    rate: number
    setupFee: number
    minPrice: number
    status: "Active" | "Inactive"
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialProcesses: ProcessMaster[] = [
    { id: "P-001", name: "Center Stitching", type: "Binding", rateConfig: "₹2.00 / Per Book", rate: 2, setupFee: 0, minPrice: 0, status: "Active" },
    { id: "P-002", name: "Creasing", type: "Finishing", rateConfig: "₹0.50 / Per Sheet", rate: 0.5, setupFee: 0, minPrice: 0, status: "Active" },
    { id: "P-003", name: "Gloss Lamination", type: "Lamination", rateConfig: "₹2.50 / Per Sq Ft", rate: 2.5, setupFee: 0, minPrice: 0, status: "Active" },
    { id: "P-004", name: "Matt Lamination", type: "Lamination", rateConfig: "₹3.00 / Per Sq Ft", rate: 3, setupFee: 0, minPrice: 0, status: "Active" },
    { id: "P-005", name: "Perfect Binding", type: "Binding", rateConfig: "₹10.00 / Per Book", rate: 10, setupFee: 0, minPrice: 0, status: "Active" },
]

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProcessMastersPage() {
    const [view, setView] = useState<"list" | "add" | "edit">("list")
    const [processes, setProcesses] = useState<ProcessMaster[]>(initialProcesses)
    const [search, setSearch] = useState("")

    if (view === "add" || view === "edit") {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setView("list")}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {view === "add" ? "Add Process Master" : "Edit Process Master"}
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="border shadow-lg">
                        <CardHeader className="border-b bg-muted/30">
                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded bg-slate-200">
                                    <Plus className="h-4 w-4 text-slate-600" />
                                </div>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">New Process Definition</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Process Name <span className="text-rose-500">*</span></Label>
                                    <Input placeholder="e.g. Thermal Gloss Lamination" className="h-10 border-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Process Type <span className="text-rose-500">*</span></Label>
                                    <Select>
                                        <SelectTrigger className="h-10 border-slate-200">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="binding">Binding</SelectItem>
                                            <SelectItem value="finishing">Finishing</SelectItem>
                                            <SelectItem value="lamination">Lamination</SelectItem>
                                            <SelectItem value="printing">Printing</SelectItem>
                                            <SelectItem value="others">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Calculation Type <span className="text-rose-500">*</span></Label>
                                    <Select defaultValue="per_sheet">
                                        <SelectTrigger className="h-10 border-slate-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="per_sheet">Per Sheet</SelectItem>
                                            <SelectItem value="per_sqft">Per Sq Ft</SelectItem>
                                            <SelectItem value="per_book">Per Book</SelectItem>
                                            <SelectItem value="per_set">Per Set</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Rate (₹) <span className="text-rose-500">*</span></Label>
                                    <div className="relative">
                                        <Input type="number" placeholder="0.00" className="h-10 font-bold border-slate-200" />
                                        <p className="text-[10px] text-muted-foreground mt-1.5 italic">Base rate or default rate.</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Setup Fee (₹)</Label>
                                    <div className="relative">
                                        <Input type="number" placeholder="0.00" className="h-10 font-bold border-slate-200" />
                                        <p className="text-[10px] text-muted-foreground mt-1.5 italic">One-time fixed charge per job.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Min. Price (₹)</Label>
                                    <div className="relative">
                                        <Input type="number" placeholder="0.00" className="h-10 font-bold border-slate-200" />
                                        <p className="text-[10px] text-muted-foreground mt-1.5 italic">Minimum amount to charge.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end pt-6 border-t">
                                <Button variant="outline" className="h-11 px-8 text-slate-600 border-slate-200 font-bold" onClick={() => setView("list")}>Cancel</Button>
                                <Button className="h-11 px-10 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 font-bold" onClick={() => setView("list")}>
                                    Save Process
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Process Masters</h1>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground font-bold italic">
                            <Cog className="h-4 w-4" />
                            <CardTitle className="text-sm">Post-Press Processes</CardTitle>
                        </div>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm" onClick={() => setView("add")}>
                            <Plus className="h-4 w-4" /> Add New Process
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9 bg-slate-800 text-white hover:bg-slate-900 hover:text-white border-none shadow-sm">
                                        <Download className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9 font-bold">
                                        <Settings className="h-4 w-4" /> Columns <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>Show Setup Fee</DropdownMenuItem>
                                    <DropdownMenuItem>Show Min Price</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search current page..."
                                className="pl-8 h-9 bg-muted/20 border-none italic shadow-none focus-visible:ring-0"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Process Name</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Type</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Rate Config</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Status</TableHead>
                                    <TableHead className="text-right font-black uppercase text-[11px] tracking-wider text-slate-500 w-[120px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {processes.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(process => (
                                    <TableRow key={process.id} className="group hover:bg-muted/10">
                                        <TableCell className="py-4 font-bold text-slate-800">
                                            {process.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 hover:bg-cyan-100 border-none text-[10px] font-bold px-2 py-0.5">
                                                {process.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-black text-slate-800">
                                            {process.rateConfig}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px] font-bold px-2 py-0.5">
                                                {process.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="outline" className="h-8 w-8 border-blue-100 text-blue-600 hover:bg-blue-50" onClick={() => setView("edit")}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-8 w-8 border-rose-100 text-rose-600 hover:bg-rose-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
