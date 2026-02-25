"use client"

import React, { useState } from "react"
import {
    MoreHorizontal,
    Plus,
    Search,
    Filter,
    Download,
    Trash2,
    Edit2,
    ShieldCheck,
    Lock,
    UserPlus,
    Mail,
    Phone,
    Shield,
    ChevronDown
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const staffMembers = [
    { id: "U-001", name: "Rajesh Kumar", email: "rajesh@digitalerp.com", role: "Administrator", status: "Active", lastActive: "Now", avatar: "" },
    { id: "U-002", name: "Sunil Verma", email: "sunil@digitalerp.com", role: "Operator", status: "Active", lastActive: "15m ago", avatar: "" },
    { id: "U-003", name: "Anjali Singh", email: "anjali@digitalerp.com", role: "Designer", status: "Active", lastActive: "2h ago", avatar: "" },
    { id: "U-004", name: "Vikas Shah", email: "vikas@digitalerp.com", role: "Operator", status: "Inactive", lastActive: "4d ago", avatar: "" },
    { id: "U-005", name: "Meera Iyer", email: "meera@digitalerp.com", role: "Accountant", status: "Active", lastActive: "1h ago", avatar: "" },
]

export default function ManagementUsersPage() {
    const [search, setSearch] = useState("")

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            </div>

            <Card className="shadow-sm border-none bg-background">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Shield className="h-4 w-4" />
                            <CardTitle className="text-sm font-medium">Platform Access Control</CardTitle>
                        </div>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold h-9 text-xs shadow-sm">
                            <UserPlus className="h-4 w-4" /> Add New User
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2 h-9">
                                <Download className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3" />
                            </Button>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email or role..."
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
                                    <TableHead className="font-bold">Member</TableHead>
                                    <TableHead className="font-bold">Role</TableHead>
                                    <TableHead className="font-bold">Contact</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="font-bold text-center">Last Active</TableHead>
                                    <TableHead className="text-right font-bold w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {staffMembers.map(user => (
                                    <TableRow key={user.id} className="group">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                                                    <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xs">{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="py-2">
                                                    <p className="font-bold text-sm text-slate-800 line-clamp-1">{user.name}</p>
                                                    <p className="text-[10px] text-muted-foreground font-mono">{user.id}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-bold text-[10px] uppercase h-5">
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Mail className="h-3 w-3" /> {user.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                                <span className="text-xs font-semibold">{user.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center text-[10px] font-bold text-muted-foreground">
                                            {user.lastActive}
                                        </TableCell>
                                        <TableCell className="text-right py-2">
                                            <div className="flex items-center justify-end gap-1 px-1">
                                                <Button size="icon" variant="outline" className="h-7 w-7 border-slate-200">
                                                    <Edit2 className="h-3.5 w-3.5" />
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
    )
}


