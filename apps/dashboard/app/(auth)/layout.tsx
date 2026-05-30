import Link from "next/link";

export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-ink">
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="auth-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cream" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-grid)" />
        </svg>
      </div>

      <header className="relative z-10 flex items-center px-8 py-6 border-b border-ink-lighter/30">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-sage/40 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage-light">
              <path d="M12 2L12 22M2 12L22 12M7 7L17 17M17 7L7 17" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-display text-lg tracking-tight text-cream">MediPhi</span>
        </Link>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-12">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-sage/[0.03] rounded-full blur-[120px]" />

        <div className="relative w-full max-w-md animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-8">
            {children}
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-stone/50 hover:text-cream text-sm font-body transition-colors duration-300 group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:-translate-x-1">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
