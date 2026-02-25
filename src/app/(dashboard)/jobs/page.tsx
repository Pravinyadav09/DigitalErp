"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import {
    Search,
    Plus,
    Edit,
    Eye,
    Printer,
    ImageIcon,
    Download,
    ChevronDown,
    Filter,
    AlertCircle,
    CheckCircle,
    X,
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings2 } from "lucide-react"

type Job = {
    id: string
    date: string
    customer: string
    description: string
    hasDesign: boolean
    status: string
    deadline: string
    priority: string
    items: { id: number; desc: string; specs: string; qty: number }[]
    stages: { name: string; status: string }[]
}

const initialJobs: Job[] = [
    {
        id: "JB-2026-0034", date: "11 Feb",
        customer: "Denesik-Keeling",
        description: "Print Job • Stock: Chromo Paper (170GSM)...",
        hasDesign: true, status: "Pending", deadline: "14 Feb", priority: "High",
        items: [
            { id: 1, desc: "Print Job", specs: "Stock: Chromo Paper (170GSM) • Process: Gloss Lamination • Process: Creasing", qty: 1000 },
            { id: 2, desc: "Book Printing", specs: "Specs: 8.27*11.69 Size | 100 Pages • Cover: Chromo Paper", qty: 100 },
        ],
        stages: [
            { name: "Paper Cutting", status: "Pending" },
            { name: "Printing", status: "Pending" },
            { name: "Lamination", status: "Pending" },
            { name: "Creasing", status: "Pending" },
            { name: "Binding", status: "Pending" },
            { name: "Final QA", status: "Pending" },
        ]
    },
    {
        id: "JB-2026-0033", date: "06 Feb",
        customer: "Denesik-Keeling",
        description: "Wide Format Print:...",
        hasDesign: false, status: "Printing", deadline: "09 Feb", priority: "Medium",
        items: [{ id: 1, desc: "Wide Format Print", specs: "Vinyl Matte • Size: 10ft x 8ft", qty: 5 }],
        stages: [
            { name: "Paper Cutting", status: "Done" },
            { name: "Printing", status: "Active" },
            { name: "Finishing", status: "Pending" },
        ]
    },
    {
        id: "JOB-60956", date: "30 Jan",
        customer: "Harris, Hodkiewicz and Morissette",
        description: "Consequat est aut voluptatem.",
        hasDesign: false, status: "Post-Press", deadline: "03 Feb", priority: "High",
        items: [{ id: 1, desc: "Post Press Job", specs: "Lamination + Binding", qty: 500 }],
        stages: [
            { name: "Paper Cutting", status: "Done" },
            { name: "Printing", status: "Done" },
            { name: "Lamination", status: "Active" },
            { name: "Binding", status: "Pending" },
        ]
    },
    {
        id: "JOB-56871", date: "30 Jan",
        customer: "Harris, Hodkiewicz and Morissette",
        description: "Quis rerum praesentium.",
        hasDesign: false, status: "Printing", deadline: "02 Feb", priority: "Medium",
        items: [{ id: 1, desc: "Offset Print", specs: "170GSM Art Paper • 4 Color", qty: 2000 }],
        stages: [
            { name: "Paper Cutting", status: "Done" },
            { name: "Printing", status: "Active" },
            { name: "Finishing", status: "Pending" },
        ]
    },
    {
        id: "JOB-27009", date: "26 Jan",
        customer: "Kuhlman, Jakubowski and Hegmann",
        description: "Distinctio rerum aut ipsam hic.",
        hasDesign: false, status: "Completed", deadline: "02 Feb", priority: "Low",
        items: [{ id: 1, desc: "Brochure Print", specs: "Art Card 300GSM • Matt Lam", qty: 1000 }],
        stages: [
            { name: "Paper Cutting", status: "Done" },
            { name: "Printing", status: "Done" },
            { name: "Lamination", status: "Done" },
            { name: "Final QA", status: "Done" },
        ]
    },
    {
        id: "JOB-13664", date: "23 Jan",
        customer: "Powlowski, Bernier and Koelpin",
        description: "Ipsam est quia.",
        hasDesign: false, status: "Completed", deadline: "02 Feb", priority: "Low",
        items: [{ id: 1, desc: "Business Cards", specs: "300GSM Art Card • Gloss Lam", qty: 500 }],
        stages: [
            { name: "Paper Cutting", status: "Done" },
            { name: "Printing", status: "Done" },
            { name: "Lamination", status: "Done" },
            { name: "Final QA", status: "Done" },
        ]
    },
    {
        id: "JOB-46608", date: "29 Jan",
        customer: "Crona Group",
        description: "Id in.",
        hasDesign: false, status: "Pre-Press", deadline: "02 Feb", priority: "Medium",
        items: [{ id: 1, desc: "Pre-Press Setup", specs: "Plate Making • Color Profile", qty: 1 }],
        stages: [
            { name: "Pre-Press", status: "Active" },
            { name: "Printing", status: "Pending" },
            { name: "Finishing", status: "Pending" },
        ]
    },
]

const statusConfig: Record<string, { label: string; className: string }> = {
    "Pending": { label: "Pending", className: "bg-slate-500 hover:bg-slate-600 text-white" },
    "Pre-Press": { label: "Pre-Press", className: "bg-cyan-500 hover:bg-cyan-600 text-white" },
    "Printing": { label: "Printing", className: "bg-blue-600 hover:bg-blue-700 text-white" },
    "Post-Press": { label: "Post-Press", className: "bg-amber-500 hover:bg-amber-600 text-white" },
    "Completed": { label: "Completed", className: "bg-emerald-600 hover:bg-emerald-700 text-white" },
}

// ─── New Job Card Form ────────────────────────────────────────────────────────
function NewJobCardDialog({ onClose }: { onClose: () => void }) {
    const [items, setItems] = useState([
        { id: 1, desc: "", specs: "", qty: "" },
    ])

    const addItem = () => setItems(prev => [...prev, { id: Date.now(), desc: "", specs: "", qty: "" }])
    const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

    return (
        <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 border-none shadow-2xl">
            <DialogHeader className="px-8 pt-8 pb-4 border-b bg-background sticky top-0 z-10">
                <DialogTitle className="text-xl font-bold">Create Job Card</DialogTitle>
            </DialogHeader>

            <div className="p-8 space-y-6 bg-background">
                {/* Job Details */}
                <Card className="border shadow-sm">
                    <CardHeader className="py-3 px-5 bg-muted/30 border-b">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            📋 Job Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Job No.</Label>
                                <Input defaultValue="JB-2026-0035" className="h-9" readOnly />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-rose-500">Customer *</Label>
                                <Select>
                                    <SelectTrigger className="h-9"><SelectValue placeholder="Select Customer" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dk">Denesik-Keeling</SelectItem>
                                        <SelectItem value="cg">Crona Group</SelectItem>
                                        <SelectItem value="sl">Schuster Ltd</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold">Start Date</Label>
                                <Input type="date" className="h-9" defaultValue="2026-02-25" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-rose-500">Delivery Deadline</Label>
                                <Input type="date" className="h-9 border-rose-200 focus-visible:ring-rose-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Production Items */}
                <Card className="border shadow-sm">
                    <CardHeader className="py-3 px-5 bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-bold">Production Items</CardTitle>
                        <Button size="sm" variant="outline" className="h-8 gap-2 text-xs font-bold" onClick={addItem}>
                            <Plus className="h-3 w-3" /> Add Item
                        </Button>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                        <div className="grid grid-cols-12 gap-2 text-[11px] font-bold uppercase text-muted-foreground px-1 pb-1">
                            <span className="col-span-7">Description / Specs</span>
                            <span className="col-span-3">Quantity</span>
                            <span className="col-span-2 text-right">Action</span>
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-2 items-start border rounded-lg p-3 bg-muted/10">
                                <div className="col-span-7 space-y-2">
                                    <Input
                                        placeholder="e.g. Print Job"
                                        className="h-8 text-sm font-bold"
                                        value={item.desc}
                                        onChange={e => setItems(prev => prev.map(i => i.id === item.id ? { ...i, desc: e.target.value } : i))}
                                    />
                                    <Textarea
                                        placeholder="• Stock: Chromo Paper (170GSM)&#10;• Process: Gloss Lamination"
                                        className="text-xs h-16 resize-none"
                                        value={item.specs}
                                        onChange={e => setItems(prev => prev.map(i => i.id === item.id ? { ...i, specs: e.target.value } : i))}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <Input
                                        type="number"
                                        placeholder="1000"
                                        className="h-8 font-bold"
                                        value={item.qty}
                                        onChange={e => setItems(prev => prev.map(i => i.id === item.id ? { ...i, qty: e.target.value } : i))}
                                    />
                                </div>
                                <div className="col-span-2 flex justify-end">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500 hover:bg-rose-50" onClick={() => removeItem(item.id)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Design Image & Notes */}
                <Card className="border shadow-sm">
                    <CardContent className="p-5 space-y-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold">Design Image</Label>
                            <Input type="file" accept="image/*" className="h-9 text-xs" />
                            <p className="text-[10px] text-muted-foreground">Optional. Upload a design image for reference. Max 5MB.</p>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold">Notes / Special Instructions</Label>
                            <Textarea placeholder="e.g. Urgent Delivery, Use specific courier..." className="resize-none h-20 text-sm" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-3 justify-end pt-2">
                    <Button
                        className="h-10 px-8 bg-emerald-600 hover:bg-emerald-700 font-bold uppercase text-xs tracking-wider"
                        onClick={() => {
                            toast.success("Job Card Created", { description: "Job JB-2026-0045 has been generated successfully." })
                            onClose()
                        }}
                    >
                        <CheckCircle className="h-4 w-4 mr-2" /> Create Job Card
                    </Button>
                </div>
            </div>
        </DialogContent>
    )
}

// ─── Job Card (Ticket) View ───────────────────────────────────────────────────
function JobCardView({ job, onBack }: { job: Job; onBack: () => void }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold">Job Card</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 font-bold border-slate-800 bg-slate-900 text-white hover:bg-slate-800 h-9 text-xs">
                        <Printer className="h-4 w-4" /> Print Job Card
                    </Button>
                    <Button variant="outline" className="h-9 text-xs font-bold" onClick={onBack}>
                        Back to List
                    </Button>
                </div>
            </div>

            <div className="border rounded-xl shadow-sm overflow-hidden bg-white">
                {/* Header */}
                <div className="p-6 border-b flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter uppercase">JOB TICKET</h2>
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">Digital ERP</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-2xl font-black tracking-tight">{job.id}</p>
                        <Badge className={`${statusConfig[job.status]?.className || "bg-slate-500 text-white"} text-[10px] font-bold uppercase px-3 h-5`}>
                            {job.status}
                        </Badge>
                    </div>
                </div>

                {/* Info row */}
                <div className="grid grid-cols-2 md:grid-cols-4 border-b">
                    {[
                        { label: "CUSTOMER", value: job.customer, sub: "Cristina Hermiston | 1-585-837-5878" },
                        { label: "START DATE", value: `${job.date}, 2026`, sub: "" },
                        { label: "DEADLINE", value: `${job.deadline}, 2026`, sub: "", red: true },
                        { label: "DESIGN REFERENCE", value: job.hasDesign ? "View Design →" : "No Design", sub: "", link: job.hasDesign },
                    ].map((col, i) => (
                        <div key={i} className={`p-4 ${i < 3 ? "border-r" : ""}`}>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{col.label}</p>
                            <p className={`font-bold text-base leading-tight ${col.red ? "text-rose-600" : col.link ? "text-blue-600 underline cursor-pointer" : ""}`}>
                                {col.value}
                            </p>
                            {col.sub && <p className="text-[10px] text-muted-foreground mt-0.5">{col.sub}</p>}
                        </div>
                    ))}
                </div>

                {/* Production Details */}
                <div className="p-6 border-b">
                    <h3 className="text-sm font-bold mb-4">Production Details</h3>
                    <table className="w-full text-sm border rounded overflow-hidden">
                        <thead className="bg-muted/40">
                            <tr>
                                <th className="text-left px-3 py-2 font-bold text-[11px] uppercase border-b w-8">#</th>
                                <th className="text-left px-3 py-2 font-bold text-[11px] uppercase border-b">Description</th>
                                <th className="text-right px-3 py-2 font-bold text-[11px] uppercase border-b w-28">Quantity</th>
                                <th className="text-left px-3 py-2 font-bold text-[11px] uppercase border-b">Specifications / Machine</th>
                            </tr>
                        </thead>
                        <tbody>
                            {job.items.map((item, idx) => (
                                <tr key={item.id} className="border-b last:border-0">
                                    <td className="px-3 py-3 font-bold text-muted-foreground">{idx + 1}</td>
                                    <td className="px-3 py-3">
                                        <p className="font-bold text-slate-800 leading-snug">{item.desc} • {item.specs}</p>
                                    </td>
                                    <td className="px-3 py-3 text-right text-2xl font-black">{item.qty}</td>
                                    <td className="px-3 py-3 text-[11px] text-muted-foreground space-y-0.5 leading-relaxed">
                                        <div><span className="font-bold">Paper:</span> Chromo Paper (170GSM)</div>
                                        <div><span className="font-bold">Machine:</span> Konica Minolta C6085</div>
                                        <div><span className="font-bold">Processes:</span> Gloss Lamination, Creasing</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Digital Progress Tracking */}
                <div className="p-6 border-t">
                    <h3 className="text-sm font-bold mb-4">Digital Progress Tracking</h3>
                    <table className="w-full text-sm border rounded overflow-hidden">
                        <thead className="bg-muted/40">
                            <tr>
                                <th className="text-left px-4 py-2.5 font-bold text-[11px] uppercase border-b">Stage</th>
                                <th className="text-left px-4 py-2.5 font-bold text-[11px] uppercase border-b w-36">Status</th>
                                <th className="text-left px-4 py-2.5 font-bold text-[11px] uppercase border-b w-44">Action / Approver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {job.stages.map((stage, idx) => (
                                <tr key={idx} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                                    <td className="px-4 py-3 font-bold text-slate-800 text-sm">{stage.name}</td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            className={`text-[10px] font-bold uppercase px-3 h-5 ${stage.status === 'Done' ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                : stage.status === 'Active' ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                    : 'bg-slate-500 text-white hover:bg-slate-600'
                                                }`}
                                        >
                                            {stage.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        {stage.status !== 'Done' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-7 text-[11px] font-bold gap-1.5 text-emerald-600 border-emerald-300 bg-emerald-50 hover:bg-emerald-100"
                                            >
                                                <CheckCircle className="h-3.5 w-3.5" /> Mark Done
                                            </Button>
                                        )}
                                        {stage.status === 'Done' && (
                                            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                                <CheckCircle className="h-3.5 w-3.5" /> Completed
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Signatures */}
                <div className="p-6 border-t flex flex-col md:flex-row justify-between items-center gap-6 bg-muted/10">
                    <div className="flex gap-16">
                        {["Operator Signature", "Supervisor Signature"].map(label => (
                            <div key={label} className="space-y-2 text-center">
                                <div className="h-px w-36 bg-muted-foreground/30" />
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="gap-2 font-bold text-xs">
                        <Download className="h-4 w-4" /> Download PDF
                    </Button>
                </div>
            </div>
        </div>
    )
}

// ─── Status Update Dialog ─────────────────────────────────────────────────────
function StatusUpdateDialog({ job, onUpdate }: { job: Job; onUpdate: (id: string, status: string) => void }) {
    const [selected, setSelected] = useState(job.status)
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className={`h-7 px-2.5 gap-1.5 text-[10px] font-bold uppercase rounded ${statusConfig[job.status]?.className || "bg-slate-500 text-white"}`}
                >
                    {job.status} <Edit className="h-3 w-3" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold">Update Status: {job.id}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-muted-foreground uppercase">Select New Status</Label>
                        <Select value={selected} onValueChange={setSelected}>
                            <SelectTrigger className="h-10">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(statusConfig).map(s => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" className="font-bold h-9" onClick={() => setOpen(false)}>Close</Button>
                    <Button className="font-bold h-9 bg-blue-600 hover:bg-blue-700" onClick={() => { onUpdate(job.id, selected); setOpen(false) }}>
                        Update Status
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductionJobsPage() {
    const [jobs, setJobs] = useState<Job[]>(initialJobs)
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [search, setSearch] = useState("")

    const updateStatus = (id: string, status: string) => {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j))
    }

    const filtered = jobs.filter(j =>
        j.id.toLowerCase().includes(search.toLowerCase()) ||
        j.customer.toLowerCase().includes(search.toLowerCase()) ||
        j.description.toLowerCase().includes(search.toLowerCase())
    )

    if (selectedJob) {
        return <JobCardView job={selectedJob} onBack={() => setSelectedJob(null)} />
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Production Jobs</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-10 shadow-sm">
                            <Plus className="h-4 w-4" /> New Job Card
                        </Button>
                    </DialogTrigger>
                    <NewJobCardDialog onClose={() => setIsAddDialogOpen(false)} />
                </Dialog>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Settings2 className="h-4 w-4" />
                        <CardTitle className="text-sm font-medium">Production Workflow</CardTitle>
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
                                    <DropdownMenuItem onClick={() => toast.success("Exporting CSV")}>Export CSV</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toast.success("Exporting PDF")}>Export PDF</DropdownMenuItem>
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
                                    <TableHead className="font-bold w-[140px]">Status</TableHead>
                                    <TableHead className="font-bold w-[70px]">Design</TableHead>
                                    <TableHead className="font-bold">Customer</TableHead>
                                    <TableHead className="font-bold">Description (Main)</TableHead>
                                    <TableHead className="font-bold w-[130px]">Status</TableHead>
                                    <TableHead className="font-bold w-[100px]">Deadline</TableHead>
                                    <TableHead className="text-right font-bold w-[120px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((job) => (
                                    <TableRow key={job.id} className="group">
                                        {/* Job ID + Date */}
                                        <TableCell className="py-3">
                                            <div className="flex flex-col gap-0.5">
                                                <span
                                                    className="text-blue-600 font-bold text-sm hover:underline cursor-pointer leading-tight"
                                                    onClick={() => setSelectedJob(job)}
                                                >
                                                    {job.id}
                                                </span>
                                                <span className="text-[11px] text-muted-foreground">{job.date}</span>
                                            </div>
                                        </TableCell>

                                        {/* Design */}
                                        <TableCell>
                                            {job.hasDesign
                                                ? <ImageIcon className="h-5 w-5 text-blue-500" />
                                                : <span className="text-muted-foreground text-sm">-</span>
                                            }
                                        </TableCell>

                                        {/* Customer */}
                                        <TableCell className="font-medium text-sm">{job.customer}</TableCell>

                                        {/* Description */}
                                        <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                                            {job.description}
                                        </TableCell>

                                        {/* Status badge + edit */}
                                        <TableCell>
                                            <StatusUpdateDialog job={job} onUpdate={updateStatus} />
                                        </TableCell>

                                        {/* Deadline */}
                                        <TableCell>
                                            <span className="text-rose-600 font-bold text-xs flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" /> {job.deadline}
                                            </span>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 gap-1.5 text-[11px] font-bold border-cyan-400 text-cyan-600 bg-cyan-50 hover:bg-cyan-100"
                                                onClick={() => setSelectedJob(job)}
                                            >
                                                <Eye className="h-3.5 w-3.5" /> View Card
                                            </Button>
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
