import React from "react";

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 py-6 text-sm text-gray-500 font-medium bg-white/50 backdrop-blur-md relative z-20">
            <div className="max-w-[1400px] mx-auto px-8 w-full flex flex-col md:flex-row items-center justify-between">

                
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <div className="w-6 h-6 rounded bg-brand text-white flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.96.3 1.34.3C17.4 20 20 12 20 0C20 0 17.5 7 17 8z" />
                        </svg>
                    </div>
                    <span className="text-dark font-bold text-base">CropID</span>
                </div>

                
                <div className="text-xs text-center border-t border-gray-100 md:border-none pt-4 md:pt-0">
                    © 2026 Crop Disease Identifier Inc.
                </div>

                
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-brand transition-colors text-gray-400" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 4.8 0 0 0-1-3.02c3.18-.3 6.5-1.5 6.5-7.a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.5 3.3 6.7 6.5 7.02a4.8 4.8 0 0 0-1 3.02v4" /><path d="M9 20c-4 1-5-2-5-2" /></svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
