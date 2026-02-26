"use client"

import React, { useState } from "react"
import {
    Search, Plus, Download, Filter, ChevronDown,
    Edit, Trash2, Layers, AlertTriangle, CheckCircle
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

// ─── Types ──────────────────────────────────────────────────────────────────
type PaperStock = {
    id: number
    name: string
    type: string
    size: string
    gsm: number
    quantity: number
    unitPrice: number
    lowStockAlert: number
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialStocks: PaperStock[] = [
    { id: 1, name: "Art Card", type: "Glossy", size: "12x30", gsm: 100, quantity: 2769, unitPrice: 16.01, lowStockAlert: 200 },
    { id: 2, name: "Art Paper", type: "Matte", size: "13x30", gsm: 170, quantity: 1546, unitPrice: 15.08, lowStockAlert: 200 },
    { id: 3, name: "Chromo Paper", type: "Art Paper", size: "12x36", gsm: 170, quantity: 1580, unitPrice: 7.04, lowStockAlert: 200 },
    { id: 4, name: "Creamwove", type: "Glossy", size: "25x30", gsm: 80, quantity: 2746, unitPrice: 18.91, lowStockAlert: 200 },
    { id: 5, name: "Creamwove", type: "Glossy", size: "25x18", gsm: 250, quantity: 2341, unitPrice: 16.09, lowStockAlert: 200 },
    { id: 6, name: "Duplex Board", type: "Texture", size: "12x19", gsm: 300, quantity: 10011, unitPrice: 5.57, lowStockAlert: 200 },
    { id: 7, name: "Kraft Paper", type: "Texture", size: "18x40", gsm: 130, quantity: 24, unitPrice: 9.52, lowStockAlert: 100 },
    { id: 8, name: "Newsprint", type: "Matte", size: "22x30", gsm: 45, quantity: 3120, unitPrice: 3.80, lowStockAlert: 200 },
    { id: 9, name: "Offset Paper", type: "Art Paper", size: "18x23", gsm: 70, quantity: 5400, unitPrice: 4.25, lowStockAlert: 300 },
    { id: 10, name: "Photo Paper", type: "Glossy", size: "12x18", gsm: 200, quantity: 890, unitPrice: 22.50, lowStockAlert: 200 },
]

const typeColors: Record<string, string> = {
    "Glossy": "bg-blue-100 text-blue-700 border-blue-200",
    "Matte": "bg-purple-100 text-purple-700 border-purple-200",
    "Art Paper": "bg-amber-100 text-amber-700 border-amber-200",
    "Texture": "bg-stone-100 text-stone-700 border-stone-200",
    "Coated": "bg-teal-100 text-teal-700 border-teal-200",
}

// ─── Add Stock Dialog ─────────────────────────────────────────────────────────
function AddStockDialog({ onSave, onClose }: {
    onSave: (s: PaperStock) => void
    onClose: () => void
}) {
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [gsm, setGsm] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [calcMode, setCalcMode] = useState("manual")
    const [rimWeight, setRimWeight] = useState(5)
    const [sheetsPerPacket, setSheetsPerPacket] = useState(500)
    const [pricePerKg, setPricePerKg] = useState(100)
    const [finalCost, setFinalCost] = useState("")
    const [initialStock, setInitialStock] = useState(0)
    const [lowAlert, setLowAlert] = useState(100)

    // Auto-calc final cost when By Weight mode
    const autoFinalCost = calcMode === "weight"
        ? ((rimWeight / sheetsPerPacket) * pricePerKg).toFixed(4)
        : finalCost

    return (
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
            <DialogHeader className="px-10 pt-10 pb-6 text-left">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                        <Layers className="h-5 w-5" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Add Paper Stock</DialogTitle>
                </div>
                <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                    Register new paper inventory and configure pricing
                </DialogDescription>
            </DialogHeader>

            <div className="px-10 pb-6 space-y-8 flex-1 overflow-y-auto">
                {/* Section 01: Identification */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">01</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Identification</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Paper Name <span className="text-rose-500">*</span></Label>
                            <Input
                                className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20"
                                placeholder="e.g. 130 GSM Art Paper"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Stock Category</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="Glossy">Coated (Gloss/Matte)</SelectItem>
                                    <SelectItem value="Matte">Matte</SelectItem>
                                    <SelectItem value="Art Paper">Art Paper</SelectItem>
                                    <SelectItem value="Texture">Texture / Uncoated</SelectItem>
                                    <SelectItem value="Coated">Coated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Section 02: Specifications */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">02</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Technical Specs</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">GSM <span className="text-rose-500">*</span></Label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl border-none bg-blue-50 font-black text-slate-800 px-4 focus-visible:ring-blue-500/20"
                                value={gsm}
                                onChange={e => setGsm(e.target.value)}
                                placeholder="200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Width (In)</Label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4 focus-visible:ring-blue-500/20"
                                placeholder="e.g. 18"
                                value={width}
                                onChange={e => setWidth(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Height (In)</Label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4 focus-visible:ring-blue-500/20"
                                placeholder="e.g. 23"
                                value={height}
                                onChange={e => setHeight(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Section 03: Pricing */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">03</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Commercials</h3>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Calc. Mode</Label>
                                <Select value={calcMode} onValueChange={setCalcMode}>
                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white font-bold text-slate-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="manual">Manual Per Sheet</SelectItem>
                                        <SelectItem value="weight">By Weight (Price/Kg)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Final Per Sheet Cost (₹)</Label>
                                <Input
                                    readOnly={calcMode === "weight"}
                                    className={`h-11 rounded-xl border-none shadow-sm font-black text-lg ${calcMode === 'weight' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-600 text-white'}`}
                                    value={calcMode === "weight" ? autoFinalCost : finalCost}
                                    onChange={e => setFinalCost(e.target.value)}
                                    placeholder="0.0000"
                                />
                            </div>
                        </div>

                        {calcMode === "weight" && (
                            <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Rim Wt (Kg)</Label>
                                    <Input
                                        type="number"
                                        className="h-9 rounded-lg border-slate-200 bg-white text-xs font-bold"
                                        value={rimWeight}
                                        onChange={e => setRimWeight(+e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Sheets/Pkt</Label>
                                    <Input
                                        type="number"
                                        className="h-9 rounded-lg border-slate-200 bg-white text-xs font-bold"
                                        value={sheetsPerPacket}
                                        onChange={e => setSheetsPerPacket(+e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Rate/Kg (₹)</Label>
                                    <Input
                                        type="number"
                                        className="h-9 rounded-lg border-slate-200 bg-white text-xs font-bold uppercase"
                                        value={pricePerKg}
                                        onChange={e => setPricePerKg(+e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Inventory Alert */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Initial Opening Stock</Label>
                        <Input
                            type="number"
                            className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4"
                            value={initialStock}
                            onChange={e => setInitialStock(+e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1 text-rose-500">Low Stock Alert (Min Qty)</Label>
                        <Input
                            type="number"
                            className="h-12 rounded-xl border-none bg-rose-50 font-black text-rose-700 px-4 shadow-sm"
                            value={lowAlert}
                            onChange={e => setLowAlert(+e.target.value)}
                        />
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
                    onClick={() => onSave({
                        id: Math.random(),
                        name,
                        type,
                        gsm: +gsm,
                        size: `${width}x${height}`,
                        quantity: initialStock,
                        unitPrice: +autoFinalCost,
                        lowStockAlert: lowAlert
                    })}
                >
                    Register Stock
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PaperStocksPage() {
    const [stocks, setStocks] = useState<PaperStock[]>(initialStocks)
    const [search, setSearch] = useState("")
    const [showAdd, setShowAdd] = useState(false)

    const addStock = (s: PaperStock) => setStocks(prev => [s, ...prev])
    const deleteStock = (id: number) => setStocks(prev => prev.filter(s => s.id !== id))

    const filtered = stocks.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.type.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Paper Stocks</h1>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Layers className="h-4 w-4" />
                            <CardTitle className="text-sm font-medium">Inventory List</CardTitle>
                        </div>
                        <Dialog open={showAdd} onOpenChange={setShowAdd}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                                    <Plus className="h-4 w-4" /> Add New Stock
                                </Button>
                            </DialogTrigger>
                            <AddStockDialog onSave={addStock} onClose={() => setShowAdd(false)} />
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
                                    <TableHead className="font-bold">Name</TableHead>
                                    <TableHead className="font-bold w-[120px]">Type</TableHead>
                                    <TableHead className="font-bold w-[160px]">Size / GSM</TableHead>
                                    <TableHead className="font-bold w-[110px]">Quantity</TableHead>
                                    <TableHead className="font-bold w-[110px]">Unit Price</TableHead>
                                    <TableHead className="text-right font-bold w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(stock => {
                                    const isLow = stock.quantity <= stock.lowStockAlert
                                    return (
                                        <TableRow key={stock.id} className="group">
                                            {/* Name */}
                                            <TableCell className="font-bold text-sm py-3.5">
                                                {stock.name}
                                            </TableCell>

                                            {/* Type badge */}
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-[10px] font-bold uppercase px-2.5 ${typeColors[stock.type] ?? "bg-slate-100 text-slate-700 border-slate-200"}`}
                                                >
                                                    {stock.type}
                                                </Badge>
                                            </TableCell>

                                            {/* Size / GSM */}
                                            <TableCell className="text-sm text-muted-foreground">
                                                {stock.size} / {stock.gsm} GSM
                                            </TableCell>

                                            {/* Quantity — green if ok, amber/red if low */}
                                            <TableCell>
                                                {isLow ? (
                                                    <span className="flex items-center gap-1 font-black text-amber-600 text-sm">
                                                        <AlertTriangle className="h-3.5 w-3.5" />
                                                        {stock.quantity}
                                                    </span>
                                                ) : (
                                                    <span className="font-black text-emerald-600 text-sm">
                                                        {stock.quantity.toLocaleString()}
                                                    </span>
                                                )}
                                            </TableCell>

                                            {/* Unit Price */}
                                            <TableCell className="text-sm font-medium">
                                                {stock.unitPrice.toFixed(2)}
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
                                                        className="h-8 w-8 border-rose-200 text-rose-500 hover:bg-rose-50"
                                                        onClick={() => deleteStock(stock.id)}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
