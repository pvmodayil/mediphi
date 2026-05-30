export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className = "min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-cyan-500 flex items-center justify-center p-5">
      <div className="bg-amber-50 backdrop-blur-lg rounded-3xl shadow-2xl p-20 w-full max-w-md text-center border border-white/20 animate-fade-in-up">
       {children}
      </div>
    </div>
  );
}