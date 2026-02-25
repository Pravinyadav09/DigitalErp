"use client"

import React, { useState } from "react"
import {
    Plus, UserCog, Trash2, Edit,
    ShieldCheck, Lock, CheckCircle2,
    Check, X, Activity, Users
} from "lucide-react"
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// ─── Types ──────────────────────────────────────────────────────────────────
type Role = {
    id: string
    name: string
    description: string
    usersCount: number
    permissions: string[]
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialRoles: Role[] = [
    { id: "R-1", name: "Administrator", description: "Full system access with all management rights", usersCount: 2, permissions: ["all"] },
    { id: "R-2", name: "Accountant", description: "Read-write access to finance, invoices and reports", usersCount: 1, permissions: ["finance", "invoices", "reports"] },
    { id: "R-3", name: "Sales Head", description: "Manage quotations, customers and sales reports", usersCount: 3, permissions: ["sales", "customers", "quotations"] },
    { id: "R-4", name: "Operator", description: "Basic access to daily readings and job card status", usersCount: 8, permissions: ["readings", "jobs-status"] },
    { id: "R-5", name: "Inventory Manager", description: "Manage stocks, inwards and warehouse records", usersCount: 2, permissions: ["inventory", "purchases"] },
]

const permissionList = [
    "Sales & Quotations", "Inventory & Stocks", "Production Jobs", "Finance & Expenses",
    "Reports & Analytics", "Vendor Management", "System Settings", "User Management"
]

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>(initialRoles)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">Access Control & Roles</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Role List */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="shadow-sm border-none bg-background">
                        <CardHeader className="pb-4 border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <UserCog className="h-4 w-4" />
                                    <CardTitle className="text-sm font-medium">Defined Roles</CardTitle>
                                </div>
                                <Button className="h-8 gap-2 bg-blue-600 hover:bg-blue-700 font-bold text-xs">
                                    <Plus className="h-4 w-4" /> Define New Role
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="font-bold">Role Name</TableHead>
                                            <TableHead className="font-bold">Description</TableHead>
                                            <TableHead className="font-bold">Users</TableHead>
                                            <TableHead className="text-right font-bold w-[120px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {roles.map(role => (
                                            <TableRow key={role.id} className="group cursor-pointer hover:bg-muted/10">
                                                <TableCell className="py-4">
                                                    <p className="font-bold text-slate-800">{role.name}</p>
                                                    <p className="text-[10px] text-muted-foreground font-mono">{role.id}</p>
                                                </TableCell>
                                                <TableCell className="max-w-[250px]">
                                                    <p className="text-xs text-muted-foreground line-clamp-2">{role.description}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1.5 font-bold text-xs">
                                                        <Users className="h-3.5 w-3.5 text-blue-500" />
                                                        {role.usersCount}
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
                        </CardContent>
                    </Card>
                </div>

                {/* Permissions Preview */}
                <div className="space-y-4">
                    <Card className="shadow-lg border-2 border-primary/5 sticky top-4">
                        <CardHeader className="bg-slate-900 text-white rounded-t-lg">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
                                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Permissions View
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-4">Core Modules</p>
                                <div className="space-y-4">
                                    {permissionList.map((perm, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <span className="text-xs font-bold text-slate-700">{perm}</span>
                                            <div className={`h-5 w-5 rounded-full flex items-center justify-center ${i < 4 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                                {i < 4 ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 italic text-[11px] text-blue-700 leading-relaxed">
                                Tip: Select a role from the left to view and modify its specific permission sets. Admin roles have "Check-All" enabled by default.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
