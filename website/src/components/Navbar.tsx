"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper to check if a link is active
    const isActive = (href: string) => pathname === href;

    return (
        <div className="w-full px-4 sm:px-6 sticky top-4 z-50 flex justify-center pointer-events-none">
            <nav className="flex items-center justify-between px-6 py-3 w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgb(0,0,0,0.08)] rounded-full transition-all pointer-events-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-dark text-xl font-bold flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-[#00f374] text-white flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(28,208,101,0.5)] transition-all duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.96.3 1.34.3C17.4 20 20 12 20 0C20 0 17.5 7 17 8z" />
                            </svg>
                        </div>
                        <span className="tracking-tight">CropID</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-semibold">
                    <Link
                        href="/"
                        className={`transition-colors relative py-1 ${isActive("/") ? "text-brand" : "text-gray-500 hover:text-dark"}`}
                    >
                        Home
                        {isActive("/") && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand rounded-full rounded-t-none" />
                        )}
                    </Link>
                    <Link
                        href="/guide"
                        className={`transition-colors relative py-1 ${isActive("/guide") ? "text-brand" : "text-gray-500 hover:text-dark"}`}
                    >
                        Guide
                        {isActive("/guide") && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand rounded-full rounded-t-none" />
                        )}
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/#download"
                        className="hidden md:inline-flex bg-dark hover:bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:scale-95 duration-200"
                    >
                        Get App
                    </Link>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="md:hidden p-2 text-gray-700 hover:text-brand transition-colors focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 flex flex-col md:hidden py-4 px-6 z-40 origin-top overflow-hidden">
                        <Link
                            href="/"
                            className={`py-3 font-semibold transition-colors ${isActive("/") ? "text-brand" : "text-gray-600 active:bg-gray-50 rounded-lg px-2"}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/guide"
                            className={`py-3 font-semibold transition-colors ${isActive("/guide") ? "text-brand" : "text-gray-600 active:bg-gray-50 rounded-lg px-2"}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Guide
                        </Link>
                        <Link
                            href="/#download"
                            className="mt-4 bg-gradient-to-r from-brand to-[#00f374] text-white px-5 py-3 rounded-xl text-center font-semibold shadow-[0_4px_14px_0_rgba(28,208,101,0.39)] active:scale-95 transition-transform"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Get App Free
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

