"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import {
    Search, Plus, Download, Filter, ChevronDown,
    X, CheckCircle, RefreshCcw, HelpCircle
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

// ─── Types ──────────────────────────────────────────────────────────────────
type Reading = {
    id: number
    date: string
    machine: string
    opening: number
    closing: number
    impressions: number
    remarks: string
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialReadings: Reading[] = [
    { id: 1, date: "24 Jan 2026", machine: "Konica Minolta C6085", opening: 7923, closing: 8000, impressions: 77, remarks: "Auto-generated based on jobs done" },
    { id: 2, date: "24 Jan 2026", machine: "Heidelberg Speedmaster", opening: 5661, closing: 5760, impressions: 99, remarks: "Auto-generated based on jobs done" },
    { id: 3, date: "25 Jan 2026", machine: "Konica Minolta C6085", opening: 8000, closing: 8238, impressions: 238, remarks: "Auto-generated based on jobs done" },
    { id: 4, date: "25 Jan 2026", machine: "Heidelberg Speedmaster", opening: 5760, closing: 5907, impressions: 147, remarks: "Auto-generated based on jobs done" },
    { id: 5, date: "25 Jan 2026", machine: "Epson SureColor S80670", opening: 7026, closing: 7084, impressions: 58, remarks: "Auto-generated based on jobs done" },
    { id: 6, date: "26 Jan 2026", machine: "Konica Minolta C6085", opening: 8238, closing: 8331, impressions: 93, remarks: "Auto-generated based on jobs done" },
    { id: 7, date: "26 Jan 2026", machine: "Heidelberg Speedmaster", opening: 5907, closing: 6050, impressions: 143, remarks: "Auto-generated based on jobs done" },
    { id: 8, date: "27 Jan 2026", machine: "Konica Minolta C6085", opening: 8331, closing: 8520, impressions: 189, remarks: "Auto-generated based on jobs done" },
    { id: 9, date: "27 Jan 2026", machine: "Epson SureColor S80670", opening: 7084, closing: 7142, impressions: 58, remarks: "Auto-generated based on jobs done" },
    { id: 10, date: "28 Jan 2026", machine: "Konica Minolta C6085", opening: 8520, closing: 8700, impressions: 180, remarks: "Auto-generated based on jobs done" },
]

const machineOptions = [
    "All Machines",
    "Konica Minolta C6085",
    "Heidelberg Speedmaster",
    "Epson SureColor S80670",
]

// ─── Log Reading Dialog ───────────────────────────────────────────────────────
function LogReadingDialog({
    onSave, onClose
}: {
    onSave: (r: Reading) => void
    onClose: () => void
}) {
    const [machine, setMachine] = useState("Konica Minolta C6085 (Digital)")
    const [date, setDate] = useState("2026-02-11")
    const [opening, setOpening] = useState(8876)
    const [closing, setClosing] = useState<number | "">("")
    const [remarks, setRemarks] = useState("")

    const impressions = closing !== "" ? closing - opening : 0

    return (
        <DialogContent className="max-w-md p-0 border-none shadow-2xl rounded-xl overflow-hidden">
            <DialogHeader className="px-6 pt-5 pb-3 border-b bg-background relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <RefreshCcw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <DialogTitle className="text-lg font-bold">Log Reading</DialogTitle>
                        <p className="text-[10px] text-muted-foreground">Record daily meter impressions.</p>
                    </div>
                </div>
            </DialogHeader>

            <div className="p-6 space-y-4 bg-background">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                            Machine <span className="text-rose-500 font-bold">*</span>
                        </Label>
                        <Select value={machine} onValueChange={setMachine}>
                            <SelectTrigger className="h-9 border-slate-200 shadow-sm text-xs font-semibold">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Konica Minolta C6085 (Digital)">Konica Minolta C6085 (Digital)</SelectItem>
                                <SelectItem value="Heidelberg Speedmaster (Offset)">Heidelberg Speedmaster (Offset)</SelectItem>
                                <SelectItem value="Epson SureColor S80670 (Wide Format)">Epson SureColor S80670 (Wide Format)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                            Date <span className="text-rose-500 font-bold">*</span>
                        </Label>
                        <Input
                            type="date"
                            className="h-9 border-slate-200 shadow-sm text-xs font-semibold"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                            Opening Reading <span className="text-rose-500 font-bold">*</span>
                        </Label>
                        <Input
                            type="number"
                            className="h-9 border-slate-200 shadow-sm font-mono font-bold text-sm"
                            value={opening}
                            onChange={e => setOpening(+e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                            Closing Reading <span className="text-rose-500 font-bold">*</span>
                        </Label>
                        <Input
                            type="number"
                            className="h-9 border-slate-200 shadow-sm font-mono font-bold text-sm focus-visible:ring-blue-500"
                            value={closing}
                            onChange={e => setClosing(e.target.value === "" ? "" : +e.target.value)}
                            placeholder="Current meter"
                        />
                    </div>
                </div>

                <div className={`rounded-lg border p-3 flex flex-col gap-0.5 transition-all duration-300 ${closing !== "" && impressions >= 0
                    ? "bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800"
                    : "bg-muted/30 border-dashed border-slate-300 dark:border-slate-800"}`}>
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Total Impressions</span>
                        <Badge variant={closing !== "" && impressions >= 0 ? "default" : "secondary"} className="h-4 px-1.5 text-[8px] font-mono font-bold">
                            {closing !== "" && impressions >= 0 ? "Calculated" : "Awaiting Value"}
                        </Badge>
                    </div>
                    <div className={`text-2xl font-black font-mono tracking-tighter ${closing !== "" && impressions >= 0 ? "text-blue-700 dark:text-blue-400" : "text-muted-foreground/30"}`}>
                        {closing !== "" ? impressions.toLocaleString() : "000,000"}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Remarks</Label>
                    <Textarea
                        placeholder="Machinery issues or notes..."
                        className="resize-none h-16 text-xs border-slate-200 focus-visible:ring-blue-500"
                        value={remarks}
                        onChange={e => setRemarks(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 justify-end pt-3 border-t items-center">
                    <Button variant="ghost" size="sm" className="font-bold text-xs text-slate-500" onClick={onClose}>Cancel</Button>
                    <Button
                        disabled={closing === "" || impressions < 0}
                        size="sm"
                        className="h-9 px-6 bg-blue-600 hover:bg-blue-700 font-bold shadow-md transition-all active:scale-95"
                        onClick={() => {
                            if (closing === "" || impressions < 0) return
                            const machineName = machine.split(" (")[0]
                            onSave({
                                id: Date.now(),
                                date: new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                                machine: machineName,
                                opening,
                                closing: closing as number,
                                impressions,
                                remarks: remarks || "Manually entered"
                            })
                            toast.success("Reading Saved", { description: `${machineName} meter updated.` })
                            onClose()
                        }}
                    >
                        Save Entry
                    </Button>
                </div>
            </div>
        </DialogContent>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DailyReadingsPage() {
    const [readings, setReadings] = useState<Reading[]>(initialReadings)
    const [filterMachine, setFilterMachine] = useState("All Machines")
    const [filterDate, setFilterDate] = useState("")
    const [search, setSearch] = useState("")
    const [showLog, setShowLog] = useState(false)

    const addReading = (r: Reading) => setReadings(prev => [r, ...prev])

    const filtered = readings.filter(r => {
        const matchMachine = filterMachine === "All Machines" || r.machine === filterMachine
        const matchSearch = r.machine.toLowerCase().includes(search.toLowerCase()) ||
            r.remarks.toLowerCase().includes(search.toLowerCase()) ||
            r.date.toLowerCase().includes(search.toLowerCase())
        return matchMachine && matchSearch
    })

    const reset = () => { setFilterMachine("All Machines"); setFilterDate("") }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Daily Machine Readings</h1>
            </div>

            {/* Filter Bar */}
            <Card className="shadow-sm border">
                <CardContent className="p-5">
                    <div className="flex flex-wrap items-end gap-4">
                        <div className="space-y-1.5 flex-1 min-w-[200px]">
                            <Label className="text-xs font-bold text-muted-foreground">Filter by Machine</Label>
                            <Select value={filterMachine} onValueChange={setFilterMachine}>
                                <SelectTrigger className="h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {machineOptions.map(m => (
                                        <SelectItem key={m} value={m}>{m}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-[200px]">
                            <Label className="text-xs font-bold text-muted-foreground">Filter by Date</Label>
                            <Input
                                type="date"
                                className="h-9"
                                value={filterDate}
                                onChange={e => setFilterDate(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button className="h-9 gap-2 bg-blue-600 hover:bg-blue-700 font-bold text-xs">
                                <Filter className="h-3.5 w-3.5" /> Filter
                            </Button>
                            <Button
                                variant="outline"
                                className="h-9 gap-2 font-bold text-xs"
                                onClick={reset}
                            >
                                <RefreshCcw className="h-3.5 w-3.5" /> Reset
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Meter Logs Table */}
            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <HelpCircle className="h-4 w-4" />
                            <CardTitle className="text-sm font-medium">Meter Logs</CardTitle>
                        </div>
                        <Dialog open={showLog} onOpenChange={setShowLog}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                                    <Plus className="h-4 w-4" /> Log Daily Reading
                                </Button>
                            </DialogTrigger>
                            <LogReadingDialog onSave={addReading} onClose={() => setShowLog(false)} />
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
                                    <DropdownMenuItem onClick={() => toast.success("Preparing Excel", { description: "Meter logs report is being generated." })}>Export as Excel</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toast.success("Preparing PDF", { description: "Meter logs report is being generated." })}>Export as PDF</DropdownMenuItem>
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
                                    <TableHead className="font-bold w-[130px]">Date</TableHead>
                                    <TableHead className="font-bold">Machine</TableHead>
                                    <TableHead className="font-bold w-[100px]">Opening</TableHead>
                                    <TableHead className="font-bold w-[100px]">Closing</TableHead>
                                    <TableHead className="font-bold w-[160px]">Total Impressions</TableHead>
                                    <TableHead className="font-bold">Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(row => (
                                    <TableRow key={row.id} className="group">
                                        <TableCell className="text-sm text-muted-foreground">{row.date}</TableCell>
                                        <TableCell className="font-bold text-sm">{row.machine}</TableCell>
                                        <TableCell className="text-sm">{row.opening.toLocaleString()}</TableCell>
                                        <TableCell className="text-sm">{row.closing.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`font-black text-white text-[10px] px-2.5 h-5 ${row.impressions >= 200 ? "bg-emerald-600" :
                                                    row.impressions >= 100 ? "bg-blue-600" :
                                                        "bg-slate-500"
                                                    }`}
                                            >
                                                {row.impressions}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground max-w-[280px] truncate">
                                            {row.remarks}
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
