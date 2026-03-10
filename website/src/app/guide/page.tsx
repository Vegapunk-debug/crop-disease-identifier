import Link from "next/link";
import React from "react";

export default function GuidePage() {
  return (
    <div className="w-full flex-1 flex flex-col pb-32">

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-16 w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"></div>
        <div className="text-[11px] font-extrabold text-brand tracking-[0.25em] uppercase mb-6 bg-brand/10 px-4 py-1.5 rounded-full border border-brand/20">
          Documentation
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-dark mb-6 drop-shadow-sm">
          Getting Started <span className="bg-gradient-to-r from-brand to-[#00f374] bg-clip-text text-transparent">Guide</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto font-medium leading-relaxed">
          Everything you need to know to set up the Crop Disease Identifier.
          From installation to your very first diagnosis.
        </p>
      </section>

      {/* Progress Steps Overview */}
      <section className="px-6 w-full max-w-[900px] mx-auto mb-20 relative z-10 hidden md:flex items-start justify-between">
        <div className="absolute top-7 left-14 right-14 h-[2px] bg-gradient-to-r from-brand/10 via-brand/40 to-brand/10 -z-10 rounded-full"></div>

        {[
          { icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></>, title: "1. Download", desc: "Installer for Mac/PC", active: true },
          { icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></>, title: "2. Install", desc: "Run Setup Wizard", active: false },
          { icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></>, title: "3. Scan", desc: "Upload Photo", active: false },
          { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>, title: "4. Results", desc: "Diagnosis Plan", active: false }
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center bg-transparent group cursor-default">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgb(0,0,0,0.05)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_25px_rgba(28,208,101,0.2)] ${step.active ? 'bg-gradient-to-tr from-brand to-[#00f374] text-white border-0' : 'bg-white border border-gray-100 text-gray-400 group-hover:text-brand group-hover:border-brand/30'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {step.icon}
              </svg>
            </div>
            <div className={`font-extrabold text-sm mb-1 transition-colors ${step.active ? 'text-dark' : 'text-gray-500 group-hover:text-dark'}`}>{step.title}</div>
            <div className="text-xs text-gray-400 font-medium">{step.desc}</div>
          </div>
        ))}
      </section>

      {/* Guide Steps detail */}
      <section className="px-6 w-full max-w-[900px] mx-auto flex flex-col gap-10 relative z-10">

        {/* Step 1 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/60 flex flex-col md:flex-row gap-10 items-center overflow-hidden relative group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex-1 space-y-4 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-[#00f374] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-brand/20">1</div>
              <h3 className="text-2xl font-extrabold text-dark tracking-tight">Download Installer</h3>
            </div>
            <p className="text-gray-500 text-base leading-relaxed font-medium pb-2">
              Begin by downloading the installer package suitable for your operating system. We support both Windows (10/11) and macOS (Catalina and newer).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 text-sm font-semibold">
              <a href="https://drive.google.com/file/d/19We8w8nXSdusW9emK68kFhnpxyOYyCNR/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 text-dark px-4 py-3 rounded-xl flex items-center justify-center relative overflow-hidden group/btn hover:border-[#121417] hover:text-white hover:bg-[#121417] transition-all duration-300 shadow-sm flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M4 4h7v7H4V4zm8 0h8v7h-8V4zM4 12h7v8H4v-8zm8 0h8v8h-8v-8z" />
                </svg>
                <span className="relative z-10">For Windows</span>
              </a>
              <a href="https://drive.google.com/file/d/15dxn7A2kynWSkLc0JaLG6fTLQpj_WxFI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 text-dark px-4 py-3 rounded-xl flex items-center justify-center relative overflow-hidden group/btn hover:border-[#121417] hover:text-white hover:bg-[#121417] transition-all duration-300 shadow-sm flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5l-5-5h3v-5h4v5h3l-5 5z" />
                </svg>
                <span className="relative z-10">For Mac</span>
              </a>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-100/50 rounded-3xl h-56 sm:h-72 border border-gray-100/80 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 bg-brand/5"></div>
            <img
              src="/images/guide_step1_download.png"
              alt="Download Step Illustration"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/60 flex flex-col md:flex-row-reverse gap-10 items-center overflow-hidden relative group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-bl from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex-1 space-y-4 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-dark text-white flex items-center justify-center text-sm font-bold shadow-md">2</div>
              <h3 className="text-2xl font-extrabold text-dark tracking-tight">Run Setup</h3>
            </div>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              Locate the downloaded file and double-click to launch the setup wizard. Follow the on-screen prompts to complete installation.
            </p>
            <div className="bg-gradient-to-r from-brand/10 to-[#00f374]/10 border border-brand/20 rounded-2xl p-5 mt-6 flex items-start gap-4 shadow-inner">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <div className="text-sm font-extrabold text-dark mb-1 tracking-tight">Offline Capable</div>
                <div className="text-xs text-gray-500 font-medium leading-relaxed">Once installed, no internet connection is required for diagnosis. Updates happen entirely in the background.</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-100/50 rounded-3xl h-56 sm:h-72 border border-gray-100/80 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 bg-dark/5"></div>
            <img
              src="/images/guide_step2_install.png"
              alt="Install Step Illustration"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/60 flex flex-col md:flex-row gap-10 items-center overflow-hidden relative group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex-1 space-y-4 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-dark text-white flex items-center justify-center text-sm font-bold shadow-md">3</div>
              <h3 className="text-2xl font-extrabold text-dark tracking-tight">Upload Image</h3>
            </div>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              Open the application. On the main dashboard, click the large &apos;Scan&apos; button. You can either upload an existing photo or use a connected webcam to capture the leaf.
            </p>
            <ul className="space-y-3 mt-6 text-sm font-semibold text-gray-500">
              <li className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                <div className="w-5 h-5 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Ensure the leaf is well-lit.
              </li>
              <li className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                <div className="w-5 h-5 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Focus tightly on the affected area.
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-gray-100/50 rounded-3xl h-56 sm:h-72 border border-gray-100/80 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
            <img
              src="/images/guide_step3_upload.png"
              alt="Upload Image Step Illustration"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-brand/20 flex flex-col md:flex-row-reverse gap-10 items-center overflow-hidden relative group hover:shadow-[0_20px_40px_rgba(28,208,101,0.15)] transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-100"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand/20 blur-[80px] rounded-full"></div>

          <div className="flex-1 space-y-4 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-[#00f374] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-brand/20">4</div>
              <h3 className="text-2xl font-extrabold text-dark tracking-tight leading-none group-hover:text-brand transition-colors">View Results</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed font-medium">
              Within seconds, the AI model will analyze the leaf texture and discoloration. You will receive a detailed report including:
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] uppercase font-extrabold text-red-500 tracking-[0.15em] mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Problem
                </div>
                <div className="text-sm font-extrabold text-dark">Bacterial Blight</div>
              </div>
              <div className="bg-orange-50/80 backdrop-blur-sm border border-orange-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] uppercase font-extrabold text-orange-500 tracking-[0.15em] mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Severity
                </div>
                <div className="text-sm font-extrabold text-dark">High (87%)</div>
              </div>
            </div>
            <div className="bg-brand/5 backdrop-blur-sm border border-brand/20 rounded-2xl p-4 mt-3 shadow-sm shadow-brand/5">
              <div className="text-[10px] uppercase font-extrabold text-brand tracking-[0.15em] mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span> Recommended Treatment
              </div>
              <div className="text-sm font-bold text-dark leading-relaxed">Apply copper-based fungicide spray immediately to prevent further spreading.</div>
            </div>

          </div>
          <div className="flex-1 w-full bg-gray-50/50 rounded-3xl h-56 sm:h-72 border border-brand/20 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-inner">
            <div className="absolute inset-0 bg-brand/5 mix-blend-overlay"></div>
            <img
              src="/images/guide_step4_results.png"
              alt="View Results Step Illustration"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 mt-16 w-full text-center relative z-10 flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/5 blur-[120px] pointer-events-none -z-10 rounded-[100%]"></div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-dark mb-6 drop-shadow-sm">
          Ready to protect your crops?
        </h2>
        <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto mb-12">
          Download the latest version now and start diagnosing offline. It&apos;s 100% free for individual farmers.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/#download" className="bg-gradient-to-r from-dark to-gray-800 text-white px-10 py-4 rounded-full font-bold hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 transition-all duration-300 text-lg group">
            <span className="flex items-center gap-2">
              Download App
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}
