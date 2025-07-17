import { FaCrosshairs } from "react-icons/fa";

const LocateButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button
      className="absolute bottom-8 right-8 bg-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition z-[1001]"
      onClick={onClick}
      aria-label="Locate"
      type="button"
    >
      <FaCrosshairs size={28} className="text-gray-800" />
    </button>
  );
};

export default LocateButton;
