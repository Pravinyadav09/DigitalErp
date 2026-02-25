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
    Eye
} from "lucide-react"
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
function AddCustomerDialog({ onSave, onClose }: { onSave: (c: Customer) => void, onClose: () => void }) {
    return (
        <DialogContent className="max-w-3xl p-0 border-none shadow-2xl overflow-y-auto max-h-[95vh]">
            <DialogHeader className="px-8 pt-7 pb-4 border-b bg-background sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5 text-blue-600" />
                    <DialogTitle className="text-xl font-bold">Register New Customer</DialogTitle>
                </div>
            </DialogHeader>
            <div className="p-8 space-y-8 bg-background">
                <Card className="border shadow-sm border-slate-200 overflow-hidden">
                    <CardHeader className="py-3 px-6 bg-slate-50 border-b">
                        <CardTitle className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
                            <Building2 className="h-3.5 w-3.5" /> Company Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Company Name <span className="text-rose-500">*</span></Label>
                                <Input className="h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-100" placeholder="Enter business name" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">GSTIN (Optional)</Label>
                                <Input className="h-11 border-slate-200" placeholder="e.g. 27ABCDE1234F1Z5" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Contact Person <span className="text-rose-500">*</span></Label>
                                <Input className="h-11 border-slate-200" placeholder="Full name" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Relationship Status</Label>
                                <Select defaultValue="Active">
                                    <SelectTrigger className="h-11 border-slate-200 font-bold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active Business</SelectItem>
                                        <SelectItem value="Inactive">On Hold / Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border shadow-sm border-slate-200 overflow-hidden">
                    <CardHeader className="py-3 px-6 bg-slate-50 border-b">
                        <CardTitle className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5" /> Contact Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Email Address <span className="text-rose-500">*</span></Label>
                                <Input type="email" className="h-11 border-slate-200" placeholder="billing@company.com" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-500 tracking-tight">Phone Number <span className="text-rose-500">*</span></Label>
                                <Input className="h-11 border-slate-200 font-mono" placeholder="+91 9988776655" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-3 justify-end pt-4 border-t sticky bottom-0 bg-background/80 backdrop-blur-sm pb-2 z-10">
                    <Button variant="outline" className="font-bold h-11 px-8 text-slate-600 border-slate-200" onClick={onClose}>Cancel</Button>
                    <Button
                        className="h-11 px-10 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200"
                        onClick={() => {
                            toast.success("Customer Saved", { description: "New customer profile has been created successfully." })
                            onClose()
                        }}
                    >
                        Save Customer Profile
                    </Button>
                </div>
            </div>
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
