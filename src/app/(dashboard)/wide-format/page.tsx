"use client"

import React, { useState } from "react"
import {
    Search, Plus, Download, ChevronDown,
    Edit, Trash2, Maximize, AlertTriangle, CheckCircle
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
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ─── Types ──────────────────────────────────────────────────────────────────
type Media = {
    id: number
    name: string
    type: string
    width: number // Inches
    length: number // Meters/Feet
    unit: "Mtr" | "Ft"
    quantity: number // Rolls
    costPerSqFt: number
    lowStockAlert: number
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialMedia: Media[] = [
    { id: 1, name: "Frontlit Flex (Normal)", type: "Flex", width: 120, length: 50, unit: "Mtr", quantity: 15, costPerSqFt: 3.50, lowStockAlert: 5 },
    { id: 2, name: "Star Flex (High Gloss)", type: "Flex", width: 120, length: 50, unit: "Mtr", quantity: 8, costPerSqFt: 5.20, lowStockAlert: 5 },
    { id: 3, name: "Vinyl Self Adhesive", type: "Vinyl", width: 60, length: 30, unit: "Mtr", quantity: 22, costPerSqFt: 12.00, lowStockAlert: 10 },
    { id: 4, name: "One Way Vision", type: "Vinyl", width: 50, length: 30, unit: "Mtr", quantity: 4, costPerSqFt: 18.00, lowStockAlert: 5 },
    { id: 5, name: "Canvas (Matte)", type: "Fabric", width: 44, length: 15, unit: "Mtr", quantity: 3, costPerSqFt: 45.00, lowStockAlert: 2 },
    { id: 6, name: "Backlit Film", type: "Film", width: 60, length: 30, unit: "Mtr", quantity: 6, costPerSqFt: 25.00, lowStockAlert: 3 },
]

const typeColors: Record<string, string> = {
    "Flex": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Vinyl": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Fabric": "bg-rose-100 text-rose-700 border-rose-200",
    "Film": "bg-sky-100 text-sky-700 border-sky-200",
}

// ─── Add Media Dialog ─────────────────────────────────────────────────────────
function AddMediaDialog({ onSave, onClose }: {
    onSave: (m: Media) => void
    onClose: () => void
}) {
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [width, setWidth] = useState("")
    const [length, setLength] = useState("")
    const [unit, setUnit] = useState<"Mtr" | "Ft">("Mtr")
    const [qty, setQty] = useState(0)
    const [cost, setCost] = useState(0)
    const [lowAlert, setLowAlert] = useState(5)

    return (
        <DialogContent className="max-w-xl p-0 border-none shadow-2xl">
            <DialogHeader className="px-8 pt-7 pb-4 border-b bg-background sticky top-0 z-10">
                <DialogTitle className="text-xl font-bold">Add Wide Format Media</DialogTitle>
            </DialogHeader>

            <div className="p-8 space-y-6 bg-background">
                <Card className="border shadow-sm">
                    <CardHeader className="py-3 px-5 bg-muted/30 border-b">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            New Roll Stock Entry
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-rose-500">Media Name *</Label>
                                <Input className="h-9" placeholder="e.g. Star Flex Gloss" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Category</Label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Flex">Flex</SelectItem>
                                        <SelectItem value="Vinyl">Vinyl</SelectItem>
                                        <SelectItem value="Fabric">Fabric / Canvas</SelectItem>
                                        <SelectItem value="Film">Film</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Width (Inches)</Label>
                                <Input type="number" className="h-9" value={width} onChange={e => setWidth(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Roll Length</Label>
                                <Input type="number" className="h-9" value={length} onChange={e => setLength(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Unit</Label>
                                <Select value={unit} onValueChange={(v: "Mtr" | "Ft") => setUnit(v)}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mtr">Meters</SelectItem>
                                        <SelectItem value="Ft">Feet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Initial Rolls</Label>
                                <Input type="number" className="h-9" value={qty} onChange={e => setQty(+e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Cost / SqFt (₹)</Label>
                                <Input type="number" step="0.01" className="h-9" value={cost} onChange={e => setCost(+e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-amber-600">Low Stock (Rolls)</Label>
                                <Input type="number" className="h-9 border-amber-200" value={lowAlert} onChange={e => setLowAlert(+e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-3 justify-end pt-1">
                    <Button variant="outline" className="font-bold h-10 px-6" onClick={onClose}>Cancel</Button>
                    <Button
                        className="h-10 px-8 bg-blue-600 hover:bg-blue-700 font-bold"
                        onClick={() => {
                            if (!name) return
                            onSave({
                                id: Date.now(),
                                name, type: type || "Flex",
                                width: +width || 0, length: +length || 0,
                                unit, quantity: qty,
                                costPerSqFt: cost, lowStockAlert: lowAlert
                            })
                            onClose()
                        }}
                    >
                        <CheckCircle className="h-4 w-4 mr-2" /> Save Media
                    </Button>
                </div>
            </div>
        </DialogContent>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WideFormatMediaPage() {
    const [mediaList, setMediaList] = useState<Media[]>(initialMedia)
    const [search, setSearch] = useState("")
    const [showAdd, setShowAdd] = useState(false)

    const addMedia = (m: Media) => setMediaList(prev => [m, ...prev])
    const deleteMedia = (id: number) => setMediaList(prev => prev.filter(m => m.id !== id))

    const filtered = mediaList.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.type.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Wide Format Media</h1>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Maximize className="h-4 w-4" />
                            <CardTitle className="text-sm font-medium">Roll Inventory</CardTitle>
                        </div>
                        <Dialog open={showAdd} onOpenChange={setShowAdd}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                                    <Plus className="h-4 w-4" /> Add New Media
                                </Button>
                            </DialogTrigger>
                            <AddMediaDialog onSave={addMedia} onClose={() => setShowAdd(false)} />
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2 h-9">
                                <Download className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3" />
                            </Button>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search media..."
                                className="pl-8 h-9 bg-muted/20 border-none"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="font-bold">Media Name</TableHead>
                                    <TableHead className="font-bold">Category</TableHead>
                                    <TableHead className="font-bold">Roll Size</TableHead>
                                    <TableHead className="font-bold">Quantity</TableHead>
                                    <TableHead className="font-bold">Cost / SqFt</TableHead>
                                    <TableHead className="text-right font-bold w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(media => {
                                    const isLow = media.quantity <= media.lowStockAlert
                                    return (
                                        <TableRow key={media.id} className="group">
                                            <TableCell className="font-bold text-sm py-3.5">{media.name}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-[10px] font-bold uppercase ${typeColors[media.type] ?? "bg-slate-100 text-slate-700"}`}
                                                >
                                                    {media.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {media.width}" x {media.length}{media.unit}
                                            </TableCell>
                                            <TableCell>
                                                {isLow ? (
                                                    <span className="flex items-center gap-1 font-black text-amber-600 text-sm">
                                                        <AlertTriangle className="h-3.5 w-3.5" />
                                                        {media.quantity} Rolls
                                                    </span>
                                                ) : (
                                                    <span className="font-black text-blue-600 text-sm">
                                                        {media.quantity} Rolls
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm font-medium">₹{media.costPerSqFt.toFixed(2)}</TableCell>
                                            <TableCell className="text-right py-2">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button size="icon" variant="outline" className="h-8 w-8 border-blue-200 text-blue-600">
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button size="icon" variant="outline" className="h-8 w-8 border-rose-200 text-rose-500" onClick={() => deleteMedia(media.id)}>
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
