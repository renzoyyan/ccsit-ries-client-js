export default function SkeletonRow() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="space-y-4 animate-pulse">
        <div className="flex-1 h-8 py-2 bg-gray-200 rounded-sm" />
      </div>
    </div>
  );
}
