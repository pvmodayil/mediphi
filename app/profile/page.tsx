import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <main>
      <h1>Profile Page</h1>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Welcome to your profile!</p>
      <Link href="./signout">Log out</Link>
    </main>
  );
}