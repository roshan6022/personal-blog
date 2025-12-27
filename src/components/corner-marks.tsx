export function CornerMarks() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-black/20 dark:border-white/20" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-black/20 dark:border-white/20" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-black/20 dark:border-white/20" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-black/20 dark:border-white/20" />
    </div>
  );
}
