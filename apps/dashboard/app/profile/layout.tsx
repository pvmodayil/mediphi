export default function ProfileLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-ink">
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="profile-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cream" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#profile-grid)" />
        </svg>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}
