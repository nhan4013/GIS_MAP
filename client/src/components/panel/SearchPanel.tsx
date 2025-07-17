import React, { useState, type ChangeEvent, type FormEvent } from "react";
import type { SearchPanelProps } from '../../types/models';

const SearchPanel: React.FC<SearchPanelProps> = ({ onSelectSchool }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSelectSchool && query.trim()) {
      onSelectSchool(query.trim());
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          id="school-search"
          type="text"
          value={query}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Enter school name..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition w-full"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchPanel;