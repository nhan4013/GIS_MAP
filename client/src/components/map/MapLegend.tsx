import { FaMapMarkerAlt } from "react-icons/fa";

const legendItems = [
  { color: "bg-orange-500", icon: <FaMapMarkerAlt className="text-white" />, label: "Trường THPT Tư thục" },
  { color: "bg-green-500", icon: <FaMapMarkerAlt className="text-white" />, label: "Trường THPT công lập" },
  { color: "bg-pink-500", icon: <FaMapMarkerAlt className="text-white" />, label: "Trường THPT có yếu tố nước ngoài " },
  {
    color: "bg-red-500",
    icon: (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500">
        <svg width="16" height="16" fill="white">
          <circle cx="8" cy="8" r="6" />
        </svg>
      </span>
    ),
    label: "Vị trí hiện tại",
  },
];

const MapLegend: React.FC = () => (
  <div className="absolute bottom-8 right-28 bg-white/90 rounded-xl shadow-lg p-3 w-56 z-[1001]">
    <div className="font-semibold text-green-700 mb-2 text-center">Chú giải</div>
    <ul className="space-y-2">
      {legendItems.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className={`w-6 h-6 flex items-center justify-center rounded-full ${item.color}`}>
            {item.icon}
          </span>
          <span className="text-sm text-gray-800 max-w-[170px] break-words">{item.label}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default MapLegend;