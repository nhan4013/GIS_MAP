import React,{useState } from "react";
import type { SchoolDetailPanelProps } from "../../types/models";
import reactLogo from "../../assets/464103728_8631133176956343_9093560517596140680_n.jpg";
import nbt from "../../assets/nbt.webp";
import ntmk from "../../assets/ntmk.webp";
import thpt from "../../assets/truong-thpt-an-duong-vuong.png";
interface ExtendedSchoolDetailPanelProps extends SchoolDetailPanelProps {
  onShowRoute?: () => void;
}

const SchoolDetailPanel: React.FC<ExtendedSchoolDetailPanelProps> = ({school_s,onClose,onShowRoute}) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const school = {
    id: 1,
    name: "Trường THPT Nguyễn Du",
    address: "123 Đường Nguyễn Du, Quận 1, TP. Hồ Chí Minh",
    phone: "028-1234-5678",
    website: "https://nguyendu.edu.vn",
    type: "Trường công lập",
    students: 1200,
    teachers: 80,
    facilitiesImages: [reactLogo, nbt,ntmk,thpt],
    admissionPolicy: "Xét tuyển dựa trên điểm thi vào lớp 10.",
    benchmark: "38.5",
    tuition: "1.200.000 VNĐ/tháng",
    admissionMethod: "Thi tuyển và xét học bạ.",
    universityAdmissionRate: "92%",
    recruitmentArea: "Quận 1, Quận 3, Quận 5",
  };
  
  const schoolTypeMap: Record<string, string> = {
  public: "Trường công lập",
  private: "Trường tư thục",
  international: "Trường quốc tế",
  // Add more mappings as needed
  };


  if (!school_s) return null;
  return (
    <div  className="absolute top-4 right-4 w-96 max-w-md bg-white shadow-2xl rounded-lg overflow-hidden" style={{ zIndex: 9999 }}>
      <div className="flex justify-between items-center p-3 border-b bg-white sticky top-0">
        <h2 className="text-lg font-bold">{school_s.name}</h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-red-500 text-xl flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
        >
          &times;
        </button>
      </div>
      
      <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
        {onShowRoute && (
          <button
            onClick={onShowRoute}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 mb-3"
          >
            <span>🧭</span> Chỉ đường đến đây
          </button>
        )}
        <div>
          <span className="font-semibold">Địa chỉ:</span> {school_s.address}
        </div>
        <div>
          <span className="font-semibold">Số điện thoại:</span> {school_s.phone}
        </div>
        <div>
          <span className="font-semibold">Website:</span>{" "}
          <a
            href={school_s.website}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {school_s.website}
          </a>
        </div>
        <div>
          <span className="font-semibold">Loại trường:</span> {schoolTypeMap[school_s.school_type] || school_s.school_type}
        </div>
        <div>
          <span className="font-semibold">Số học sinh:</span> {school_s.student_count}
        </div>
        <div>
          <span className="font-semibold">Số giáo viên:</span> {school_s.teacher_count}
        </div>
        {/* <div>
          <span className="font-semibold">Ảnh cơ sở vật chất:</span>
          <div className="flex space-x-2 mt-2 overflow-x-auto pb-2">
            {school.facilitiesImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="facility"
                className="w-20 h-20 object-cover rounded border flex-shrink-0"
              />
            ))}
          </div>
        </div> */}
        <div>
        <span className="font-semibold">Ảnh cơ sở vật chất:</span>
        <div className="flex space-x-2 mt-2 overflow-x-auto pb-2">
          {(school.facilitiesImages ?? []).length > 0 ? (
            school.facilitiesImages.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt="facility"
                className="w-20 h-20 object-cover rounded border flex-shrink-0 cursor-pointer"
                onClick={() => setModalImage(img)}
              />
            ))
          ) : (
            <span className="text-gray-500">Không có ảnh</span>
          )}
        </div>
      </div>
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg p-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-lg font-bold"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>
            <img src={modalImage} alt="facility large" className="max-w-[80vw] max-h-[80vh] rounded" />
          </div>
        </div>
      )}
        <div>
          <span className="font-semibold">Chính sách tuyển sinh:</span> {school.admissionPolicy}
        </div>
        <div>
          <span className="font-semibold">Điểm chuẩn:</span> {school.benchmark}
        </div>
        <div>
          <span className="font-semibold">Học phí:</span> {school.tuition}
        </div>
        <div>
          <span className="font-semibold">Phương thức xét tuyển:</span> {school.admissionMethod}
        </div>
        <div>
          <span className="font-semibold">Tỉ lệ đậu đại học:</span> {school.universityAdmissionRate}
        </div>
        <div>
          <span className="font-semibold">Vùng tuyển sinh:</span> {school.recruitmentArea}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailPanel;