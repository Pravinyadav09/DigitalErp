"use client"

import React, { useState } from "react"
import {
    Search, Plus, Download, ChevronDown,
    CheckCircle, RotateCcw, Droplets, X
} from "lucide-react"
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
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger,
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
        <DialogContent className="max-w-xl p-0 border-none shadow-2xl">
            <DialogHeader className="px-8 pt-7 pb-4 border-b bg-background sticky top-0 z-10">
                <DialogTitle className="text-xl font-bold">Add Ink Stock</DialogTitle>
            </DialogHeader>
            <div className="p-8 bg-background">
                <Card className="border shadow-sm">
                    <CardHeader className="py-3 px-5 bg-muted/30 border-b">
                        <CardTitle className="text-sm font-bold">New Ink/Toner Entry</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5">
                        {/* Machine + Color */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-rose-500">Machine *</Label>
                                <Select value={machine} onValueChange={setMachine}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue placeholder="Select Machine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="epson">Epson SureColor S80670</SelectItem>
                                        <SelectItem value="heidelberg">Heidelberg Speedmaster</SelectItem>
                                        <SelectItem value="konica">Konica Minolta C6085</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-rose-500">Color / Type *</Label>
                                <Input
                                    className="h-9"
                                    placeholder="e.g. Cyan, Black, Varnish"
                                    value={color}
                                    onChange={e => setColor(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Qty + Cost + Reorder */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Quantity (Units)</Label>
                                <Input type="number" className="h-9" value={qty}
                                    onChange={e => setQty(+e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Cost per Unit (₹)</Label>
                                <Input type="number" step="0.01" className="h-9" value={cost}
                                    onChange={e => setCost(+e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Reorder Level</Label>
                                <Input type="number" className="h-9" value={reorder}
                                    onChange={e => setReorder(+e.target.value)} />
                                <p className="text-[10px] text-muted-foreground">Alert when stock falls below this</p>
                            </div>
                        </div>

                        {/* Batch + Description */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-muted-foreground">Batch Number (Optional)</Label>
                                <Input className="h-9" value={batch} onChange={e => setBatch(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-muted-foreground">Description (Optional)</Label>
                                <Textarea className="resize-none h-9 py-2 text-sm"
                                    value={desc} onChange={e => setDesc(e.target.value)} />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 justify-end pt-2">
                            <Button variant="outline" className="font-bold h-9 px-5" onClick={onClose}>Cancel</Button>
                            <Button
                                className="h-9 px-6 bg-blue-600 hover:bg-blue-700 font-bold"
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
                                <CheckCircle className="h-4 w-4 mr-1.5" /> Save Stock
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DialogContent>
    )
}

// ─── Issue Ink Dialog ─────────────────────────────────────────────────────────
function IssueInkDialog({ ink, onClose }: { ink: InkStock; onClose: () => void }) {
    const [meter, setMeter] = useState("")

    return (
        <DialogContent className="max-w-sm p-0 border-none shadow-2xl">
            <DialogHeader className="px-6 pt-6 pb-4 border-b bg-background">
                <div className="flex items-center justify-between">
                    <DialogTitle className="text-base font-bold">Issue Ink Stock</DialogTitle>
                </div>
            </DialogHeader>
            <div className="p-6 space-y-4 bg-background">
                <p className="text-sm">
                    Issuing:{" "}
                    <span className="font-black">
                        {ink.machine} – {ink.color}
                    </span>
                </p>
                <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-rose-500">
                        Current Machine Meter Reading *
                    </Label>
                    <Input
                        type="number"
                        className="h-10 text-base"
                        placeholder="e.g. 150400"
                        value={meter}
                        onChange={e => setMeter(e.target.value)}
                    />
                    <p className="text-[10px] text-muted-foreground">
                        Required to calculate yield of the PREVIOUS cartridge.
                    </p>
                </div>
                <div className="flex gap-3 justify-end pt-1">
                    <Button variant="outline" className="font-bold h-9 px-5" onClick={onClose}>Cancel</Button>
                    <Button
                        className="h-9 px-5 bg-emerald-600 hover:bg-emerald-700 font-bold"
                        onClick={onClose}
                    >
                        Confirm Issue
                    </Button>
                </div>
            </div>
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
