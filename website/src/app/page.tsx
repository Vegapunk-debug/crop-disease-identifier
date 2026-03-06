"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col pt-16 pb-24">

      
      <section className="px-6 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-12 mb-16 relative z-10">

        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold mb-8 border border-brand/20">
          <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
          AI-Powered Offline Diagnosis
        </div>

        
        <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-dark mb-6 leading-[1.1]">
          Crop Disease <br />
          <span className="text-brand">Identifier</span>
        </h1>

        
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          Protect your harvest with instant, offline AI diagnosis. <br className="hidden md:block" />
          Designed for precision in the field, wherever you are.
        </p>

      </section>

      
      <section className="px-6 w-full max-w-[800px] mx-auto z-20 mb-20" id="download">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-2xl shadow-gray-200/50 p-8 md:p-10 flex flex-col items-center">

          <h2 className="text-xl font-bold text-dark mb-8">Download for Desktop</h2>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center mb-6">

            <a
              href="https://drive.google.com/file/d/19We8w8nXSdusW9emK68kFhnpxyOYyCNR/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-4 bg-white border border-gray-200 text-dark px-8 py-5 rounded-xl w-full md:w-72 hover:bg-[#121417] hover:border-transparent hover:text-white transition-all shadow-sm hover:shadow-lg"
            >
              
              <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="text-gray-600 group-hover:text-white/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h7v7H4V4zm8 0h8v7h-8V4zM4 12h7v8H4v-8zm8 0h8v8h-8v-8z" />
                </svg>
              </div>
              <div className="flex flex-col items-start transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-white/50 font-bold mb-0.5 transition-colors">Windows</span>
                <span className="font-bold text-base leading-none">Download .exe</span>
              </div>
            </a>

            <a
              href="https://drive.google.com/file/d/15dxn7A2kynWSkLc0JaLG6fTLQpj_WxFI/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-4 bg-white border border-gray-200 text-dark px-8 py-5 rounded-xl w-full md:w-72 hover:bg-[#121417] hover:border-transparent hover:text-white transition-all shadow-sm hover:shadow-lg"
            >
              
              <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="text-gray-600 group-hover:text-white/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5l-5-5h3v-5h4v5h3l-5 5z" />
                </svg>
              </div>
              <div className="flex flex-col items-start transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-white/50 font-bold mb-0.5 transition-colors">macOS</span>
                <span className="font-bold text-base leading-none">Download .dmg</span>
              </div>
            </a>

          </div>

          <p className="text-xs text-gray-400 font-medium tracking-wide">
            Current Version 2.4.0 • 100% Free & Open Source
          </p>

        </div>
      </section>

      
      <section className="px-6 w-full max-w-[1000px] mx-auto mb-24 relative z-10">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[300px] md:h-[500px] bg-gray-200 ring-1 ring-gray-900/5">

          <Image
            src="/images/farming_showcase.png"
            alt="Farmer using tablet in field"
            fill
            className="object-cover z-10 opacity-90"
            unoptimized
          />

          
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl border border-white/20">
            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0 shadow-sm border border-brand/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">Status</div>
              <div className="text-sm font-bold text-dark">Healthy Crop Detected</div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="px-6 w-full max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6 relative z-10" id="features">

        
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-200/40 border border-gray-50 flex flex-col justify-between hover:shadow-2xl transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-10 border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Offline First</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Diagnose diseases without internet. The AI model runs entirely on your local hardware, ensuring speed in remote fields.
            </p>
          </div>
        </div>

        
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-200/40 border border-gray-50 flex flex-col justify-between relative overflow-hidden hover:shadow-2xl transition-shadow text-center items-center">
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="15" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="15" />
            </svg>
          </div>
          <div className="relative z-10 w-full text-left">
            <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-10 border border-brand/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                <rect x="9" y="9" width="6" height="6" rx="1"></rect>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-brand transition-colors">SOTA Accuracy</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Powered by latest CNNs & Transformers, trained on 5M+ samples to provide lab-grade precision diagnostics.
            </p>
          </div>
        </div>

        
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-200/40 border border-gray-50 flex flex-col justify-between hover:shadow-2xl transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-10 border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                <path d="M14 6h-4"></path>
                <path d="M14 10h-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Built-in Guide</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Instant access to a comprehensive database of treatments and preventive measures alongside your diagnosis.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}
