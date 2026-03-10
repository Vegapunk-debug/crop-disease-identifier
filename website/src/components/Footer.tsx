import React from "react";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-100/50 py-8 text-sm text-gray-500 font-medium bg-white/30 backdrop-blur-xl relative z-20 overflow-hidden">
            {/* Subtle glow at the bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand/5 blur-[100px] pointer-events-none -z-10 rounded-full"></div>

            <div className="max-w-[1200px] mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-[#00f374] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(28,208,101,0.3)] hover:scale-105 transition-transform duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.96.3 1.34.3C17.4 20 20 12 20 0C20 0 17.5 7 17 8z" />
                        </svg>
                    </div>
                    <span className="text-dark font-extrabold text-lg tracking-tight">CropID</span>
                </div>

                <div className="text-sm border-t border-gray-100/50 md:border-none pt-4 md:pt-0 w-full md:w-auto text-center md:text-left text-gray-400">
                    © {new Date().getFullYear()} Crop Disease Identifier Inc. All rights reserved.
                </div>

                <div className="flex items-center gap-5">
                    <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100/80 flex items-center justify-center text-gray-400 hover:text-dark hover:border-gray-300 hover:shadow-sm transition-all duration-300 group" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M15 22v-4a4.8 4.8 4.8 0 0 0-1-3.02c3.18-.3 6.5-1.5 6.5-7.a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.5 3.3 6.7 6.5 7.02a4.8 4.8 0 0 0-1 3.02v4" /><path d="M9 20c-4 1-5-2-5-2" /></svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
