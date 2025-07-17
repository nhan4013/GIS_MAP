import { FaBars, FaBookmark, FaHistory, FaMobileAlt } from "react-icons/fa";

const places = [
  { label: "Ho Chi Minh City", img: "https://via.placeholder.com/40?text=16", count: 16 },
  { label: "Quang Ngai", img: "https://via.placeholder.com/40?text=2", count: 2 },
  { label: "Bangkok", img: "https://via.placeholder.com/40?text=3", count: 3 },
  { label: "Thailand", img: "https://via.placeholder.com/40?text=1", count: 1 },
];

const Sidebar: React.FC = () => (
  <aside className="flex flex-col items-center w-14 min-w-[56px] h-full bg-[#f5fafc] border-r shadow-sm py-4 gap-2">
    {/* Top menu icon */}
    <button className="mb-4 p-2 rounded hover:bg-gray-100">
      <FaBars size={24} />
    </button>

    {/* Saved & Recents */}
    <button className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-100">
      <FaBookmark size={22} />
      <span className="text-xs text-gray-700">Saved</span>
    </button>
    <button className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-100">
      <FaHistory size={22} />
      <span className="text-xs text-gray-700">Recents</span>
    </button>

    <hr className="w-8 my-2 border-gray-300" />

    {/* Places */}
    {places.map((place) => (
      <button
        key={place.label}
        className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-100"
      >
        <div className="relative">
          <img src={place.img} alt={place.label} className="w-4 h-4 rounded shadow" />
          <span className="absolute -top-2 -right-2 bg-white text-xs text-gray-700 rounded-full px-1 border">
            {place.count}
          </span>
        </div>
        <span className="text-xs text-gray-700">{place.label}</span>
      </button>
    ))}

    <hr className="w-8 my-2 border-gray-300" />

    {/* Get the app */}
    <button className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-100 mt-auto">
      <FaMobileAlt size={22} />
      <span className="text-xs text-gray-700">Get the app</span>
    </button>
  </aside>
);

export default Sidebar;
