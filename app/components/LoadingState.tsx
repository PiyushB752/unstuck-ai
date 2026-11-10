export default function LoadingState() {
  return (
    <div className="mt-8 rounded-2xl border border-[#E3E7DE] bg-white p-8 text-center">
      <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#DDE2D7] border-t-[#68785F]" />
      <p className="mt-4 text-sm text-gray-500">
        Let's make sense of things...
      </p>
    </div>
  );
}
