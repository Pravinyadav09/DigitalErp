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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

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
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [processes, setProcesses] = useState<ProcessMaster[]>(initialProcesses)
    const [search, setSearch] = useState("")

    const handleAdd = () => {
        setEditMode(false)
        setIsDialogOpen(true)
    }

    const handleEdit = () => {
        setEditMode(true)
        setIsDialogOpen(true)
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
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm" onClick={handleAdd}>
                                    <Plus className="h-4 w-4" /> Add New Process
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
                                <DialogHeader className="px-10 pt-10 pb-6 text-left border-b">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                                            <Cog className="h-5 w-5" />
                                        </div>
                                        <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">
                                            {editMode ? "Configure Process" : "Create New Process"}
                                        </DialogTitle>
                                    </div>
                                    <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                                        Set up calculations and rates for production
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="px-10 py-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                                    {/* 01: Identification */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">01</span>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Identification</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Process Name</Label>
                                                <Input
                                                    placeholder="e.g. Center Stitching"
                                                    className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Process Category</Label>
                                                <Select>
                                                    <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                                        <SelectValue placeholder="Category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        <SelectItem value="binding">Binding</SelectItem>
                                                        <SelectItem value="finishing">Finishing</SelectItem>
                                                        <SelectItem value="lamination">Lamination</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 02: Rate Calculation */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">02</span>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rate Calculation</h3>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Rate Type</Label>
                                                <Select defaultValue="per_sheet">
                                                    <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl text-xs">
                                                        <SelectItem value="per_sheet">Per Sheet</SelectItem>
                                                        <SelectItem value="per_sqft">Per Sq Ft</SelectItem>
                                                        <SelectItem value="per_book">Per Book</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Rate (₹)</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="h-12 rounded-xl border-none bg-emerald-50 font-black text-emerald-700 px-4 focus-visible:ring-blue-500/20 shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Min. Price (₹)</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="h-12 rounded-xl border-none bg-slate-100 font-black text-slate-800 px-4 focus-visible:ring-blue-500/20"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 03: Additional Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">03</span>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Additional Info</h3>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Internal Notes</Label>
                                            <Textarea
                                                placeholder="Special instructions for this process..."
                                                className="min-h-[100px] rounded-xl border-slate-100 bg-white text-xs font-medium text-slate-600 px-4 pt-4 resize-none focus-visible:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                                    <Button
                                        variant="ghost"
                                        className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all font-bold"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Save Configuration
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
                                                <Button size="icon" variant="outline" className="h-8 w-8 border-blue-100 text-blue-600 hover:bg-blue-50" onClick={handleEdit}>
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
