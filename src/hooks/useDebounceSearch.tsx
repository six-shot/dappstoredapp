import { useEffect, useState } from "react";

export const useDebounceSearch = (search: string, delay: number) => {
    const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [search, delay]);

    return debouncedSearch;
}