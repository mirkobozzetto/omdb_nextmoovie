// src/components/ErrorDisplay.tsx
interface ErrorDisplayProps {
  error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;
  return <p className="text-red-500">{error}</p>;
}
