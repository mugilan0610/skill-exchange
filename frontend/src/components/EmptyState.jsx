
export default function EmptyState({
  title,
  subtitle = "",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <p className="text-base sm:text-lg font-semibold text-gray-700">
        {title}
      </p>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
