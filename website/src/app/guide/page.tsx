import Link from "next/link";
import React from "react";

export default function GuidePage() {
  return (
    <div className="w-full flex-1 flex flex-col pb-32">

      
      <section className="px-6 pt-24 pb-16 w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="text-[10px] font-bold text-brand tracking-[0.2em] uppercase mb-4">
          Documentation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-dark mb-6">
          Getting Started Guide
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto font-medium">
          Everything you need to know to set up the Crop Disease Identifier.
          From installation to your very first diagnosis.
        </p>
      </section>

      
      <section className="px-6 w-full max-w-[900px] mx-auto mb-20 relative z-10 hidden md:flex items-start justify-between">
        
        <div className="absolute top-7 left-14 right-14 h-px bg-gray-200 -z-10"></div>

        
        <div className="flex flex-col items-center bg-transparent">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-brand flex items-center justify-center text-brand mb-4 shadow-sm shadow-brand/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          <div className="font-bold text-dark text-sm mb-1">1. Download</div>
          <div className="text-xs text-gray-400 font-medium">Installer for Mac/PC</div>
        </div>

        
        <div className="flex flex-col items-center bg-transparent">
          <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div className="font-bold text-dark text-sm mb-1">2. Install</div>
          <div className="text-xs text-gray-400 font-medium">Run Setup Wizard</div>
        </div>

        
        <div className="flex flex-col items-center bg-transparent">
          <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <div className="font-bold text-dark text-sm mb-1">3. Scan</div>
          <div className="text-xs text-gray-400 font-medium">Upload Photo</div>
        </div>

        
        <div className="flex flex-col items-center bg-transparent">
          <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div className="font-bold text-dark text-sm mb-1">4. Results</div>
          <div className="text-xs text-gray-400 font-medium">Diagnosis Plan</div>
        </div>
      </section>

      
      <section className="px-6 w-full max-w-[900px] mx-auto flex flex-col gap-8 relative z-10">

        
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/30 border border-gray-50 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold">1</div>
              <h3 className="text-xl font-bold text-dark">Download Installer</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium pb-2">
              Begin by downloading the installer package suitable for your operating system. We support both Windows (10/11) and macOS (Catalina and newer).
            </p>
            <div className="flex gap-2 text-xs font-semibold">
              <a href="https://drive.google.com/file/d/19We8w8nXSdusW9emK68kFhnpxyOYyCNR/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-dark px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h7v7H4V4zm8 0h8v7h-8V4zM4 12h7v8H4v-8zm8 0h8v8h-8v-8z" />
                </svg>
                Download for Windows
              </a>
              <a href="https://drive.google.com/file/d/15dxn7A2kynWSkLc0JaLG6fTLQpj_WxFI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-dark px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5l-5-5h3v-5h4v5h3l-5 5z" />
                </svg>
                Download for Mac
              </a>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-50 rounded-2xl h-48 sm:h-64 md:h-80 border border-gray-100 flexitems-center justify-center relative overflow-hidden">
            <img
              src="/images/guide_step1_download.png"
              alt="Download Step Illustration"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>

        
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/30 border border-gray-50 flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold">2</div>
              <h3 className="text-xl font-bold text-dark">Run Setup</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Locate the downloaded file and double-click to launch the setup wizard. Follow the on-screen prompts to complete installation.
            </p>
            <div className="bg-brand/10 border border-brand/20 rounded-xl p-4 mt-4 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <div>
                <div className="text-xs font-bold text-dark mb-1">Offline Capable</div>
                <div className="text-[11px] text-gray-500 font-medium">Once installed, no internet connection is required for diagnosis.</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-gray-50 rounded-2xl h-48 sm:h-64 md:h-80 border border-gray-100 flex items-center justify-center relative overflow-hidden">
            <img
              src="/images/guide_step2_install.png"
              alt="Install Step Illustration"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>

        
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/30 border border-gray-50 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold">3</div>
              <h3 className="text-xl font-bold text-dark">Upload Image</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Open the application. On the main dashboard, click the large &apos;Scan&apos; button. You can either upload an existing photo or use a connected webcam to capture the leaf.
            </p>
            <ul className="space-y-2 mt-4 text-xs font-semibold text-gray-500">
              <li className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-brand text-white flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Ensure the leaf is well-lit.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-brand text-white flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Focus on the affected area.
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-gray-50 rounded-2xl h-48 sm:h-64 md:h-80 border border-gray-100 flex items-center justify-center relative overflow-hidden">
            <img
              src="/images/guide_step3_upload.png"
              alt="Upload Image Step Illustration"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>

        
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/30 border border-gray-50 flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold">4</div>
              <h3 className="text-xl font-bold text-dark">View Results</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Within seconds, the AI model will analyze the leaf texture and discoloration. You will receive a detailed report including:
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                <div className="text-[9px] uppercase font-bold text-red-500 tracking-wider mb-1">Problem</div>
                <div className="text-xs font-bold text-dark">Bacterial Blight</div>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
                <div className="text-[9px] uppercase font-bold text-orange-500 tracking-wider mb-1">Severity</div>
                <div className="text-xs font-bold text-dark">High (87%)</div>
              </div>
            </div>
            <div className="bg-brand-light border border-brand/20 rounded-xl p-3">
              <div className="text-[9px] uppercase font-bold text-brand tracking-wider mb-1">Recommended Treatment</div>
              <div className="text-xs font-bold text-dark">Apply copper-based fungicide spray immediately.</div>
            </div>

          </div>
          <div className="flex-1 w-full bg-gray-50 rounded-2xl h-48 sm:h-64 md:h-80 border border-gray-100 flex items-center justify-center relative overflow-hidden">
            <img
              src="/images/guide_step4_results.png"
              alt="View Results Step Illustration"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>

      </section>

      
      <section className="px-6 py-32 mt-12 w-full text-center relative z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dark mb-4">
          Ready to protect your crops?
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl mx-auto mb-10">
          Download the latest version now and start diagnosing offline. It&apos;s free for individual farmers.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/#download" className="bg-brand text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-hover transition-colors shadow-sm">
            Download Now
          </Link>
        </div>
      </section>

    </div>
  );
}
