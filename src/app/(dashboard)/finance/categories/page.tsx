"use client"

import React, { useState } from "react"
import {
    Search, Plus, Tag, Trash2, Edit,
    Download, ChevronDown, Settings2
} from "lucide-react"
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ─── Types ──────────────────────────────────────────────────────────────────
type ExpenseCategory = {
    id: string
    name: string
    description: string
    status: "Active" | "Inactive"
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialCategories: ExpenseCategory[] = [
    { id: "1", name: "Electricity", description: "Monthly electricity bills and DG set maintenance", status: "Active" },
    { id: "2", name: "Internet", description: "Broadband and leased line charges", status: "Active" },
    { id: "3", name: "Labor Wages", description: "Daily wages for helper staff and casual labor", status: "Active" },
    { id: "4", name: "Machine Maintenance", description: "Spare parts, oiling and AMC charges", status: "Active" },
    { id: "5", name: "Rent", description: "Office and warehouse monthly rent", status: "Active" },
    { id: "6", name: "Tea & Pantry", description: "Office snacks, tea, coffee and guest refreshments", status: "Active" },
    { id: "7", name: "Transport", description: "Local delivery and material pickup charges", status: "Active" },
]

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ExpenseCategoriesPage() {
    const [categories] = useState<ExpenseCategory[]>(initialCategories)
    const [search, setSearch] = useState("")

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Expense Categories</h1>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground font-bold">
                            <Tag className="h-4 w-4" />
                            <CardTitle className="text-sm">Expense Categories</CardTitle>
                        </div>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                            <Plus className="h-4 w-4" /> Add Category
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9 bg-slate-800 text-white hover:bg-slate-900 hover:text-white border-none">
                                        <Download className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 h-9">
                                        <Settings2 className="h-4 w-4" /> Columns <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>Show ID</DropdownMenuItem>
                                    <DropdownMenuItem>Show Created Date</DropdownMenuItem>
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
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Name</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Description</TableHead>
                                    <TableHead className="font-black uppercase text-[11px] tracking-wider text-slate-500">Status</TableHead>
                                    <TableHead className="text-right font-black uppercase text-[11px] tracking-wider text-slate-500 w-[120px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map(cat => (
                                    <TableRow key={cat.id} className="group hover:bg-muted/10">
                                        <TableCell className="py-4 font-bold text-slate-800">
                                            {cat.name}
                                        </TableCell>
                                        <TableCell className="max-w-[400px]">
                                            <p className="text-xs text-muted-foreground line-clamp-1">{cat.description}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px] font-bold">
                                                {cat.status}
                                            </Badge>
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

