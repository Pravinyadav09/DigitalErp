"use client"

import React, { useState } from "react"
import {
    Search, Plus, Download, ChevronDown,
    CheckCircle, RotateCcw, Droplets, X, Activity
} from "lucide-react"
import { toast } from "sonner"
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
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
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ─── Types ──────────────────────────────────────────────────────────────────
type InkStock = {
    id: number
    machine: string
    machineType: string
    color: string
    quantity: number
    costPerUnit: number
    reorderLevel: number
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialInks: InkStock[] = [
    { id: 1, machine: "Epson SureColor S80670", machineType: "Wide Format", color: "Yellow", quantity: 44, costPerUnit: 1105.10, reorderLevel: 5 },
    { id: 2, machine: "Epson SureColor S80670", machineType: "Wide Format", color: "Cyan", quantity: 12, costPerUnit: 641.91, reorderLevel: 5 },
    { id: 3, machine: "Epson SureColor S80670", machineType: "Wide Format", color: "Magenta", quantity: 30, costPerUnit: 890.50, reorderLevel: 5 },
    { id: 4, machine: "Heidelberg Speedmaster", machineType: "Offset", color: "Yellow", quantity: 47, costPerUnit: 1218.29, reorderLevel: 5 },
    { id: 5, machine: "Konica Minolta C6085", machineType: "Digital", color: "Black", quantity: 22, costPerUnit: 1069.77, reorderLevel: 5 },
    { id: 6, machine: "Konica Minolta C6085", machineType: "Digital", color: "Yellow", quantity: 43, costPerUnit: 1975.95, reorderLevel: 5 },
    { id: 7, machine: "Konica Minolta C6085", machineType: "Digital", color: "Cyan", quantity: 18, costPerUnit: 1412.00, reorderLevel: 5 },
    { id: 8, machine: "Konica Minolta C6085", machineType: "Digital", color: "Magenta", quantity: 25, costPerUnit: 1380.50, reorderLevel: 5 },
]

// Color badge styles
const colorStyle: Record<string, string> = {
    Yellow: "bg-yellow-400 text-yellow-900",
    Cyan: "bg-cyan-400 text-cyan-900",
    Magenta: "bg-pink-500 text-white",
    Black: "bg-gray-900 text-white",
    Varnish: "bg-slate-300 text-slate-800",
}

// ─── Add Ink Stock Dialog ─────────────────────────────────────────────────────
function AddInkDialog({ onSave, onClose }: {
    onSave: (ink: InkStock) => void
    onClose: () => void
}) {
    const [machine, setMachine] = useState("")
    const [color, setColor] = useState("")
    const [qty, setQty] = useState(0)
    const [cost, setCost] = useState(0)
    const [reorder, setReorder] = useState(5)
    const [batch, setBatch] = useState("")
    const [desc, setDesc] = useState("")

    const machineMap: Record<string, string> = {
        "epson": "Epson SureColor S80670",
        "heidelberg": "Heidelberg Speedmaster",
        "konica": "Konica Minolta C6085",
    }
    const typeMap: Record<string, string> = {
        "epson": "Wide Format",
        "heidelberg": "Offset",
        "konica": "Digital",
    }

    return (
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
            <DialogHeader className="px-10 pt-10 pb-6 text-left border-b">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                        <Droplets className="h-5 w-5" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Add Ink Stock</DialogTitle>
                </div>
                <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                    Register new ink, toner or solvent inventory
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
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Machine Compatibility <span className="text-rose-500">*</span></Label>
                            <Select value={machine} onValueChange={setMachine}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20">
                                    <SelectValue placeholder="Select Machine" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="epson">Epson SureColor S80670</SelectItem>
                                    <SelectItem value="heidelberg">Heidelberg Speedmaster</SelectItem>
                                    <SelectItem value="konica">Konica Minolta C6085</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Color / Ink Type <span className="text-rose-500">*</span></Label>
                            <Input
                                className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4"
                                placeholder="e.g. Cyan, Black, Varnish"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* 02: Stock Details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">02</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Stock Details</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Quantity (Units)</Label>
                            <Input type="number" className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4" value={qty}
                                onChange={e => setQty(+e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Cost / Unit (₹)</Label>
                            <Input type="number" step="0.01" className="h-12 rounded-xl border-none bg-emerald-50 font-black text-emerald-700 px-4 shadow-sm" value={cost}
                                onChange={e => setCost(+e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-rose-500 tracking-widest pl-1">Reorder Alert</Label>
                            <Input type="number" className="h-12 rounded-xl border-none bg-rose-50 font-black text-rose-700 px-4 shadow-sm" value={reorder}
                                onChange={e => setReorder(+e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Internal Description / Batch Info</Label>
                        <Textarea
                            className="min-h-[100px] rounded-xl border-slate-100 bg-white font-medium text-slate-600 p-4 resize-none focus-visible:ring-blue-500/20"
                            placeholder="e.g. Batch XYZ-2024, Shelf 4A..."
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                <Button variant="ghost" className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all font-bold"
                    onClick={() => {
                        if (!machine || !color) return
                        onSave({
                            id: Date.now(),
                            machine: machineMap[machine] ?? machine,
                            machineType: typeMap[machine] ?? "",
                            color, quantity: qty,
                            costPerUnit: cost, reorderLevel: reorder,
                        })
                        onClose()
                    }}
                >
                    Save Ink Stock
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

// ─── Issue Ink Dialog ─────────────────────────────────────────────────────────
function IssueInkDialog({ ink, onClose }: { ink: InkStock; onClose: () => void }) {
    const [meter, setMeter] = useState("")

    return (
        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
            <DialogHeader className="px-10 pt-10 pb-6 text-left border-b">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/50">
                        <Activity className="h-5 w-5" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Issue Ink Stock</DialogTitle>
                </div>
                <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                    Record consumption for {ink.machine}
                </DialogDescription>
            </DialogHeader>
            <div className="px-8 py-6 space-y-6 bg-background flex-1 overflow-y-auto">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Issuing Item</p>
                    <p className="text-sm font-bold text-slate-700">{ink.color} Ink Cartridge</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">
                        Current Meter Reading <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                        type="number"
                        className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20"
                        placeholder="e.g. 150400"
                        value={meter}
                        onChange={e => setMeter(e.target.value)}
                    />
                    <p className="text-[10px] font-bold text-slate-400 pl-1">
                        Required to calculate yield of previous cartridge.
                    </p>
                </div>
            </div>
            <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                <Button variant="ghost" className="h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    className="h-11 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 transition-all"
                    onClick={() => {
                        toast.success("Ink Issued", { description: `Consumption recorded for ${ink.machine}.` })
                        onClose()
                    }}
                >
                    Confirm Issue
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InkInventoryPage() {
    const [inks, setInks] = useState<InkStock[]>(initialInks)
    const [search, setSearch] = useState("")
    const [showAdd, setShowAdd] = useState(false)
    const [issueInk, setIssueInk] = useState<InkStock | null>(null)

    const addInk = (ink: InkStock) => setInks(prev => [...prev, ink])

    const filtered = inks.filter(i =>
        i.machine.toLowerCase().includes(search.toLowerCase()) ||
        i.color.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Ink Inventory</h1>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Droplets className="h-4 w-4" />
                            <CardTitle className="text-sm font-medium">Manage Ink Stocks</CardTitle>
                        </div>
                        <Dialog open={showAdd} onOpenChange={setShowAdd}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                                    <Plus className="h-4 w-4" /> Add Ink Stock
                                </Button>
                            </DialogTrigger>
                            <AddInkDialog onSave={addInk} onClose={() => setShowAdd(false)} />
                        </Dialog>
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
                                        Columns <ChevronDown className="h-3 w-3" />
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
                                    <TableHead className="font-bold">Machine</TableHead>
                                    <TableHead className="font-bold w-[130px]">Color / Type</TableHead>
                                    <TableHead className="font-bold w-[100px]">Quantity</TableHead>
                                    <TableHead className="font-bold w-[130px]">Cost / Unit</TableHead>
                                    <TableHead className="font-bold w-[130px]">Reorder Level</TableHead>
                                    <TableHead className="font-bold w-[140px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(ink => (
                                    <TableRow key={ink.id} className="group">
                                        {/* Machine */}
                                        <TableCell className="py-3.5">
                                            <p className="font-bold text-sm">{ink.machine}</p>
                                            <p className="text-[11px] text-muted-foreground">{ink.machineType}</p>
                                        </TableCell>

                                        {/* Color badge */}
                                        <TableCell>
                                            <Badge
                                                className={`font-bold text-xs px-3 h-6 ${colorStyle[ink.color] ?? "bg-slate-200 text-slate-800"}`}
                                            >
                                                {ink.color}
                                            </Badge>
                                        </TableCell>

                                        {/* Quantity */}
                                        <TableCell className="font-bold text-sm">
                                            {ink.quantity}
                                        </TableCell>

                                        {/* Cost/Unit */}
                                        <TableCell className="text-sm">
                                            ₹{ink.costPerUnit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                        </TableCell>

                                        {/* Reorder Level */}
                                        <TableCell className="text-sm font-medium">
                                            {ink.reorderLevel}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="py-2">
                                            <div className="flex items-center gap-1.5">
                                                {/* Issue button */}
                                                <Dialog
                                                    open={issueInk?.id === ink.id}
                                                    onOpenChange={open => !open && setIssueInk(null)}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            className="h-7 text-[11px] font-bold gap-1 bg-emerald-600 hover:bg-emerald-700 px-3"
                                                            onClick={() => setIssueInk(ink)}
                                                        >
                                                            <CheckCircle className="h-3 w-3" /> Issue
                                                        </Button>
                                                    </DialogTrigger>
                                                    {issueInk?.id === ink.id && (
                                                        <IssueInkDialog ink={ink} onClose={() => setIssueInk(null)} />
                                                    )}
                                                </Dialog>
                                                {/* Undo/Return button */}
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-7 w-7 border-slate-200 text-slate-500 hover:text-slate-800"
                                                >
                                                    <RotateCcw className="h-3 w-3" />
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
