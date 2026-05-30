import Link from "next/link";

export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-8 md:px-12 lg:px-20">
        <header className="flex items-center py-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2v10.892" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4.26 10.147L12 2l7.74 8.147" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-text-primary">MediPhi</span>
          </Link>
        </header>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 md:px-12 lg:px-20">
        <div className="w-full max-w-md animate-fade-in-scale" style={{ opacity: 0 }}>
          <div className="bg-surface rounded-3xl shadow-lg p-8 lg:p-10">
            {children}
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
