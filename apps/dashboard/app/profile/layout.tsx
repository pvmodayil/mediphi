export default function ProfileLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}
