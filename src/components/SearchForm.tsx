import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const searchSchema = z.object({
  query: z.string().min(1, "Query is required"),
  limit: z.string().optional(),
});

export type SearchFormData = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const { register, handleSubmit, control } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
      limit: "",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center space-x-2"
    >
      <Input
        {...register("query")}
        placeholder="Search movies..."
        className="flex-grow"
      />
      <Controller
        name="limit"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Number of results" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All results</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
