export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl mt-3">
        Profile
        <span className="ml-4 p-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
