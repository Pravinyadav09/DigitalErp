"use client"

import React, { useState } from "react"
import {
    Search, Plus, Percent, Trash2, Edit,
    CheckCircle, ShieldCheck, Scale
} from "lucide-react"
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ─── Types ──────────────────────────────────────────────────────────────────
type TaxSlab = {
    id: string
    name: string
    rate: number
    cgst: number
    sgst: number
    igst: number
    status: "Active" | "Inactive"
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialTaxSlabs: TaxSlab[] = [
    { id: "TAX-18", name: "Standard GST (18%)", rate: 18, cgst: 9, sgst: 9, igst: 18, status: "Active" },
    { id: "TAX-12", name: "Reduced GST (12%)", rate: 12, cgst: 6, sgst: 6, igst: 12, status: "Active" },
    { id: "TAX-05", name: "Essential GST (5%)", rate: 5, cgst: 2.5, sgst: 2.5, igst: 5, status: "Active" },
    { id: "TAX-28", name: "Luxury GST (28%)", rate: 28, cgst: 14, sgst: 14, igst: 28, status: "Active" },
    { id: "TAX-00", name: "Exempted (0%)", rate: 0, cgst: 0, sgst: 0, igst: 0, status: "Active" },
]

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TaxSlabsPage() {
    const [slabs, setSlabs] = useState<TaxSlab[]>(initialTaxSlabs)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Tax Slabs (GST)</h1>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Scale className="h-4 w-4" />
                            <CardTitle className="text-sm font-medium">Compliance Configuration</CardTitle>
                        </div>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                            <Plus className="h-4 w-4" /> Add Tax Slab
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-bold">Tax Name</TableHead>
                                    <TableHead className="font-bold">Total Rate</TableHead>
                                    <TableHead className="font-bold">CGST</TableHead>
                                    <TableHead className="font-bold">SGST</TableHead>
                                    <TableHead className="font-bold">IGST</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="text-right font-bold w-[120px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {slabs.map(slab => (
                                    <TableRow key={slab.id} className="group">
                                        <TableCell className="py-4">
                                            <p className="font-bold text-slate-800">{slab.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-mono">{slab.id}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-blue-100 text-blue-700 font-black px-3 h-7 text-sm">
                                                {slab.rate}%
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm font-medium">{slab.cgst}%</TableCell>
                                        <TableCell className="text-sm font-medium">{slab.sgst}%</TableCell>
                                        <TableCell className="text-sm font-medium">{slab.igst}%</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                                <span className="text-xs font-bold text-emerald-700">Active</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1 px-1">
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200">
                                                    <Edit className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200 text-rose-500">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-4">
                        <div className="p-2 rounded-full bg-amber-100 text-amber-600 shrink-0">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-800 text-sm">Compliance Notice</h4>
                            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                                These tax slabs are applied globally across all quotations, invoices, and purchase orders.
                                Changes made here will reflect in future transactions. Historical records will maintain the
                                rates at the time of creation.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
