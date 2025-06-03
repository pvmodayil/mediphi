import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-cyan-500">
      <div className="bg-amber-50 rounded-xl shadow-lg p-10 max-w-md w-full text-center">
        
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/30">
                Med
        </div>   
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">
          Welcome to MediPhi
        </h1>
        <p className="text-gray-600 mb-8">
          Your trusted platform for modern healthcare solutions. Sign in or
          register to get started!
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            className="bg-green-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-white border border-emrald-600 text-green-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
