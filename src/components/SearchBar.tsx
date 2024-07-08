import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      router.push(`/?q=${encodeURIComponent(debouncedQuery)}`, {
        scroll: false,
      });
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, router, onSearch]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-sm">
      <fieldset>
        <legend className="mb-2 font-semibold text-lg">Search Movies</legend>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter movie title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" onClick={() => onSearch(query)}>
            Search
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
