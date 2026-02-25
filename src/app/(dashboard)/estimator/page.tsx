"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import {
    Calculator,
    Search,
    Plus,
    FileText,
    Download,
    MoreHorizontal,
    Eye,
    Check,
    X,
    Hammer,
    Edit2,
    Trash2,
    Filter,
    ChevronDown,
    FileDown
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CostEstimator } from "@/components/shared/cost-estimator"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useRouter } from "next/navigation"

const initialQuotations = [
    { id: "QT-00151", date: "31 Dec, 2025", customer: "Farrell, Klocko and Oberbrunner", amount: "₹6,529.23", status: "approved" },
    { id: "QT-2026-0062", date: "11 Feb, 2026", customer: "Denesik-Keeling", amount: "₹49,948.22", status: "approved" },
    { id: "QT-24467", date: "04 Jan, 2026", customer: "Crona Group", amount: "₹4,329.86", status: "approved" },
    { id: "QT-36472", date: "31 Dec, 2025", customer: "Schuster Ltd", amount: "₹8,342.20", status: "approved" },
    { id: "QT-40102", date: "02 Jan, 2026", customer: "Hegmann LLC", amount: "₹2,003.12", status: "rejected" },
    { id: "QT-60328", date: "02 Jan, 2026", customer: "Bailey-Champlin", amount: "₹884.56", status: "draft" },
    { id: "QT-61931", date: "03 Jan, 2026", customer: "Denesik-Keeling", amount: "₹1,277.61", status: "rejected" },
]

export default function QuotationsPage() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const [showEstimator, setShowEstimator] = useState(false)

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">Quotations</h1>
                </div>
                <Button
                    className="gap-2 bg-primary font-bold shadow-lg"
                    onClick={() => router.push('/estimator/new')}
                >
                    <Plus className="h-4 w-4" /> New Quotation
                </Button>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <CardTitle className="text-sm font-medium">Sales Quotations</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9">
                                        <FileDown className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => toast.success("Export Started", { description: "Quotation report is being generated in Excel format." })}>Export as Excel</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toast.success("Export Started", { description: "CSV file is ready for download." })}>Export as CSV</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9">
                                        <Filter className="h-4 w-4" /> Columns <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Show/Hide Columns</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search current page..."
                                className="pl-8 h-9 bg-muted/20 border-none focus-visible:ring-1"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="w-[120px] font-bold">QT Number</TableHead>
                                    <TableHead className="font-bold">Date</TableHead>
                                    <TableHead className="font-bold">Customer</TableHead>
                                    <TableHead className="font-bold">Amount</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="text-right font-bold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {initialQuotations.map((qt) => (
                                    <TableRow key={qt.id} className="group transition-colors">
                                        <TableCell className="font-bold text-primary cursor-pointer hover:underline">
                                            {qt.id}
                                        </TableCell>
                                        <TableCell>{qt.date}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">{qt.customer}</TableCell>
                                        <TableCell className="font-bold">{qt.amount}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`
                                                    font-bold uppercase text-[10px] px-2 h-5
                                                    ${qt.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                                        qt.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                                            'bg-slate-100 text-slate-700'}
                                                `}
                                            >
                                                {qt.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right py-2">
                                            <div className="flex items-center justify-end gap-1 px-1">
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200">
                                                    <FileText className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200 text-blue-500">
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200 text-emerald-600">
                                                    <Check className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200 text-rose-500">
                                                    <X className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200 text-muted-foreground">
                                                    <Hammer className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200 text-blue-600">
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200 text-rose-600 hover:bg-rose-50">
                                                    <Trash2 className="h-3.5 w-3.5" />
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
