export default function Loading({
  text = "Loading...",
  fullscreen = false,
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        ${fullscreen ? "min-h-[calc(100vh-4rem)] sm:min-h-screen" : "h-40"}
      `}
    >
      {/* Spinner */}
      <div
        className="relative"
        style={{
          width: "clamp(32px, 4vw, 40px)",
          height: "clamp(32px, 4vw, 40px)",
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>

      {/* Text */}
      {text && (
        <p className="mt-3 text-xs sm:text-sm text-gray-500 select-none">
          {text}
        </p>
      )}
    </div>
  );
}
