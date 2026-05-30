import React from 'react';
import Link from 'next/link';

interface MedicalEntry {
  id: string;
  date: string;
  type: string;
  description: string;
  source: string;
}

const placeholderData: MedicalEntry[] = [
  { id: '1', date: '2023-10-27', type: 'Examination', description: 'Annual physical examination. All vitals within normal range.', source: 'City General Hospital' },
  { id: '2', date: '2023-09-15', type: 'Consultation', description: 'Visited primary care physician for flu symptoms. Prescribed rest and fluids.', source: 'MediCare Clinic' },
  { id: '3', date: '2023-08-01', type: 'Lab Results', description: 'Blood test results reviewed. Cholesterol levels slightly elevated.', source: 'DiagnoLab' },
  { id: '4', date: '2023-06-20', type: 'Follow-up', description: 'Follow-up appointment after sprained ankle. Healing well.', source: 'City General Hospital' },
];

const typeIcons: Record<string, React.ReactNode> = {
  'Examination': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
      <path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Consultation': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Lab Results': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Follow-up': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const MedicalRecordsPage: React.FC = () => {
  const sortedData = [...placeholderData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="relative min-h-screen bg-ink">
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="records-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cream" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#records-grid)" />
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-8 py-6 border-b border-ink-lighter/30">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-sage/40 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage-light">
                <path d="M12 2L12 22M2 12L22 12M7 7L17 17M17 7L7 17" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-display text-lg tracking-tight text-cream">MediPhi</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/profile" className="text-sm text-stone hover:text-cream font-body transition-colors duration-300">
              Profile
            </Link>
            <Link href="/" className="text-sm text-stone hover:text-cream font-body transition-colors duration-300">
              Sign out
            </Link>
          </nav>
        </header>

        <div className="flex-1 px-8 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div>
                <p className="text-xs text-stone/60 font-body uppercase tracking-wider mb-2">Medical Records</p>
                <h1 className="font-display text-3xl text-cream tracking-tight">Your Health History</h1>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-sage/10 hover:bg-sage/20 border border-sage/30 text-cream text-sm font-body rounded-sm transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Upload
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                      <path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs text-stone/60 font-body uppercase tracking-wider">Total</span>
                </div>
                <div className="font-display text-2xl text-cream">{sortedData.length}</div>
                <div className="text-xs text-stone/60 font-body mt-1">records</div>
              </div>

              <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs text-stone/60 font-body uppercase tracking-wider">Labs</span>
                </div>
                <div className="font-display text-2xl text-cream">1</div>
                <div className="text-xs text-stone/60 font-body mt-1">results</div>
              </div>

              <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs text-stone/60 font-body uppercase tracking-wider">Sources</span>
                </div>
                <div className="font-display text-2xl text-cream">3</div>
                <div className="text-xs text-stone/60 font-body mt-1">hospitals</div>
              </div>

              <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-sm bg-sage/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs text-stone/60 font-body uppercase tracking-wider">Latest</span>
                </div>
                <div className="font-display text-2xl text-cream">Oct</div>
                <div className="text-xs text-stone/60 font-body mt-1">2023</div>
              </div>
            </div>

            <div className="bg-ink-light/40 backdrop-blur-sm border border-ink-lighter/50 rounded-sm overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="px-6 py-4 border-b border-ink-lighter/30">
                <span className="text-xs text-stone/60 font-body uppercase tracking-wider">Timeline</span>
              </div>

              <div className="divide-y divide-ink-lighter/30">
                {sortedData.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className="group px-6 py-5 hover:bg-ink/30 transition-colors duration-300 cursor-pointer"
                    style={{ animationDelay: `${0.4 + index * 0.1}s`, opacity: 0 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-sage/10 border border-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {typeIcons[entry.type] || typeIcons['Examination']}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm text-cream font-body font-medium">{entry.type}</h3>
                          <span className="text-xs text-stone/60 font-body">
                            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-sm text-stone font-body mb-2">{entry.description}</p>
                        <div className="flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40">
                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-xs text-stone/50 font-body">{entry.source}</span>
                        </div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-3">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MedicalRecordsPage;
