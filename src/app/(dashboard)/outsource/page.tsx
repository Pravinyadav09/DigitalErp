"use client"

import React, { useState } from "react"
import {
    Plus, Search, Download, ChevronDown,
    Calendar, User, FileText, CheckCircle,
    X, ArrowLeft, Printer, Box, Layers,
    Activity, Clock, Gauge, Truck, Info,
    Hash, Type, Settings, Scissors, Maximize, Flag,
    Palette as PaletteIcon, ArrowRightLeft as ArrowRightLeftIcon
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
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group" // shadcn component
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users2, Phone, MapPin, ExternalLink as ExtLink } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// ─── Types ──────────────────────────────────────────────────────────────────
type Vendor = {
    id: string
    name: string
    contact: string
    email: string
    specialization: string
    balance: number
}
type OutsourceOrder = {
    id: string
    orderDate: string
    jobName: string
    vendor: string
    poType: "Flex" | "Offset" | "Digital"
    status: "Pending" | "In Progress" | "Completed" | "Cancelled"
    amount: number
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialOrders: OutsourceOrder[] = [
    { id: "OS-001", orderDate: "24 Feb 2026", jobName: "Magazine Cover", vendor: "City Plates & CTP", poType: "Offset", status: "In Progress", amount: 1500 },
    { id: "OS-002", orderDate: "25 Feb 2026", jobName: "Event Banner", vendor: "Galaxy Flex", poType: "Flex", status: "Pending", amount: 4500 },
]

const initialVendors: Vendor[] = [
    { id: "V-101", name: "City Plates & CTP", contact: "9876543210", email: "info@cityplates.in", specialization: "CTP Plates", balance: 12500 },
    { id: "V-102", name: "Galaxy Flex Printing", contact: "8888877777", email: "orders@galaxyflex.com", specialization: "Large Format", balance: 4500 },
    { id: "V-103", name: "Modern Binding Works", contact: "7776665555", email: "modern.binding@gmail.com", specialization: "Finishing", balance: 0 },
]

const vendors = ["City Plates & CTP", "Modern Binding Works", "Galaxy Flex Printing", "Sharp CTP Services"]

// ─── New Outsource Order View ───────────────────────────────────────────────
function NewOrderView({ onBack, onSave }: { onBack: () => void, onSave: (o: OutsourceOrder) => void }) {
    const [poType, setPoType] = useState<"Flex" | "Offset" | "Digital">("Offset")

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack} className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-bold">New Outsource Order</h2>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <div className="bg-cyan-600 text-white px-5 py-2.5 font-bold text-xs uppercase tracking-wider">
                    New Out Source Order
                </div>
                <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 bg-background">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                                Select Printer <span className="text-rose-500">*</span>
                            </Label>
                            <div className="flex gap-2">
                                <Select>
                                    <SelectTrigger className="h-10 text-xs">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vendors.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Button size="icon" variant="outline" className="h-10 w-10 shrink-0">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                                <Info className="h-3 w-3" /> Job Name <span className="text-rose-500">*</span>
                            </Label>
                            <Input placeholder="Enter Job Name" className="h-10 text-xs" />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                                <Flag className="h-3 w-3" /> Order Status
                            </Label>
                            <Select defaultValue="pending">
                                <SelectTrigger className="h-10 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> Job Date <span className="text-rose-500">*</span>
                            </Label>
                            <Input type="datetime-local" className="h-10 text-xs" defaultValue="2026-02-11T04:54" />
                        </div>
                    </div>

                    {/* PO Type Selection */}
                    <div className="flex flex-col items-center gap-3 py-4 bg-muted/20 rounded-lg">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">PO Type Selection</Label>
                        <RadioGroup
                            value={poType}
                            onValueChange={(v: "Flex" | "Offset" | "Digital") => setPoType(v)}
                            className="flex flex-wrap justify-center gap-4 sm:gap-8"
                        >
                            <div className="flex items-center space-x-2 cursor-pointer bg-background px-3 py-1.5 rounded-md border shadow-sm">
                                <RadioGroupItem value="Flex" id="flex" />
                                <Label htmlFor="flex" className="font-bold cursor-pointer text-xs">Flex</Label>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer bg-background px-3 py-1.5 rounded-md border shadow-sm">
                                <RadioGroupItem value="Offset" id="offset" />
                                <Label htmlFor="offset" className="font-bold cursor-pointer text-xs">Offset</Label>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer bg-background px-3 py-1.5 rounded-md border shadow-sm">
                                <RadioGroupItem value="Digital" id="digital" />
                                <Label htmlFor="digital" className="font-bold cursor-pointer text-xs">Digital</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Form Sections */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {/* Row 1 */}
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Job/Order Size</Label>
                            <div className="relative">
                                <Maximize className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Size" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Job/Order Quantity</Label>
                            <div className="relative">
                                <Box className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Quantity" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Printing Side</Label>
                            <div className="relative">
                                <Layers className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Select>
                                    <SelectTrigger className="h-10 pl-9 text-xs">
                                        <SelectValue placeholder="Side" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="single">Single Sided</SelectItem>
                                        <SelectItem value="double">Double Sided</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Select Machine</Label>
                            <div className="relative">
                                <Gauge className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Select>
                                    <SelectTrigger className="h-10 pl-9 text-xs">
                                        <SelectValue placeholder="Machine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sm74">Heidelberg SM 74</SelectItem>
                                        <SelectItem value="km">Konica Minolta</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Row 2: Paper Details */}
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Paper Sheet Size</Label>
                            <div className="relative">
                                <Maximize className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Size" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Paper Quantity</Label>
                            <div className="relative">
                                <Box className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" defaultValue="0" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Paper Name</Label>
                            <div className="relative">
                                <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Paper Name" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Paper GSM</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Badge variant="outline" className="h-10 flex items-center justify-center font-bold text-[10px]">GSM</Badge>
                                <Input className="h-10 text-xs" placeholder="GSM" />
                            </div>
                        </div>

                        {/* Row 3: CTP Details */}
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">CTP Type</Label>
                            <Select defaultValue="ctp">
                                <SelectTrigger className="h-10 text-xs text-blue-600 font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ctp">CTP</SelectItem>
                                    <SelectItem value="ctcp">CTCP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">CTP Vendor</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Vendor" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">CTP Size</Label>
                            <div className="relative">
                                <Maximize className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Enter CTP Size" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">CTP Sets</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Badge variant="outline" className="h-10 flex items-center justify-center font-bold text-[10px]">123</Badge>
                                <Input className="h-10 col-span-2 text-xs" placeholder="Sets" />
                            </div>
                        </div>

                        {/* Row 4: Extra Details */}
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Gripper Details</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Badge variant="outline" className="h-10 flex items-center justify-center font-bold px-0 text-[10px]">Gripper</Badge>
                                <Input className="h-10 text-xs" placeholder="Details" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Dot Details</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="h-10 border rounded flex items-center justify-center bg-muted/20">
                                    <Settings className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input className="h-10 col-span-2 text-xs" placeholder="Dots" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Printing Run</Label>
                            <div className="relative">
                                <Printer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Run" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Digital Proof</Label>
                            <RadioGroup defaultValue="no" className="flex gap-4 h-10 items-center">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="proof-yes" />
                                    <Label htmlFor="proof-yes" className="text-xs">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2 text-blue-600 font-bold">
                                    <RadioGroupItem value="no" id="proof-no" />
                                    <Label htmlFor="proof-no" className="text-xs">No</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Color</Label>
                            <div className="relative">
                                <PaletteIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Numbering</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Badge variant="outline" className="h-10 flex items-center justify-center font-bold text-[10px]">123</Badge>
                                <Input className="h-10 col-span-2 text-xs" placeholder="Numbering" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Sequencing</Label>
                            <div className="relative">
                                <ArrowRightLeftIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Sequencing" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Lamination</Label>
                            <div className="relative">
                                <Layers className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Lamination" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Binding Type</Label>
                            <div className="relative">
                                <Scissors className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="h-10 pl-9 text-xs" placeholder="Binding" />
                            </div>
                        </div>
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Other Instructions</Label>
                            <Input className="h-10 text-xs" placeholder="Any additional notes..." />
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                        <Button variant="outline" className="h-11 px-8 font-bold order-2 sm:order-1" onClick={onBack}>Cancel</Button>
                        <Button className="h-11 px-10 bg-blue-600 hover:bg-blue-700 font-bold order-1 sm:order-2">Save Outsource Order</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// Local SVG Fallbacks removed as we import from lucide now

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OutsourcePage() {
    const [view, setView] = useState<"list" | "new">("list")
    const [orders, setOrders] = useState<OutsourceOrder[]>(initialOrders)
    const [vendorsList, setVendorsList] = useState<Vendor[]>(initialVendors)
    const [search, setSearch] = useState("")
    const [isAddVendorOpen, setIsAddVendorOpen] = useState(false)

    if (view === "new") {
        return <NewOrderView onBack={() => setView("list")} onSave={() => setView("list")} />
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Outsourcing Management</h1>
            </div>

            <Tabs defaultValue="jobs" className="space-y-4">
                <div className="bg-background rounded-xl border shadow-sm p-1 inline-flex">
                    <TabsList className="bg-transparent h-9 gap-2">
                        <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-xs px-6 rounded-lg">Outsource Jobs</TabsTrigger>
                        <TabsTrigger value="vendors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-xs px-6 rounded-lg">Vendors Directory</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="jobs">
                    <Card className="shadow-sm border-none bg-background">
                        <CardHeader className="pb-4 border-b">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Outsource Orders List</CardTitle>
                                <Button
                                    className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm"
                                    onClick={() => setView("new")}
                                >
                                    <Plus className="h-4 w-4" /> New Outsource Order
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="gap-2 h-9">
                                        <Download className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-2 h-9">
                                        Columns <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </div>
                                <div className="relative w-full md:w-80">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search orders..."
                                        className="pl-8 h-9 bg-muted/20 border-none"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="font-bold">Order Date</TableHead>
                                            <TableHead className="font-bold">Job Name</TableHead>
                                            <TableHead className="font-bold">Vendor</TableHead>
                                            <TableHead className="font-bold">PO Type</TableHead>
                                            <TableHead className="font-bold">Status</TableHead>
                                            <TableHead className="font-bold">Amount</TableHead>
                                            <TableHead className="text-right font-bold w-[100px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map(order => (
                                            <TableRow key={order.id}>
                                                <TableCell className="text-xs">{order.orderDate}</TableCell>
                                                <TableCell className="font-bold text-sm">{order.jobName}</TableCell>
                                                <TableCell className="text-sm">{order.vendor}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="font-bold text-[10px] uppercase">{order.poType}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={
                                                        order.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                            order.status === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                                                'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                    }>
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-bold text-sm">₹{order.amount.toLocaleString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                                        <ChevronDown className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="vendors">
                    <Card className="shadow-sm border-none bg-background">
                        <CardHeader className="pb-4 border-b">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Approved Printers & Vendors</CardTitle>
                                <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                                            <Plus className="h-4 w-4" /> Add Vendor
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
                                        <DialogHeader className="px-10 pt-10 pb-6 text-left border-b">
                                            <div className="flex items-center gap-4 mb-2">
                                                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                                                    <Users2 className="h-5 w-5" />
                                                </div>
                                                <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Add New Vendor</DialogTitle>
                                            </div>
                                            <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                                                Onboard a new outsourcing partner
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="px-10 py-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                                            {/* 01: Identification */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">01</span>
                                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Identification</h3>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Vendor / Business Name <span className="text-rose-500">*</span></Label>
                                                    <Input className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20" placeholder="e.g. Galaxy Flex Printing" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Specialization</Label>
                                                    <Select>
                                                        <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4">
                                                            <SelectValue placeholder="Select Type" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl">
                                                            <SelectItem value="ctp">CTP Plates</SelectItem>
                                                            <SelectItem value="flex">Flex Printing</SelectItem>
                                                            <SelectItem value="binding">Finishing / Binding</SelectItem>
                                                            <SelectItem value="offset">Offset Printing</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            {/* 02: Contact Details */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">02</span>
                                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact Details</h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Contact Number</Label>
                                                        <Input className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4" placeholder="99xxxxxxxx" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Email Address</Label>
                                                        <Input type="email" className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4" placeholder="vendor@example.com" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Office Address</Label>
                                                    <Textarea className="min-h-[100px] rounded-xl border-slate-100 bg-white font-medium text-slate-600 p-4 resize-none focus-visible:ring-blue-500/20" placeholder="Full business address..." />
                                                </div>
                                            </div>
                                        </div>

                                        <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                                            <Button
                                                variant="ghost"
                                                className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                                onClick={() => setIsAddVendorOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all"
                                                onClick={() => setIsAddVendorOpen(false)}
                                            >
                                                Save Vendor Profile
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {vendorsList.map(v => (
                                    <Card key={v.id} className="group hover:border-blue-200 transition-all border-slate-100 cursor-pointer overflow-hidden">
                                        <CardHeader className="bg-slate-50/50 space-y-0.5">
                                            <div className="flex justify-between items-start">
                                                <div className="p-2 rounded-lg bg-white border shadow-sm group-hover:text-blue-600 transition-colors">
                                                    <Users2 className="h-5 w-5" />
                                                </div>
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">ACTIVE</Badge>
                                            </div>
                                            <CardTitle className="pt-3 text-lg font-black tracking-tight">{v.name}</CardTitle>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{v.specialization}</p>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground border-b border-dashed pb-2">
                                                    <Phone className="h-3 w-3" /> {v.contact}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Mail className="h-3 w-3" /> {v.email}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="space-y-0.5">
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Outstanding</p>
                                                    <p className="text-xl font-black italic">₹{v.balance.toLocaleString()}</p>
                                                </div>
                                                <Button size="icon" variant="outline" className="h-8 w-8 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    <ExtLink className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

import { Mail } from "lucide-react"
