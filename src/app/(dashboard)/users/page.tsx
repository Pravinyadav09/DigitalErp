"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import {
    Plus,
    Search,
    Filter,
    Download,
    Trash2,
    Edit2,
    Building2,
    Phone,
    Mail,
    Globe,
    ChevronDown,
    MapPin,
    CreditCard,
    CheckCircle,
    UserCircle,
    MoreHorizontal,
    Eye,
    Activity,
    Scale
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ─── Types ──────────────────────────────────────────────────────────────────
type Customer = {
    id: string
    name: string
    contactPerson: string
    email: string
    phone: string
    gstin: string
    balance: number
    status: "Active" | "Inactive"
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialCustomers: Customer[] = [
    { id: "CUST-101", name: "Crona Group", contactPerson: "Cristina Hermiston", email: "cristina@crona.com", phone: "1-585-837-5878", gstin: "GSTINMDTVA89SVE", balance: 12540.50, status: "Active" },
    { id: "CUST-102", name: "Farrell, Klocko and Oberbrunner", contactPerson: "Julian Klocko", email: "julian@fko.com", phone: "234-567-8901", gstin: "GSTINALFK99SVE", balance: 0.00, status: "Active" },
    { id: "CUST-103", name: "Schuster Ltd", contactPerson: "Marco Schuster", email: "marco@schuster.ltd", phone: "555-012-3456", gstin: "GSTINSHS92KOS", balance: 45000.00, status: "Inactive" },
    { id: "CUST-104", name: "Denesik-Keeling", contactPerson: "Sarah Denesik", email: "sarah@dkp.com", phone: "987-654-3210", gstin: "GSTINDKP44FDS", balance: 8900.25, status: "Active" },
    { id: "CUST-105", name: "Hegmann LLC", contactPerson: "Paul Hegmann", email: "paul@hegmann.io", phone: "444-555-6666", gstin: "GSTINHGM88VVZ", balance: -250.00, status: "Active" },
]

// ─── New Customer Dialog ──────────────────────────────────────────────────────
// ─── New Customer Dialog ──────────────────────────────────────────────────────
function AddCustomerDialog({ onSave, onClose }: { onSave: (c: Customer) => void, onClose: () => void }) {
    return (
        <DialogContent className="sm:max-w-[600px] p-0 border-none shadow-2xl overflow-hidden rounded-2xl flex flex-col max-h-[92vh]">
            <DialogHeader className="px-8 pt-8 pb-6 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-blue-50 text-blue-600">
                        <UserCircle className="h-5 w-5" />
                    </div>
                    <div>
                        <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">Add New Customer</DialogTitle>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mt-1">
                            Create Master Profile for Billing & Jobs
                        </p>
                    </div>
                </div>
            </DialogHeader>

            <div className="p-8 pb-4 space-y-8 bg-background flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                {/* Basic Info Section */}
                <div className="space-y-5">
                    <Label className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full">
                        01. Identification
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Company Name *</Label>
                            <Input className="h-10 text-xs font-bold border-slate-100 bg-slate-50/50 focus:bg-white transition-colors" placeholder="e.g. ABC Printers Pvt Ltd" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Contact Person *</Label>
                            <Input className="h-10 text-xs font-bold border-slate-100 bg-slate-50/50 focus:bg-white transition-colors" placeholder="e.g. Rahul Sharma" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Phone Number *</Label>
                            <Input className="h-10 text-xs font-bold border-slate-100 bg-slate-50/50 focus:bg-white transition-colors" placeholder="e.g. +91 95400 XXXX" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Email Address</Label>
                            <Input type="email" className="h-10 text-xs font-bold border-slate-100 bg-slate-50/50 focus:bg-white transition-colors" placeholder="e.g. info@client.com" />
                        </div>
                    </div>
                </div>

                {/* Billing & Tax Section */}
                <div className="space-y-5">
                    <Label className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] bg-emerald-50 px-3 py-1 rounded-full">
                        02. Tax & Credit
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">GST Number</Label>
                            <div className="relative group">
                                <Input className="h-10 text-xs font-bold border-slate-100 bg-slate-50/50 focus:bg-white transition-colors pr-16 uppercase" placeholder="22AAAAA0000A1Z5" />
                                <Button variant="ghost" className="absolute right-1 top-1 h-8 text-[10px] font-bold text-blue-600 hover:bg-blue-50">
                                    FETCH
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Opening Balance</Label>
                            <Input type="number" className="h-10 text-xs font-black border-slate-100 bg-slate-50/50 focus:bg-white transition-colors text-emerald-600" defaultValue="0.00" />
                        </div>
                    </div>
                </div>

                {/* Address Details Section */}
                <div className="space-y-5">
                    <Label className="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] bg-amber-50 px-3 py-1 rounded-full">
                        03. Logistics
                    </Label>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Shipping Address</Label>
                        <Textarea className="min-h-[80px] text-xs font-medium border-slate-100 bg-slate-50/50 focus:bg-white transition-colors resize-none" placeholder="Street Address, Building, Area..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">City</Label>
                            <Input className="h-10 text-xs font-bold border-slate-100 bg-slate-50/50 focus:bg-white transition-colors" placeholder="City" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">State *</Label>
                            <Select>
                                <SelectTrigger className="h-10 text-xs font-bold border-slate-100 bg-slate-50/50">
                                    <SelectValue placeholder="State" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                    <SelectItem value="delhi">Delhi</SelectItem>
                                    <SelectItem value="gujarat">Gujarat</SelectItem>
                                    <SelectItem value="karnataka">Karnataka</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Pincode</Label>
                            <Input className="h-10 text-xs font-bold border-slate-100 bg-slate-50/50" placeholder="Pincode" />
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter className="p-6 bg-slate-50/50 border-t flex flex-row items-center justify-end gap-3 px-8">
                <Button variant="ghost" className="h-10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    className="h-10 px-8 bg-blue-600 hover:bg-blue-700 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-200"
                    onClick={() => {
                        toast.success("Customer Created", { description: "New customer profile has been added successfully." })
                        onClose()
                    }}
                >
                    Create Profile
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
    const [search, setSearch] = useState("")
    const [showAdd, setShowAdd] = useState(false)

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
                <Dialog open={showAdd} onOpenChange={setShowAdd}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-10 shadow-sm">
                            <Plus className="h-4 w-4" /> Add New Customer
                        </Button>
                    </DialogTrigger>
                    <AddCustomerDialog onSave={() => { }} onClose={() => setShowAdd(false)} />
                </Dialog>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <UserCircle className="h-4 w-4" />
                        <CardTitle className="text-sm font-medium">Customer List & Directory</CardTitle>
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
                                    <DropdownMenuItem onClick={() => toast.success("Export Started", { description: "CSV file is being generated..." })}>Export CSV</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toast.success("Export Started", { description: "Excel file is being generated..." })}>Export Excel</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toast.info("Print Preview", { description: "Opening print dialog..." })}>Export PDF Print</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" size="sm" className="gap-2 h-9" onClick={() => toast.info("Filters", { description: "Filter panel will be available soon." })}>
                                <Filter className="h-4 w-4" /> Filters
                            </Button>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, contact or ID..."
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
                                    <TableHead className="font-bold w-[120px]">Cust ID</TableHead>
                                    <TableHead className="font-bold">Customer Name</TableHead>
                                    <TableHead className="font-bold">Contact Person</TableHead>
                                    <TableHead className="font-bold">Contact Info</TableHead>
                                    <TableHead className="font-bold">Outstanding</TableHead>
                                    <TableHead className="font-bold w-[100px]">Status</TableHead>
                                    <TableHead className="text-right font-bold w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(cust => (
                                    <TableRow key={cust.id} className="group transition-colors">
                                        <TableCell className="font-bold text-xs font-mono py-4">{cust.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                                                    {cust.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <p className="font-bold text-sm text-slate-800 leading-tight">{cust.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm font-medium">{cust.contactPerson}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5 text-[11px] text-muted-foreground">
                                                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {cust.email}</span>
                                                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {cust.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className={`font-black text-sm ${cust.balance > 0 ? "text-rose-600" : cust.balance < 0 ? "text-emerald-600" : "text-slate-400"}`}>
                                                ₹{cust.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`text-[10px] uppercase font-bold px-2.5 h-5 ${cust.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-700 border-slate-200"}`}
                                            >
                                                {cust.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Customer Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Transactions</DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2"><Edit2 className="h-4 w-4" /> Edit Details</DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 text-rose-600 focus:bg-rose-50 focus:text-rose-600"><Trash2 className="h-4 w-4" /> Archive Customer</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
