"use client"

import React, { useState } from "react"
import {
    Search, Plus, Download, ChevronDown,
    CreditCard, Calendar, Tag, Trash2, Edit,
    Filter, FileText, CheckCircle, Receipt,
    RotateCcw, User, Hash, Wallet, Info,
    Settings2
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
        <DialogContent className="max-w-4xl p-0 border-none shadow-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader className="px-8 pt-7 pb-4 border-b bg-background sticky top-0 z-10 flex flex-row items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                <DialogTitle className="text-xl font-bold">Record New Expense</DialogTitle>
            </DialogHeader>
            <div className="p-8 bg-background">
                <Card className="border shadow-sm border-slate-200 overflow-hidden">
                    <CardHeader className="py-3 px-6 bg-slate-50 border-b">
                        <CardTitle className="text-xs font-black uppercase text-slate-500 tracking-wider">Expense Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-black uppercase text-slate-500">Expense Title <span className="text-rose-500">*</span></Label>
                                <Input placeholder="e.g. Printer Paper Bundle" className="h-10" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-black uppercase text-slate-500">Category <span className="text-rose-500">*</span></Label>
                                <Select>
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-black uppercase text-slate-500">Amount (₹) <span className="text-rose-500">*</span></Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                                    <Input type="number" placeholder="0.00" className="h-10 pl-7 font-bold text-slate-800" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-black uppercase text-slate-500">Date <span className="text-rose-500">*</span></Label>
                                <div className="relative">
                                    <Input type="date" className="h-10" defaultValue="2026-02-11" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-black uppercase text-slate-500">Payment Method <span className="text-rose-500">*</span></Label>
                                <Select>
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="upi">UPI / Online</SelectItem>
                                        <SelectItem value="bank">Bank Transfer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-black uppercase text-slate-500">Reference / Bill Number</Label>
                            <Input placeholder="Enter Reference No." className="h-10" />
                        </div>

                        {/* GST Checkbox */}
                        <div className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                            <Checkbox id="gst" checked={isGst} onCheckedChange={(v: boolean) => setIsGst(v)} />
                            <label htmlFor="gst" className="text-sm font-bold text-slate-700 cursor-pointer">
                                Is GST Bill? (For Input Tax Credit)
                            </label>
                        </div>

                        {/* GST Details - Conditional */}
                        {isGst && (
                            <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="flex items-center gap-2 border-b pb-2">
                                    <Info className="h-4 w-4 text-blue-500" />
                                    <h4 className="text-sm font-black uppercase text-blue-600 tracking-wider">Bill Details</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-500">Vendor</Label>
                                        <Select>
                                            <SelectTrigger className="h-10">
                                                <SelectValue placeholder="Select Vendor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="v1">Modern Paper Mart</SelectItem>
                                                <SelectItem value="v2">Ganesh Machinery</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-500">Bill / Invoice Number</Label>
                                        <Input placeholder="Enter Invoice No." className="h-10" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-500">Bill Date</Label>
                                        <Input type="date" className="h-10" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-500">Tax Rate</Label>
                                        <Select>
                                            <SelectTrigger className="h-10">
                                                <SelectValue placeholder="Select Tax" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">5% GST</SelectItem>
                                                <SelectItem value="12">12% GST</SelectItem>
                                                <SelectItem value="18">18% GST</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-500">Taxable Amount</Label>
                                        <Input type="number" placeholder="0.00" className="h-10" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[11px] font-black uppercase text-slate-500">Tax Amount</Label>
                                        <Input type="number" placeholder="0.00" className="h-10" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <Label className="text-[11px] font-black uppercase text-slate-500">Description / Notes</Label>
                            <Textarea placeholder="Any additional notes..." className="min-h-[100px] resize-none" />
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <Button variant="outline" className="font-bold h-11 px-8 text-slate-600 border-slate-200" onClick={onClose}>Cancel</Button>
                            <Button className="h-11 px-10 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200" onClick={onClose}>
                                Save Expense
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
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
