"use client"

import React, { useState } from "react"
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    User,
    Package,
    Activity,
    AlertCircle,
    CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const dates = Array.from({ length: 31 }, (_, i) => i + 1)

const scheduledJobs = [
    { date: 15, customer: "Global Corp", title: "Business Cards", status: "Printing", priority: "High" },
    { date: 16, customer: "Local Cafe", title: "Menu Printing", status: "Pre-Press", priority: "Medium" },
    { date: 18, customer: "Tech Events", title: "Banner Flex", status: "Pending", priority: "Low" },
    { date: 22, customer: "Supreme Traders", title: "Letterheads", status: "Done", priority: "Medium" },
]

export default function SchedulerPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-1">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Production Scheduler</h1>
                    <p className="text-muted-foreground font-medium">
                        Plan and coordinate machine floor activity for timely delivery.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-muted p-1 rounded-lg">
                        <Button variant="ghost" size="sm" className="h-8">Today</Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                        <span className="px-3 text-sm font-bold">February 2026</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                    <Button className="bg-primary">Create Event</Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3">
                    <Card className="shadow-sm">
                        <div className="grid grid-cols-7 border-b">
                            {days.map(day => (
                                <div key={day} className="py-2 text-center text-xs font-bold text-muted-foreground uppercase">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {dates.map((date) => {
                                const dayJobs = scheduledJobs.filter(j => j.date === date)
                                return (
                                    <div key={date} className="min-h-[120px] p-2 border-r border-b group hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-bold ${date === 15 ? 'h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center' : ''}`}>
                                                {date}
                                            </span>
                                            {dayJobs.length > 0 && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                                        </div>
                                        <div className="mt-2 space-y-1">
                                            {dayJobs.map((job, idx) => (
                                                <div key={idx} className={`p-1 rounded text-[10px] truncate font-bold ${job.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {job.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Machine Workload</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold">Konica C3070</span>
                                    <span>85%</span>
                                </div>
                                <Progress value={85} className="h-1.5" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold">Heidelberg GTO</span>
                                    <span>40%</span>
                                </div>
                                <Progress value={40} className="h-1.5" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold">Xerox Fleet</span>
                                    <span>92%</span>
                                </div>
                                <Progress value={92} className="h-1.5" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="text-sm">Upcoming Milestones</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 rounded-full bg-white mt-1.5" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold">JB-2026 delivery</p>
                                    <p className="text-[10px] opacity-80">Ganesh Prints • Feb 17</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 rounded-full bg-white mt-1.5 opacity-50" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold">Paper replenishment</p>
                                    <p className="text-[10px] opacity-80">Vendor Order • Feb 19</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
