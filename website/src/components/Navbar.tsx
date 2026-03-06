import Link from "next/link";
import React from "react";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-5 w-full relative z-20">
            
            <div className="flex items-center gap-2">
                <Link href="/" className="text-dark text-xl font-bold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center">
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

            
            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-semibold text-gray-700">
                <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                <Link href="/guide" className="hover:text-brand transition-colors">Guide</Link>
            </div>

            
            <div>
                <Link
                    href="/#download"
                    className="bg-dark hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
                >
                    Get App
                </Link>
            </div>
        </nav>
    );
}
