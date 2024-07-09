import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery] = useDebounce(query, 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      setError(null);
      onSearch(query);
    } else {
      setError("Please enter a search term");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-sm", className)}>
      <fieldset>
        <legend className={cn("mb-2 font-semibold text-lg")}>
          Search Movies
        </legend>
        <div className={cn("flex items-center space-x-2")}>
          <Input
            type="text"
            placeholder="Enter movie title..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError(null);
            }}
            className={cn(
              "flex-grow",
              query.length > 0 && "border-blue-500",
              error && "border-red-500"
            )}
          />
          <Button type="submit" className={cn("whitespace-nowrap")}>
            Search
          </Button>
        </div>
      </fieldset>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
}
