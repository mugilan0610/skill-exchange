import { motion } from "framer-motion";

export default function FbCard({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      className={`
        bg-white
        rounded-2xl
        p-4 sm:p-5
        mb-4
        border border-gray-100
        shadow-[0_2px_8px_rgba(0,0,0,0.06)]
        md:shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        focus-within:ring-2
        focus-within:ring-blue-500
        transition
        ${className}
      `}
      {...(hover
        ? {
            whileHover: {
              y: -2,
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            },
            transition: { type: "spring", stiffness: 260, damping: 22 },
            // prevent hover jump on touch devices
            whileTap: { scale: 1 },
          }
        : {})}
    >
      {children}
    </motion.div>
  );
}
