"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Settings,
    LogOut,
    ChevronRight,
    Command,
    Calculator,
    Activity,
    Package,
    ShieldCheck,
    FileText,
    Gauge,
    Truck,
    Wallet,
    Calendar as CalendarIcon,
    Printer,
    FileClock,
    UserCircle,
    Boxes,
    Layers,
    Droplets,
    MonitorPlay,
    ExternalLink,
    CreditCard,
    ShoppingCart,
    Tag,
    BarChart3,
    FileSpreadsheet,
    Landmark,
    UserCog,
    Percent,
    ClipboardList,
    Users2,
    Cog
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"

const menuGroups = [
    {
        label: "Core",
        items: [
            { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        ]
    },
    {
        label: "CRM & Sales",
        items: [
            { title: "Customers", url: "/users", icon: Users },
            { title: "Quotations", url: "/estimator", icon: Calculator },
            { title: "Invoices", url: "/invoices", icon: FileText },
        ]
    },
    {
        label: "Production",
        items: [
            { title: "Production Jobs", url: "/jobs", icon: Activity },
            { title: "Scheduler", url: "/scheduler", icon: CalendarIcon },
            { title: "Daily Readings", url: "/daily-readings", icon: BookOpen },
            { title: "Machines", url: "/machines", icon: Gauge },
        ]
    },
    {
        label: "Inventory",
        items: [
            { title: "Paper Stocks", url: "/paper-stocks", icon: Layers },
            { title: "Ink Inventory", url: "/ink-inventory", icon: Droplets },
            { title: "Wide Format Media", url: "/wide-format", icon: MonitorPlay },
        ]
    },
    {
        label: "Outsource",
        items: [
            { title: "Vendors", url: "/outsource", icon: Users2 },
            { title: "Outsource Jobs", url: "/outsource", icon: ExternalLink },
        ]
    },
    {
        label: "Finance",
        items: [
            { title: "Expenses", url: "/finance/expenses", icon: CreditCard },
            { title: "Purchases", url: "/finance/purchases", icon: ShoppingCart },
            { title: "Expense Categories", url: "/finance/categories", icon: Tag },
        ]
    },
    {
        label: "Reports",
        items: [
            { title: "Reports", url: "/reports", icon: BarChart3 },
            { title: "Paper Usage Ledger", url: "/reports/ledger", icon: FileSpreadsheet },
            { title: "GST Reports", url: "/reports/gst", icon: Landmark },
        ]
    },
    {
        label: "Management",
        items: [
            { title: "Users", url: "/management/users", icon: Users },
            { title: "Roles", url: "/management/roles", icon: UserCog },
            { title: "Process Masters", url: "/management/processes", icon: Cog },
            { title: "Settings", url: "/settings", icon: Settings },
            { title: "Tax Slabs", url: "/management/tax", icon: Percent },
        ]
    }
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                                    D
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-bold text-lg tracking-tighter">DIGITAL ERP</span>
                                    <span className="truncate text-[10px] uppercase font-bold opacity-50">Management System</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {menuGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel className="text-[10px] font-bold uppercase opacity-60">
                            {group.label}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.url}
                                            tooltip={item.title}
                                        >
                                            <Link href={item.url}>
                                                <item.icon className="h-4 w-4" />
                                                <span className="font-medium">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="hover:bg-destructive/10 hover:text-destructive group">
                            <Link href="/login">
                                <LogOut className="h-4 w-4" />
                                <span className="font-medium">Logout Session</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
