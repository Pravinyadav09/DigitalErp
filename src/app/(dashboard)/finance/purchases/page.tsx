"use client"

import React, { useState, useMemo } from "react"
import {
    Plus, Search, Download, ChevronDown,
    Trash2, Edit, Eye, ArrowLeft, PlusCircle,
    ShoppingCart, Calendar, Receipt, User,
    FileText, CheckCircle, Info, Calculator
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
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// ─── Types ──────────────────────────────────────────────────────────────────
type PurchaseItem = {
    id: string
    type: string
    item: string
    quantity: number
    unitPrice: number
    subtotal: number
}

type PurchaseRecord = {
    id: string
    date: string
    vendor: string
    invoiceNo: string
    itemsCount: number
    itemsSummary: string
    amount: number
    tax: number
    total: number
    createdBy: string
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialPurchases: PurchaseRecord[] = [
    { id: "PUR-001", date: "30 Jan, 2026", vendor: "Harber and Sons", invoiceNo: "INV-046vm", itemsCount: 1, itemsSummary: "92.00 x Ink", amount: 0, tax: 0, total: 0, createdBy: "System Admin" },
    { id: "PUR-002", date: "30 Jan, 2026", vendor: "Kemmer-Collier", invoiceNo: "PUR-20260130-1", itemsCount: 1, itemsSummary: "1894.00 x Paper", amount: 11299.80, tax: 2033.96, total: 13333.76, createdBy: "System Admin" },
    { id: "PUR-003", date: "30 Jan, 2026", vendor: "Kemmer-Collier", invoiceNo: "PUR-20260130-2", itemsCount: 1, itemsSummary: "1489.00 x Paper", amount: 16858.51, tax: 3034.53, total: 19893.04, createdBy: "System Admin" },
]

const vendors = ["Harber and Sons", "Kemmer-Collier", "Modern Paper Mart", "Ganesh Machinery"]
const itemTypes = ["Paper", "Ink", "Media", "Consumables", "Spare Parts"]

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PurchasesPage() {
    const [view, setView] = useState<"list" | "new">("list")
    const [purchases] = useState<PurchaseRecord[]>(initialPurchases)
    const [isGst, setIsGst] = useState(false)
    const [items, setItems] = useState<PurchaseItem[]>([
        { id: "1", type: "", item: "", quantity: 0, unitPrice: 0, subtotal: 0 }
    ])

    const addItem = () => {
        setItems([...items, { id: Math.random().toString(), type: "", item: "", quantity: 0, unitPrice: 0, subtotal: 0 }])
    }

    const totals = useMemo(() => {
        const amount = items.reduce((acc, curr) => acc + curr.subtotal, 0)
        const tax = isGst ? amount * 0.18 : 0 // Assuming 18% as default for mock
        return { amount, tax, total: amount + tax }
    }, [items, isGst])

    if (view === "new") {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setView("list")}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">New Purchase</h1>
                </div>

                <div className="space-y-4">
                    {/* A. Invoice Details */}
                    <Card className="border shadow-sm">
                        <CardHeader className="py-3 px-5 border-b bg-muted/20">
                            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">A. Invoice Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold">Vendor <span className="text-rose-500">*</span></Label>
                                    <Select>
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select Vendor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {vendors.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold">Invoice Number</Label>
                                    <Input placeholder="Enter Invoice No." className="h-10" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold">Purchase Date <span className="text-rose-500">*</span></Label>
                                    <Input type="date" className="h-10" defaultValue="2026-02-11" />
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap items-center gap-8">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="isGst" checked={isGst} onCheckedChange={(v: boolean) => setIsGst(v)} />
                                    <Label htmlFor="isGst" className="text-sm font-bold cursor-pointer">Is GST Bill?</Label>
                                </div>
                                {isGst && (
                                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 transition-all">
                                        <Label className="text-xs font-bold shrink-0">Tax Rate</Label>
                                        <Select defaultValue="18">
                                            <SelectTrigger className="h-9 w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">5% GST</SelectItem>
                                                <SelectItem value="12">12% GST</SelectItem>
                                                <SelectItem value="18">18% GST</SelectItem>
                                                <SelectItem value="28">28% GST</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* B. Purchase Items */}
                    <Card className="border shadow-sm">
                        <CardHeader className="py-3 px-5 border-b bg-muted/20 flex flex-row items-center justify-between">
                            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">B. Purchase Items</CardTitle>
                            <Button size="sm" variant="outline" className="h-8 gap-1.5 font-bold text-blue-600 border-blue-200" onClick={addItem}>
                                <PlusCircle className="h-3.5 w-3.5" /> Add Item
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30">
                                        <TableHead className="font-bold text-xs uppercase px-5">Type</TableHead>
                                        <TableHead className="font-bold text-xs uppercase">Item</TableHead>
                                        <TableHead className="font-bold text-xs uppercase text-center w-[150px]">Quantity</TableHead>
                                        <TableHead className="font-bold text-xs uppercase text-center w-[150px]">Unit Price</TableHead>
                                        <TableHead className="font-bold text-xs uppercase text-right w-[150px]">Subtotal</TableHead>
                                        <TableHead className="text-right px-5 w-[80px]">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((item, idx) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="px-5">
                                                <Select>
                                                    <SelectTrigger className="h-9 border-none shadow-none focus:ring-0">
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {itemTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Select>
                                                    <SelectTrigger className="h-9 border-none shadow-none focus:ring-0">
                                                        <SelectValue placeholder="Select Item" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="p1">300 GSM Art Card</SelectItem>
                                                        <SelectItem value="p2">Ink Cyan - 1L</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Input type="number" className="h-9 text-center border-slate-200" defaultValue={item.quantity} />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="number" className="h-9 text-center border-slate-200" defaultValue={item.unitPrice} />
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-slate-800">
                                                ₹{item.subtotal.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-right px-5">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="p-6 bg-slate-50/50 border-t flex justify-end">
                                <div className="w-80 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Taxable Amount:</span>
                                        <span className="font-bold text-slate-700">₹{totals.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Tax Amount:</span>
                                        <span className="font-bold text-slate-700">₹{totals.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg pt-3 border-t">
                                        <span className="font-black uppercase tracking-tighter text-slate-800">Grand Total:</span>
                                        <span className="font-black text-blue-600">₹{totals.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" className="h-11 px-8 font-bold text-slate-600" onClick={() => setView("list")}>Cancel</Button>
                        <Button className="h-11 px-10 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200" onClick={() => setView("list")}>
                            Save Purchase
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Purchases</h1>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground font-bold italic">
                            <ShoppingCart className="h-4 w-4" />
                            <CardTitle className="text-sm italic">Purchase History</CardTitle>
                        </div>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm" onClick={() => setView("new")}>
                            <Plus className="h-4 w-4" /> New Purchase
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 border-b">
                                    <TableHead className="font-black tracking-tight text-slate-800 h-12">Date</TableHead>
                                    <TableHead className="font-black tracking-tight text-slate-800 h-12">Vendor</TableHead>
                                    <TableHead className="font-black tracking-tight text-slate-800 h-12">Invoice #</TableHead>
                                    <TableHead className="font-black tracking-tight text-slate-800 h-12">Items</TableHead>
                                    <TableHead className="font-black tracking-tight text-slate-800 h-12">Amount</TableHead>
                                    <TableHead className="font-black tracking-tight text-slate-800 h-12">Tax</TableHead>
                                    <TableHead className="font-black tracking-tight text-slate-800 h-12">Total</TableHead>
                                    <TableHead className="font-black tracking-tight text-slate-800 h-12">Created By</TableHead>
                                    <TableHead className="text-right font-black tracking-tight text-slate-800 h-12 px-5">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {purchases.map(pur => (
                                    <TableRow key={pur.id} className="group hover:bg-muted/10 transition-colors">
                                        <TableCell className="py-4 text-xs font-medium text-slate-600">
                                            {pur.date}
                                        </TableCell>
                                        <TableCell className="font-bold text-slate-800 text-sm">
                                            {pur.vendor}
                                        </TableCell>
                                        <TableCell className="text-xs font-mono text-muted-foreground">
                                            {pur.invoiceNo}
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-[10px] font-bold h-5">
                                                    {pur.itemsCount} Items
                                                </Badge>
                                                <p className="text-[10px] text-muted-foreground italic">{pur.itemsSummary}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold text-sm text-slate-700 tracking-tight">
                                            ₹{pur.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell className="font-bold text-sm text-slate-700 tracking-tight">
                                            ₹{pur.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell className="font-black text-sm text-slate-900 tracking-tighter">
                                            ₹{pur.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <User className="h-3 w-3 text-blue-600" />
                                                </div>
                                                <span className="text-[11px] font-medium text-slate-600">{pur.createdBy}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right px-5">
                                            <div className="flex items-center justify-end gap-1 px-1">
                                                <Button size="icon" variant="outline" className="h-8 w-8 border-cyan-100 text-cyan-600 hover:bg-cyan-50">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-8 w-8 border-blue-100 text-blue-600 hover:bg-blue-50">
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
