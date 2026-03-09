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
        <nav className="flex items-center justify-between px-8 py-4 w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
            <div className="flex items-center gap-2">
                <Link href="/" className="text-dark text-xl font-bold flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.96.3 1.34.3C17.4 20 20 12 20 0C20 0 17.5 7 17 8z" />
                        </svg>
                    </div>
                    <span>CropID</span>
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-semibold">
                <Link
                    href="/"
                    className={`transition-colors relative ${isActive("/") ? "text-brand" : "text-gray-600 hover:text-brand"}`}
                >
                    Home
                </Link>
                <Link
                    href="/guide"
                    className={`transition-colors relative ${isActive("/guide") ? "text-brand" : "text-gray-600 hover:text-brand"}`}
                >
                    Guide
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="/#download"
                    className="hidden md:inline-flex bg-dark hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                    Get App
                </Link>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="md:hidden p-2 text-gray-700 hover:text-brand transition-colors focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
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
                <div className="absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-100 flex flex-col md:hidden py-4 px-8 mt-px z-40">
                    <Link
                        href="/"
                        className={`py-3 font-semibold ${isActive("/") ? "text-brand" : "text-gray-700"}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/guide"
                        className={`py-3 font-semibold ${isActive("/guide") ? "text-brand" : "text-gray-700"}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Guide
                    </Link>
                    <Link
                        href="/#download"
                        className="mt-4 bg-brand text-white px-5 py-3 rounded-xl text-center font-semibold shadow-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get App Free
                    </Link>
                </div>
            )}
        </nav>
    );
}
