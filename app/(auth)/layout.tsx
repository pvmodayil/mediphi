export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className = "min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-cyan-500 flex items-center justify-center p-5">
      {children}
    </div>
  );
}