import { SearchIcon } from "@/icons/search-icon";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";

interface Props {
  className?: string;
}

// ToDo: Can we delete this?
export const SearchBar = ({ className }: Props) => {

    const [query, setQuery] = useState('')
    const searchParams = useSearchParams();
    // const {data} = useFetchPopularProductsQuery()
    const router = useRouter()

    useIsomorphicLayoutEffect(() => {
        const name = searchParams.get("name");
        setQuery(name || "");
    }, [searchParams]);


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(query.length > 0){
            router.replace(`/catalog/0?name=${query}`);
        }

    }

  return (
    <form  onSubmit={onSubmit}
      className={cn(
        " min-h-[48px] w-full rounded-2xl bg-primary-light-white flex items-center gap-2 px-6 focus-within:ring-1 ring-primary-blue transition-all",
        className
      )}
    >
      <SearchIcon />
      <Input
        className=" w-full h-full px-0 focus-visible:ring-0 border-none shadow-none"
        placeholder="Введите адрес аптеки"
        value={query}
        onChange={(e) => setQuery(e.target.value) }
      />
    </form>
  );
};
