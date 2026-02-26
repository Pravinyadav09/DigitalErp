"use client"

import React, { useState } from "react"
import {
    Printer, Plus, Search, Download, Filter,
    ChevronDown, Edit, Trash2, Info, X, CheckCircle,
    Layers, BarChart2
} from "lucide-react"
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ─── Types ─────────────────────────────────────────────────────────────────────
type ColorConfig = { type: "click"; colorRate: number; bwRate: number; colorMin: number; bwMin: number }
    | { type: "slab" }
    | { type: "coverage" }

type Machine = {
    id: number
    name: string
    type: string
    model: string
    costingHourly: number
    colorConfig: ColorConfig
    status: string
    internalCode: string
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const initialMachines: Machine[] = [
    {
        id: 1, name: "Epson SureColor S80670", type: "Wide Format", model: "N/A",
        costingHourly: 1258, internalCode: "M-01", status: "Operational",
        colorConfig: { type: "click", colorRate: 5.0, bwRate: 3.0, colorMin: 0, bwMin: 0 }
    },
    {
        id: 2, name: "Heidelberg Speedmaster", type: "Offset", model: "N/A",
        costingHourly: 1643, internalCode: "M-02", status: "Operational",
        colorConfig: { type: "slab" }
    },
    {
        id: 3, name: "Konica Minolta C6085", type: "Digital", model: "N/A",
        costingHourly: 1771, internalCode: "M-03", status: "Operational",
        colorConfig: { type: "coverage" }
    },
]

// ─── Add Machine Dialog ────────────────────────────────────────────────────────
function AddMachineDialog({ onClose }: { onClose: () => void }) {
    const [pricingLogic, setPricingLogic] = useState("simple")

    return (
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
            <DialogHeader className="px-10 pt-10 pb-6 text-left border-b">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                        <Printer className="h-5 w-5" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Add Machine Master</DialogTitle>
                </div>
                <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                    Register new production equipment and configure rates
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
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Machine Name <span className="text-rose-500">*</span></Label>
                            <Input className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20" placeholder="e.g. Heidelberg SM 74" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Internal Code</Label>
                            <Input className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4 focus-visible:ring-blue-500/20" placeholder="E.G. M-01" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Machine Type <span className="text-rose-500">*</span></Label>
                            <Select>
                                <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="digital">Digital</SelectItem>
                                    <SelectItem value="offset">Offset</SelectItem>
                                    <SelectItem value="wide-format">Wide Format</SelectItem>
                                    <SelectItem value="finishing">Finishing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Make / Model</Label>
                            <Input className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4 focus-visible:ring-blue-500/20" placeholder="e.g. Konica Minolta C3070" />
                        </div>
                    </div>
                </div>

                {/* 02: Costing & Pricing */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">02</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Costing & Pricing</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Pricing Logic <span className="text-rose-500">*</span></Label>
                            <Select value={pricingLogic} onValueChange={setPricingLogic}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="simple">Simple (Fixed Rate)</SelectItem>
                                    <SelectItem value="click">Click Based</SelectItem>
                                    <SelectItem value="slab">Qty Slab Based</SelectItem>
                                    <SelectItem value="coverage">Coverage Based</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Hourly Operating Cost (₹)</Label>
                            <Input type="number" step="0.01" className="h-12 rounded-xl border-none bg-emerald-50 font-black text-emerald-700 px-4 shadow-sm" defaultValue="0.00" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Status</Label>
                            <Select defaultValue="operational">
                                <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="operational">Operational</SelectItem>
                                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                                    <SelectItem value="idle">Idle</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                <Button
                    variant="ghost"
                    className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all"
                    onClick={onClose}
                >
                    Save Machine Details
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

// ─── Color Config Cell ─────────────────────────────────────────────────────────
function ColorConfigCell({ config }: { config: ColorConfig }) {
    if (config.type === "click") {
        return (
            <div className="text-xs space-y-0.5">
                <div>Click: <span className="font-bold">₹{config.colorRate.toFixed(4)}</span></div>
                <div className="text-muted-foreground">Min: ₹{config.colorMin.toFixed(2)}</div>
            </div>
        )
    }
    if (config.type === "slab") {
        return (
            <span className="flex items-center gap-1.5 text-sm font-bold text-blue-600">
                <BarChart2 className="h-3.5 w-3.5" /> Qty Slab Based
            </span>
        )
    }
    return (
        <span className="flex items-center gap-1.5 text-sm font-bold text-indigo-600">
            <Layers className="h-3.5 w-3.5" /> Coverage Based
        </span>
    )
}

// ─── BW Config Cell ────────────────────────────────────────────────────────────
function BWConfigCell({ config }: { config: ColorConfig }) {
    if (config.type === "click") {
        return (
            <div className="text-xs space-y-0.5">
                <div>Click: <span className="font-bold">₹{config.bwRate.toFixed(4)}</span></div>
                <div className="text-muted-foreground">Min: ₹{config.bwMin.toFixed(2)}</div>
            </div>
        )
    }
    return (
        <span className="flex items-center gap-1.5 text-sm text-blue-600 font-bold">
            <Info className="h-3.5 w-3.5" /> See Tier Config
        </span>
    )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function MachinesPage() {
    const [machines, setMachines] = useState<Machine[]>(initialMachines)
    const [search, setSearch] = useState("")
    const [showAdd, setShowAdd] = useState(false)

    const filtered = machines.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.type.toLowerCase().includes(search.toLowerCase())
    )

    const deleteMachine = (id: number) => setMachines(prev => prev.filter(m => m.id !== id))

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Machine Management</h1>
                <Dialog open={showAdd} onOpenChange={setShowAdd}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-10 shadow-sm">
                            <Plus className="h-4 w-4" /> Add New Machine
                        </Button>
                    </DialogTrigger>
                    <AddMachineDialog onClose={() => setShowAdd(false)} />
                </Dialog>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Printer className="h-4 w-4" />
                        <CardTitle className="text-sm font-medium">Printing Equipment</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9">
                                        <Download className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9">
                                        <Filter className="h-4 w-4" /> Columns <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Reset Columns</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search current page..."
                                className="pl-8 h-9 bg-muted/20 border-none focus-visible:ring-1"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="font-bold">Machine Name</TableHead>
                                    <TableHead className="font-bold w-[150px]">Costing (Hourly)</TableHead>
                                    <TableHead className="font-bold w-[180px]">Color Config</TableHead>
                                    <TableHead className="font-bold w-[180px]">B/W Config</TableHead>
                                    <TableHead className="font-bold w-[130px]">Status</TableHead>
                                    <TableHead className="text-right font-bold w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(machine => (
                                    <TableRow key={machine.id} className="group">
                                        {/* Name + Type */}
                                        <TableCell className="py-4">
                                            <div>
                                                <p className="font-bold text-sm">{machine.name}</p>
                                                <p className="text-[11px] text-muted-foreground">{machine.type} | {machine.model}</p>
                                            </div>
                                        </TableCell>

                                        {/* Costing */}
                                        <TableCell className="font-bold text-sm">
                                            ₹{machine.costingHourly.toLocaleString("en-IN", { minimumFractionDigits: 2 })} <span className="text-muted-foreground font-normal text-xs">/hr</span>
                                        </TableCell>

                                        {/* Color Config */}
                                        <TableCell>
                                            <ColorConfigCell config={machine.colorConfig} />
                                        </TableCell>

                                        {/* B/W Config */}
                                        <TableCell>
                                            <BWConfigCell config={machine.colorConfig} />
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-[10px] uppercase">
                                                {machine.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right py-2">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    size="icon" variant="outline"
                                                    className="h-8 w-8 border-blue-200 text-blue-600 hover:bg-blue-50"
                                                >
                                                    <Edit className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="icon" variant="outline"
                                                    className="h-8 w-8 border-rose-200 text-rose-600 hover:bg-rose-50"
                                                    onClick={() => deleteMachine(machine.id)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
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
