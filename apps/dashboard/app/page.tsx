import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-8 px-6 md:px-12 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 2v10.892" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4.26 10.147L12 2l7.74 8.147" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-semibold text-lg text-text-primary">MediPhi</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 whitespace-nowrap">
            Sign in
          </Link>
          <Link href="/signup" className="text-sm px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200 shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/25 whitespace-nowrap">
            Get started
          </Link>
        </nav>
      </header>

      <div className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center py-12 px-6 md:px-12 lg:px-16">
          <div className="flex-1 animate-fade-in-left" style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm text-accent font-medium">Your medical identity, simplified</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-[1.08] mb-6 tracking-tight">
              Your health records,{" "}
              <span className="text-accent">always with you.</span>
            </h1>

            <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-md">
              One identity across every hospital. Walk in, scan your QR code, and your entire medical history is instantly available.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 min-w-0">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/25"
              >
                Create your vault
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center whitespace-nowrap px-6 py-3.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full animate-fade-in-right" style={{ opacity: 0 }}>
            <div className="bg-surface rounded-3xl shadow-lg p-8 overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <div>
                  <div className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Your Vault</div>
                  <div className="text-2xl font-bold text-text-primary tracking-tight">MPH-482916</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3.5 bg-warm-bg rounded-xl hover:bg-accent-light/50 transition-colors duration-200 cursor-pointer overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                      <path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-primary">Lab Results</div>
                    <div className="text-xs text-text-secondary">12 records</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary/40 flex-shrink-0">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-warm-bg rounded-xl hover:bg-accent-light/50 transition-colors duration-200 cursor-pointer overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-primary">Hospitals</div>
                    <div className="text-xs text-text-secondary">3 linked</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary/40 flex-shrink-0">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-warm-bg rounded-xl hover:bg-accent-light/50 transition-colors duration-200 cursor-pointer overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-primary">Shared Access</div>
                    <div className="text-xs text-text-secondary">2 active grants</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary/40 flex-shrink-0">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto w-full flex items-center justify-between text-sm text-text-secondary py-8 border-t border-border px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-6">
          <span>Built on FHIR R4</span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-sage" />
            End-to-end encrypted
          </span>
        </div>
        <span>&copy; 2026 MediPhi</span>
      </footer>
    </main>
  );
}
