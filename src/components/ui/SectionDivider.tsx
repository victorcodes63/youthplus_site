type SectionDividerProps = {
  className?: string;
  contentWidth?: boolean;
};

export function SectionDivider({
  className = "",
  contentWidth = false,
}: SectionDividerProps) {
  const widthClass = contentWidth
    ? "left-1/2 w-full max-w-[1440px] -translate-x-1/2"
    : "w-full";

  return (
    <div
      aria-hidden
      className={`h-px bg-borderLight ${widthClass} ${className}`.trim()}
    />
  );
}
