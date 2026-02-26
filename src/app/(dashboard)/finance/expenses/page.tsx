"use client"

import React, { useState } from "react"
import {
    Search, Plus, Download, ChevronDown,
    CreditCard, Calendar, Tag, Trash2, Edit,
    Filter, FileText, CheckCircle, Receipt,
    RotateCcw, User, Hash, Wallet, Info,
    Settings2
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// ─── Types ──────────────────────────────────────────────────────────────────
type Expense = {
    id: string
    date: string
    vendor: string
    title: string
    category: string
    reference: string
    amount: number
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialExpenses: Expense[] = [
    { id: "EXP-001", date: "02 Jan, 2026", vendor: "-", title: "Architecto repellat et ex.", category: "Tea & Pantry", reference: "-", amount: 439.00 },
    { id: "EXP-002", date: "03 Jan, 2026", vendor: "-", title: "Veritatis voluptates doloremque ut laboriosam.", category: "Machine Maintenance", reference: "-", amount: 2882.00 },
    { id: "EXP-003", date: "07 Jan, 2026", vendor: "-", title: "Voluptas molestiae.", category: "Transport", reference: "-", amount: 2670.00 },
]

const categories = ["Electricity", "Internet", "Labor Wages", "Machine Maintenance", "Rent", "Tea & Pantry", "Transport"]

// ─── Add Expense Dialog ──────────────────────────────────────────────────────
function AddExpenseDialog({ onClose }: { onClose: () => void }) {
    const [isGst, setIsGst] = useState(false)

    return (
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
            <DialogHeader className="px-10 pt-10 pb-6 text-left border-b">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                        <Receipt className="h-5 w-5" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Record Expense</DialogTitle>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                    Track new expenditure and GST bills for accounting
                </p>
            </DialogHeader>
            <div className="px-10 py-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                {/* 01: Identification */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">01</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Expense Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Expense Title <span className="text-rose-500">*</span></Label>
                            <Input
                                className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20"
                                placeholder="e.g. Printer Paper Bundle"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Category <span className="text-rose-500">*</span></Label>
                            <Select>
                                <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* 02: Transaction Details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">02</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Transaction Details</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Amount (₹) <span className="text-rose-500">*</span></Label>
                            <Input type="number" step="0.01" className="h-12 rounded-xl border-none bg-emerald-50 font-black text-emerald-700 px-4 shadow-sm" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Date <span className="text-rose-500">*</span></Label>
                            <Input type="date" className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4" defaultValue="2026-02-11" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Payment Method</Label>
                            <Select>
                                <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                    <SelectValue placeholder="Select Method" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="upi">UPI / Online</SelectItem>
                                    <SelectItem value="bank">Bank Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Reference / Bill Number</Label>
                    <Input placeholder="Enter Reference No." className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4" />
                </div>

                {/* GST Checkbox */}
                <div className="flex items-center space-x-3 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                    <Checkbox id="gst" checked={isGst} onCheckedChange={(v: boolean) => setIsGst(v)} className="h-5 w-5 rounded-md" />
                    <label htmlFor="gst" className="text-xs font-black uppercase tracking-widest text-slate-600 cursor-pointer">
                        Is GST Bill? (For Input Tax Credit)
                    </label>
                </div>

                {/* GST Details - Conditional */}
                {isGst && (
                    <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-2 border-b pb-2">
                            <Info className="h-4 w-4 text-blue-500" />
                            <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Identify Vendor</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Vendor</Label>
                                <Select>
                                    <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                        <SelectValue placeholder="Select Vendor" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="v1">Modern Paper Mart</SelectItem>
                                        <SelectItem value="v2">Ganesh Machinery</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">03</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Additional Info</h3>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Description / Notes</Label>
                        <Textarea
                            placeholder="Any additional notes..."
                            className="min-h-[100px] rounded-xl border-slate-100 bg-white font-medium text-slate-600 p-4 resize-none focus-visible:ring-blue-500/20"
                        />
                    </div>
                </div>
            </div>

            <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                <Button variant="ghost" className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors font-bold" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all font-bold"
                    onClick={() => {
                        toast.success("Expense Recorded", { description: "Expenditure has been logged successfully." })
                        onClose()
                    }}
                >
                    Save Expense
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ExpensesPage() {
    const [expenses] = useState<Expense[]>(initialExpenses)
    const [search, setSearch] = useState("")

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
            </div>

            {/* Filter Bar */}
            <Card className="border-none shadow-sm bg-background">
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-slate-400">Category</Label>
                            <Select defaultValue="all">
                                <SelectTrigger className="h-10">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(c => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-slate-400">Start Date</Label>
                            <Input type="date" className="h-10" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-slate-400">End Date</Label>
                            <Input type="date" className="h-10" />
                        </div>
                        <div className="flex items-end gap-2 pb-0.5">
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 font-bold h-10 gap-2">
                                <Filter className="h-4 w-4" /> Filter
                            </Button>
                            <Button variant="outline" className="flex-1 font-bold h-10 gap-2 text-slate-600">
                                <RotateCcw className="h-4 w-4" /> Reset
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground font-bold italic">
                            <Receipt className="h-4 w-4" />
                            <CardTitle className="text-sm">Expense Records</CardTitle>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-10 text-xs shadow-md">
                                    <Plus className="h-4 w-4" /> New Expense
                                </Button>
                            </DialogTrigger>
                            <AddExpenseDialog onClose={() => { }} />
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9 bg-slate-800 text-white border-none hover:bg-slate-900 hover:text-white">
                                        <Download className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>Export CSV</DropdownMenuItem>
                                    <DropdownMenuItem>Export PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9">
                                        <Settings2 className="h-4 w-4" /> Columns <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>Toggle All</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search current page..."
                                className="pl-8 h-9 bg-muted/20 border-none italic"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Date</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Vendor</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Title</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Category</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Reference</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Amount (₹)</TableHead>
                                    <TableHead className="text-right font-black uppercase text-[11px] tracking-wider text-slate-500 w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {expenses.map(exp => (
                                    <TableRow key={exp.id} className="group hover:bg-muted/5 transition-colors">
                                        <TableCell className="text-xs font-medium text-slate-600">{exp.date}</TableCell>
                                        <TableCell className="text-xs font-medium text-slate-500">{exp.vendor}</TableCell>
                                        <TableCell className="py-4">
                                            <p className="font-bold text-sm text-slate-800">{exp.title}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-[10px] font-bold uppercase bg-slate-50 border-slate-200 text-slate-600">
                                                {exp.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs font-mono text-slate-500">{exp.reference}</TableCell>
                                        <TableCell className="font-black text-sm text-rose-600 italic tracking-tight">
                                            ₹{exp.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1 px-1">
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
