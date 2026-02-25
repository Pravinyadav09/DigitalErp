"use client"

import React, { useState } from "react"
import {
    Wallet,
    ArrowDownCircle,
    ArrowUpCircle,
    TrendingUp,
    Receipt,
    FileText,
    Plus,
    Filter,
    Download,
    CreditCard,
    Building,
    ChevronRight,
    Search,
    IndianRupee,
    Briefcase
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function FinancePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-1">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Finance & Expenses</h1>
                    <p className="text-muted-foreground font-medium">
                        Track operational costs, purchase orders, and business expenses.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export Report
                    </Button>
                    <Button className="gap-2 bg-primary">
                        <Plus className="h-4 w-4" /> Add Expense
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                        <ArrowDownCircle className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹42,500</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            Operational burn this month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Material Costs</CardTitle>
                        <Briefcase className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,28,000</div>
                        <p className="text-xs text-muted-foreground italic">Paper, Ink & Raw Materials</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">GST Input Credit</CardTitle>
                        <Receipt className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹8,450</div>
                        <p className="text-xs text-emerald-500 font-medium">Recoverable taxes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estimated P&L</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+₹1,82,000</div>
                        <p className="text-xs text-muted-foreground italic">Approx. net profit</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7 ">
                <Card className="col-span-4 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Operational Ledger</CardTitle>
                            <CardDescription>Daily expenses including utilities, pantry, and petty cash.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>GST</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Badge variant="outline">Utilities</Badge></TableCell>
                                    <TableCell className="font-medium">Electricity Bill - Jan</TableCell>
                                    <TableCell>₹342</TableCell>
                                    <TableCell className="text-right font-bold text-rose-600">₹5,200</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Badge variant="outline">Pantry</Badge></TableCell>
                                    <TableCell className="font-medium">Daily Tea & Snacks</TableCell>
                                    <TableCell>₹24</TableCell>
                                    <TableCell className="text-right font-bold text-rose-600">₹180</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Badge variant="outline">Maint</Badge></TableCell>
                                    <TableCell className="font-medium">Konica Machine Service</TableCell>
                                    <TableCell>₹510</TableCell>
                                    <TableCell className="text-right font-bold text-rose-600">₹2,840</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Badge variant="outline">Wages</Badge></TableCell>
                                    <TableCell className="font-medium">Staff Advance Part</TableCell>
                                    <TableCell>No</TableCell>
                                    <TableCell className="text-right font-bold text-rose-600">₹5,000</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="col-span-3 space-y-4">
                    <Card className="shadow-sm border-emerald-500/20 bg-emerald-500/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-emerald-800">GST Input Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-emerald-600 uppercase">Available Credit Pool</p>
                                <p className="text-3xl font-bold text-emerald-900 tracking-tighter">₹8,450.00</p>
                            </div>
                            <div className="pt-2">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10">Export GSTR-2 Data</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold">Recent Purchases</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold">Art Paper - 20 Reams</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Reliable Paper Mart</p>
                                </div>
                                <span className="font-bold text-rose-600">₹18,500</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold">CMYK Toner Set</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Xerox India Ltd</p>
                                </div>
                                <span className="font-bold text-rose-600">₹24,800</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
