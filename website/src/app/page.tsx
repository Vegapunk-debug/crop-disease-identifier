"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col pt-16 pb-24">


      <section className="px-6 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-8 md:mt-16 mb-20 relative z-10">

        {/* Background Decorative Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"></div>
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#00f374]/10 rounded-full blur-3xl opacity-40 pointer-events-none -z-10"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-[0_2px_10px_rgb(0,0,0,0.05)] text-brand text-xs sm:text-sm font-bold mb-8 border border-brand/20 hover:bg-white/80 transition-colors pointer-events-auto cursor-default">
          <div className="w-2 h-2 rounded-full bg-brand animate-pulse"></div>
          <span className="bg-gradient-to-r from-brand to-[#00f374] bg-clip-text text-transparent">AI-Powered Offline Diagnosis</span>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.03em] text-dark mb-6 leading-[1.05] drop-shadow-sm">
          Crop Disease <br />
          <span className="bg-gradient-to-r from-brand via-[#00f374] to-[#05b85d] bg-clip-text text-transparent relative">
            Identifier
            {/* Subtle glow behind the text */}
            <span className="absolute inset-0 bg-brand/20 blur-2xl -z-10"></span>
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-500/90 max-w-2xl mx-auto font-medium leading-relaxed">
          Protect your harvest with instant, offline AI diagnosis. <br className="hidden md:block" />
          Designed for precision in the field, wherever you are.
        </p>

      </section>


      <section className="px-6 w-full max-w-[800px] mx-auto z-20 mb-20 relative" id="download">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent rounded-[2.5rem] -z-10 blur-xl"></div>
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.06)] p-8 md:p-12 flex flex-col items-center relative overflow-hidden">

          {/* subtle inside glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/20 blur-3xl rounded-full pointer-events-none"></div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-dark mb-10 tracking-tight">Download for Desktop</h2>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center mb-8 relative z-10">

            <a
              href="https://drive.google.com/file/d/19We8w8nXSdusW9emK68kFhnpxyOYyCNR/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-5 bg-white border border-gray-100/80 text-dark px-8 py-6 rounded-2xl w-full md:w-80 hover:bg-[#121417] hover:border-[#121417] hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(28,208,101,0.2)] hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 w-2 h-2 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(28,208,101,0.8)]"></div>

              <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h7v7H4V4zm8 0h8v7h-8V4zM4 12h7v8H4v-8zm8 0h8v8h-8v-8z" />
                </svg>
              </div>
              <div className="flex flex-col items-start transition-colors duration-300">
                <span className="text-[11px] uppercase tracking-widest text-gray-400 group-hover:text-white/60 font-bold mb-1 transition-colors">Windows</span>
                <span className="font-extrabold text-lg leading-none group-hover:text-white">Download .exe</span>
              </div>
            </a>

            <a
              href="https://drive.google.com/file/d/15dxn7A2kynWSkLc0JaLG6fTLQpj_WxFI/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-5 bg-white border border-gray-100/80 text-dark px-8 py-6 rounded-2xl w-full md:w-80 hover:bg-[#121417] hover:border-[#121417] hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(28,208,101,0.2)] hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 w-2 h-2 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(28,208,101,0.8)]"></div>

              <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5l-5-5h3v-5h4v5h3l-5 5z" />
                </svg>
              </div>
              <div className="flex flex-col items-start transition-colors duration-300">
                <span className="text-[11px] uppercase tracking-widest text-gray-400 group-hover:text-white/60 font-bold mb-1 transition-colors">macOS</span>
                <span className="font-extrabold text-lg leading-none group-hover:text-white">Download .dmg</span>
              </div>
            </a>

          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50/80 rounded-full border border-gray-100/50">
            <span className="text-xs text-gray-500 font-semibold tracking-wide">
              Version 2.4.0 <span className="mx-2 text-gray-300">•</span> 100% Free & Open Source
            </span>
          </div>

        </div>
      </section>


      <section className="px-6 w-full max-w-[1000px] mx-auto mb-24 relative z-10 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand/30 via-[#00f374]/30 to-brand/30 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 -z-10"></div>
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] h-[350px] md:h-[550px] bg-gray-900 ring-1 ring-white/10 transition-transform duration-700 hover:scale-[1.01]">

          <div className="absolute inset-0 bg-gradient-to-tr from-dark/40 to-transparent z-10 pointer-events-none"></div>

          <Image
            src="/images/farming_showcase.png"
            alt="Farmer using tablet in field"
            fill
            className="object-cover z-0 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            unoptimized
          />


          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 bg-white/80 backdrop-blur-xl px-6 py-4 rounded-2xl flex items-center gap-4 shadow-[0_10px_30px_rgb(0,0,0,0.1)] border border-white/40 transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <div className="relative w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0 shadow-sm border border-brand/20">
              <div className="absolute inset-0 rounded-full bg-brand/20 animate-ping opacity-75"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-1">Live Status</div>
              <div className="text-base font-extrabold text-dark tracking-tight">Healthy Crop Detected</div>
            </div>
          </div>
        </div>
      </section>


      <section className="px-6 w-full max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8 relative z-10" id="features">


        <div className="group bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(28,208,101,0.08)] border border-gray-100/50 hover:border-brand/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-brand group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-10 border border-gray-100 group-hover:border-transparent group-hover:shadow-[0_8px_20px_rgba(28,208,101,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-dark group-hover:text-white transition-colors">
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-dark mb-4 tracking-tight">Offline First</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
              Diagnose diseases without internet. The AI model runs entirely on your local hardware, ensuring speed in remote fields.
            </p>
          </div>
        </div>


        <div className="group bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(28,208,101,0.08)] border border-brand/20 hover:border-brand/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 relative overflow-hidden text-center items-center">

          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-5 group-hover:opacity-10 group-hover:text-brand transition-all duration-500 pointer-events-none group-hover:scale-110">
            <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="15" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="15" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent opacity-100"></div>

          <div className="relative z-10 w-full text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand to-[#00f374] text-white flex items-center justify-center mb-10 shadow-[0_8px_20px_rgba(28,208,101,0.3)] group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                <rect x="9" y="9" width="6" height="6" rx="1"></rect>
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-dark mb-4 group-hover:text-brand transition-colors tracking-tight">SOTA Accuracy</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
              Powered by latest CNNs & Transformers, trained on 5M+ samples to provide lab-grade precision diagnostics.
            </p>
          </div>
        </div>


        <div className="group bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(28,208,101,0.08)] border border-gray-100/50 hover:border-brand/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-brand group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-10 border border-gray-100 group-hover:border-transparent group-hover:shadow-[0_8px_20px_rgba(28,208,101,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-dark group-hover:text-white transition-colors">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                <path d="M14 6h-4"></path>
                <path d="M14 10h-4"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-dark mb-4 tracking-tight">Built-in Guide</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
              Instant access to a comprehensive database of treatments and preventive measures alongside your diagnosis.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}
