import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cream" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-ink-lighter/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-sage/40 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage-light">
              <path d="M12 2L12 22M2 12L22 12M7 7L17 17M17 7L7 17" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-display text-lg tracking-tight text-cream">MediPhi</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-stone hover:text-cream font-body transition-colors duration-300">
            Sign in
          </Link>
          <Link href="/signup" className="text-sm px-4 py-2 bg-sage/10 hover:bg-sage/20 border border-sage/30 text-cream font-body rounded-sm transition-all duration-300">
            Get started
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-5xl w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage/10 border border-sage/20 rounded-sm mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse-slow" />
                <span className="text-xs text-sage-light font-body tracking-wide uppercase">Medical Identity Platform</span>
              </div>

              <h1 className="font-display text-5xl lg:text-6xl leading-[1.1] text-cream mb-6 tracking-tight">
                Your health data,
                <br />
                <span className="text-sage-light italic">truly yours.</span>
              </h1>

              <p className="text-stone text-base leading-relaxed max-w-md font-body mb-10">
                One identity. Every hospital. Instant access to your complete medical history — 
                no paperwork, no waiting, no fragmentation.
              </p>

              <div className="flex items-center gap-4">
                <Link
                  href="/signup"
                  className="group flex items-center gap-2 px-6 py-3 bg-sage hover:bg-sage-light text-cream font-body font-medium text-sm tracking-wide rounded-sm transition-all duration-300"
                >
                  Create your vault
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="text-sm text-stone hover:text-cream font-body transition-colors duration-300"
                >
                  Sign in instead
                </Link>
              </div>
            </div>

            <div className="animate-fade-in-right" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-8">
                <div className="mb-6 pb-6 border-b border-ink-lighter/40">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-stone/60 font-body uppercase tracking-wider">Your Vault</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-sage animate-pulse-slow" />
                      <span className="text-xs text-sage-light font-body">Active</span>
                    </div>
                  </div>
                  <div className="font-display text-3xl text-cream tracking-tight">MPH-482916</div>
                  <div className="text-sm text-stone/70 font-body mt-1">Your MediPhi ID</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-ink/50 rounded-sm border border-ink-lighter/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                          <path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-cream font-body">Lab Results</div>
                        <div className="text-xs text-stone/60 font-body">12 records</div>
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-ink/50 rounded-sm border border-ink-lighter/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-cream font-body">Hospitals</div>
                        <div className="text-xs text-stone/60 font-body">3 linked</div>
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-ink/50 rounded-sm border border-ink-lighter/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-cream font-body">Shared Access</div>
                        <div className="text-xs text-stone/60 font-body">2 active grants</div>
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 px-8 py-6 border-t border-ink-lighter/30">
        <div className="flex items-center justify-between text-xs text-stone/50 font-body">
          <div className="flex items-center gap-6">
            <span>Built on FHIR R4</span>
            <span>End-to-end encrypted</span>
          </div>
          <span>© 2026 MediPhi</span>
        </div>
      </footer>
    </main>
  );
}
