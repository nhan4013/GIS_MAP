import React, { useState, type ChangeEvent, type FormEvent } from "react";
import type { SearchPanelProps } from '../../types/models';
import {
  FaSearch,
  FaUtensils,
  FaHotel,
  FaCamera,
  FaLandmark,
  FaTrain,
  FaPrescriptionBottle,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const categories = [
  { label: "Restaurants", icon: <FaUtensils /> },
  { label: "Hotels", icon: <FaHotel /> },
  { label: "Things to do", icon: <FaCamera /> },
  { label: "Museums", icon: <FaLandmark /> },
  { label: "Transit", icon: <FaTrain /> },
  { label: "Pharmacies", icon: <FaPrescriptionBottle /> },
  { label: "ATMs", icon: <FaMoneyCheckAlt /> },
];

const Header: React.FC<SearchPanelProps> = ({onSelectSchool}) => {
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
    <header className="absolute top-4 left-20 flex flex-col items-center z-[1000] pointer-events-none">
      <div className="flex items-center gap-4 px-8 py-3 pointer-events-auto">
        {/* Logo and Search Bar Row */}
        <div className="flex items-center border rounded-full shadow px-4 py-3 min-w-[300px] max-w-[400px] bg-white backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tìm kiếm trường học..."
              onChange={handleInputChange}
              value={query}
              className="flex-1 bg-transparent outline-none px-2 text-gray-700"
            />
            <button className="text-gray-500 px-2">
              <FaSearch size={20} />
            </button>
          </form>
        </div>
        {/* Categories Row */}
        <div className="flex gap-2 overflow-x-auto pb-2 bg-transparent rounded-full px-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className="flex items-center gap-1 bg-white rounded-full px-4 py-2 shadow-sm border text-gray-700 hover:bg-blue-50 transition whitespace-nowrap"
            >
              <span className="text-blue-500">{cat.icon}</span>
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
