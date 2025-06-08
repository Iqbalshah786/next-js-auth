import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div className="text-center text-2xl text-white flex gap-4">
        <Link href="/login">login</Link>
        OR
        <Link href="/signup">signup</Link>
      </div>
    </div>
  );
}
