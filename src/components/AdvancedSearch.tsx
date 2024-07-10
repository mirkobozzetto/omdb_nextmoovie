import { cn } from "@/lib/utils";
import { AdvancedSearchParams } from "@/types/types";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AdvancedSearchProps {
  onSearch: (params: AdvancedSearchParams) => void;
  className?: string;
}

export function AdvancedSearch({ onSearch, className }: AdvancedSearchProps) {
  const [params, setParams] = useState<AdvancedSearchParams>({
    title: "",
    resultsPerPage: 10,
  });
  const [debouncedParams] = useDebounce(params, 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(debouncedParams);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <Input
        name="title"
        placeholder="Movie Title"
        value={params.title}
        onChange={handleInputChange}
        className={cn(params.title && "border-blue-500")}
      />
      <Input
        name="year"
        placeholder="Year"
        value={params.year || ""}
        onChange={handleInputChange}
      />
      <Select
        onValueChange={(value) =>
          setParams((prev) => ({
            ...prev,
            type: value as "movie" | "series" | "episode" | undefined,
          }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any Type</SelectItem>
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="series">Series</SelectItem>
          <SelectItem value="episode">Episode</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="country"
        placeholder="Country"
        value={params.country || ""}
        onChange={handleInputChange}
      />
      <Select
        onValueChange={(value) =>
          setParams((prev) => ({ ...prev, imdbRating: value }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="IMDb Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any Rating</SelectItem>
          <SelectItem value="7">7+</SelectItem>
          <SelectItem value="8">8+</SelectItem>
          <SelectItem value="9">9+</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          setParams((prev) => ({ ...prev, resultsPerPage: parseInt(value) }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Results per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="40">40</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}
