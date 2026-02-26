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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
    const [isAddSlabOpen, setIsAddSlabOpen] = useState(false)

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
                        <Dialog open={isAddSlabOpen} onOpenChange={setIsAddSlabOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                                    <Plus className="h-4 w-4" /> Add Tax Slab
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
                                <DialogHeader className="px-10 pt-10 pb-6 text-left border-b">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                                            <Percent className="h-5 w-5" />
                                        </div>
                                        <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Create Tax Definition</DialogTitle>
                                    </div>
                                    <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                                        Configure GST structure for transactions
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="px-10 py-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                                    {/* 01: Identification */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">01</span>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tax Identity</h3>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Tax Name</Label>
                                            <Input
                                                placeholder="e.g. Standard GST (18%)"
                                                className="h-12 rounded-xl border-slate-200 bg-blue-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>

                                    {/* 02: Rate Configuration */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-black text-white">02</span>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rate Configuration</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Total Rate (%)</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="18"
                                                    className="h-12 rounded-xl border-none bg-blue-50 font-black text-slate-800 px-4 focus-visible:ring-blue-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">HSN Default</Label>
                                                <Input
                                                    placeholder="4819"
                                                    className="h-12 rounded-xl border-slate-100 bg-white font-medium text-slate-600 px-4 focus-visible:ring-blue-500/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Auto-Calculation Preview</p>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase">CGST</span>
                                                    <span className="text-xs font-black text-slate-800">9%</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase">SGST</span>
                                                    <span className="text-xs font-black text-slate-800">9%</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                                                    <span className="text-[9px] font-black text-blue-200 uppercase">IGST</span>
                                                    <span className="text-xs font-black text-white">18%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                                    <Button
                                        variant="ghost"
                                        className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                        onClick={() => setIsAddSlabOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all"
                                        onClick={() => setIsAddSlabOpen(false)}
                                    >
                                        Save Tax Definition
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
