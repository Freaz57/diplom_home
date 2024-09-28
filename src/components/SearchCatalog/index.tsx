import React, {useState, useCallback, useEffect, FC} from 'react';
import { useDebounce } from 'use-debounce';
import style from './SearchCatalog.module.css';

interface SearchCatalogProps {
    onSearchChange: (query: string) => void;
}

const SearchCatalog: FC<SearchCatalogProps> = ({ onSearchChange }) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 100);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);


    useEffect(() => {
        onSearchChange(debouncedQuery);
    }, [debouncedQuery, onSearchChange]);

    return (
        <div className={style.search_catalog}>
            <input
                className={style.search_catalog__input}
                type="text"
                placeholder="Search by title"
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchCatalog;
