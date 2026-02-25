"use client"

import React from "react"
import Link from "next/link"
import { Command, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/shared/mode-toggle"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950 p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-400/10 blur-[120px] rounded-full" />
            </div>

            <div className="absolute top-6 right-6">
                <ModeToggle />
            </div>

            <div className="w-full max-w-[440px] space-y-6">
                <div className="flex flex-col items-center text-center space-y-2 mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-xl shadow-blue-500/20 ring-1 ring-white/20 mb-2">
                        <Command className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase">
                        Digital<span className="text-blue-600">ERP</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                        Enterprise Resource Planning & Management
                    </p>
                </div>

                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                    <CardHeader className="space-y-1 flex flex-col items-center pt-10 pb-2">
                        <CardTitle className="text-2xl font-bold tracking-tight">Login to Dashboard</CardTitle>
                        <CardDescription className="text-sm font-medium">
                            Authorized personnel access only
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5 px-10 pb-10 pt-6">
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1 group-focus-within:text-blue-500 transition-colors">
                                Professional ID
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="admin@digitalerp.com"
                                    className="h-12 pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <div className="flex items-center justify-between pl-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest group-focus-within:text-indigo-500 transition-colors">
                                    Access Password
                                </label>
                                <Link href="#" className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 tracking-widest transition-colors">
                                    Reset?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="h-12 pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl font-medium transition-all"
                                />
                            </div>
                        </div>

                        <Button asChild className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/20 group border-0 mt-2">
                            <Link href="/dashboard" className="flex items-center justify-center gap-2">
                                Launch System
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </CardContent>

                    <CardFooter className="flex flex-col items-center pb-8 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 py-6 text-center">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            <ShieldCheck className="h-3 w-3 text-emerald-500" /> Secure Terminal Session
                        </div>
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-slate-400 font-medium">
                    New user? <Link href="#" className="text-blue-600 font-black hover:underline uppercase tracking-tighter">Request Credentials</Link>
                </p>

                <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-[0.2em] opacity-50 pt-4">
                    Managed by DigitalERP Cloud Infrastructure
                </p>
            </div>
        </div>
    )
}
