"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import {
    Search, Plus, Eye, Copy, Download, Mail, Printer,
    Edit, ChevronDown, Filter, X, CheckCircle, FileText
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

// ─── Types ────────────────────────────────────────────────────────────────────
type LineItem = { id: number; desc: string; qty: number; rate: number }
type Invoice = {
    id: string
    date: string
    dueDate: string
    customer: string
    jobRef: string
    amount: number
    tax: number
    status: "paid" | "unpaid" | "partial"
    items: LineItem[]
    notes: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const initialInvoices: Invoice[] = [
    { id: "INV-02176", date: "05 Jan, 2026", dueDate: "12 Jan", customer: "Crona Group", jobRef: "JOB-88403", amount: 4329.86, tax: 463.91, status: "paid", items: [{ id: 1, desc: "Print Job", qty: 500, rate: 7.2 }], notes: "Payment due within 30 days." },
    { id: "INV-03637", date: "02 Jan, 2026", dueDate: "09 Jan", customer: "Farrell, Klocko and Oberbrunner", jobRef: "JOB-83719", amount: 6529.23, tax: 699.56, status: "unpaid", items: [{ id: 1, desc: "Brochure Print", qty: 1000, rate: 5.83 }], notes: "Payment due within 30 days." },
    { id: "INV-18270", date: "03 Jan, 2026", dueDate: "10 Jan", customer: "Hyatt-Kutch", jobRef: "JOB-83077", amount: 10082.63, tax: 1538.03, status: "unpaid", items: [{ id: 1, desc: "Book Printing", qty: 100, rate: 84.02 }], notes: "Bank: Oriental Bank." },
    { id: "INV-2026-0029", date: "11 Feb, 2026", dueDate: "13 Mar", customer: "Denesik-Keeling", jobRef: "JB-2026-0034", amount: 49948.22, tax: 7619.22, status: "unpaid", items: [{ id: 1, desc: "Print Job", qty: 1000, rate: 6.89 }, { id: 2, desc: "Book Printing", qty: 100, rate: 354.39 }], notes: "Payment due within 30 days. Bank: Oriental Bank Of Commerce, Acc: 10012151004216, IFSC: ORBC100121" },
    { id: "INV-25755", date: "03 Jan, 2026", dueDate: "10 Jan", customer: "Schuster Ltd", jobRef: "JOB-54761", amount: 8342.20, tax: 893.81, status: "unpaid", items: [{ id: 1, desc: "Wide Format", qty: 5, rate: 1289.68 }], notes: "" },
    { id: "INV-33356", date: "08 Jan, 2026", dueDate: "15 Jan", customer: "Barton, Willow and Rose", jobRef: "JOB-83281", amount: 5100.34, tax: 513.20, status: "partial", items: [{ id: 1, desc: "Business Cards", qty: 500, rate: 8.37 }], notes: "" },
]

// ─── Create Invoice Dialog ────────────────────────────────────────────────────
function CreateInvoiceDialog({ onClose }: { onClose: () => void }) {
    const [items, setItems] = useState<LineItem[]>([
        { id: 1, desc: "Print Job", qty: 1000, rate: 6.89 },
        { id: 2, desc: "Book Printing", qty: 100, rate: 354.39 },
    ])
    const [taxRate, setTaxRate] = useState(18)
    const [notes, setNotes] = useState("Payment due within 30 days. Bank: Oriental Bank Of Commerce, Acc: 10012151004216, IFSC: ORBC100121")

    const addItem = () => setItems(prev => [...prev, { id: Date.now(), desc: "", qty: 1, rate: 0 }])
    const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id))
    const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0)
    const taxAmt = subtotal * (taxRate / 100)
    const grandTotal = subtotal + taxAmt

    return (
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0 border-none shadow-2xl rounded-2xl">
            <DialogHeader className="px-8 py-6 border-b bg-background sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <DialogTitle className="text-xl font-bold">Create New Sales Invoice</DialogTitle>
                </div>
            </DialogHeader>
            <div className="p-8 space-y-8 bg-background">
                {/* Invoice Details */}
                <Card className="border shadow-sm border-slate-200 overflow-hidden">
                    <CardHeader className="py-3 px-6 bg-slate-50 border-b">
                        <CardTitle className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
                            <FileText className="h-3.5 w-3.5" /> Basic Invoice Meta
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Invoice No.</Label>
                                <Input defaultValue="INV-2026-0030" className="h-11 border-slate-200 bg-slate-50 font-mono font-bold" readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Customer <span className="text-rose-500">*</span></Label>
                                <Select defaultValue="dk">
                                    <SelectTrigger className="h-11 border-slate-200 font-bold"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dk">Denesik-Keeling</SelectItem>
                                        <SelectItem value="cg">Crona Group</SelectItem>
                                        <SelectItem value="sl">Schuster Ltd</SelectItem>
                                        <SelectItem value="hk">Hyatt-Kutch</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Issue Date</Label>
                                <Input type="date" className="h-11 border-slate-200 font-bold" defaultValue="2026-02-11" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Due Date</Label>
                                <Input type="date" className="h-11 border-slate-200 font-bold" defaultValue="2026-03-13" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Line Items */}
                <Card className="border shadow-sm border-slate-200 overflow-hidden">
                    <CardHeader className="py-4 px-6 bg-slate-50 border-b flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Line Items Detail</CardTitle>
                        <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs font-bold border-slate-200" onClick={addItem}>
                            <Plus className="h-3 w-3" /> Add Item
                        </Button>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-12 gap-4 text-[10px] font-black uppercase text-slate-400 px-2 pb-1 tracking-widest">
                            <span className="col-span-5">Product / Service Description</span>
                            <span className="col-span-2">Qty</span>
                            <span className="col-span-2">Rate (₹)</span>
                            <span className="col-span-2">Total (₹)</span>
                            <span className="col-span-1"></span>
                        </div>
                        {items.map(item => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 items-center border border-slate-100 rounded-xl p-3 hover:bg-slate-50/50 transition-colors">
                                <div className="col-span-5">
                                    <Input
                                        placeholder="e.g. Print Job"
                                        className="h-10 border-slate-200 bg-white"
                                        value={item.desc}
                                        onChange={e => setItems(prev => prev.map(i => i.id === item.id ? { ...i, desc: e.target.value } : i))}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Input
                                        type="number"
                                        className="h-10 border-slate-200 bg-white font-bold"
                                        value={item.qty}
                                        onChange={e => setItems(prev => prev.map(i => i.id === item.id ? { ...i, qty: +e.target.value } : i))}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        className="h-10 border-slate-200 bg-white font-bold"
                                        value={item.rate}
                                        onChange={e => setItems(prev => prev.map(i => i.id === item.id ? { ...i, rate: +e.target.value } : i))}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <div className="h-10 flex items-center px-3 rounded-md bg-slate-100/50 border border-slate-100 font-black text-slate-700">
                                        ₹{(item.qty * item.rate).toLocaleString()}
                                    </div>
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-full" onClick={() => removeItem(item.id)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {/* Totals */}
                        <div className="border rounded-lg p-4 bg-muted/10 space-y-2 mt-4">
                            <div className="flex justify-between text-sm">
                                <span className="font-bold text-muted-foreground">Subtotal:</span>
                                <span className="font-bold">{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-muted-foreground">Tax:</span>
                                <div className="flex items-center gap-2">
                                    <Select value={String(taxRate)} onValueChange={v => setTaxRate(+v)}>
                                        <SelectTrigger className="h-7 w-44 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">GST 0% (0.00%)</SelectItem>
                                            <SelectItem value="5">GST 5% (5.00%)</SelectItem>
                                            <SelectItem value="12">GST 12% (12.00%)</SelectItem>
                                            <SelectItem value="18">GST 18% (18.00%)</SelectItem>
                                            <SelectItem value="28">GST 28% (28.00%)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <span className="font-bold w-20 text-right">{taxAmt.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm border-t pt-2">
                                <span className="font-black">Grand Total:</span>
                                <span className="font-black text-lg">{grandTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-1">
                            <Label className="text-xs font-bold text-muted-foreground">Notes (Payment Details, Bank Info etc.)</Label>
                            <Textarea
                                className="h-20 text-sm resize-none"
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-3 justify-end pt-1">
                    <Button variant="outline" className="font-bold h-10 px-6" onClick={onClose}>Cancel</Button>
                    <Button
                        className="h-10 px-8 bg-emerald-600 hover:bg-emerald-700 font-bold uppercase text-xs tracking-wider"
                        onClick={() => {
                            toast.success("Invoice Generated", { description: "Invoice INV-2026-0030 has been created successfully." })
                            onClose()
                        }}
                    >
                        <CheckCircle className="h-4 w-4 mr-2" /> Generate Invoice
                    </Button>
                </div>
            </div>
        </DialogContent>
    )
}

// ─── Invoice View (Full Document + Actions) ───────────────────────────────────
function InvoiceView({ inv, onBack, onPayment }: { inv: Invoice; onBack: () => void; onPayment: (inv: Invoice) => void }) {
    const subtotal = inv.items.reduce((s, i) => s + i.qty * i.rate, 0)
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold">Invoice View</h1>
                <div className="flex flex-wrap gap-2">
                    <Button className="h-9 gap-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700" onClick={() => toast.success("Preparing Download", { description: "Your PDF invoice is being generated." })}>
                        <Download className="h-3.5 w-3.5" /> Download PDF
                    </Button>
                    <Button className="h-9 gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-600" onClick={() => toast.info("Email Sending", { description: "Attempting to send invoice via email..." })}>
                        <Mail className="h-3.5 w-3.5" /> Email
                    </Button>
                    <Button className="h-9 gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700" onClick={() => toast.info("Opening Print Dialog")}>
                        <Printer className="h-3.5 w-3.5" /> Print
                    </Button>
                    <Button className="h-9 gap-1.5 text-xs font-bold bg-blue-500 hover:bg-blue-600">
                        <Edit className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button className="h-9 gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700" onClick={() => onPayment(inv)}>
                        <CheckCircle className="h-3.5 w-3.5" /> Add Payment
                    </Button>
                    <Button variant="ghost" className="h-9 text-xs font-bold" onClick={onBack}>Back</Button>
                </div>
            </div>

            {/* Invoice Document */}
            <div className="border rounded-xl shadow-sm overflow-hidden bg-white p-8 space-y-6">
                {/* Top row */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl">🐘</div>
                    </div>
                    <div className="text-right space-y-1">
                        <h2 className="text-5xl font-black tracking-tighter text-slate-200 uppercase">INVOICE</h2>
                        <div className="space-y-0.5 text-sm">
                            <div className="flex items-center gap-2 justify-end">
                                <Badge className="bg-rose-600 text-white font-black text-xs uppercase px-3">
                                    {inv.status.toUpperCase()}
                                </Badge>
                            </div>
                            <div className="flex gap-3 text-right justify-end text-sm">
                                <div className="text-muted-foreground text-xs space-y-1 text-right">
                                    <div>No:</div><div>Date:</div><div>Due:</div><div>Job Ref:</div>
                                </div>
                                <div className="font-bold text-xs space-y-1 text-right">
                                    <div>{inv.id}</div>
                                    <div>{inv.date}</div>
                                    <div>{inv.dueDate}</div>
                                    <div className="text-blue-600">{inv.jobRef}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bill From / Bill To */}
                <div className="grid grid-cols-2 gap-6 border rounded-lg overflow-hidden">
                    <div className="p-5 border-r">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Bill From</p>
                        <p className="font-black text-base">Ganesha Prints</p>
                        <p className="text-sm text-muted-foreground mt-1">SF-37,</p>
                        <p className="text-sm text-muted-foreground">Gaur City Center,</p>
                        <p className="text-sm text-muted-foreground">Greater Noida Extention</p>
                        <p className="text-sm font-bold mt-1">GSTIN: <span className="text-slate-700">27ABCDE1234F2Z5</span></p>
                        <p className="text-sm text-muted-foreground">info@ganeshasoftwares</p>
                        <p className="text-sm text-muted-foreground">+(91) 9540046568</p>
                    </div>
                    <div className="p-5">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Bill To</p>
                        <p className="font-black text-base">{inv.customer}</p>
                        <p className="text-sm text-muted-foreground mt-1">Attn: Cristina Hermiston</p>
                        <p className="text-sm text-muted-foreground">202 Lebsack Station Suite 446</p>
                        <p className="text-sm text-muted-foreground">East Cordie, Michigan – 38083-7367</p>
                        <p className="text-sm text-muted-foreground">Ph: 1-585-837-5878</p>
                        <p className="text-sm font-bold mt-1">GSTIN: <span className="text-slate-700">GSTINMDTVA89SVE</span></p>
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full text-sm border rounded overflow-hidden">
                    <thead className="bg-muted/40">
                        <tr>
                            <th className="text-left px-4 py-2.5 font-bold text-[11px] uppercase border-b w-8">#</th>
                            <th className="text-left px-4 py-2.5 font-bold text-[11px] uppercase border-b">Description</th>
                            <th className="text-right px-4 py-2.5 font-bold text-[11px] uppercase border-b w-24">Qty</th>
                            <th className="text-right px-4 py-2.5 font-bold text-[11px] uppercase border-b w-28">Rate</th>
                            <th className="text-right px-4 py-2.5 font-bold text-[11px] uppercase border-b w-28">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inv.items.map((item, idx) => (
                            <tr key={item.id} className="border-b last:border-0">
                                <td className="px-4 py-3 text-muted-foreground font-bold">{idx + 1}</td>
                                <td className="px-4 py-3 font-medium">{item.desc}</td>
                                <td className="px-4 py-3 text-right">{item.qty}</td>
                                <td className="px-4 py-3 text-right">₹{item.rate.toFixed(2)}</td>
                                <td className="px-4 py-3 text-right font-bold">₹{(item.qty * item.rate).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-muted/20">
                        <tr className="border-t">
                            <td colSpan={4} className="px-4 py-2 text-right font-bold text-sm">Subtotal:</td>
                            <td className="px-4 py-2 text-right font-bold">₹{subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="px-4 py-2 text-right font-bold text-sm">Tax (GST 18%):</td>
                            <td className="px-4 py-2 text-right font-bold">₹{inv.tax.toFixed(2)}</td>
                        </tr>
                        <tr className="border-t">
                            <td colSpan={4} className="px-4 py-3 text-right font-black">Grand Total:</td>
                            <td className="px-4 py-3 text-right font-black text-lg">₹{inv.amount.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Notes */}
                {inv.notes && (
                    <div className="border rounded-lg p-4 bg-muted/10">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm">{inv.notes}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── Record Payment Page ──────────────────────────────────────────────────────
function RecordPaymentView({ inv, onBack }: { inv: Invoice; onBack: () => void }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold">Record Payment</h1>
                <Button variant="ghost" className="font-bold text-xs" onClick={onBack}>← Back</Button>
            </div>

            <div className="max-w-2xl mx-auto">
                <Card className="border shadow-sm">
                    <CardHeader className="py-3 px-5 bg-muted/30 border-b">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            💳 New Payment Receipt
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5">
                        {/* Invoice Info Bar */}
                        <div className="rounded-lg bg-cyan-50 border border-cyan-200 p-4 flex items-center justify-between">
                            <div>
                                <p className="font-bold text-cyan-800 text-sm">Invoice #{inv.id}</p>
                                <p className="text-xs text-cyan-600">Customer: {inv.customer}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">Total: <span className="font-bold text-slate-800">₹{inv.amount.toFixed(2)}</span></p>
                                <p className="text-xs text-muted-foreground">Balance Due: <span className="font-black text-rose-600">₹{inv.amount.toFixed(2)}</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Receipt No.</Label>
                                <Input defaultValue="REC-2026-0016" className="h-9" readOnly />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Payment Date</Label>
                                <Input type="date" className="h-9" defaultValue="2026-02-25" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-amber-600">Amount Received (₹)</Label>
                            <Input
                                type="number"
                                defaultValue={inv.amount.toFixed(2)}
                                className="h-12 text-xl font-black border-amber-300 focus-visible:ring-amber-400"
                            />
                            <p className="text-[10px] text-muted-foreground">Enter the actual amount received.</p>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold">Payment Mode</Label>
                            <Select defaultValue="cash">
                                <SelectTrigger className="h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="upi">UPI</SelectItem>
                                    <SelectItem value="neft">NEFT / RTGS</SelectItem>
                                    <SelectItem value="cheque">Cheque</SelectItem>
                                    <SelectItem value="card">Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold">Transaction Reference / Cheque No.</Label>
                            <Input className="h-9" placeholder="e.g. UTR12345678 or Chq #000123" />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold">Notes</Label>
                            <Textarea className="h-20 resize-none text-sm" placeholder="Optional notes..." />
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                            <Button variant="outline" className="font-bold h-10 px-6" onClick={onBack}>Cancel</Button>
                            <Button className="h-10 px-8 bg-emerald-600 hover:bg-emerald-700 font-bold uppercase text-xs tracking-wider">
                                <CheckCircle className="h-4 w-4 mr-2" /> Record Payment
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InvoicesPage() {
    const [invoices] = useState<Invoice[]>(initialInvoices)
    const [search, setSearch] = useState("")
    const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null)
    const [paymentInvoice, setPaymentInvoice] = useState<Invoice | null>(null)
    const [showCreate, setShowCreate] = useState(false)

    const filtered = invoices.filter(inv =>
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer.toLowerCase().includes(search.toLowerCase()) ||
        inv.jobRef.toLowerCase().includes(search.toLowerCase())
    )

    const statusStyle: Record<string, string> = {
        paid: "bg-emerald-100 text-emerald-700 border-emerald-200 font-bold uppercase text-[10px]",
        unpaid: "bg-rose-100 text-rose-700 border-rose-200 font-bold uppercase text-[10px]",
        partial: "bg-amber-100 text-amber-700 border-amber-200 font-bold uppercase text-[10px]",
    }

    if (paymentInvoice) {
        return <RecordPaymentView inv={paymentInvoice} onBack={() => setPaymentInvoice(null)} />
    }
    if (viewInvoice) {
        return <InvoiceView inv={viewInvoice} onBack={() => setViewInvoice(null)} onPayment={inv => { setViewInvoice(null); setPaymentInvoice(inv) }} />
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
                <Dialog open={showCreate} onOpenChange={setShowCreate}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-10 shadow-sm">
                            <Plus className="h-4 w-4" /> New Invoice
                        </Button>
                    </DialogTrigger>
                    <CreateInvoiceDialog onClose={() => setShowCreate(false)} />
                </Dialog>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <CardTitle className="text-sm font-medium">Invoice Management</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex items-center gap-2 w-full md:w-auto">
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
                                    <TableHead className="font-bold w-[150px]">Invoice #</TableHead>
                                    <TableHead className="font-bold w-[130px]">Date</TableHead>
                                    <TableHead className="font-bold">Customer</TableHead>
                                    <TableHead className="font-bold w-[120px]">Job Ref</TableHead>
                                    <TableHead className="font-bold w-[140px]">Amount</TableHead>
                                    <TableHead className="font-bold w-[90px]">Status</TableHead>
                                    <TableHead className="text-right font-bold w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(inv => (
                                    <TableRow key={inv.id} className="group">
                                        {/* Invoice ID */}
                                        <TableCell className="py-3">
                                            <span
                                                className="text-blue-600 font-bold text-sm hover:underline cursor-pointer"
                                                onClick={() => setViewInvoice(inv)}
                                            >
                                                {inv.id}
                                            </span>
                                        </TableCell>

                                        {/* Date + Due */}
                                        <TableCell className="py-3">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-medium">{inv.date}</span>
                                                <span className="text-[11px] text-muted-foreground">Due: {inv.dueDate}</span>
                                            </div>
                                        </TableCell>

                                        {/* Customer */}
                                        <TableCell className="font-medium text-sm">{inv.customer}</TableCell>

                                        {/* Job Ref */}
                                        <TableCell className="text-sm text-muted-foreground">{inv.jobRef}</TableCell>

                                        {/* Amount + Tax */}
                                        <TableCell className="py-3">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-bold text-sm">₹{inv.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                                <span className="text-[11px] text-muted-foreground">Tax: ₹{inv.tax.toFixed(2)}</span>
                                            </div>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge variant="outline" className={statusStyle[inv.status]}>
                                                {inv.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right py-2">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    size="icon" variant="outline"
                                                    className="h-8 w-8 border-slate-200 text-slate-500 hover:text-blue-600"
                                                    onClick={() => setViewInvoice(inv)}
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="icon" variant="outline"
                                                    className="h-8 w-8 border-slate-200 text-slate-500 hover:text-slate-800"
                                                >
                                                    <Copy className="h-3.5 w-3.5" />
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
