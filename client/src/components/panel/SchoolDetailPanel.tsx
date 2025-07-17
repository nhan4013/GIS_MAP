import React from "react";
import type { SchoolDetailPanelProps } from "../../types/models";

const SchoolDetailPanel: React.FC<SchoolDetailPanelProps> = ({onClose}) => {
  const school = {
    id: 1,
    name: "Trường THPT Nguyễn Du",
    address: "123 Đường Nguyễn Du, Quận 1, TP. Hồ Chí Minh",
    phone: "028-1234-5678",
    website: "https://nguyendu.edu.vn",
    type: "Trường công lập",
    students: 1200,
    teachers: 80,
    facilitiesImages: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    admissionPolicy: "Xét tuyển dựa trên điểm thi vào lớp 10.",
    benchmark: "38.5",
    tuition: "1.200.000 VNĐ/tháng",
    admissionMethod: "Thi tuyển và xét học bạ.",
    universityAdmissionRate: "92%",
    recruitmentArea: "Quận 1, Quận 3, Quận 5",
  };

  return (
    <div  className="absolute top-4 right-4 w-96 max-w-md bg-white shadow-2xl rounded-lg overflow-hidden" style={{ zIndex: 9999 }}>
      <div className="flex justify-between items-center p-3 border-b bg-white sticky top-0">
        <h2 className="text-lg font-bold">{school.name}</h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-red-500 text-xl flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
        >
          &times;
        </button>
      </div>
      <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
        <div>
          <span className="font-semibold">Địa chỉ:</span> {school.address}
        </div>
        <div>
          <span className="font-semibold">Số điện thoại:</span> {school.phone}
        </div>
        <div>
          <span className="font-semibold">Website:</span>{" "}
          <a
            href={school.website}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {school.website}
          </a>
        </div>
        <div>
          <span className="font-semibold">Loại trường:</span> {school.type}
        </div>
        <div>
          <span className="font-semibold">Số học sinh:</span> {school.students}
        </div>
        <div>
          <span className="font-semibold">Số giáo viên:</span> {school.teachers}
        </div>
        <div>
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
        </div>
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