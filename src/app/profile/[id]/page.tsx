// enable dynamic, since we're reading route params
export const dynamic = "force-dynamic";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  // params is now async, so await it
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl mt-3">
        Profile
        <span className="ml-4 p-2 rounded bg-orange-500 text-black">
          {id}
        </span>
      </p>
    </div>
  );
}
