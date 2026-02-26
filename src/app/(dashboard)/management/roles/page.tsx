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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    const [isAddRoleOpen, setIsAddRoleOpen] = useState(false)

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
                                <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="h-9 gap-2 bg-blue-600 hover:bg-blue-700 font-bold text-xs shadow-sm">
                                            <Plus className="h-4 w-4" /> Define New Role
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col max-h-[92vh]">
                                        <DialogHeader className="px-10 pt-10 pb-6 text-left">
                                            <div className="flex items-center gap-4 mb-2">
                                                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100/50">
                                                    <ShieldCheck className="h-5 w-5" />
                                                </div>
                                                <DialogTitle className="text-2xl font-black tracking-tight text-slate-800">Define New Role</DialogTitle>
                                            </div>
                                            <DialogDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-1">
                                                Configure access levels and permissions
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="px-10 pb-4 space-y-6 flex-1 overflow-y-auto">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Role Title</Label>
                                                <Input
                                                    placeholder="e.g. Regional Manager"
                                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/30 font-bold text-slate-700 px-4 focus-visible:ring-blue-500/20"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">Role Description</Label>
                                                <Textarea
                                                    placeholder="Describe the responsibilities of this role..."
                                                    className="min-h-[100px] rounded-xl border-slate-100 bg-white text-xs font-medium text-slate-600 px-4 pt-4 resize-none focus-visible:ring-blue-500/20"
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <Label className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full w-fit">
                                                    Default Access Scope
                                                </Label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {permissionList.slice(0, 4).map((p, i) => (
                                                        <div key={i} className="flex items-center gap-2 border border-slate-100 rounded-xl p-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                                                            <Checkbox id={`p-${i}`} checked={i === 0} className="rounded-lg border-slate-300" />
                                                            <label htmlFor={`p-${i}`} className="text-[10px] font-black uppercase text-slate-500 tracking-wider cursor-pointer group-hover:text-slate-800 transition-colors">{p}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <DialogFooter className="p-8 mt-2 flex flex-row items-center justify-end gap-3 px-10 border-t bg-slate-50/50">
                                            <Button
                                                variant="ghost"
                                                className="h-11 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                                onClick={() => setIsAddRoleOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all"
                                                onClick={() => setIsAddRoleOpen(false)}
                                            >
                                                Create Role
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
