export default function Avatar({
  name = "User",
  size = 44,
  bg = "bg-blue-600",
  image = null,
}) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div
      style={{
        width: `clamp(${size - 10}px, ${size}px, ${size + 8}px)`,
        height: `clamp(${size - 10}px, ${size}px, ${size + 8}px)`,
      }}
      className={`
        ${bg}
        rounded-full
        flex items-center justify-center
        text-white font-semibold
        shadow-sm
        select-none
        overflow-hidden
        transition-transform
        md:hover:scale-105
      `}
      aria-label={`Avatar for ${name}`}
      title={name}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span
          style={{
            fontSize: `clamp(${Math.floor(size * 0.35)}px, ${Math.floor(
              size * 0.45
            )}px, ${Math.floor(size * 0.5)}px)`,
          }}
          className="leading-none"
        >
          {initial}
        </span>
      )}
    </div>
  );
}
