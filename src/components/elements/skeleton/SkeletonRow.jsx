export default function SkeletonRow() {
  return (
    <div className="w-full max-w-sm">
      <div className="animate-pulse">
        <div className="flex-1 h-8 bg-gray-200 rounded-sm" />
      </div>
    </div>
  );
}
