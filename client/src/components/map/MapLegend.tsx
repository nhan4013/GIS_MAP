import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const legendItems = [
  { color: "bg-blue-600", icon: <FaStar className="text-white" />, label: "CN - TDH" },
  { color: "bg-orange-500", icon: <FaMapMarkerAlt className="text-white" />, label: "TT - TDC" },
  { color: "bg-green-500", icon: <FaMapMarkerAlt className="text-white" />, label: "TT - TDP" },
  { color: "bg-red-500", icon: <FaStar className="text-white" />, label: "TT - TDW" },
  { color: "bg-pink-500", icon: <FaMapMarkerAlt className="text-white" />, label: "Đại lý TDH & TDW" },
  { color: "bg-green-400", icon: <FaMapMarkerAlt className="text-white" />, label: "Đại lý TDP" },
  { color: "bg-blue-500", icon: <FaMapMarkerAlt className="text-white" />, label: "Đại lý TDH" },
];

const MapLegend: React.FC = () => (
  <div className="absolute bottom-8 right-28 bg-white/90 rounded-xl shadow-lg p-3 w-56 z-[1001]">
    <div className="font-semibold text-green-700 mb-2 text-center">Chú giải</div>
    <ul className="space-y-2">
      {legendItems.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className={`w-6 h-6 flex items-center justify-center rounded-full ${item.color}`}>
            {item.icon}
          </span>
          <span className="text-sm text-gray-800">{item.label}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default MapLegend;